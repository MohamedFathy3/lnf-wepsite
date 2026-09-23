<!-- components/ProfileHeader.vue -->
<script lang="ts" setup>
const props = defineProps<{
    member: any;
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
    <div v-if="props.member" class="profile-header section-bg">
        <div class="profile-header__inner container mx-auto px-8 text-white sm:px-6 lg:px-8">
            <div class="profile-header__content">
                <!-- تفاصيل العضو -->
                <ProfileHeaderMemberDetails :member="props.member" class="w-full lg:w-auto" />

                <!-- Status Boxes -->
                <div class="profile-header__status-wrap">
                    <div class="profile-header__status grid w-full grid-cols-2 gap-2 sm:w-auto sm:min-w-[360px] sm:gap-3">
                        <!-- FPP Status -->
                        <ProfileHeaderStatusBox
                            :icon="props.member.fpp ? 'solar:shield-check-outline' : 'solar:shield-cross-line-duotone'"
                            :mode="props.member.fpp ? 'success' : 'danger'"
                            :title="props.member.fpp ? 'FPP' : 'FPP'"
                            :value="props.member.fpp ? 'Active' : 'Inactive'"
                        />

                        <!-- Network -->
                        <ProfileHeaderStatusBox
                            v-if="props.member.user"
                            icon=""
                            :image="props.member.user.imageUrl"
                            :value="props.member.currentNetworkStatus?.name || props.member.user.name"
                            mode="common"
                            title="Network"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.profile-header {
    position: relative;
    isolation: isolate;
    min-height: 270px;
    background-color: #51a2e8;
    background-image: url('/bringing-freight-forwarding-networks-together-worldwide-2-02e214a9-c3e4-4290-bcd5-974d85d6ed75.jpg');
    background-position: center;
    background-size: cover;
}

.profile-header::before {
    position: absolute;
    z-index: 0;
    inset: 0;
    background: rgba(26, 100, 164, 0.3);
    backdrop-filter: blur(2px);
    content: '';
}

.profile-header__inner {
    position: relative;
    z-index: 1;
    min-height: 270px;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
}

.profile-header__content {
    display: grid;
    min-height: 222px;
    grid-template-columns: minmax(0, 1.55fr) minmax(360px, 0.8fr);
    align-items: center;
    gap: 1.5rem;
}

.profile-header__status-wrap {
    width: 100%;
    min-width: 360px;
}

.profile-header__tagline {
    width: 100%;
    margin-bottom: 0.5rem;
    color: rgb(255 255 255 / 90%);
    font-family: 'Dancing Script', cursive;
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 1.1;
    text-align: center;
    white-space: nowrap;
}

@media (max-width: 1100px) {
    .profile-header__content {
        grid-template-columns: minmax(0, 1fr) minmax(300px, 0.9fr);
    }

    .profile-header__status {
        grid-column: 1 / -1;
        justify-self: end;
    }

    .profile-header__status-wrap {
        grid-column: 1 / -1;
        justify-self: end;
    }
}

@media (max-width: 680px) {
    .profile-header,
    .profile-header__inner {
        min-height: 0;
    }

    .profile-header__inner {
        padding-top: 1.25rem;
        padding-bottom: 1.25rem;
    }

    .profile-header__content {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .profile-header__status {
        grid-column: auto;
        justify-self: stretch;
        min-width: 0;
    }

    .profile-header__status-wrap {
        min-width: 0;
    }

    .profile-header__tagline {
        margin-bottom: 0.65rem;
        font-size: 1.5rem;
    }
}
</style>
