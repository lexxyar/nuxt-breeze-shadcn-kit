<script setup lang="ts">
import EmailInput from "~/components/custom/input/EmailInput.vue";
import {Button} from "~/components/ui/button";
import {configure, useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {toast} from "~/components/ui/toast";
import {useAuth} from "~/composables/useAuth";

definePageMeta({
  layout: 'guest',
  middleware: 'guest',
})

configure({validateOnModelUpdate: false})
const {forgotPassword} = useAuth()
const status = ref(undefined)

const formSchema = toTypedSchema(z.object({
      email: z.string().email(),
    })
)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async () => {
  try {
    status.value = await forgotPassword(form)
    // await navigateTo("/login", {replace: true, external: true})
  } catch (e) {
    toast({description: e.message, variant: 'destructive'})
  }
})
</script>

<template>
  <Head>
    <title>Forgot Password</title>
  </Head>

    <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
      Forgot your password? No problem. Just let us know your email address and we will email you a
      password reset link that will allow you to choose a new one.
    </div>

    <div v-if="status" class="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
      {{ status }}
    </div>

  <form @submit="onSubmit">
    <EmailInput field="email"
                label="Email"
                autocomplete="username"
    />

    <div class="inline-flex w-full items-center justify-end gap-3">
      <NuxtLink to="/login">
        <Button type="button" variant="ghost">
          Cancel
        </Button>
      </NuxtLink>

      <Button type="submit">
        Email password reset link
      </Button>
    </div>
  </form>
</template>

<style scoped>

</style>
