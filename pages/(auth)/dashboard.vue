<script setup lang="ts">
definePageMeta({
  // middleware: 'auth' // this should match the name of the file inside the middleware directory
})

const user = useUser()
console.log('current user', user.value)
</script>

<template>
  <NuxtLayout name="auth">
    <template #header>
      <h2 class="font-semibold text-xl leading-tight">Dashboard</h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <Card>
          <CardContent class="p-0">
            <div class="p-6">You're logged in!</div>
          </CardContent>
        </Card>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>

</style>
