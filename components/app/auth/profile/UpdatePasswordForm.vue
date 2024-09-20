<script setup lang="ts">

import {Button} from "~/components/ui/button";
import PasswordInput from "~/components/custom/input/PasswordInput.vue";
import {configure, useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useProfile} from "~/composables/useProfile";
import {toast} from "~/components/ui/toast";
import type {Ref} from "vue";

configure({validateOnModelUpdate: false})
const {updatePassword} = useProfile()
const status: Ref<string | undefined> = ref(undefined)

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

const onSubmit = form.handleSubmit(async () => {
  try {
    status.value = await updatePassword(form)
  } catch (e) {
    toast({message: e.message, variant: 'destructive'})
  }
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

        <div class="inline-flex w-full items-center gap-3">
          <Button type="submit">
            Save
          </Button>

          <Transition
              enter-active-class="transition ease-in-out"
              enter-from-class="opacity-0"
              leave-active-class="transition ease-in-out"
              leave-to-class="opacity-0"
          >
            <p v-if="status === 'password-updated'" class="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
          </Transition>
        </div>
      </form>

    </CardContent>
  </Card>
</template>

<style scoped>

</style>
