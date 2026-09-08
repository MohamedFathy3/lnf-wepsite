<script lang="ts" setup>
import type { ApiResponse, User } from '~/types';

definePageMeta({
    middleware: ['auth'],
});
const route = useRoute();
const userStore = useUserStore();
const wsaId = ref(Number(route.params.id));

const { data: member, status } = await useApiFetch(`/api/member-network/${wsaId.value}`, {
    lazy: true,
    headers: {
        Authorization: `Bearer ${userStore.token}`,
    },
    transform: (member) => (member as ApiResponse).data as User,
});

useSeoMeta({
    title: (member.value as User)?.name,
});
</script>

<template>
    <div v-if="status !== 'pending'">
        <Profile :profile="member as User" />
    </div>
</template>
