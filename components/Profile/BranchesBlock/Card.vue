<script lang="ts" setup>
const props = defineProps<{
    member: User;
}>();

const userStore = useUserStore();
</script>

<template>
    <NuxtLink
        v-if="props.member.wsaId !== (userStore.user as User).wsaId"
        :href="props.member.wsaId === (userStore.user as User).wsaId ? '/dashboard' : '/member/' + props.member.wsaId"
        class="intro-x"
    >
        <div class="hover:scale-105 p-3 bg-white rounded-2xl border text-sm transition-all">
            <div class="relative">
                <div>
                    <div class="flex items-center gap-3 justify-between">
                        <div class="capitalize">{{ props.member.name }}</div>
                        <ProfileMemberType :status="props.member.typeCompany as string" />
                    </div>
                    <div class="flex items-center truncate text-xs mt-0.5">
                        <ApplicationCountry :country="props.member.country" size="xs" />
                        <div v-if="props.member.state" class="font-light">, {{ props.member.state }}</div>
                        <div v-if="props.member.city" class="font-light">, {{ props.member.city }}</div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>
