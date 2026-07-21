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

async function openMemberModal() {
    formLoading.value = true;
    memberModalOpen.value = true;
    formLoading.value = false;
}

const formLoading = ref(false);
const memberModalOpen = ref(false);
const member = ref({
    image: (userStore.user as User).image,
    name: (userStore.user as User).name,
    addressLine1: (userStore.user as User).addressLine1,
    addressLine2: (userStore.user as User).addressLine2,
    email: (userStore.user as User).email,
    companyEmail: (userStore.user as User).companyEmail,
    website: (userStore.user as User).website,
    phoneKeyId: (userStore.user as User).phoneKeyId,
    phone: (userStore.user as User).phone,
    faxKeyId: (userStore.user as User).faxKeyId,
    fax: (userStore.user as User).fax,
    employeesNum: (userStore.user as User).employeesNum,
    profile: (userStore.user as User).profile,
    services: (userStore.user as User).services,
    otherServices: (userStore.user as User).otherServices,
    certificates: (userStore.user as User).certificates,
    otherCertificates: (userStore.user as User).otherCertificates,
});
const cRules = ref({
    image: { required },
    name: { required },
    addressLine1: { required },
    addressLine2: {},
    email: { email },
    companyEmail: { email },
    website: { required },
    phoneKeyId: { required },
    phone: { required },
    faxKeyId: {},
    fax: {},
    employeesNum: { required, numeric },
    profile: {},
    services: { required },
    otherServices: {},
    certificates: { required },
    otherCertificates: {},
});
const m$ = useVuelidate(cRules, member);

async function closeMemberModal() {
    memberModalOpen.value = false;
    await userStore.fetchAuthUser();
    member.value = {
        image: (userStore.user as User).image,
        name: (userStore.user as User).name,
        addressLine1: (userStore.user as User).addressLine1,
        addressLine2: (userStore.user as User).addressLine2,
        email: (userStore.user as User).email,
        companyEmail: (userStore.user as User).companyEmail,
        website: (userStore.user as User).website,
        phoneKeyId: (userStore.user as User).phoneKeyId,
        phone: (userStore.user as User).phone,
        faxKeyId: (userStore.user as User).faxKeyId,
        fax: (userStore.user as User).fax,
        employeesNum: (userStore.user as User).employeesNum,
        profile: (userStore.user as User).profile,
        services: (userStore.user as User).services,
        otherServices: (userStore.user as User).otherServices,
        certificates: (userStore.user as User).certificates,
        otherCertificates: (userStore.user as User).otherCertificates,
    };
    m$.value.$reset();
}

const updateMember = async () => {
    formLoading.value = true;
    const result = await m$.value.$validate();
    if (!result) {
        formLoading.value = false;
        useToast({ title: 'Error', message: 'Please fill all required fields', type: 'error', duration: 5000 });
        return false;
    }
    const { data, error } = await useApiFetch(`/api/member/${(userStore.user as User).id}`, {
        method: 'PATCH',
        body: member,
        lazy: true,
    });
    if (data.value) {
        useToast({
            title: 'Success',
            message: 'Company details has been updated successfully',
            type: 'success',
            duration: 5000,
        });
        await userStore.fetchAuthUser();
        await closeMemberModal();
    }
    if (error.value) {
        useToast({ title: 'Error', message: error.value.message, type: 'error', duration: 5000 });
        formLoading.value = false;
    }
};

const includesOtherServices = computed(() => {
    const otherServiceId = resources.services?.find((serv) => serv.slug === 'others')?.id;
    return otherServiceId !== undefined && (member.value as User).services?.some((s) => s === otherServiceId);
});
const includesOtherCertificates = computed(() => {
    const otherCertificateId = resources.certificates?.find((cert) => cert.slug === 'others')?.id;
    return otherCertificateId !== undefined && (member.value as User).certificates?.some((s) => s === otherCertificateId);
});
</script>

