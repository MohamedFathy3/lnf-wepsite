<script lang="ts" setup>
const props = defineProps<{
    member: User;
}>();

const membershipTypes = ref([
    { name: 'Member', value: 'member' },
    { name: 'Founder', value: 'founder' },
    { name: 'Partner', value: 'partner' },
    { name: 'Vendor', value: 'vendor' },
    { name: 'Non Member', value: 'non_member' },
    { name: 'WSA Team', value: 'wsa_team' },
]);
</script>

<template>
    <div v-if="props.member" class="section-bg">
        <div class="container px-12 py-8 text-white flex lg:flex-row flex-col items-center justify-between gap-8">
            <ProfileHeaderMemberDetails :member="props.member" />
            <div class="grid grid-cols-3 items-center lg:flex-row flex-col gap-3">
                <ProfileHeaderStatusBox :value="props.member.wsaId" title="WSA ID" />
                <ProfileHeaderStatusBox
                    :icon="props.member.currentNetworkStatus?.fpp ? 'solar:shield-check-outline' : 'solar:shield-cross-line-duotone'"
                    :mode="props.member.currentNetworkStatus?.fpp ? 'success' : 'danger'"
                    :title="props.member.currentNetworkStatus?.fpp ? 'FPP Active' : 'FPP Inactive'"
                />
                <ProfileHeaderStatusBox
                    :mode="props.member.currentNetworkStatus?.type === 'founder' ? 'warning' : 'common'"
                    :value="membershipTypes.find((_) => _.value === props.member.currentNetworkStatus?.type)?.name"
                    title="Member Type"
                />
            </div>
        </div>
    </div>
</template>
