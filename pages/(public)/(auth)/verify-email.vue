<script setup lang="ts">

import {Button} from "~/components/ui/button";
import {useAuth} from "~/composables/useAuth";

definePageMeta({
  layout: 'guest',
  middleware: 'auth',
})
const verificationLinkSent = ref()
const {resendEmailVerification, logout, user} = useAuth()

const sendEmailVerification = async () => {
  verificationLinkSent.value = await resendEmailVerification()
}

const handleLogout = async ()=>{
  await logout()
  navigateTo('/login', {external:true})
}
</script>

<template>
  <Head>
    <title>Email Verification</title>
  </Head>

  <div class="mb-4 text-sm">
    Thanks for signing up! Before getting started, could you verify your email address by clicking on the link
    we just emailed to you? If you didn't receive the email, we will gladly send you another.
  </div>

  <div class="mb-4 font-medium text-sm text-green-600 dark:text-green-400" v-if="verificationLinkSent">
    A new verification link has been sent to the email address you provided during registration.
  </div>

  <div class="mt-4 flex items-center justify-between">
    <Button type="button" @click="sendEmailVerification">
      Resend Verification Email
    </Button>

    <Button variant="link" @click="handleLogout">
      Sign Out
    </Button>
  </div>

</template>

<style scoped>

</style>
