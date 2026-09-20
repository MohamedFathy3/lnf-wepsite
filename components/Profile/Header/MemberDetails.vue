<script lang="ts" setup>
const props = defineProps<{
    member: any;
}>();

const memberType = computed(() => {
    return (props.member.type_company || props.member.typeCompany || 'branch') as string;
});

function getYearFromDate(dateString: string) {
    if (!dateString) return '';
    return dateString.split(', ')[1] || dateString;
}

const displayImage = computed(() => {
    if (props.member.imageUrl && !props.member.imageUrl.includes('default-logo.png')) {
        return props.member.imageUrl;
    }
    return '/images/default-company-logo.png';
});

const contactPerson = computed(() => {
    if (props.member.contactPersonNetwork && props.member.contactPersonNetwork.length > 0) {
        return props.member.contactPersonNetwork[0];
    }
    return null;
});
</script>

<template>
    <div v-if="member" class="profile-member-details flex min-w-0 items-center gap-3 sm:gap-5">
        <!-- Logo -->
        <div
            class="profile-member-logo relative flex h-20 w-32 shrink-0 items-center justify-center rounded-xl border border-white/30 bg-white p-2.5 shadow-xl shadow-slate-950/10 sm:h-32 sm:w-56 sm:p-4"
        >
            <NuxtImg
                :alt="member.name"
                :src="displayImage"
                :title="member.name"
                class="h-full w-full object-contain"
                loading="lazy"
            />
            <NuxtImg
                v-if="member.country?.imageUrl"
                :alt="member.country.name"
                :src="member.country.imageUrl"
                :title="member.country.name"
                class="absolute -bottom-3 -left-2 h-8 w-12 rounded-md object-cover shadow-lg ring-2 ring-white/70 transition duration-300 hover:scale-105 sm:-bottom-4 sm:-left-3 sm:h-10 sm:w-16"
                loading="lazy"
            />
        </div>

        <!-- معلومات الشركة -->
        <div class="min-w-0 space-y-1 sm:space-y-1.5">
            <!-- الاسم -->
            <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <div class="break-words text-base font-semibold leading-tight sm:text-lg lg:text-xl">
                    {{ member.name }}
                </div>
            </div>

            <!-- الموقع -->
            <div class="flex flex-wrap items-center gap-1.5 text-xs text-white/90 sm:text-sm">
                <ProfileMemberType :status="memberType" />
                <ApplicationCountry :country="member.country" size="sm" />
                <div v-if="member.city" class="font-light">, {{ member.city }}</div>
            </div>

            <!-- معلومات التواصل -->
            <div class="flex flex-col gap-1 text-xs text-white/85 sm:text-sm">
                <div v-if="contactPerson" class="flex items-center gap-1.5 min-w-0">
                    <Icon class="size-4 shrink-0 text-white" name="solar:user-outline" />
                    <span class="font-medium text-white truncate">{{ contactPerson.name }}</span>
                </div>

                <div v-if="contactPerson?.email && contactPerson.email.includes('@')" class="flex items-center gap-1.5 min-w-0">
                    <Icon class="size-4 shrink-0 text-white" name="solar:letter-outline" />
                    <a :href="'mailto:' + contactPerson.email" class="font-medium text-white hover:underline truncate">
                        {{ contactPerson.email }}
                    </a>
                </div>

                <div v-if="contactPerson?.phone" class="flex items-center gap-1.5 min-w-0">
                    <Icon class="size-4 shrink-0 text-white" name="solar:phone-outline" />
                    <a :href="'tel:' + contactPerson.phone.replace(/[^0-9+]/g, '')" class="font-medium text-white hover:underline truncate">
                        {{ contactPerson.phone }}
                    </a>
                </div>

                <div v-if="member.website" class="flex items-center gap-1.5 min-w-0">
                    <Icon class="size-3.5 shrink-0 text-cyan-100 sm:size-4" name="solar:globe-outline" />
                    <a :href="member.website" target="_blank" class="font-medium text-white hover:underline">
                        Website
                    </a>
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

.profile-member-details :deep(.rounded-full) {
    display: inline-grid;
    width: 28px;
    height: 28px;
    flex: 0 0 28px;
    place-items: center;
    padding: 0;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 800;
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