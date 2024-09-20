<script setup lang="ts">
import {Icon} from '@iconify/vue'
import {useColorMode} from "@vueuse/core";
import {Button} from "~/components/ui/button";

const colorMode = useColorMode()

</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline"
              size="icon"
              @click="colorMode = colorMode === 'light'? 'dark':'light'">
        <Icon icon="radix-icons:moon"
              name="moon"
              class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
        <Icon icon="radix-icons:sun"
              name="sun"
              class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
  </DropdownMenu>
</template>

<style scoped>

</style>
