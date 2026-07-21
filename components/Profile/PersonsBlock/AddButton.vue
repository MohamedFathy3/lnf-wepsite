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

async function openContactPersonModal() {
    formLoading.value = true;
    contactPersonModalOpen.value = true;
    formLoading.value = false;
}

const formLoading = ref(false);
const contactPersonModalOpen = ref(false);
const contactPerson = ref({
    image: null,
    title: null,
    name: null,
    jobTitle: null,
    email: null,
    phone: null,
    phoneKeyId: null,
    cell: null,
    cellKeyId: null,
    birthDate: null,
    userId: (userStore.user as User).id,
});
const cRules = ref({
    image: {},
    title: { required },
    name: { required },
    email: { required, email },
    birthDate: { required },
    jobTitle: { required },
    phone: { required },
    phoneKeyId: { required, numeric },
    cell: { required },
    cellKeyId: { required, numeric },
});
const resetItemValues = async () => {
    contactPerson.value = {
        image: null,
        title: null,
        name: null,
        jobTitle: null,
        email: null,
        phone: null,
        phoneKeyId: null,
        cell: null,
        cellKeyId: null,
        birthDate: null,
        userId: (userStore.user as User).id,
    };
};
const c$ = useVuelidate(cRules, contactPerson);

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
    const { data, error } = await useApiFetch(`/api/member/contact-person/add`, {
        method: 'POST',
        body: contactPerson,
        lazy: true,
    });
    if (data.value) {
        useToast({
            title: 'Success',
            message: 'Contact Person Update Successfully',
            type: 'success',
            duration: 5000,
        });
        await userStore.fetchAuthUser();
        await closeContactPersonModal();
    }
    if (error.value) {
        useToast({ title: 'Error', message: error.value.message, type: 'error', duration: 5000 });
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
                    <div class="font-normal">Add Contact Person</div>
                    <Icon class="w-8 h-8 opacity-50 cursor-pointer hover:opacity-100 ease-in-out duration-300" name="solar:close-square-outline" @click="closeContactPersonModal" />
                </div>
            </template>
            <template #content>
                <div class="grid lg:grid-cols-12 gap-5 items-start">
                    <div class="lg:col-span-4">
                        <FormUploader v-model="contactPerson.image" :allowed-types="['image']" :errors="c$.image.$errors" label="Profile Image" name="person-profile-image" />
                    </div>
                    <div class="lg:col-span-8 grid lg:grid-cols-12 gap-5 items-start">
                        <FormSelectInput
                            v-model="contactPerson.title"
                            :clearable="false"
                            :errors="c$.title.$errors"
                            :select-data="titles"
                            class="lg:col-span-4"
                            keyvalue="value"
                            label="Title"
                            labelvalue="name"
                            name="title"
                            placeholder="Title"
                        />
                        <FormTextInput v-model="contactPerson.name" :errors="c$.name.$errors" class="lg:col-span-8" label="Name" name="name" placeholder="Name" />
                        <FormTextInput v-model="contactPerson.jobTitle" :errors="c$.jobTitle.$errors" class="lg:col-span-6" label="Job Title" name="job-title" placeholder="Job Title" />
                        <FormTextInput v-model="contactPerson.email" :errors="c$.email.$errors" class="lg:col-span-6" label="Email" name="email" placeholder="Email" />
                        <FormDatePicker
                            v-model="contactPerson.birthDate"
                            :errors="c$.birthDate.$errors"
                            :time-picker="false"
                            class="lg:col-span-12"
                            label="Birth Date"
                            name="birth-date"
                            placeholder="Birth Date"
                        />
                    </div>
                    <div class="lg:col-span-12 grid lg:grid-cols-12 gap-5">
                        <FormSelectInput
                            v-model="contactPerson.phoneKeyId"
                            :clearable="true"
                            :errors="c$.phoneKeyId.$errors"
                            :select-data="resources.countries"
                            class="lg:col-span-4"
                            imgvalue="imageUrl"
                            keyvalue="id"
                            label="Country Key"
                            labelvalue="key"
                            name="phone-key-id"
                            placeholder="Country Key"
                            prefix="+"
                        />
                        <FormTextInput v-model="contactPerson.phone" :errors="c$.phone.$errors" class="lg:col-span-8" label="Phone Number" name="phone-number" placeholder="Phone Number" />
                    </div>
                    <div class="lg:col-span-12 grid lg:grid-cols-12 gap-5">
                        <FormSelectInput
                            v-model="contactPerson.cellKeyId"
                            :clearable="true"
                            :errors="c$.cellKeyId.$errors"
                            :select-data="resources.countries"
                            class="lg:col-span-4"
                            imgvalue="imageUrl"
                            keyvalue="id"
                            label="Country Key"
                            labelvalue="key"
                            name="cell-key-id"
                            placeholder="Country Key"
                            prefix="+"
                        />
                        <FormTextInput v-model="contactPerson.cell" :errors="c$.cell.$errors" class="lg:col-span-8" label="Cell Number" name="cell-number" placeholder="Cell Number" />
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="w-full flex items-center justify-end gap-5">
                    <button :disabled="formLoading" class="btn-rounded btn-sm btn btn-danger px-4" type="button" @click="closeContactPersonModal">
                        <Icon :name="formLoading ? 'svg-spinners:3-dots-fade' : 'solar:close-circle-linear'" class="w-5 h-5 mr-2" />
                        <span>Close</span>
                    </button>
                    <button :disabled="formLoading" class="btn-rounded btn-sm btn btn-primary px-4" type="button" @click="addContactPerson()">
                        <Icon :name="formLoading ? 'svg-spinners:3-dots-fade' : 'solar:check-circle-broken'" class="w-5 h-5 mr-2" />
                        <span v-html="'Update'" />
                    </button>
                </div>
            </template>
        </TheModal>
    </div>
</template>

<style scoped></style>
