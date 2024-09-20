<script setup lang="ts">

import {Button} from "~/components/ui/button";
import PasswordInput from "~/components/custom/input/PasswordInput.vue";
import {configure, useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {useProfile} from "~/composables/useProfile";
import {toast} from "~/components/ui/toast";
import {useAuth} from "~/composables/useAuth";

configure({validateOnModelUpdate: false})
const {deleteProfile} = useProfile()

const modal = ref(false)

const formSchema = toTypedSchema(z.object({
  password: z.string().min(6),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = async () => {
  try {
    await deleteProfile(form)
    modal.value = false
    await navigateTo("/login", {replace: true, external: true})
  } catch (e) {
    toast({description: e.message, variant: 'destructive'})
  }
}

const deleteUser = (e: Event) => {
  e.preventDefault()
  form.handleSubmit(onSubmit)()
}

</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Delete Account</CardTitle>
      <CardDescription>Once your account is deleted, all of its resources and data will be permanently deleted.
        Before deleting your account, please download any data or information that you wish to retain.
      </CardDescription>
    </CardHeader>
    <CardContent>

      <Dialog :open="modal">
        <DialogTrigger>
          <Button variant="destructive" @click="modal = true">Delete Account</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
            <DialogDescription>
              Once your account is deleted, all of its resources and data will be permanently deleted. Please
              enter your password to confirm you would like to permanently delete your account.
            </DialogDescription>
          </DialogHeader>

          <PasswordInput field="password"
                         label="Password"
                         autocomplete="password"
          />


          <DialogFooter>
            <div class="flex justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary" @click="modal = false">Cancel</Button>
              </DialogClose>

              <Button type="submit"
                      variant="destructive"
                      class="ms-3"
                      @click="deleteUser"
              >
                Delete Account
              </Button>
            </div>
          </DialogFooter>

        </DialogContent>
      </Dialog>

    </CardContent>
  </Card>
</template>

<style scoped>

</style>
