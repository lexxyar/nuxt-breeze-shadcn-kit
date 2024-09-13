<script setup lang="ts">
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Checkbox} from '~/components/ui/checkbox'
import type {TInputProps} from "~/components/custom/input/BaseInput.vue";

const props = withDefaults(defineProps<TInputProps>(), {})
</script>

<template>
  <FormField v-slot="{ componentField }" :name="field">
    <FormItem class="mb-3">
      <div class="inline-flex items-center gap-2">
        <FormControl>
          <Checkbox/>
        </FormControl>
        <FormLabel v-if="label">{{ label }}</FormLabel>
      </div>
      <FormDescription v-if="description">
        {{ description }}
      </FormDescription>
      <FormMessage/>
    </FormItem>
  </FormField>

</template>

<style scoped>

</style>
