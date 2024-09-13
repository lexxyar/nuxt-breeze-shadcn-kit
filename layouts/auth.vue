<script setup lang="ts">
import {Card, CardContent,} from '@/components/ui/card'
</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <Card class="w-[400px]">
      <CardContent class="pt-6">
        <slot/>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>

</style>
