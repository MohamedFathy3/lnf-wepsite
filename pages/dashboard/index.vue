<script lang="ts" setup>
definePageMeta({
    middleware: ['auth'],
});

const userStore = useUserStore();
</script>

<template>
    <div>
        <Profile :profile="userStore.user as User" is-profile />
    </div>
</template>
