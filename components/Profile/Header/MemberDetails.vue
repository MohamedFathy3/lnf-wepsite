<script lang="ts" setup>
const props = defineProps<{
    member: User;
}>();

function getYearFromDate(dateString: string) {
    // Split the string by comma and space, then get the last part (the year)
    return dateString.split(', ')[1];
}
</script>

<template>
    <div v-if="member" class="flex md:flex-row flex-col gap-8 items-start md:gap-3 h-full whitespace-nowrap">
        <div class="relative bg-white p-3 flex items-center place-content-center rounded-xl md:w-64 w-full min-w-48 h-28 ring-4 !ring-slate-200/10">
            <NuxtImg :alt="props.member.name" :src="props.member.imageUrl" :title="props.member.name" class="object-contain w-full h-full" />
            <NuxtImg
                :alt="props.member.country.name"
                :src="props.member.country.imageUrl"
                :title="props.member.country.name"
                class="object-cover absolute -bottom-4 -left-4 w-16 h-10 rounded-md ring-4 shadow-sm !ring-slate-200/10 hover:scale-105 ease-in-out duration-300"
            />
        </div>
        <div class="flex flex-col gap-2">
            <div class="text-xl font-medium flex items-center gap-3">
                <div>{{ props.member.name }}</div>
                <ProfileMemberType :status="props.member.typeCompany as string" />
            </div>
            <div class="flex items-center text-sm font-light">
                <ApplicationCountry :country="props.member.country" size="sm" />
                <div v-if="props.member.state" class="font-extralight opacity-75">, {{ props.member.state }}</div>
                <div v-if="props.member.city" class="font-extralight opacity-75">, {{ props.member.city }}</div>
            </div>
            <div v-if="props.member.currentNetworkStatus?.startDateFormatted" class="text-sm font-light flex items-center gap-1.5">
                <Icon class="size-5 opacity-75 mr-1.5 shrink-0" name="solar:calendar-outline" />
                <div class="font-extralight opacity-75">Member Since:</div>
                <div>{{ getYearFromDate(props.member.currentNetworkStatus?.startDateFormatted) }}</div>
            </div>
            <div v-if="props.member.currentNetworkStatus?.expireDateFormatted && props.member.currentNetworkStatus?.fpp" class="text-sm font-light flex items-center gap-1.5">
                <Icon class="size-5 opacity-75 mr-1.5 shrink-0" name="solar:calendar-mark-linear" />
                <div class="font-extralight opacity-75">Valid until:</div>
                <div>{{ props.member.currentNetworkStatus?.expireDateFormatted }}</div>
            </div>
        </div>
    </div>
</template>
