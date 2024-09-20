<script setup lang="ts">

import {PersonIcon} from "@radix-icons/vue";
import BaseInput from "~/components/custom/input/BaseInput.vue";
import EmailInput from "~/components/custom/input/EmailInput.vue";
import {Button} from "~/components/ui/button";
import {configure, useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useAuth} from "~/composables/useAuth";
import type {Ref} from "vue";
import {toast} from "~/components/ui/toast";
import {useProfile} from "~/composables/useProfile";

configure({validateOnModelUpdate: false})
const {user, resendEmailVerification} = useAuth()
const {updateProfileInfo} = useProfile()
const status: Ref<string | undefined> = ref(undefined)
const resendEmailStatus: Ref<string | undefined> = ref(undefined)

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: user.value?.name ?? '',
    email: user.value?.email ?? '',
  }
})

const onSubmit = form.handleSubmit(async () => {
  try {
    status.value = await updateProfileInfo(form)
  } catch (e) {
    toast({message: e.message, variant: 'destructive'})
  }
})

const sendEmailVerification = async () => {
  resendEmailStatus.value = await resendEmailVerification()
}

</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Profile Information</CardTitle>
      <CardDescription>Update your account&apos;s profile information and email address</CardDescription>
    </CardHeader>
    <CardContent>

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

        <div v-if="user?.must_verify_email && user?.email_verified_at === null">
          <p class="text-sm mt-2 text-gray-800 dark:text-gray-200">
            Your email address is unverified.
            <Button variant="link" @click="sendEmailVerification">
              Click here to re-send the verification email.
            </Button>
          </p>

          <div
              v-show="resendEmailStatus === 'verification-link-sent'"
              class="my-2 font-medium text-sm text-green-600 dark:text-green-400"
          >
            A new verification link has been sent to your email address.
          </div>
        </div>

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
            <p v-if="status === 'profile-updated'" class="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
          </Transition>
        </div>
      </form>

    </CardContent>
  </Card>
</template>

<style scoped>

</style>
