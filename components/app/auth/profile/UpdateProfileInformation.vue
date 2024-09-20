<script setup lang="ts">

import {PersonIcon} from "@radix-icons/vue";
import BaseInput from "~/components/custom/input/BaseInput.vue";
import EmailInput from "~/components/custom/input/EmailInput.vue";
import {Button} from "~/components/ui/button";
import {configure, useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";

configure({validateOnModelUpdate: false})

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((payload) => {
  console.log('Form submitted!', payload)
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Profile Information</CardTitle>
      <CardDescription>Update your account&apos;s profile information and email address</CardDescription>
    </CardHeader>
    <CardContent>

      <form @submit="onSubmit">
        <BaseInput field="name"
                   label="Name"
                   :icon="PersonIcon"
                   autocomplete="name"
        />
        <EmailInput field="email"
                    label="Email"
                    autocomplete="email"
        />

        <div class="inline-flex w-full items-center">
          <Button type="submit">
            Save
          </Button>
        </div>
      </form>

    </CardContent>
  </Card>
</template>

<style scoped>

</style>
