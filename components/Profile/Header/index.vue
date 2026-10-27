<!-- components/ProfileHeader.vue -->
<script lang="ts" setup>
const props = defineProps<{
    member: any;
}>();

const activeNetworkLogo = computed(() => {
    const networks = props.member.users || [];
    if (networks.length > 1) return null;

    const network = networks[0] || (props.member.user?.active ? props.member.user : null);
    if (network && !network.active) return null;
    return network?.imageUrl || null;
});

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
        <div class="profile-header__inner container mx-auto px-4 text-white sm:px-6 lg:px-8">
            <div class="profile-header__content">
                <!-- تفاصيل العضو -->
                <ProfileHeaderMemberDetails :member="props.member" class="w-full lg:w-auto" />

                <!-- Status Boxes -->
                <div class="profile-header__status-wrap">
                    <div
                        class="profile-header__status grid w-full gap-2 sm:w-auto sm:min-w-[300px] sm:gap-3"
                        :class="activeNetworkLogo ? 'grid-cols-2' : 'grid-cols-1'"
                    >
                        <!-- FPP Status -->
                        <div
                            v-if="activeNetworkLogo"
                            class="flex min-h-32 items-center justify-center rounded-2xl border border-white/30 bg-white p-3 shadow-xl shadow-slate-950/10 ring-4 ring-slate-200/10"
                        >
                            <NuxtImg
                                alt="Network logo"
                                :src="activeNetworkLogo"
                                class="size-16 rounded-lg object-contain"
                                loading="lazy"
                            />
                        </div>
                        <ProfileHeaderStatusBox
                            :icon="props.member.fpp ? 'solar:shield-check-outline' : 'solar:shield-cross-line-duotone'"
                            :mode="props.member.fpp ? 'success' : 'danger'"
                            :title="props.member.fpp ? 'FPP' : 'FPP'"
                            :value="props.member.fpp ? 'Active' : 'Inactive'"
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
    min-width: 300px;
    max-width: 420px;
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
        min-width: 0;
        margin-right: auto;
    }

    .profile-header__tagline {
        margin-bottom: 0.65rem;
        font-size: 1.5rem;
    }
}
</style>
