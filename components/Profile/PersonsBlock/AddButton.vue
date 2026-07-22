<script lang="ts" setup>
import { email, numeric, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

const resources = useResourceStore();
const titles = ref([
    { value: 'mr', name: 'Mr' },
    { value: 'ms', name: 'Ms' },
    { value: 'mrs', name: 'Mrs' },
]);
const userStore = useUserStore();

const formLoading = ref(false);
const contactPersonModalOpen = ref(false);

// تعبئة البيانات الأولية
const contactPerson = ref({
    image: null,
    title: null,
    name: null,
    job_title: null,
    email: null,
    phone: null,
    phone_key_id: null,
    cell_number: null,
    cell_key_id: null,
    birth_date: null,
    member_network_id: (userStore.user as User)?.id || null,
});

const cRules = ref({
    image: {},
    title: { required },
    name: { required },
    email: { required, email },
    birth_date: { required },
    job_title: { required },
    phone: { required },
    phone_key_id: { required, numeric },
    cell_number: {},
    cell_key_id: { numeric },
});

const resetItemValues = async () => {
    contactPerson.value = {
        image: null,
        title: null,
        name: null,
        job_title: null,
        email: null,
        phone: null,
        phone_key_id: null,
        cell_number: null,
        cell_key_id: null,
        birth_date: null,
        member_network_id: (userStore.user as User)?.id || null,
    };
};

const c$ = useVuelidate(cRules, contactPerson);

async function openContactPersonModal() {
    formLoading.value = true;
    await resetItemValues();
    contactPersonModalOpen.value = true;
    formLoading.value = false;
}

async function closeContactPersonModal() {
    contactPersonModalOpen.value = false;
    c$.value.$reset();
    await resetItemValues();
}

const addContactPerson = async () => {
    formLoading.value = true;
    const result = await c$.value.$validate();
    if (!result) {
        formLoading.value = false;
        useToast({ title: 'Error', message: 'Please fill all required fields', type: 'error', duration: 5000 });
        return false;
    }

    // تحضير البيانات للإرسال
    const payload = {
        member_network_id: contactPerson.value.member_network_id,
        title: contactPerson.value.title,
        name: contactPerson.value.name,
        job_title: contactPerson.value.job_title,
        email: contactPerson.value.email,
        phone: contactPerson.value.phone,
        phone_key_id: contactPerson.value.phone_key_id,
        cell_number: contactPerson.value.cell_number || null,
        cell_key_id: contactPerson.value.cell_key_id || null,
        birth_date: contactPerson.value.birth_date,
        image: contactPerson.value.image,
    };

    const { data, error } = await useApiFetch(`/api/contact-person-network`, {
        method: 'POST',
        body: payload,
        lazy: true,
    });

    if (data.value) {
        useToast({
            title: 'Success',
            message: 'Contact Person Added Successfully',
            type: 'success',
            duration: 5000,
        });
        await userStore.fetchAuthUser();
        await closeContactPersonModal();
    }
    if (error.value) {
        useToast({ 
            title: 'Error', 
            message: error.value?.message || 'Something went wrong', 
            type: 'error', 
            duration: 5000 
        });
        formLoading.value = false;
    }
};
</script>

<template>
    <div>
        <button class="w-full btn btn-dark btn-sm !text-xs px-3 !font-light btn-rounded gap-2 whitespace-nowrap" type="button" @click="openContactPersonModal">
            <Icon class="size-4" name="solar:user-plus-line-duotone" />
            <span>Add Contact Person</span>
        </button>

        <TheModal :open-modal="contactPersonModalOpen" size="4xl" @close-modal="closeContactPersonModal()">
            <template #header>
                <div class="flex justify-between items-center">
                    <div class="font-normal text-lg">Add Contact Person</div>
                    <Icon class="w-8 h-8 opacity-50 cursor-pointer hover:opacity-100 ease-in-out duration-300" name="solar:close-square-outline" @click="closeContactPersonModal" />
                </div>
            </template>
            <template #content>
                <div class="grid lg:grid-cols-12 gap-5 items-start">
                    <!-- الصورة -->
                    <div class="lg:col-span-4">
                        <FormUploader 
                            v-model="contactPerson.image" 
                            :allowed-types="['image']" 
                            :errors="c$.image.$errors" 
                            label="Profile Image" 
                            name="person-profile-image" 
                        />
                    </div>

                    <!-- المعلومات الأساسية -->
                    <div class="lg:col-span-8 grid lg:grid-cols-12 gap-5 items-start">
                        <FormSelectInput
                            v-model="contactPerson.title"
                            :clearable="false"
                            :errors="c$.title.$errors"
                            :select-data="titles"
                            class="lg:col-span-4"
                            keyvalue="value"
                            label="Title *"
                            labelvalue="name"
                            name="title"
                            placeholder="Title"
                            required
                        />
                        <FormTextInput 
                            v-model="contactPerson.name" 
                            :errors="c$.name.$errors" 
                            class="lg:col-span-8" 
                            label="Full Name *" 
                            name="name" 
                            placeholder="Full Name" 
                            required 
                        />
                        <FormTextInput 
                            v-model="contactPerson.job_title" 
                            :errors="c$.job_title.$errors" 
                            class="lg:col-span-6" 
                            label="Job Title *" 
                            name="job-title" 
                            placeholder="Job Title" 
                            required 
                        />
                        <FormTextInput 
                            v-model="contactPerson.email" 
                            :errors="c$.email.$errors" 
                            class="lg:col-span-6" 
                            label="Email *" 
                            name="email" 
                            placeholder="Email" 
                            type="email" 
                            required 
                        />
                        <FormDatePicker
                            v-model="contactPerson.birth_date"
                            :errors="c$.birth_date.$errors"
                            :time-picker="false"
                            class="lg:col-span-12"
                            label="Birth Date *"
                            name="birth-date"
                            placeholder="Birth Date"
                            required
                        />
                    </div>

                    <!-- رقم الهاتف -->
                    <div class="lg:col-span-12 grid lg:grid-cols-12 gap-5">
                        <FormSelectInput
                            v-model="contactPerson.phone_key_id"
                            :clearable="true"
                            :errors="c$.phone_key_id.$errors"
                            :select-data="resources.countries"
                            class="lg:col-span-4"
                            imgvalue="imageUrl"
                            keyvalue="id"
                            label="Phone Key *"
                            labelvalue="key"
                            name="phone-key-id"
                            placeholder="Phone Key"
                            prefix="+"
                            required
                        />
                        <FormTextInput 
                            v-model="contactPerson.phone" 
                            :errors="c$.phone.$errors" 
                            class="lg:col-span-8" 
                            label="Phone Number *" 
                            name="phone-number" 
                            placeholder="Phone Number" 
                            required 
                        />
                    </div>

                    <!-- رقم المحمول (اختياري) -->
                    <div class="lg:col-span-12 grid lg:grid-cols-12 gap-5">
                        <FormSelectInput
                            v-model="contactPerson.cell_key_id"
                            :clearable="true"
                            :errors="c$.cell_key_id.$errors"
                            :select-data="resources.countries"
                            class="lg:col-span-4"
                            imgvalue="imageUrl"
                            keyvalue="id"
                            label="Cell Key"
                            labelvalue="key"
                            name="cell-key-id"
                            placeholder="Cell Key"
                            prefix="+"
                        />
                        <FormTextInput 
                            v-model="contactPerson.cell_number" 
                            :errors="c$.cell_number.$errors" 
                            class="lg:col-span-8" 
                            label="Cell Number" 
                            name="cell-number" 
                            placeholder="Cell Number" 
                        />
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="w-full flex items-center justify-end gap-5">
                    <button :disabled="formLoading" class="btn-rounded btn-sm btn btn-danger px-4" type="button" @click="closeContactPersonModal">
                        <Icon :name="formLoading ? 'svg-spinners:3-dots-fade' : 'solar:close-circle-linear'" class="w-5 h-5 mr-2" />
                        <span>Cancel</span>
                    </button>
                    <button :disabled="formLoading" class="btn-rounded btn-sm btn btn-primary px-4" type="button" @click="addContactPerson()">
                        <Icon :name="formLoading ? 'svg-spinners:3-dots-fade' : 'solar:check-circle-broken'" class="w-5 h-5 mr-2" />
                        <span>Save</span>
                    </button>
                </div>
            </template>
        </TheModal>
    </div>
</template>

<style scoped></style>