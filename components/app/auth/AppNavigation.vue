<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import {navigationMenuTriggerStyle} from "~/components/ui/navigation-menu";

const route = useRoute()
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuLink href="/dashboard"
                            :class="navigationMenuTriggerStyle()"
                            :active="route.path === '/dashboard'"
        >
          Dashboard
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>

<style scoped>

</style>
