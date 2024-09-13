<script setup lang="ts">
import BaseInput, {type TInputProps} from "~/components/custom/input/BaseInput.vue";
import {EnvelopeClosedIcon} from "@radix-icons/vue";

const props = defineProps<TInputProps>()
</script>

<template>
  <BaseInput v-bind="props" input-type="email" :icon="EnvelopeClosedIcon"/>
</template>

<style scoped>

</style>
