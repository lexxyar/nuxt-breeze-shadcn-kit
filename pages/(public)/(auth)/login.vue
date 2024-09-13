<script setup lang="ts">

import EmailInput from "~/components/custom/input/EmailInput.vue";
import {Button} from "~/components/ui/button";
import PasswordInput from "~/components/custom/input/PasswordInput.vue";
import {configure, useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import CheckboxInput from "~/components/custom/checkbox/CheckboxInput.vue";

definePageMeta({
  layout: 'auth'
})

configure({validateOnModelUpdate: false})

const formSchema = toTypedSchema(z.object({
      email: z.string().email(),
      password: z.string().min(6),
      remember: z.boolean(),
    })
)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((payload) => {
  console.log('Form submitted!', payload)
})
</script>

<template>
  <form @submit="onSubmit">
    <EmailInput field="email"
                label="Email"
                autocomplete="username"
    />
    <PasswordInput field="password"
                   label="Password"
                   autocomplete="current-password"
    />

      <CheckboxInput field="remember"
                     label="Remember me"/>

    <div class="inline-flex w-full items-center justify-end">
      <NuxtLink to="/register">
        <Button type="button" variant="link">
          New here?
        </Button>
      </NuxtLink>
      <Button type="submit">
        Register
      </Button>
    </div>
  </form>
</template>

<style scoped>

</style>
