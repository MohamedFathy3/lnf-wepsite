<script lang="ts" setup>
const props = defineProps<{
    profile: User;
    isProfile?: boolean;
}>();

</script>

<template>
    <div class="min-h-screen bg-slate-50">
        <ProfileHeader :member="props.profile" />
        <ApplicationWarning />

        <div class="bg-slate-50/90 px-3 py-5 sm:px-6 sm:py-6 lg:px-12 lg:py-8">
            <div class="container mx-auto max-w-7xl">
                <div class="grid gap-5 sm:gap-6 lg:grid-cols-12 lg:items-start">
                    <main class="order-2 lg:order-1 lg:col-span-7">
                        <ProfileInfoBlock :member="props.profile" />
                    </main>
                    <div class="order-1 lg:order-2 lg:col-span-5">
                        <ProfileSidebar :is-profile="props.isProfile" :profile="props.profile" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>