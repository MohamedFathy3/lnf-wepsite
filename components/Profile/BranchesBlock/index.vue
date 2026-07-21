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
    <div v-if="props.members && props.members.length">
        <div class="flex items-center gap-3">
            <Icon class="size-6 opacity-65" name="solar:globus-outline" />
            <div>Branches</div>
        </div>
        <div class="mt-3 flex flex-col gap-3">
            <template v-for="member in props.members" :key="member.id">
                <ProfileBranchesBlockCard v-if="shouldDisplayMember(route.fullPath, member, userStore.user as User)" :member="member" />
            </template>
        </div>
    </div>
</template>
