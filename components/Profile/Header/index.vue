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

const getTypeMode = (type: string) => {
    switch (type) {
        case 'founder': return 'warning';
        case 'member': return 'primary';
        case 'vendor': return 'success';
        case 'partner': return 'common';
        case 'wsa_team': return 'primary';
        case 'non_member': return 'danger';
        default: return 'common';
    }
};

const getTypeName = (type: string) => {
    return membershipTypes.value.find((t) => t.value === type)?.name || type;
};
</script>

<template>
    <div v-if="props.member" class="section-bg">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-white">
            <!-- ✅ كل حاجة في المنتصف -->
            <div class="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">

                <!-- تفاصيل العضو -->
                <ProfileHeaderMemberDetails :member="props.member" class="w-full lg:w-auto" />

                <!-- Status Boxes -->
                <div class="grid grid-cols-3 gap-2 sm:gap-3 w-full sm:w-auto sm:min-w-[420px]">
                    <!-- FPP Status -->
                    <ProfileHeaderStatusBox
                        :icon="props.member.fpp ? 'solar:shield-check-outline' : 'solar:shield-cross-line-duotone'"
                        :mode="props.member.fpp ? 'success' : 'danger'"
                        :title="props.member.fpp ? 'FPP' : 'FPP'"
                        :value="props.member.fpp ? 'Active' : 'Inactive'"
                    />

                    <!-- Status -->
                    <ProfileHeaderStatusBox
                        :mode="props.member.status === 'approved' ? 'success' : props.member.status === 'suspended' ? 'danger' : props.member.status === 'blacklisted' ? 'danger' : 'warning'"
                        :value="props.member.status"
                        title="Status"
                    />

                    <!-- Network -->
                    <ProfileHeaderStatusBox
                        v-if="props.member.user"
                        :image="props.member.user.imageUrl"
                        :value="props.member.user.name"
                        mode="common"
                        title="Network"
                    />
                </div>
            </div>
        </div>
    </div>
</template>