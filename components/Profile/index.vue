<script setup>
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
    <div v-if="props.profile">
        <ProfileHeader :member="props.profile" />
        <ApplicationWarning />
        <div class="px-3 lg:px-12">
            <div class="container my-5 flex flex-col gap-5">
                <div class="grid lg:grid-cols-12 gap-5">
                    <div class="lg:col-span-8">
                        <ProfileInfoBlock :member="props.profile" />
                    </div>
                    <div class="lg:col-span-4 flex flex-col gap-5">
                        <div v-if="props.isProfile" class="flex items-center gap-5">
                            <ProfilePersonsBlockAddButton class="w-full" />
                            <ProfileUpdateButton class="w-full" />
                        </div>
                        <div class="flex flex-col gap-5">
                            <ProfileBranchesBlock :members="props.profile.group?.companies" />
                            <ProfilePersonsBlock :can-delete="props.isProfile" :can-edit="props.isProfile" :persons="props.profile.contactPersons" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
