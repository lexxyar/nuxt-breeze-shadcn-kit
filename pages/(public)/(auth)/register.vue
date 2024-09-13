<script setup lang="ts">
import {configure, useForm} from 'vee-validate'
import {toTypedSchema} from '@vee-validate/zod'
import * as z from 'zod'
import TextInput from "~/components/custom/input/TextInput.vue";
import EmailInput from "~/components/custom/input/EmailInput.vue";
import PasswordInput from "~/components/custom/input/PasswordInput.vue";
import {Button} from "~/components/ui/button"

definePageMeta({
  layout: 'auth'
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
  <form @submit="onSubmit">
    <TextInput field="name"
               label="Name"
    />
    <EmailInput field="email"
                label="Email"
    />
    <PasswordInput field="password"
                   label="Password"
    />
    <PasswordInput field="password_confirmation"
                   label="Confirm Password"
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
