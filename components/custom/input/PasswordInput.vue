<script setup lang="ts">

import BaseInput, {type TInputProps} from "~/components/custom/input/BaseInput.vue";
import {LockClosedIcon} from"@radix-icons/vue"

const props = defineProps<TInputProps>()
</script>

<template>
  <BaseInput v-bind="props" input-type="password" :icon="LockClosedIcon"/>
</template>

<style scoped>

</style>
