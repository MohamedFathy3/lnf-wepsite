<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { email, numeric, required } from '@vuelidate/validators';

const props = defineProps<{
    person: ContactPerson;
    canEdit: boolean;
    canDelete: boolean;
    compact?: boolean;
}>();

const titles = ref([
    { value: 'mr', name: 'Mr' },
    { value: 'ms', name: 'Ms' },
    { value: 'mrs', name: 'Mrs' },
]);
const formLoading = ref(false);
const isOpen = ref(false);
const item = ref({
    id: null,
    title: null,
    image: null,
    name: null,
    phone: null,
    email: null,
    phoneKeyId: null,
    phoneKey: null,
    cell: null,
    cellKeyId: null,
    cellKey: null,
    birthDate: null,
    jobTitle: null,
});

const rules = ref({
    id: {},
    image: {},
    title: { required },
    name: { required },
    email: { required, email },
    birthDate: { required },
    jobTitle: { required },
    phone: { required },
    phoneKeyId: { required, numeric },
    cell: {},
    cellKeyId: { numeric },
});

const resetItemValues = async () => {
    item.value = {
        id: null,
        image: null,
        title: null,
        name: null,
        jobTitle: null,
        email: null,
        phone: null,
        phoneKeyId: null,
        phoneKey: null,
        cell: null,
        cellKeyId: null,
        cellKey: null,
        birthDate: null,
    };
};

const v$ = useVuelidate(rules, item);

async function closeModal() {
    isOpen.value = false;
    v$.value.$reset();
    await resetItemValues();
}

async function openModal() {
    formLoading.value = true;
    // تعبئة البيانات من props.person
    item.value = {
        id: props.person.id,
        title: props.person.title,
        name: props.person.name || `${props.person.firstName || ''} ${props.person.lastName || ''}`.trim(),
        email: props.person.email,
        jobTitle: props.person.jobTitle || props.person.job_title,
        phone: props.person.phone || props.person.phoneNumber,
        phoneKeyId: props.person.phoneKeyId,
        phoneKey: props.person.phoneKey,
        cell: props.person.cell || props.person.cellNumber || props.person.cell_number,
        cellKeyId: props.person.cellKeyId,
        cellKey: props.person.cellKey,
        birthDate: props.person.birthDate || props.person.birth_date,
        image: props.person.image || null,
    };
    formLoading.value = false;
    isOpen.value = true;
}

const userStore = useUserStore();
const resources = useResourceStore();

const updateContactPerson = async () => {
    formLoading.value = true;
    const result = await v$.value.$validate();
    if (!result) {
        formLoading.value = false;
        useToast({ title: 'Error', message: 'Please fill all required fields', type: 'error', duration: 5000 });
        return false;
    }

    // تحضير البيانات للـ API
    const payload = {
        title: item.value.title,
        name: item.value.name,
        email: item.value.email,
        job_title: item.value.jobTitle,
        birth_date: item.value.birthDate,
        phone: item.value.phone,
        phone_key_id: item.value.phoneKeyId,
        cell_number: item.value.cell,
        cell_key_id: item.value.cellKeyId,
        image: item.value.image,
    };

    const { data, error } = await useApiFetch(`/api/contact-person-network/${props.person.id}`, {
        method: 'PUT',
        body: payload,
        lazy: true,
    });

    if (data.value) {
        useToast({
            title: 'Success',
            message: 'Contact Person Updated Successfully',
            type: 'success',
            duration: 5000,
        });
        await userStore.fetchAuthUser();
        await closeModal();
    }
    if (error.value) {
        useToast({ title: 'Error', message: error.value.message || 'Something went wrong', type: 'error', duration: 5000 });
        formLoading.value = false;
    }
};

const deleteContactPerson = async (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this person?');
    if (confirmed) {
        const { data, error } = await useApiFetch(`/api/contact-person-network/delete`, {
            method: 'DELETE',
            body: { items: [id] },
        });
        if (data.value) {
            useToast({
                title: 'Success',
                message: 'Contact Person Deleted Successfully',
                type: 'success',
                duration: 5000,
            });
            await userStore.fetchAuthUser();
        }
        if (error.value) {
            useToast({ title: 'Error', message: error.value.message || 'Something went wrong', type: 'error', duration: 5000 });
        }
    }
};
</script>

