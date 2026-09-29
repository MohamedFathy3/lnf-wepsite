<script lang="ts" setup>
const props = defineProps<{
    member: any;
}>();

const memberType = computed(() => {
    return (props.member.type_company || props.member.typeCompany || 'branch') as string;
});

function getYearFromDate(dateString: string) {
    if (!dateString) return '';
    return dateString.match(/\b\d{4}\b/)?.[0] || dateString;
}

const hasCompanyLogo = computed(() => {
    const imageUrl = props.member.imageUrl;
    return typeof imageUrl === 'string' && imageUrl.length > 0 && !imageUrl.toLowerCase().includes('default-logo.png');
});

const memberSince = computed(() => {
    const status = props.member.currentNetworkStatus;
    const contact = props.member.contactPersonNetwork?.[0];
    return getYearFromDate(
        status?.startDateFormatted ||
            status?.createdSince ||
            status?.createdAtFormatted ||
            props.member.createdAt ||
            props.member.created_at ||
            contact?.createdAt ||
            contact?.memberNetwork?.created_at ||
            '',
    );
});

const validUntil = computed(() => {
    const status = props.member.currentNetworkStatus;
    return (
        status?.expireDateFormatted ||
        status?.expireDate ||
        props.member.expireDateFormatted ||
        props.member.expireDate ||
        props.member.expire_date ||
        props.member.validUntil ||
        props.member.valid_until ||
        'Not available'
    );
});
</script>

<template>
    <div v-if="member" class="profile-member-details flex min-w-0 items-center gap-3">
        <!-- Logo -->
        <div
            class="profile-member-logo relative flex h-20 w-32 shrink-0 items-center justify-center rounded-xl border border-white/30 bg-white p-2.5 shadow-xl shadow-slate-950/10 sm:h-32 sm:w-72 sm:p-4"
        >
            <NuxtImg
                v-if="hasCompanyLogo"
                :alt="member.name"
                :src="member.imageUrl"
                :title="member.name"
                class="h-full w-full object-contain"
                loading="lazy"
            />
            <img v-else :alt="member.name" :src="'/logofack.png'" :title="member.name" class="h-full w-full object-contain" />
            <NuxtImg
                v-if="member.country?.imageUrl"
                :alt="member.country.name"
                :src="member.country.imageUrl"
                :title="member.country.name"
                class="absolute -bottom-3 -left-2 h-8 w-12 rounded-md object-cover shadow-lg ring-2 ring-white/70 transition duration-300 hover:scale-105 sm:-bottom-4 sm:-left-3 sm:h-12 sm:w-20"
                loading="lazy"
            />
        </div>

        <!-- معلومات الشركة -->
        <div class="min-w-0 flex-1 space-y-1.5 sm:space-y-2">
            <!-- الاسم -->
            <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <div class="break-words text-base font-bold leading-tight sm:text-lg lg:text-xl">
                    {{ member.name }}
                </div>
                <ProfileMemberType :status="memberType" />
            </div>

            <!-- الموقع -->
            <div class="flex flex-wrap items-center gap-1.5 text-xs text-white/90 sm:text-sm">
                <ApplicationCountry :country="member.country" size="sm" />
                <div v-if="member.city" class="font-light">, {{ member.city }}</div>
            </div>

            <div class="flex flex-col gap-1 text-xs text-white/80 sm:text-sm">
                <div v-if="memberSince" class="flex flex-wrap items-center gap-x-2">
                    <Icon class="size-4 shrink-0 text-white/80 sm:size-5" name="solar:calendar-date-outline" />
                    <span>Member Since:</span>
                    <span class="break-words font-medium text-white">{{ memberSince }}</span>
                </div>
                
            </div>
        </div>
    </div>
</template>

<style scoped>
.profile-member-details :deep(.profile-member-logo) {
    min-height: 128px;
}

.profile-member-details :deep(.profile-member-logo > img) {
    max-height: 100%;
}

@media (max-width: 680px) {
    .profile-member-details {
        align-items: flex-start;
    }

    .profile-member-details :deep(.profile-member-logo) {
        min-height: 96px;
    }
}
</style>