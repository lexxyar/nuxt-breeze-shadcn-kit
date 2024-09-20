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

const {logout, user} = useAuth()

const onLogout = async () => {
  await logout()
  navigateTo('/login')
}
const userInitials = computed(() => {
  if (user.value?.name) {
    const names: string[] = user.value?.name.split(' ')
    const initials: string[] = []
    while (names.length > 0) {
      const item: string | undefined = names.shift()
      if (item) {
        initials.push(item[0].toUpperCase())
      }
    }
    return initials.slice(0, 2).join('')
  } else {
    return '?'
  }
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="h-10">
      <Avatar>
        <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue"/>
        <AvatarFallback>{{userInitials}}</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>
        {{ user?.name || '' }}
      </DropdownMenuLabel>
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
