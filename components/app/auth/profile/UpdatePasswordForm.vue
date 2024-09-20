<script setup lang="ts">

import {Button} from "~/components/ui/button";
import PasswordInput from "~/components/custom/input/PasswordInput.vue";
import {configure, useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";

configure({validateOnModelUpdate: false})

const formSchema = toTypedSchema(z.object({
  current_password: z.string().min(6),
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
  <Card>
    <CardHeader>
      <CardTitle>Update Password</CardTitle>
      <CardDescription>Ensure your account is using a long, random password to stay secure.</CardDescription>
    </CardHeader>
    <CardContent>

      <form @submit="onSubmit">
        <PasswordInput field="current_password"
                       label="Current Password"
                       autocomplete="current-password"
        />
        <PasswordInput field="password"
                       label="Password"
                       autocomplete="new-password"
        />
        <PasswordInput field="password_confirmation"
                       label="Confirm Password"
                       autocomplete="new-password"
        />

        <div class="inline-flex w-full items-center">
          <Button type="submit">
            Save
          </Button>
        </div>
      </form>

    </CardContent>
  </Card>
</template>

<style scoped>

</style>
