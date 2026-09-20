<script lang="ts" setup>
definePageMeta({
    middleware: ['auth'],
});

const userStore = useUserStore();
const isProfile = ref(true);

// تحديث بيانات المستخدم عند تحميل الصفحة
onMounted(async () => {
    if (userStore.token) {
        await userStore.fetchAuthUser();
    }
});

// تحويل contactPersons من user
const normalizedContactPersons = computed(() => {
    if (!userStore.user?.contactPersons) return [];
    return userStore.user.contactPersons.map((person: any) => ({
        id: person.id,
        title: person.title,
        name: person.name || `${person.firstName || ''} ${person.lastName || ''}`.trim(),
        firstName: person.firstName,
        lastName: person.lastName,
        email: person.email,
        jobTitle: person.jobTitle || person.job_title,
        job_title: person.job_title || person.jobTitle,
        phone: person.phone || person.phoneNumber,
        phoneNumber: person.phoneNumber || person.phone,
        cell: person.cell || person.cellNumber || person.cell_number,
        cellNumber: person.cellNumber || person.cell_number || person.cell,
        cell_number: person.cell_number || person.cellNumber || person.cell,
        phoneKeyId: person.phoneKeyId,
        phoneKey: person.phoneKey,
        cellKeyId: person.cellKeyId,
        cellKey: person.cellKey,
        imageUrl: person.imageUrl,
        image: person.image,
        birthDate: person.birthDate || person.birth_date,
        birth_date: person.birth_date || person.birthDate,
        network: person.network,
        createdAt: person.createdAt,
        updatedAt: person.updatedAt,
        deleted: person.deleted,
        deletedAt: person.deletedAt,
    }));
});

// تحويل contactPersonNetwork
const normalizedNetworkPersons = computed(() => {
    if (!userStore.user?.contactPersonNetwork) return [];
    return userStore.user.contactPersonNetwork.map((person: any) => ({
        id: person.id,
        title: person.title,
        member_network_id: person.member_network_id,
        name: person.name,
        email: person.email,
        jobTitle: person.job_title,
        job_title: person.job_title,
        phone: person.phone,
        phoneKeyId: person.phoneKeyId,
        phoneKey: person.phoneKey,
        cell: person.cell_number,
        cell_number: person.cell_number,
        imageUrl: person.imageUrl,
        image: person.image,
        birthDate: person.birth_date,
        birth_date: person.birth_date,
        createdAt: person.createdAt,
        updatedAt: person.updatedAt,
        deleted: person.deleted,
        deletedAt: person.deletedAt,
    }));
});
</script>

<template>
    <div v-if="userStore.user" class="min-h-screen bg-slate-50">
        <ProfileHeader :member="userStore.user" />
        <ApplicationWarning />

        <div class="bg-slate-50/90 px-3 py-6 sm:px-6 lg:px-12 lg:py-8">
            <div class="container flex max-w-7xl flex-col gap-6">
                <div class="grid gap-6 lg:grid-cols-12 lg:items-start">
                    <div class="lg:col-span-8">
                        <ProfileInfoBlock :member="userStore.user" />
                    </div>

                    <div class="flex flex-col gap-5 lg:col-span-4">
                        <div class="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.45)]">
                            <div class="flex items-center gap-3">
                                <span class="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                                    <Icon class="size-5" name="solar:bolt-linear" />
                                </span>
                                <div>
                                    <div class="text-sm font-semibold text-slate-800">Quick Actions</div>
                                    <div class="text-xs text-slate-400">Manage your company profile</div>
                                </div>
                            </div>
                            <div class="mt-4 grid grid-cols-2 gap-2">
                                <ProfileUpdateButton class="w-full" />
                                <ProfilePersonsBlockAddButton class="w-full" />
                            </div>
                        </div>

                        <ProfileBranchesBlock :members="userStore.user.group?.companies" />
                        <ProfilePersonsBlock :can-delete="isProfile" :can-edit="isProfile" :network-persons="normalizedNetworkPersons" :persons="normalizedContactPersons" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
