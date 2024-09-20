import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const setServerValidationErrors = (error: any, form: UseFormReturn<any>) => {
  toast.error(error.response?.data?.message as string)
  let focusField: string = ''
  if (error.response) {
    Object.keys(error.response.data.errors).map((field: string) => {
      if (error.response) {
        const message: string = error.response.data.errors[field][0]
        form.setError((field as any), {type: 'server', message})
      }
      if (!focusField) focusField = field
    })
  }
  form.setFocus(focusField as any)
}
