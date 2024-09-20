<script setup lang="ts">

import EmailInput from "~/components/custom/input/EmailInput.vue";
import {Button} from "~/components/ui/button";
import PasswordInput from "~/components/custom/input/PasswordInput.vue";
import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import CheckboxInput from "~/components/custom/checkbox/CheckboxInput.vue";
import {toast} from "~/components/ui/toast";

definePageMeta({
  layout: 'guest',
  middleware: 'guest',
})

const {login} = useAuth()
const status = ref()
const route = useRoute()
status.value = route.query.reset ? atob(route.query.reset) : undefined


const formSchema = toTypedSchema(z.object({
      email: z.string().email(),
      password: z.string().min(6),
      remember: z.boolean().optional(),
    })
)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async () => {
  try {
    await login(form)
    await navigateTo("/dashboard", {replace: true, external: true})
  } catch (error: any) {
    toast({description: error.message})
  }
})
</script>

<template>
  <Head>
    <title>Sign In</title>
  </Head>

  <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
    {{ status }}
  </div>

  <form @submit="onSubmit">
    <EmailInput field="email"
                label="Email"
                autocomplete="username"
    />
    <PasswordInput field="password"
                   label="Password"
                   autocomplete="current-password"
    />

    <div class="inline-flex w-full items-center justify-between">
      <CheckboxInput field="remember"
                     label="Remember me"/>

      <NuxtLink to="/register" class="mb-3">
        <Button type="button" variant="link">
          New here?
        </Button>
      </NuxtLink>
    </div>

    <div class="inline-flex w-full items-center justify-end">
      <NuxtLink to="/forgot-password">
        <Button type="button" variant="link">
          Forgot your password?
        </Button>
      </NuxtLink>
      <Button type="submit">
        Sign In
      </Button>
    </div>
  </form>
</template>

<style scoped>

</style>
