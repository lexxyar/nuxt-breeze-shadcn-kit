<script setup lang="ts">
import EmailInput from "~/components/custom/input/EmailInput.vue";
import {Button} from "~/components/ui/button";
import {configure, useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";

definePageMeta({
  layout: 'auth'
})

configure({validateOnModelUpdate: false})

const formSchema = toTypedSchema(z.object({
      email: z.string().email(),
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
    <p class="text-muted-foreground mb-5">
      Forgot your password? No problem.Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
    </p>

    <EmailInput field="email"
                label="Email"
                autocomplete="username"
    />

    <div class="inline-flex w-full items-center justify-end">
      <NuxtLink to="/login">
        <Button type="button" variant="ghost">
          Cancel
        </Button>
      </NuxtLink>

      <Button type="submit">
        Email password reset link
      </Button>
    </div>
  </form>
</template>

<style scoped>

</style>
