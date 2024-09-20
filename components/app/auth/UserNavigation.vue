<script setup lang="ts">
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {useAuth} from "~/composables/useAuth";

const {logout} = useAuth()

const onLogout = async () => {
  await logout()
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="h-10">
      <Avatar>
        <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue"/>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator/>
      <DropdownMenuItem>
        <NuxtLink to="/profile">
          Profile
        </NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <NuxtLink @click="onLogout">

          Logout
        </NuxtLink>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped>

</style>
