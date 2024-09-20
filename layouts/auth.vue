<script setup lang="ts">

import ThemeSwitcher from "~/components/app/ThemeSwitcher.vue";
import ApplicationLogo from "~/components/app/ApplicationLogo.vue";
import AppNavigation from "~/components/app/auth/AppNavigation.vue";
import UserNavigation from "~/components/app/auth/UserNavigation.vue";

</script>

<template>
  <div>
    <div class="min-h-screen bg-background">
      <nav class="bg-background border-b border-gray-100 dark:border-gray-700">
        <!-- Primary Navigation Menu -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <!-- Logo -->
              <div class="shrink-0 flex items-center">
                <NuxtLink href="/dashboard">
                  <ApplicationLogo
                      class="block h-9 w-auto fill-current text-foreground"
                  />
                </NuxtLink>
              </div>

              <!-- Navigation Links -->
              <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <AppNavigation/>
              </div>
            </div>

            <div class="flex items-center ms-6 gap-3">
              <ThemeSwitcher/>

              <!-- Settings Dropdown -->
              <UserNavigation/>
            </div>
          </div>
        </div>
      </nav>

      <!-- Page Heading -->
      <header class="bg-background shadow" v-if="$slots.header">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <slot name="header"/>
        </div>
      </header>

      <!-- Page Content -->
      <main>
        <slot/>
      </main>
    </div>
  </div>
</template>

<style scoped>

</style>
