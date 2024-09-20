<script setup lang="ts">
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import type {FunctionalComponent} from "vue";
import {cn} from "~/lib/utils";

export type TInputType = "text" | "email" | "password"
export type TInputProps = {
  field: string,
  label?: string,
  placeholder?: string,
  description?: string,
  icon?: FunctionalComponent,
  iconAlt?: string,
  autocomplete?: string,
}
const props = withDefaults(defineProps<TInputProps & {
  inputType?: TInputType,
}>(), {
  inputType: "text",
  iconAlt: 'icon',
})
</script>

<template>
  <FormField v-slot="{ componentField }" :name="field">
    <FormItem class="mb-3">
      <FormLabel v-if="label">{{ label }}</FormLabel>
      <FormControl>
        <div class="relative">
          <Input :type="inputType" :placeholder="placeholder" v-bind="componentField"
                 :class="cn(`${icon?'pl-7':''}`)"
                 :autocomplete="autocomplete"
          />
          <span v-if="icon" class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <component :is="icon" class="size-4 text-muted-foreground"/>
          </span>
        </div>
      </FormControl>
      <FormDescription v-if="description">
        {{ description }}
      </FormDescription>
      <FormMessage/>
    </FormItem>
  </FormField>
</template>

<style scoped>

</style>
