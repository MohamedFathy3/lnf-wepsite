<script lang="ts" setup>
const props = defineProps<{
    members: User[];
}>();

const route = useRoute();
const userStore = useUserStore();

function shouldDisplayMember(path: string, member: User, user: User): boolean {
    if (path === '/dashboard') {
        return member.wsaId !== user.wsaId;
    }
    return true;
}
</script>

<template>
    <div v-if="props.members && props.members.length" class="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.45)]">
        <div class="flex items-center gap-3">
            <span class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon class="size-5" name="solar:globus-outline" />
            </span>
            <div>
                <div class="text-sm font-semibold text-slate-800">Branches</div>
                <div class="text-xs text-slate-400">Other offices in the network</div>
            </div>
            <span class="ml-auto rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">{{ props.members.length }}</span>
        </div>
        <div class="mt-4 flex flex-col gap-3">
            <template v-for="member in props.members" :key="member.id">
                <ProfileBranchesBlockCard v-if="shouldDisplayMember(route.fullPath, member, userStore.user as User)" :member="member" />
            </template>
        </div>
    </div>
</template>
