<script lang="ts" setup>
import type { User } from '~/types';

const props = defineProps<{
    member: any;
}>();

const userStore = useUserStore();

// نوع الشركة
const memberType = computed(() => {
    return (props.member.type_company || props.member.typeCompany || 'branch') as string;
});

// نجيب الـ contact person
const contactPerson = computed(() => {
    if (props.member.contactPersonNetwork && props.member.contactPersonNetwork.length > 0) {
        return props.member.contactPersonNetwork[0];
    }
    return null;
});

// نتأكد أن المستخدم الحالي مش هو صاحب الشركة
const isNotCurrentUser = computed(() => {
    const currentUserId = userStore.user?.id || (userStore.user as User & { user_id?: number })?.user_id;
    const isHeadquarters = props.member.type_company === 'hq' || props.member.typeCompany === 'hq';
    return isHeadquarters || props.member.user_id !== currentUserId;
});

// الرابط
const memberLink = computed(() => {
    return `/member/${props.member.id}`;
});
</script>

<template>
    <NuxtLink
        v-if="isNotCurrentUser"
        :href="memberLink"
        class="intro-x"
    >
        <div class="hover:scale-105 p-3 bg-white rounded-2xl border text-sm transition-all duration-300 hover:shadow-md hover:border-primary/30">
            <div class="relative">
                <div>
                    <div class="flex items-center gap-3 justify-between">
                        <div class="capitalize font-semibold text-slate-800 truncate">{{ props.member.name }}</div>
                        <ProfileMemberType :status="memberType" />
                    </div>
                    <div class="flex items-center truncate text-xs mt-0.5 text-slate-500">
                        <ApplicationCountry :country="props.member.country" size="xs" />
                        <div v-if="props.member.city" class="font-light">, {{ props.member.city }}</div>
                    </div>
                    <!-- اسم المسؤول (إضافة حلوة) -->
                    <div v-if="contactPerson?.name" class="text-xs text-slate-400 mt-1">
                        <span class="font-medium">Contact:</span> {{ contactPerson.name }}
                    </div>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>