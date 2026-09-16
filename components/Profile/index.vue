<script lang="ts" setup>
const props = defineProps({
    profile: {
        type: Object,
        default: () => ({}),
        required: true,
    },
    isProfile: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <div v-if="props.profile" class="min-h-screen bg-slate-50">
        <ProfileHeader :member="props.profile" />
        <ApplicationWarning />

        <div class="bg-slate-50/90 px-3 py-5 sm:px-6 sm:py-6 lg:px-12 lg:py-8">
            <div class="container mx-auto flex max-w-7xl flex-col gap-5 sm:gap-6">
                <div class="grid gap-5 sm:gap-6 lg:grid-cols-12 lg:items-start">
                    <!-- ✅ العمود الأساسي -->
                    <div class="order-2 lg:order-1 lg:col-span-8">
                        <ProfileInfoBlock :member="props.profile" />
                    </div>

                    <!-- ✅ العمود الجانبي -->
                    <div class="order-1 lg:order-2 flex flex-col gap-4 sm:gap-5 lg:col-span-4">
                        <!-- أزرار الإضافة والتحديث -->
                        <div
                            v-if="props.isProfile"
                            class="grid grid-cols-1 gap-3 rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-3 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.45)] sm:grid-cols-2"
                        >
                            <ProfilePersonsBlockAddButton class="w-full" />
                            <ProfileUpdateButton class="w-full" />
                        </div>

                        <!-- البرانشز -->
                        <ProfileBranchesBlock :members="props.profile.group?.companies ?? []" />

                        <!-- الكونتاكت بيرسونز -->
                        <ProfilePersonsBlock
                            :can-delete="props.isProfile"
                            :can-edit="props.isProfile"
                            :network-persons="props.profile.contactPersonNetwork"
                            :persons="props.profile.contactPersons"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>