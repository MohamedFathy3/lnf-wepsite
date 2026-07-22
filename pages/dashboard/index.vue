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
    <div v-if="userStore.user">
        <ProfileHeader :member="userStore.user" />
        <ApplicationWarning />
        <div class="px-3 lg:px-12">
            <div class="container my-5 flex flex-col gap-5">
                <div class="grid lg:grid-cols-12 gap-5">
                    <!-- العمود الأيسر - معلومات الشركة -->
                    <div class="lg:col-span-8">
                        <ProfileInfoBlock :member="userStore.user" />
                    </div>

                    <!-- العمود الأيمن - الإجراءات -->
                    <div class="lg:col-span-4 flex flex-col gap-5">
                        <!-- ✅ الأزرار في أعلى العمود الأيمن -->
                        <div v-if="isProfile" class="flex flex-col gap-3">
                            <ProfileUpdateButton class="w-full" />
                            <ProfilePersonsBlockAddButton class="w-full" />
                        </div>

                        <!-- الفروع -->
                        <ProfileBranchesBlock :members="userStore.user.group?.companies" />
                        
                        <!-- Contact Persons -->
                        <ProfilePersonsBlock 
                            :persons="normalizedContactPersons" 
                            :network-persons="normalizedNetworkPersons"
                            :can-delete="isProfile" 
                            :can-edit="isProfile" 
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>