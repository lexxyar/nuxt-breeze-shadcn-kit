import axios, {csrf} from '@/lib/axios'

declare type TAuthMiddleware = 'guest' | 'auth'

interface IUseAuth {
    middleware: TAuthMiddleware
    redirectIfAuthenticated?: string | undefined
}

export interface IUser {
    id?: number
    name?: string
    email?: string
    email_verified_at?: string
    must_verify_email?: boolean
    created_at?: string
    updated_at?: string
}

export const useAuth = ({
                            middleware,
                            redirectIfAuthenticated
                        }: IUseAuth) => {
    const router = useRouter()

    // const {data: user, error, mutate} = useSWR<IUser>('/api/user', () =>
    //     axios
    //         .get('/api/user')
    //         .then(res => res.data)
    //         .catch(error => {
    //             if (error.response.status !== 409) throw error
    //
    //             router.push('/verify-email')
    //         })
    // )


    const register = async (form: any) => {
        try {
            await csrf()
            await axios.post('/register', form.values)
            // await mutate()
            await router.push('/dashboard')
        } catch (error: any) {
            if (error.response.status !== 422) throw error

            form.setErrors(error.response.data.errors)
            throw new Error(error.response.data.message)
        }
    }

    const login = async (form: any) => {
        try {
            await csrf()
            await axios.post('/login', form.values)
            // await mutate()
        } catch (error: any) {
            if (error.response.status !== 422) throw error

            form.setErrors(error.response.data.errors)
            throw new Error(error.response.data.message)
        }
    }

    const logout = async () => {
        try {
            // if (!error) {
            await axios.post('/logout')
            // await mutate()
            // }
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

    watchEffect(()=>{
        //     if (middleware === 'guest' && redirectIfAuthenticated && user) {
        //         router.push(redirectIfAuthenticated)
        //     }
        //     if (
        //         window.location.pathname === '/verify-email' &&
        //         (user as IUser)?.email_verified_at
        //     ) {
        //         if (redirectIfAuthenticated) {
        //             router.push(redirectIfAuthenticated)
        //         }
        //     }
        //     if (
        //         middleware === 'auth' &&
        //         process.env.NUXT_PUBLIC_MUST_VERIFY_EMAIL &&
        //         window.location.pathname !== '/verify-email' &&
        //         !!user &&
        //         !(<IUser>user).email_verified_at) {
        //
        //         router.push('/verify-email')
        //     }
        //     if (middleware === 'auth' && error) logout()
    })

    // useEffect(() => {
    //     if (middleware === 'guest' && redirectIfAuthenticated && user) {
    //         router.push(redirectIfAuthenticated)
    //     }
    //     if (
    //         window.location.pathname === '/verify-email' &&
    //         (user as IUser)?.email_verified_at
    //     ) {
    //         if (redirectIfAuthenticated) {
    //             router.push(redirectIfAuthenticated)
    //         }
    //     }
    //     if (
    //         middleware === 'auth' &&
    //         process.env.NUXT_PUBLIC_MUST_VERIFY_EMAIL &&
    //         window.location.pathname !== '/verify-email' &&
    //         !!user &&
    //         !(<IUser>user).email_verified_at) {
    //
    //         router.push('/verify-email')
    //     }
    //     if (middleware === 'auth' && error) logout()
    // }, [user, error, middleware, router, redirectIfAuthenticated])

    return {
        // user,
        // csrf,
        // register,
        // login,
        // logout,
        // forgotPassword,
        // resetPassword,
        // resendEmailVerification,
    }
}
