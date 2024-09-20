<script setup lang="ts">

import UpdateProfileInformation from "@/components/app/auth/profile/UpdateProfileInformation.vue";
import UpdatePasswordForm from "@/components/app/auth/profile/UpdatePasswordForm.vue";
import DeleteUserForm from "@/components/app/auth/profile/DeleteUserForm.vue";

definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <NuxtLayout name="auth">
    <template #header>
      <h2 class="font-semibold text-xl leading-tight">Profile</h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-3">
        <UpdateProfileInformation/>
        <UpdatePasswordForm/>
        <DeleteUserForm/>
      </div>
    </div>

  </NuxtLayout>
</template>

<style scoped>

</style>
