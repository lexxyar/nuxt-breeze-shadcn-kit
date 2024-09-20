<script setup lang="ts">

import {configure, useForm} from 'vee-validate'
import {toTypedSchema} from '@vee-validate/zod'
import * as z from 'zod'
import EmailInput from "~/components/custom/input/EmailInput.vue";
import PasswordInput from "~/components/custom/input/PasswordInput.vue";
import {Button} from "~/components/ui/button"
import {useAuth} from "~/composables/useAuth";
import {toast} from "~/components/ui/toast";
import router from "#app/plugins/router";

definePageMeta({
  layout: 'guest',
  middleware: 'guest',
})

configure({validateOnModelUpdate: false})
const route = useRoute()
const {resetPassword} = useAuth()

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
  initialValues: {
    email: route.query.email ?? '',
  }
})

const onSubmit = form.handleSubmit(async () => {
  try {
    const responseStatus = await resetPassword(route.params.token, form)
    await navigateTo('/login?reset=' + btoa(responseStatus))
  } catch (error: any) {
    console.log(error)
    toast({description: error.message})
  }
})

</script>

<template>
  <form @submit="onSubmit">
    <EmailInput field="email"
                label="Email"
                autocomplete="email"
                :disabled="true"
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
