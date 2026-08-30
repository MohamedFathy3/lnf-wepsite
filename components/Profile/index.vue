<script lang="ts" setup>
const props = defineProps({
    profile: {
        type: Object,
        default: () => {},
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

        <div class="bg-slate-50/90 px-3 py-6 sm:px-6 lg:px-12 lg:py-8">
            <div class="container flex max-w-7xl flex-col gap-6">
                <div class="grid gap-6 lg:grid-cols-12 lg:items-start">
                    <div class="lg:col-span-8">
                        <ProfileInfoBlock :member="props.profile" />
                    </div>

                    <div class="flex flex-col gap-5 lg:col-span-4">
                        <div
                            v-if="props.isProfile"
                            class="grid grid-cols-1 gap-3 rounded-3xl border border-slate-200/80 bg-white p-3 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.45)] sm:grid-cols-2"
                        >
                            <ProfilePersonsBlockAddButton class="w-full" />
                            <ProfileUpdateButton class="w-full" />
                        </div>
                        <ProfileBranchesBlock :members="props.profile.group?.companies" />
                        <ProfilePersonsBlock :can-delete="props.isProfile" :can-edit="props.isProfile" :persons="props.profile.contactPersons" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
