<script setup lang="ts">
import {configure, useForm} from 'vee-validate'
import {toTypedSchema} from '@vee-validate/zod'
import * as z from 'zod'
import EmailInput from "~/components/custom/input/EmailInput.vue";
import PasswordInput from "~/components/custom/input/PasswordInput.vue";
import {Button} from "~/components/ui/button"
import {PersonIcon} from "@radix-icons/vue";
import BaseInput from "~/components/custom/input/BaseInput.vue";

definePageMeta({
  layout: 'guest'
})

configure({validateOnModelUpdate: false})

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  password_confirmation: z.string().min(6),
}).superRefine(({password_confirmation, password}, ctx) => {
  if (password_confirmation !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['password_confirmation']
    });
  }
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((payload) => {
  console.log('Form submitted!', payload)
})


</script>

<template>
  <Head>
    <title>Register</title>
  </Head>

  <form @submit="onSubmit">
    <BaseInput field="name"
               label="Name"
               :icon="PersonIcon"
               autocomplete="name"
    />
    <EmailInput field="email"
                label="Email"
                autocomplete="email"
    />
    <PasswordInput field="password"
                   label="Password"
                   autocomplete="new-password"
    />
    <PasswordInput field="password_confirmation"
                   label="Confirm Password"
                   autocomplete="new-password"
    />

    <div class="inline-flex w-full items-center justify-end">
      <NuxtLink to="/login">
        <Button type="button" variant="link">
          Already registered?
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
