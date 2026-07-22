<!-- components/ProfileHeader.vue -->
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

// تحديد الـ mode حسب الـ type
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

// جلب اسم الـ type
const getTypeName = (type: string) => {
    return membershipTypes.value.find((t) => t.value === type)?.name || type;
};
</script>

<template>
    <div v-if="props.member" class="section-bg">
        <div class="container px-12 py-8 text-white flex lg:flex-row flex-col items-center justify-between gap-8">
            <!-- تفاصيل العضو -->
            <ProfileHeaderMemberDetails :member="props.member" />
            
            <!-- Status Boxes -->
            <div class="grid grid-cols-3 items-center lg:flex-row flex-col gap-3">
                <!-- FPP Status -->
                <ProfileHeaderStatusBox 
                    :icon="props.member.currentNetworkStatus?.fpp ? 'solar:shield-check-outline' : 'solar:shield-cross-line-duotone'"
                    :mode="props.member.currentNetworkStatus?.fpp ? 'success' : 'danger'"
                    :title="props.member.currentNetworkStatus?.fpp ? 'FPP Active' : 'FPP Inactive'"
                />
                
                <!-- Member Type -->
                <ProfileHeaderStatusBox 
                    :mode="getTypeMode(props.member.currentNetworkStatus?.type || props.member.type)"
                    :value="getTypeName(props.member.currentNetworkStatus?.type || props.member.type)"
                    title="Member Type"
                />

                <!-- Status -->
                <ProfileHeaderStatusBox 
                    :mode="props.member.status === 'approved' ? 'success' : props.member.status === 'suspended' ? 'danger' : props.member.status === 'blacklisted' ? 'danger' : 'warning'"
                    :value="props.member.status"
                    title="Status"
                />
            </div>
        </div>
    </div>
</template>