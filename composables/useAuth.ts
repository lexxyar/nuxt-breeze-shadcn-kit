import axios, {csrf} from "~/lib/axios";

export type User = {
    created_at: string
    email: string
    email_verified_at?: string
    id: string
    must_verify_email: boolean
    name: string
    updated_at?: string
};

export type LoginCredentials = {
    email: string;
    password: string;
};

export type RegisterCredentials = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export type ResetPasswordCredentials = {
    email: string;
    password: string;
    password_confirmation: string;
    token: string;
};

// Value is initialized in: ~/plugins/auth.ts
export const useUser = <T = User>() => {
    return useState<T | undefined | null>("user", () => undefined);
};

export const useAuth = <T = User>() => {
    const router = useRouter();

    const user = useUser<T>();
    const isLoggedIn = computed(() => !!user.value);

    async function refresh() {
        try {
            user.value = await fetchCurrentUser();
        } catch {
            user.value = null;
        }
    }

    // async function login(credentials: LoginCredentials) {
    async function login(form: any) {
        if (isLoggedIn.value) return;

        // await $larafetch("/login", { method: "post", body: credentials });
        // await refresh();

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

    async function register(form: any) {
        // await $larafetch("/register", { method: "post", body: credentials });
        // await refresh();

        try {
            await csrf()
            await axios.post('/register', form.values)
        } catch (error: any) {
            if (error.response.status !== 422) throw error

            form.setErrors(error.response.data.errors)
            throw new Error(error.response.data.message)
        }
    }

    async function resendEmailVerification() {
        const response = await axios.post('/email/verification-notification', {}, {
            baseURL: process.env.NUXT_PUBLIC_BACKEND_URL,
        })
        return response.data.status ?? undefined
        // return await $larafetch<{ status: string }>(
        //     "/email/verification-notification",
        //     {
        //         method: "post",
        //     }
        // );
    }

    async function logout() {
        if (!isLoggedIn.value) return;

        // await $larafetch("/logout", {method: "post"});
        await axios.post('/logout')
        user.value = null;

        // await router.push("/login");
    }

    async function forgotPassword(form: any) {
        // return await $larafetch<{ status: string }>("/forgot-password", {
        //     method: "post",
        //     body: {email},
        // });

        try {
            await csrf()
            const response = await axios.post('/forgot-password', form.values)
            return response.data.status
        } catch (error: any) {
            if (error.response.status !== 422) throw error

            form.setErrors(error.response.data.errors)
            throw new Error(error.response.data.message)
        }
    }

    async function resetPassword(token: string, form: any) {
        // return await $larafetch<{ status: string }>("/reset-password", {
        //     method: "post",
        //     body: credentials,
        // });
        try {
            await csrf()
            const response = await axios.post('/reset-password', {token: token, ...form.values})
            return response.data.status
        } catch (error: any) {
            if (error.response.status !== 422) throw error

            form.setErrors(error.response.data.errors)
            throw new Error(error.response.data.message)
        }
    }

    return {
        user,
        isLoggedIn,
        login,
        register,
        resendEmailVerification,
        logout,
        forgotPassword,
        resetPassword,
        refresh,
    };
};

export const fetchCurrentUser = async <T = User>() => {
    try {
        return await $larafetch<T>("/api/user");
    } catch (error: any) {
        if ([401, 419].includes(error?.response?.status)) return null;
        throw error;
    }
};
