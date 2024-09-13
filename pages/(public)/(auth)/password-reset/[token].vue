<script setup lang="ts">

import {configure, useForm} from 'vee-validate'
import {toTypedSchema} from '@vee-validate/zod'
import * as z from 'zod'
import EmailInput from "~/components/custom/input/EmailInput.vue";
import PasswordInput from "~/components/custom/input/PasswordInput.vue";
import {Button} from "~/components/ui/button"

definePageMeta({
  layout: 'guest'
})

configure({validateOnModelUpdate: false})

const formSchema = toTypedSchema(z.object({
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
  <form @submit="onSubmit">
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
      <Button type="submit">
        Reset password
      </Button>
    </div>
  </form>
</template>

<style scoped>

</style>
