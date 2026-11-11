<!-- components/ProfileHeader.vue -->
<script lang="ts" setup>
const props = defineProps<{
    member: any;
}>();

const membershipTypeNames: Record<string, string> = {
    member: 'Member',
    founder: 'Founder',
    partner: 'Partner',
    vendor: 'Vendor',
    non_member: 'Non Member',
    wsa_team: 'WSA Team',
    global_partner: 'Global Partner',
    associate: 'Associate',
    global_client: 'Global Client',
    ucn_hq: 'UCN HQ',
    ucn_china: 'UCN China',
};

const normalizedMemberType = computed(() => {
    const type = props.member?.type;
    return typeof type === 'string' ? type.trim().toLowerCase().replace(/[\s-]+/g, '_') : '';
});

const memberTypeName = computed(() => {
    const type = props.member?.type;
    if (typeof type !== 'string' || !type.trim()) return 'Not provided';

    return (
        membershipTypeNames[normalizedMemberType.value] ||
        type.trim().replace(/[_-]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
    );
});

const getTypeMode = (type: string) => {
    switch (type) {
        case 'founder':
            return 'warning';
        case 'member':
            return 'member';
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

const memberTypeMode = computed(() => getTypeMode(normalizedMemberType.value));
</script>

<template>
    <div v-if="props.member" class="profile-header section-bg">
        <div class="profile-header__inner container mx-auto px-4 text-white sm:px-6 lg:px-8">
            <div class="profile-header__content">
                <!-- تفاصيل العضو -->
                <ProfileHeaderMemberDetails :member="props.member" class="w-full lg:w-auto" />

                <!-- Status Boxes -->
                <div class="profile-header__status-wrap">
                    <div class="profile-header__status grid w-full grid-cols-2 gap-4">
                        <!-- FPP Status -->
                        <ProfileHeaderStatusBox
                            :icon="props.member.fpp ? 'solar:shield-check-outline' : 'solar:shield-cross-line-duotone'"
                            :mode="props.member.fpp ? 'success' : 'danger'"
                            :title="`FPP ${props.member.fpp ? 'Active' : 'Inactive'}`"
                            :value="null"
                        />

                        <ProfileHeaderStatusBox
                            :mode="memberTypeMode"
                            :title="'Member Type'"
                            :value="memberTypeName"
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
    min-height: 200px;
    background-color: #1a65a4;
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
    min-height: 200px;
    padding-top: 1rem;
    padding-bottom: 1rem;
}

.profile-header__content {
    display: grid;
    min-height: 176px;
    grid-template-columns: minmax(0, 1.55fr) minmax(300px, 0.8fr);
    align-items: center;
    gap: 1.5rem;
}

.profile-header__status-wrap {
    width: 100%;
    min-width: 0;
    max-width: 280px;
    margin-left: auto;
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
        margin-inline: auto;
    }

    .profile-header__tagline {
        margin-bottom: 0.65rem;
        font-size: 1.5rem;
    }
}
</style>
