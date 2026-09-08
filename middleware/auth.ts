export default defineNuxtRouteMiddleware(async (to, from) => {
    if (import.meta.server) {
        return;
    }

    const userStore = useUserStore();
    if (!userStore.token) {
        return navigateTo('/login');
    }

    const isValid = await userStore.fetchAuthUser();
    if (!isValid) {
        return navigateTo('/login');
    }
});
