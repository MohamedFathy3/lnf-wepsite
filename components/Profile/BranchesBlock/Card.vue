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
        class="group block"
    >
        <div
            class="rounded-2xl border border-slate-200 bg-slate-50/60 p-3.5 text-sm transition duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white hover:shadow-md"
        >
            <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                    <div class="truncate font-semibold capitalize text-slate-800">{{ props.member.name }}</div>
                    <div class="mt-1 flex min-w-0 items-center truncate text-xs text-slate-500">
                        <ApplicationCountry :country="props.member.country" size="xs" />
                        <div v-if="props.member.state" class="font-light">, {{ props.member.state }}</div>
                        <div v-if="props.member.city" class="font-light">, {{ props.member.city }}</div>
                    </div>
                </div>
                <span class="mt-0.5 shrink-0 text-slate-300 transition group-hover:text-primary">
                    <Icon class="size-5" name="solar:arrow-right-up-linear" />
                </span>
            </div>
            <div class="mt-3">
                <ProfileMemberType :status="props.member.typeCompany as string" />
            </div>
        </div>
    </NuxtLink>
</template>
