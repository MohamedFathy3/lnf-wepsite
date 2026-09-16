<script lang="ts" setup>
import type { User } from '~/types';

const props = defineProps<{
    member: any;
}>();

const userStore = useUserStore();

// نوع الشركة
const memberType = computed(() => {
    return (props.member?.type_company || props.member?.typeCompany || 'branch') as string;
});

// نجيب الـ contact person (بحماية ضد undefined)
const contactPerson = computed(() => {
    if (Array.isArray(props.member?.contactPersonNetwork) && props.member.contactPersonNetwork.length > 0) {
        return props.member.contactPersonNetwork[0];
    }
    return null;
});

// نتأكد أن المستخدم الحالي مش هو صاحب الشركة
const isNotCurrentUser = computed(() => {
    if (!props.member) return false;
    const currentUserId = userStore.user?.id || (userStore.user as User & { user_id?: number })?.user_id;
    const isHeadquarters = props.member.type_company === 'hq' || props.member.typeCompany === 'hq';
    return isHeadquarters || props.member.user_id !== currentUserId;
});

// الرابط
const memberLink = computed(() => {
    return `/member/${props.member?.id}`;
});
</script>

<template>
    <NuxtLink v-if="isNotCurrentUser" :href="memberLink" class="intro-x block w-full">
        <div class="hover:scale-[1.02] p-3 bg-white rounded-2xl border text-sm transition-all duration-300 hover:shadow-md hover:border-primary/30">
            <div class="relative">
                <div>
                    <!-- ✅ الاسم + البادج: يلفوا على بعض في الشاشات الصغيرة -->
                    <div class="flex items-start sm:items-center gap-2 sm:gap-3 sm:justify-between flex-wrap">
                        <div class="capitalize font-semibold text-slate-800 truncate max-w-full sm:max-w-[60%]">
                            {{ props.member?.name }}
                        </div>
                        <ProfileMemberType :status="memberType" class="shrink-0" />
                    </div>

                    <!-- ✅ الدولة + المدينة -->
                    <div class="flex items-center text-xs mt-1 text-slate-500 flex-wrap gap-x-1">
                        <ApplicationCountry :country="props.member?.country" size="xs" />
                        <div v-if="props.member?.city" class="font-light truncate max-w-full">
                            , {{ props.member.city }}
                        </div>
                    </div>

                    <!-- اسم المسؤول -->
                    <div v-if="contactPerson?.name" class="text-xs text-slate-400 mt-1 truncate">
                        <span class="font-medium">Contact:</span> {{ contactPerson.name }}
                    </div>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>