<template>
    <div
        :class="[
            (!props.canEdit || !props.canDelete) && 'pb-3',
            'overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 text-sm intro-x group transition duration-300 hover:border-primary/20 hover:shadow-md',
        ]"
    >
        <div v-if="props.compact" class="relative border-b border-slate-200 bg-white px-4 py-4">
            <div class="flex items-center gap-3">
                <NuxtImg v-if="props.person.imageUrl" :src="props.person.imageUrl" class="size-12 rounded-full object-cover ring-1 ring-slate-200" />
                <div v-else class="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span class="text-sm font-bold">{{ (props.person.name || 'CP').slice(0, 2).toUpperCase() }}</span>
                </div>
                <div class="min-w-0">
                    <div class="text-[10px] font-semibold uppercase text-slate-500">
                        {{ props.person.title || 'MS' }} <span class="text-slate-800">{{ props.person.name || props.person.firstName + ' ' + props.person.lastName }}</span>
                    </div>
                    <div v-if="props.person.jobTitle || props.person.job_title" class="mt-1 truncate text-xs text-slate-500">
                        {{ props.person.jobTitle || props.person.job_title }}
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="relative border-b border-slate-200 bg-white px-4 py-4">
            <div class="flex items-center gap-3">
                <NuxtImg v-if="props.person.imageUrl" :src="props.person.imageUrl" class="size-12 rounded-2xl object-cover ring-1 ring-slate-200" />
                <div v-else class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon class="size-6" name="solar:user-linear" />
                </div>
                <div class="min-w-0">
                    <div class="flex min-w-0 items-center gap-1.5">
                        <div class="shrink-0 text-xs font-medium uppercase tracking-wide text-slate-400">{{ props.person.title }}</div>
                        <div class="truncate font-semibold text-slate-800">{{ props.person.name || props.person.firstName + ' ' + props.person.lastName }}</div>
                    </div>
                    <div class="mt-1 truncate text-xs text-slate-500">{{ props.person.jobTitle || props.person.job_title }}</div>
                </div>
            </div>
        </div>
        <div v-if="props.compact" class="divide-y divide-slate-200/80 px-4">
            <div class="flex items-center gap-2 py-2.5 text-xs text-slate-600"><Icon class="size-4 text-slate-500" name="solar:letter-outline" />{{ props.person.email }}</div>
            <div v-if="props.person.phone || props.person.phoneNumber" class="flex items-center gap-2 py-2.5 text-xs text-slate-600">
                <Icon class="size-4 text-slate-500" name="solar:phone-outline" />{{ props.person.phoneKey ? `+${props.person.phoneKey} ` : ''
                }}{{ props.person.phone || props.person.phoneNumber }}
            </div>
        </div>
        <div v-else class="divide-y divide-slate-200/80 px-4">
            <div class="flex items-center justify-between gap-4 py-3">
                <div class="text-xs font-medium uppercase tracking-wide text-slate-400">Email</div>
                <div class="max-w-[65%] truncate text-right font-medium text-slate-700">{{ props.person.email }}</div>
            </div>
            <div v-if="props.person.phone || props.person.phoneNumber" class="flex items-center justify-between gap-4 py-3">
                <div class="text-xs font-medium uppercase tracking-wide text-slate-400">Phone</div>
                <div class="flex items-center gap-1">
                    <span v-if="props.person.phoneKey">+{{ props.person.phoneKey }}</span>
                    <span>{{ props.person.phone || props.person.phoneNumber }}</span>
                </div>
            </div>
            <div v-if="props.person.cell || props.person.cellNumber" class="flex items-center justify-between gap-4 py-3">
                <div class="text-xs font-medium uppercase tracking-wide text-slate-400">Cell phone</div>
                <div class="flex items-center gap-1">
                    <span v-if="props.person.cellKey">+{{ props.person.cellKey }}</span>
                    <span>{{ props.person.cell || props.person.cellNumber }}</span>
                </div>
            </div>
        </div>
        <div v-if="props.compact && props.canEdit" class="flex items-center border-t border-slate-100">
            <button
                class="flex w-full cursor-pointer items-center justify-center gap-2 bg-white p-3 text-center text-sm font-medium text-primary transition-all hover:bg-slate-50"
                @click="openModal"
            >
                <Icon class="size-4 shrink-0" name="solar:pen-new-round-outline" />
                <span>Update</span>
            </button>
        </div>
        <div v-if="!props.compact && (props.canEdit || props.canDelete)" class="flex items-center">
            <button
                v-if="props.canEdit"
                class="flex w-full cursor-pointer items-center place-content-center gap-2 bg-primary p-3 text-center text-sm font-medium text-white transition-all hover:bg-primary/85"
                @click="openModal"
            >
                <Icon class="size-4 shrink-0" name="solar:pen-new-round-outline" />
                <span>Update</span>
            </button>
            <button
                v-if="props.canDelete"
                class="flex w-full cursor-pointer items-center place-content-center gap-2 bg-danger p-3 text-center text-sm font-medium text-white transition-all hover:bg-danger/85"
                @click="deleteContactPerson(props.person.id)"
            >
                <Icon class="size-4 shrink-0" name="solar:close-circle-outline" />
                <span>Delete</span>
            </button>
        </div>
    </div>

    <!-- Edit Modal -->
    <TheModal :open-modal="isOpen" size="4xl" @close-modal="closeModal()">
        <template #header>
            <div class="flex justify-between items-center">
                <div class="font-normal">Update {{ props.person.name || props.person.firstName }}</div>
                <Icon class="w-8 h-8 opacity-50 cursor-pointer hover:opacity-100 ease-in-out duration-300" name="solar:close-square-outline" @click="closeModal" />
            </div>
        </template>
        <template #content>
            <div v-if="item && item.id" class="grid lg:grid-cols-12 gap-5 items-start">
                <div class="lg:col-span-4">
                    <FormUploader v-model="item.image" :allowed-types="['image']" :errors="v$.image.$errors" label="Profile Image" name="person-profile-image" />
                </div>
                <div class="lg:col-span-8 grid lg:grid-cols-12 gap-5 items-start">
                    <FormSelectInput
                        v-model="item.title"
                        :clearable="false"
                        :errors="v$.title.$errors"
                        :select-data="titles"
                        class="lg:col-span-4"
                        keyvalue="value"
                        label="Title"
                        labelvalue="name"
                        name="title"
                        placeholder="Title"
                    />
                    <FormTextInput v-model="item.name" :errors="v$.name.$errors" class="lg:col-span-8" label="Name" name="name" placeholder="Name" />
                    <FormTextInput v-model="item.jobTitle" :errors="v$.jobTitle.$errors" class="lg:col-span-6" label="Job Title" name="job-title" placeholder="Job Title" />
                    <FormTextInput v-model="item.email" :errors="v$.email.$errors" class="lg:col-span-6" label="Email" name="email" placeholder="Email" />
                    <FormDatePicker
                        v-model="item.birthDate"
                        :errors="v$.birthDate.$errors"
                        :time-picker="false"
                        class="lg:col-span-12"
                        label="Birth Date"
                        name="birth-date"
                        placeholder="Birth Date"
                    />
                </div>
                <div class="lg:col-span-12 grid lg:grid-cols-12 gap-5">
                    <FormSelectInput
                        v-model="item.phoneKeyId"
                        :clearable="true"
                        :errors="v$.phoneKeyId.$errors"
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
                    <FormTextInput v-model="item.phone" :errors="v$.phone.$errors" class="lg:col-span-8" label="Phone Number" name="phone-number" placeholder="Phone Number" />
                </div>
                <div class="lg:col-span-12 grid lg:grid-cols-12 gap-5">
                    <FormSelectInput
                        v-model="item.cellKeyId"
                        :clearable="true"
                        :errors="v$.cellKeyId.$errors"
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
                    <FormTextInput v-model="item.cell" :errors="v$.cell.$errors" class="lg:col-span-8" label="Cell Number" name="cell-number" placeholder="Cell Number" />
                </div>
            </div>
        </template>
        <template #footer>
            <div class="w-full flex items-center justify-end gap-5">
                <button :disabled="formLoading" class="btn-rounded btn-sm btn btn-danger px-4" type="button" @click="closeModal">
                    <Icon :name="formLoading ? 'svg-spinners:3-dots-fade' : 'solar:close-circle-linear'" class="w-5 h-5 mr-2" />
                    <span>Close</span>
                </button>
                <button :disabled="formLoading" class="btn-rounded btn-sm btn btn-primary px-4" type="button" @click="updateContactPerson()">
                    <Icon :name="formLoading ? 'svg-spinners:3-dots-fade' : 'solar:check-circle-broken'" class="w-5 h-5 mr-2" />
                    <span v-html="'Update'" />
                </button>
            </div>
        </template>
    </TheModal>
</template>
