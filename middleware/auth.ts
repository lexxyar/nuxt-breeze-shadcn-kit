export default defineNuxtRouteMiddleware(async (to) => {
    const user = useUser();
    if (!user.value) return navigateTo("/login", { replace: true });

    if (user.value.must_verify_email && !user.value.email_verified_at && to.path !== '/verify-email')
        return navigateTo('/verify-email', { replace: true });
});
