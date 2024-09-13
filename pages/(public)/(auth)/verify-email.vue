<script setup lang="ts">

definePageMeta({
  layout: 'guest'
})

const handleResendEmailVerification = ()=>{

}
const logout = ()=>{

}
</script>

<template>
  <Head>
    <title>Email Verification</title>
  </Head>

  <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
    Thanks for signing up! Before getting started, could you verify your email address by clicking
    on the link we just emailed to you? If you didn't receive the email, we will gladly send you
    another.
  </div>

  <form @submit.prevent="handleResendEmailVerification()">
    <div class="mt-4 flex items-center justify-between">
      <Button>
        Resend Verification Email
      </Button>

      <Button
          @click="logout()"
          class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
      >
        Sign Out
      </Button>
    </div>
  </form>

</template>

<style scoped>

</style>
