import axios, {csrf} from "~/lib/axios";
import type {ComputedRef} from "vue";
import {useAuthStore} from "~/store/auth";

export type User = {
    created_at: string
    email: string
    email_verified_at?: string
    id: string
    must_verify_email: boolean
    name: string
    updated_at?: string
};

// Value is initialized in: ~/plugins/auth.ts
export const useUser = <T = User>() => {
    return useState<T | undefined | null>("user", () => undefined);
}

export const useAuth = <T = User>() => {
    const router = useRouter();

    const user = useUser<T>();
    const isLoggedIn: ComputedRef<boolean> = computed(() => !!user.value)

    const refresh = async () => {
        try {
            user.value = await fetchCurrentUser();
        } catch {
            user.value = null;
        }
    }

    const register = async (form: any) => {
        try {
            await csrf()
            await axios.post('/register', form.values)
            await refresh()
            // await router.push('/dashboard')
        } catch (error: any) {
            if (error.response.status !== 422) throw error

            form.setErrors(error.response.data.errors)
            throw new Error(error.response.data.message)
        }
    }

    const login = async (form: any) => {
        if (isLoggedIn.value) return;

        try {
            await csrf()
            await axios.post('/login', form.values)
            await refresh()
        } catch (error: any) {
            if (error.response.status !== 422) throw error

            form.setErrors(error.response.data.errors)
            throw new Error(error.response.data.message)
        }
    }

    const logout = async () => {
        // if (!isLoggedIn.value) {
        //     console.info('Not Logged In', user.value)
        //     return;
        // }

        try {
            await axios.post('/logout')
            user.value = null;
        } finally {
            window.location.pathname = '/login'
        }
    }

    const forgotPassword = async (form: any) => {
        try {
            await csrf()
            const response = await axios.post('/forgot-password', form.values)
            // setStatus(response.data.status)
        } catch (error: any) {
            if (error.response.status !== 422) throw error

            form.setErrors(error.response.data.errors)
            throw new Error(error.response.data.message)
        }
    }

    const resetPassword = async (token: string, form: any) => {
        try {
            await csrf()
            const response = await axios.post('/reset-password', {token: token, ...form.values})
            await router.push('/login?reset=' + btoa(response.data.status))
        } catch (error: any) {
            if (error.response.status !== 422) throw error

            form.setErrors(error.response.data.errors)
            throw new Error(error.response.data.message)
        }
    }

    const resendEmailVerification = async () => {
        const response = await axios.post('/email/verification-notification')
        // setStatus(response.data.status)
    }

    return {
        user,
        csrf,
        register,
        login,
        logout,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
    }
}

export const fetchCurrentUser = async <T = User>() => {
    // const storageValue = localStorage.getItem('user')
    // const savedUser = storageValue ? JSON.parse(storageValue) : null
    // if (savedUser) {
    //     user.value = savedUser
    // } else {
    //     user.value = await fetchCurrentUser()
    //     if (process.client) {
    //         localStorage.setItem('user', JSON.stringify(user.value))
    //     }
    // }
    try {
        const response = await axios.get('/user')
        console.log('fetchCurrentUser', response.data)
        return response.data
        // .then(res => res.data)
        // .catch(error => {
        //     if (error.response.status !== 409) throw error
        //
        //     router.push('/verify-email')
        // })
    } catch (error: any) {
        // console.log(error)
        if ([401, 419].includes(error?.response?.status)) return null;
        // throw error;
    }
};
