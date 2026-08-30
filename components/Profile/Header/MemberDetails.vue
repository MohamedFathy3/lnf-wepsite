<script lang="ts" setup>
const props = defineProps<{
    member: User;
}>();

function getYearFromDate(dateString: string) {
    return dateString.split(', ')[1];
}
</script>

<template>
    <div v-if="member" class="flex min-w-0 flex-1 items-center gap-4 sm:gap-5">
        <div
            class="relative flex h-20 w-24 shrink-0 items-center justify-center rounded-2xl border border-white/30 bg-white p-2.5 shadow-xl shadow-slate-950/10 sm:h-28 sm:w-52 sm:p-3"
        >
            <NuxtImg :alt="props.member.name" :src="props.member.imageUrl" :title="props.member.name" class="h-full w-full object-contain" />
            <NuxtImg
                :alt="props.member.country.name"
                :src="props.member.country.imageUrl"
                :title="props.member.country.name"
                class="absolute -bottom-3 -left-2 h-8 w-12 rounded-md object-cover shadow-lg ring-2 ring-white/70 transition duration-300 hover:scale-105 sm:-bottom-4 sm:-left-3 sm:h-10 sm:w-16"
            />
        </div>

        <div class="min-w-0 space-y-2">
            <div class="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-100/80">Member profile</div>
            <div class="flex flex-wrap items-center gap-2 sm:gap-3">
                <div class="break-words text-lg font-semibold leading-tight sm:text-2xl">{{ props.member.name }}</div>
                <ProfileMemberType :status="props.member.typeCompany as string" />
            </div>
            <div class="flex flex-wrap items-center text-xs text-white/80 sm:text-sm">
                <ApplicationCountry :country="props.member.country" size="sm" />
                <div v-if="props.member.state" class="font-light">, {{ props.member.state }}</div>
                <div v-if="props.member.city" class="font-light">, {{ props.member.city }}</div>
            </div>
            <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/75 sm:text-sm">
                <div v-if="props.member.currentNetworkStatus?.startDateFormatted" class="flex items-center gap-1.5">
                    <Icon class="size-4 shrink-0 text-cyan-100" name="solar:calendar-outline" />
                    <span class="text-white/60">Member since</span>
                    <span class="font-medium text-white">{{ getYearFromDate(props.member.currentNetworkStatus?.startDateFormatted) }}</span>
                </div>
                <div v-if="props.member.currentNetworkStatus?.expireDateFormatted && props.member.currentNetworkStatus?.fpp" class="flex items-center gap-1.5">
                    <Icon class="size-4 shrink-0 text-cyan-100" name="solar:calendar-mark-linear" />
                    <span class="text-white/60">Valid until</span>
                    <span class="font-medium text-white">{{ props.member.currentNetworkStatus?.expireDateFormatted }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