<template>
    <div>
        <button class="w-full btn btn-primary btn-sm !text-xs px-3 !font-light btn-rounded gap-2 whitespace-nowrap" type="button" @click="openMemberModal">
            <Icon class="size-4" name="solar:pen-new-round-linear" />
            <span>Edit profile</span>
        </button>
        <TheModal :open-modal="memberModalOpen" size="4xl" @close-modal="closeMemberModal()">
            <template #header>
                <div class="flex justify-between items-center">
                    <div class="font-normal">Add Contact Person</div>
                    <Icon class="w-8 h-8 opacity-50 cursor-pointer hover:opacity-100 ease-in-out duration-300" name="solar:close-square-outline" @click="closeMemberModal" />
                </div>
            </template>
            <template #content>
                <div class="grid lg:grid-cols-12 gap-5 items-start">
                    <div class="lg:col-span-4">
                        <FormUploader v-model="member.image" :allowed-types="['image', 'svg']" :errors="m$.image.$errors" label="Company Logo" name="company-logo" />
                    </div>
                    <div class="lg:col-span-8 grid lg:grid-cols-12 gap-5 items-start">
                        <FormTextInput v-model="member.name" :errors="m$.name.$errors" class="lg:col-span-12" disabled label="Company Name" name="company-name" placeholder="Company Name" readonly />
                        <FormTextInput v-model="member.addressLine1" :errors="m$.addressLine1.$errors" class="lg:col-span-12" label="Address" name="address-line-1" placeholder="Address" />
                        <FormTextInput v-model="member.addressLine2" :errors="m$.addressLine2.$errors" class="lg:col-span-12" name="address-line-1" placeholder="Address Line 2" />
                    </div>
                    <FormTextInput
                        v-model="member.email"
                        :errors="m$.email.$errors"
                        class="lg:col-span-6"
                        disabled
                        label="Login Email"
                        name="login-email"
                        placeholder="Login Email"
                        readonly
                        type="email"
                    />
                    <FormTextInput
                        v-model="member.companyEmail"
                        :errors="m$.companyEmail.$errors"
                        class="lg:col-span-6"
                        disabled
                        label="Company Email"
                        name="company-email"
                        placeholder="Company Email"
                        readonly
                        type="email"
                    />
                    <FormTextInput v-model="member.website" :errors="m$.website.$errors" class="lg:col-span-6" label="Website" name="website" placeholder="Website" />
                    <FormTextInput
                        v-model="member.employeesNum"
                        :errors="m$.employeesNum.$errors"
                        class="lg:col-span-6"
                        label="Approximate Number Of Employees"
                        name="approximate-number-of-employees"
                        placeholder="Approximate Number Of Employees"
                    />
                    <div class="lg:col-span-6 grid lg:grid-cols-12 gap-5">
                        <FormSelectInput
                            v-model="member.phoneKeyId"
                            :clearable="true"
                            :errors="m$.phoneKeyId.$errors"
                            :select-data="resources.countries"
                            class="lg:col-span-5"
                            imgvalue="imageUrl"
                            keyvalue="id"
                            label="Key"
                            labelvalue="key"
                            name="phone-key-id"
                            placeholder="Key"
                            prefix="+"
                        />
                        <FormTextInput v-model="member.phone" :errors="m$.phone.$errors" class="lg:col-span-7" label="Phone Number" name="phone-number" placeholder="Phone Number" />
                    </div>
                    <div class="lg:col-span-6 grid lg:grid-cols-12 gap-5">
                        <FormSelectInput
                            v-model="member.faxKeyId"
                            :clearable="true"
                            :errors="m$.faxKeyId.$errors"
                            :select-data="resources.countries"
                            class="lg:col-span-5"
                            imgvalue="imageUrl"
                            keyvalue="id"
                            label="Key"
                            labelvalue="key"
                            name="fax-key-id"
                            placeholder="Key"
                            prefix="+"
                        />
                        <FormTextInput v-model="member.fax" :errors="m$.fax.$errors" class="lg:col-span-7" label="Cell Number" name="fax-number" placeholder="Cell Number" />
                    </div>
                    <FormTextInput
                        v-model="member.profile"
                        :errors="m$.profile.$errors"
                        class="lg:col-span-12"
                        label="Company Profile"
                        name="company-profile"
                        placeholder="Please type some information about your company such as who you are, benefits, goals .... etc"
                        type="textarea"
                    />
                    <div class="lg:col-span-12 space-y-5">
                        <FormSection description="Please indicate the services your company provides." title="Services" wide>
                            <div v-if="m$.services.$errors.length > 0" class="py-1.5 text-xs font-light text-danger">Please select at least one service from this list</div>
                            <fieldset :class="['mt-3 grid gap-6 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4']">
                                <template v-for="service in resources.services" :key="service.id">
                                    <div class="relative flex items-center">
                                        <div class="flex items-center h-6">
                                            <input
                                                :id="'service-' + service.id"
                                                v-model="member.services"
                                                :aria-describedby="'service-' + service.slug"
                                                :name="'service-' + service.slug"
                                                :value="service.id"
                                                class="focus:ring-primary h-5 w-5 rounded text-primary border-slate-500 disabled:read-only:opacity-50 disabled:read-only:cursor-not-allowed"
                                                type="checkbox"
                                            />
                                        </div>
                                        <div :class="['ml-3 text-sm']">
                                            <label :class="['disabled:read-only:text-slate-400 whitespace-nowrap']" :for="'service-' + service.slug" class="font-sm ease-in-out duration-150">
                                                <span>{{ service.name }}</span>
                                            </label>
                                        </div>
                                    </div>
                                </template>
                            </fieldset>
                            <TransitionSlide>
                                <FormTextInput v-if="includesOtherServices" v-model="member.otherServices" :name="'company-other-services'" class="mt-5" placeholder="Other Services" />
                            </TransitionSlide>
                        </FormSection>
                        <FormSection description="Please indicate whether your company is certified by and/or a member of any of the following organizations." title="Certificates" wide>
                            <div v-if="m$.certificates.$errors.length > 0" class="py-1.5 text-xs font-light text-danger">Please select at least one certificate from this list</div>
                            <fieldset :class="['mt-3 grid gap-6 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4']">
                                <template v-for="certificate in resources.certificates" :key="certificate.id">
                                    <div class="relative flex items-center">
                                        <div class="flex items-center h-6">
                                            <input
                                                :id="'certificate-' + certificate.id"
                                                v-model="member.certificates"
                                                :aria-describedby="'certificate-' + certificate.slug"
                                                :name="'certificate-' + certificate.slug"
                                                :value="certificate.id"
                                                class="focus:ring-primary h-5 w-5 rounded text-primary border-slate-500 disabled:read-only:opacity-50 disabled:read-only:cursor-not-allowed"
                                                type="checkbox"
                                            />
                                        </div>
                                        <div :class="['ml-3 text-sm']">
                                            <label :class="['disabled:read-only:text-slate-400 whitespace-nowrap']" :for="'certificate-' + certificate.slug" class="font-sm ease-in-out duration-150">
                                                <span>{{ certificate.name }}</span>
                                            </label>
                                        </div>
                                    </div>
                                </template>
                            </fieldset>
                            <TransitionSlide>
                                <FormTextInput v-if="includesOtherCertificates" v-model="member.otherCertificates" :name="'company-other-services'" class="mt-5" placeholder="Other Services" />
                            </TransitionSlide>
                        </FormSection>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="w-full flex items-center justify-end gap-5">
                    <button :disabled="formLoading" class="btn-rounded btn-sm btn btn-danger px-4" type="button" @click="closeMemberModal">
                        <Icon :name="formLoading ? 'svg-spinners:3-dots-fade' : 'solar:close-circle-linear'" class="w-5 h-5 mr-2" />
                        <span>Close</span>
                    </button>
                    <button :disabled="formLoading" class="btn-rounded btn-sm btn btn-primary px-4" type="button" @click="updateMember()">
                        <Icon :name="formLoading ? 'svg-spinners:3-dots-fade' : 'solar:check-circle-broken'" class="w-5 h-5 mr-2" />
                        <span v-html="'Update'" />
                    </button>
                </div>
            </template>
        </TheModal>
    </div>
</template>

<style scoped></style>
