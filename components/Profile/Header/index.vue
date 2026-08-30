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

const getTypeMode = (type: string) => {
    switch (type) {
        case 'founder':
            return 'warning';
        case 'member':
            return 'primary';
        case 'vendor':
            return 'success';
        case 'partner':
            return 'common';
        case 'wsa_team':
            return 'primary';
        case 'non_member':
            return 'danger';
        default:
            return 'common';
    }
};

const getTypeName = (type: string) => {
    return membershipTypes.value.find((t) => t.value === type)?.name || type;
};
</script>

<template>
    <div v-if="props.member" class="relative isolate overflow-hidden bg-gradient-to-br from-primary via-[#1d70ad] to-[#0e477c] text-white">
        <div class="pointer-events-none absolute -right-24 -top-32 size-80 rounded-full border-[36px] border-white/5" />
        <div class="pointer-events-none absolute -bottom-48 left-1/3 size-96 rounded-full bg-cyan-300/10 blur-3xl" />

        <div class="container relative z-10 flex flex-col gap-7 px-3 py-6 sm:px-6 lg:px-12 lg:py-8 xl:flex-row xl:items-center xl:justify-between">
            <ProfileHeaderMemberDetails :member="props.member" />

            <div class="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 xl:w-auto xl:min-w-[510px]">
                <ProfileHeaderStatusBox
                    :icon="props.member.currentNetworkStatus?.fpp ? 'solar:shield-check-outline' : 'solar:shield-cross-line-duotone'"
                    :mode="props.member.currentNetworkStatus?.fpp ? 'success' : 'danger'"
                    :title="props.member.currentNetworkStatus?.fpp ? 'FPP Active' : 'FPP Inactive'"
                />

                <ProfileHeaderStatusBox
                    :mode="getTypeMode(props.member.currentNetworkStatus?.type || props.member.type)"
                    :value="getTypeName(props.member.currentNetworkStatus?.type || props.member.type)"
                    title="Member Type"
                />

                <ProfileHeaderStatusBox
                    :mode="
                        props.member.status === 'approved'
                            ? 'success'
                            : props.member.status === 'suspended'
                              ? 'danger'
                              : props.member.status === 'blacklisted'
                                ? 'danger'
                                : 'warning'
                    "
                    :value="props.member.status"
                    title="Status"
                />
            </div>
        </div>
    </div>
</template>
