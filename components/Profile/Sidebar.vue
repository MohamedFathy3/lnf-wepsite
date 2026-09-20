<script lang="ts" setup>
import type { User } from '~/types';

const props = withDefaults(
    defineProps<{
        profile: User;
        isProfile?: boolean;
    }>(),
    { isProfile: false },
);

const contactPerson = computed(() => {
    const networkPerson = props.profile?.contactPersonNetwork?.[0];
    const companyPerson = props.profile?.contactPersons?.[0];
    return networkPerson || companyPerson || null;
});

const aboutText = computed(() => {
    const description = props.profile.profile?.replace(/<[^>]*>/g, '').trim();
    return (
        description ||
        `${props.profile.name || 'This company'} is a logistics company headquartered in ${props.profile.city || 'the region'}${props.profile.country?.name ? `, ${props.profile.country.name}` : ''}. More information about the company, services, and expertise can be added here.`
    );
});
</script>

<template>
    <aside class="flex flex-col gap-4 sm:gap-5">
        <section class="profile-side-card overflow-hidden">
            <div class="profile-side-card__heading px-4 pt-4 sm:px-5 sm:pt-5">
                <span class="profile-side-card__icon bg-cyan-50 text-primary"><Icon class="size-6" name="solar:users-group-rounded-linear" /></span>
                <div>
                    <h2>Contact Person</h2>
                    <p>Primary contact at this company</p>
                </div>
            </div>
            <ProfilePersonsBlockCard v-if="contactPerson" class="mx-4 mb-0 sm:mx-5" compact :can-delete="false" :can-edit="props.isProfile" :person="contactPerson" />
            <div v-else class="px-5 pb-5 text-sm italic text-slate-400">No contact person provided.</div>
        </section>

        <section v-if="props.isProfile" class="profile-side-card p-4 sm:p-5">
            <div class="profile-side-card__heading">
                <span class="profile-side-card__icon bg-amber-50 text-amber-600"><Icon class="size-6" name="solar:bolt-linear" /></span>
                <div>
                    <h2>Quick Actions</h2>
                    <p>Manage your company profile</p>
                </div>
            </div>
            <div class="mt-4 grid grid-cols-2 gap-2">
                <ProfileUpdateButton class="w-full !rounded-xl !bg-cyan-50 !text-primary hover:!bg-cyan-100" />
                <ProfilePersonsBlockAddButton class="w-full !rounded-xl !bg-emerald-50 !text-emerald-700 hover:!bg-emerald-100" />
                <button class="flex min-h-12 items-center justify-center gap-1 rounded-xl bg-amber-50 px-2 text-xs font-medium text-amber-700 hover:bg-amber-100">
                    <Icon class="size-4" name="solar:document-add-outline" /> Upload Documents
                </button>
                <NuxtLink
                    to="/network-directory"
                    class="flex min-h-12 items-center justify-center gap-1 rounded-xl bg-violet-50 px-2 text-xs font-medium text-violet-700 hover:bg-violet-100"
                    ><Icon class="size-4" name="solar:square-share-line-outline" /> View in Directory</NuxtLink
                >
            </div>
        </section>

        <section class="profile-side-card p-4 sm:p-5">
            <div class="profile-side-card__heading">
                <span class="profile-side-card__icon bg-blue-50 text-primary"><Icon class="size-6" name="solar:document-text-linear" /></span>
                <div>
                    <h2>About Company</h2>
                    <p>Company description</p>
                </div>
            </div>
            <p class="mt-4 text-xs leading-6 text-slate-600">{{ aboutText }}</p>
        </section>
    </aside>
</template>

<style scoped>
.profile-side-card {
    border: 1px solid rgb(226 232 240 / 0.9);
    border-radius: 1.25rem;
    background: white;
    box-shadow: 0 18px 45px -30px rgb(15 23 42 / 0.45);
}
.profile-side-card__heading {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}
.profile-side-card__icon {
    display: flex;
    width: 2.75rem;
    height: 2.75rem;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: 0.9rem;
}
.profile-side-card__heading h2 {
    color: rgb(15 23 42);
    font-size: 0.95rem;
    font-weight: 700;
}
.profile-side-card__heading p {
    margin-top: 0.15rem;
    color: rgb(148 163 184);
    font-size: 0.7rem;
}
</style>
