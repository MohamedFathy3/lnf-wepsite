<script lang="ts" setup>
const props = defineProps<{
    member: any; // هتعدلها لنوع مناسب بعدين
}>();

// نجيب نوع الشركة (branch او hq)
const memberType = computed(() => {
    return (props.member.type_company || props.member.typeCompany || 'branch') as string;
});

// نجيب السنة من التاريخ
function getYearFromDate(dateString: string) {
    if (!dateString) return '';
    return dateString.split(', ')[1] || dateString;
}

// نحدد الصورة اللي نعرضها
const displayImage = computed(() => {
    // لو في صورة حقيقية استخدمها
    if (props.member.imageUrl && !props.member.imageUrl.includes('default-logo.png')) {
        return props.member.imageUrl;
    }
    // غير كده استخدم صورة افتراضية
    return '/images/default-company-logo.png';
});

// نجيب الـ contact person لو موجود
const contactPerson = computed(() => {
    if (props.member.contactPersonNetwork && props.member.contactPersonNetwork.length > 0) {
        return props.member.contactPersonNetwork[0];
    }
    return null;
});
</script>

<template>
    <div v-if="member" class="flex min-w-0 flex-1 items-center gap-4 sm:gap-5">
        <!-- Logo -->
        <div
            class="relative flex h-20 w-24 shrink-0 items-center justify-center rounded-2xl border border-white/30 bg-white p-2.5 shadow-xl shadow-slate-950/10 sm:h-28 sm:w-52 sm:p-3"
        >
            <NuxtImg 
                :alt="member.name" 
                :src="displayImage" 
                :title="member.name" 
                class="h-full w-full object-contain" 
                loading="lazy"
            />
            <!-- علم الدولة -->
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
        <div class="min-w-0 space-y-2">
            <div class="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-100/80">
                {{ member.type_company === 'hq' ? 'Headquarters' : 'Branch Office' }}
            </div>
            
            <div class="flex flex-wrap items-center gap-2 sm:gap-3">
                <div class="break-words text-lg font-semibold leading-tight sm:text-2xl">
                    {{ member.name }}
                </div>
                <ProfileMemberType :status="memberType" />
            </div>
            
            <!-- الموقع -->
            <div class="flex flex-wrap items-center text-xs text-white/80 sm:text-sm">
                <ApplicationCountry :country="member.country" size="sm" />
                <div v-if="member.city" class="font-light">, {{ member.city }}</div>
            </div>

            <!-- معلومات التواصل -->
            <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/75 sm:text-sm">
                <!-- اسم المسؤول -->
                <div v-if="contactPerson" class="flex items-center gap-1.5">
                    <Icon class="size-4 shrink-0 text-cyan-100" name="solar:user-outline" />
                    <span class="font-medium text-white">{{ contactPerson.name }}</span>
                </div>
                
                <!-- البريد الإلكتروني -->
                <div v-if="contactPerson?.email && contactPerson.email.includes('@')" class="flex items-center gap-1.5">
                    <Icon class="size-4 shrink-0 text-cyan-100" name="solar:letter-outline" />
                    <a :href="'mailto:' + contactPerson.email" class="font-medium text-white hover:underline">
                        {{ contactPerson.email }}
                    </a>
                </div>
                
                <!-- رقم الهاتف -->
                <div v-if="contactPerson?.phone" class="flex items-center gap-1.5">
                    <Icon class="size-4 shrink-0 text-cyan-100" name="solar:phone-outline" />
                    <a :href="'tel:' + contactPerson.phone.replace(/[^0-9+]/g, '')" class="font-medium text-white hover:underline">
                        {{ contactPerson.phone }}
                    </a>
                </div>

                <!-- الموقع الإلكتروني -->
                <div v-if="member.website" class="flex items-center gap-1.5">
                    <Icon class="size-4 shrink-0 text-cyan-100" name="solar:globe-outline" />
                    <a :href="member.website" target="_blank" class="font-medium text-white hover:underline">
                        Website
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>