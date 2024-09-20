import axios, {csrf} from "@/lib/axios";

export const useProfile = () => {
    const updateProfileInfo = async (form: any) => {
        try {
            await csrf()
            const response = await axios.put('/profile', form.values)
            return response.data.status
        } catch (error: any) {
            if (error.response.status !== 422) throw error

            form.setErrors(error.response.data.errors)
            throw new Error(error.response.data.message)
        }
    }
    const updatePassword = async (form: any) => {
        try {
            await csrf()
            const response = await axios.put('/password', form.values)
            return response.data.status
        } catch (error: any) {
            if (error.response.status !== 422) throw error

            form.setErrors(error.response.data.errors)
            throw new Error(error.response.data.message)
        }
    }
    const deleteProfile = async (form: any) => {
        try {
            await csrf()
            await axios.delete('/profile', {data: {password: form.values['password']}})
        } catch (error: any) {
            if (error.response.status !== 422) throw error

            form.setErrors(error.response.data.errors)
            throw new Error(error.response.data.message)
        }
    }
    return {
        updateProfileInfo,
        updatePassword,
        deleteProfile,
    }
}
