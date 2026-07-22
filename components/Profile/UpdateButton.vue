<script lang="ts" setup>
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

const resources = useResourceStore();
const userStore = useUserStore();

const formLoading = ref(false);
const memberModalOpen = ref(false);
const showPassword = ref(false);

function togglePassword() {
    showPassword.value = !showPassword.value;
}

const member = ref({
    id: null,
    image: null,
    name: null,
    address: null,
    addressLine1: null,
    addressLine2: null,
    city: null,
    email: null,
    company_email: null,
    website: null,
    phone: null,
    phone_key_id: null,
    status: 'pending',
    type: 'member',
    type_company: 'hq',
    country_id: null,
    user_id: null,
    unhashed_password: null,
    fpp: false,
    active: false,
    user: null,
});

function fillData() {
    const user = userStore.user as any;
    if (!user) return;

    let imageData = user.image || null;
    if (typeof imageData === 'string') {
        imageData = {
            id: user.id,
            fullUrl: imageData,
            name: user.name || 'image',
        };
    }
    if (!imageData && user.imageUrl) {
        imageData = {
            id: user.id,
            fullUrl: user.imageUrl,
            name: user.name || 'image',
        };
    }

    member.value = {
        id: user.id,
        name: user.name || '',
        address: user.address || user.addressLine1 || '',
        addressLine1: user.addressLine1 || '',
        addressLine2: user.addressLine2 || '',
        city: user.city || '',
        email: user.email || '',
        company_email: user.company_email || user.companyEmail || '',
        website: user.website || '',
        phone: user.phone || '',
        phone_key_id: user.phone_key_id || user.phoneKeyId || 1,
        status: user.status || 'pending',
        type: user.type || 'member',
        type_company: user.type_company || user.typeCompany || 'hq',
        country_id: user.country?.id || user.countryId || null,
        user_id: user.user_id || user.user?.id || null,
        image: imageData,
        unhashed_password: user.unhashed_password || '',
        fpp: user.fpp === true || user.fpp === 'yes',
        active: user.active === true,
        user: user.user || null,
    };
}

const updateMember = async () => {
    formLoading.value = true;

    let imageId = null;
    if (member.value.image) {
        if (typeof member.value.image === 'number') {
            imageId = member.value.image;
        } else if (member.value.image.id) {
            imageId = member.value.image.id;
        }
    }

    const payload = {
        name: member.value.name,
        address: member.value.address || member.value.addressLine1,
        city: member.value.city,
        status: member.value.status,
        company_email: member.value.company_email,
        type: member.value.type,
        email: member.value.email,
        phone: member.value.phone,
        website: member.value.website,
        type_company: member.value.type_company,
        phone_key_id: member.value.phone_key_id || 1,
        country_id: member.value.country_id,
        image: imageId,
        fpp: member.value.fpp,
        active: member.value.active,
    };

    if (member.value.unhashed_password && member.value.unhashed_password.length > 0) {
        payload.unhashed_password = member.value.unhashed_password;
    }

    const { data, error } = await useApiFetch(`/api/member-network/${member.value.id}`, {
        method: 'PUT',
        body: payload,
        lazy: true,
    });

    if (data.value) {
        useToast({
            title: 'Success',
            message: 'Company updated successfully',
            type: 'success',
            duration: 5000,
        });
        await userStore.fetchAuthUser();
        memberModalOpen.value = false;
        formLoading.value = false;
    }
    if (error.value) {
        useToast({ title: 'Error', message: error.value.message || 'Something went wrong', type: 'error', duration: 5000 });
        formLoading.value = false;
    }
};

async function openMemberModal() {
    fillData();
    memberModalOpen.value = true;
}

async function closeMemberModal() {
    memberModalOpen.value = false;
    formLoading.value = false;
    showPassword.value = false;
}

watch(
    () => userStore.user,
    () => {
        if (userStore.user) {
            fillData();
        }
    },
    { immediate: true }
);
</script>

<template>
    <div>
        <button class="w-full btn btn-primary btn-sm !text-xs px-3 !font-light btn-rounded gap-2 whitespace-nowrap" type="button" @click="openMemberModal">
            <Icon class="size-4" name="solar:pen-new-round-linear" />
            <span>Edit Company</span>
        </button>

        <TheModal :open-modal="memberModalOpen" size="4xl" @close-modal="closeMemberModal()">
            <template #header>
                <div class="flex justify-between items-center">
                    <div class="font-normal text-lg">Update Company Details</div>
                    <Icon class="w-8 h-8 opacity-50 cursor-pointer hover:opacity-100 ease-in-out duration-300" name="solar:close-square-outline" @click="closeMemberModal" />
                </div>
            </template>
            <template #content>
                <div v-if="formLoading" class="flex justify-center items-center py-20">
                    <Icon name="svg-spinners:3-dots-fade" class="w-12 h-12 text-primary" />
                </div>
                <div v-else class="grid lg:grid-cols-12 gap-5">
                    <div class="lg:col-span-4">
                        <FormUploader v-model="member.image" :allowed-types="['image', 'svg']" label="Company Logo" name="company-logo" />
                    </div>

                    <div class="lg:col-span-8 grid lg:grid-cols-12 gap-5">
                        <FormTextInput 
                            v-model="member.name" 
                            class="lg:col-span-12" 
                            label="Company Name" 
                            name="company-name" 
                            placeholder="Company Name" 
                            disabled 
                        />
                        
                        <div v-if="member.user" class="lg:col-span-12">
                            <label class="form-label opacity-75 font-light">Associated User</label>
                            <div class="flex items-center gap-3 p-2 bg-slate-50 rounded-lg border">
                                <NuxtImg :src="member.user.imageUrl" class="w-8 h-8 rounded-full object-cover" />
                                <div>
                                    <div class="text-sm font-medium">{{ member.user.name }}</div>
                                    <div class="text-xs opacity-50">{{ member.user.email }}</div>
                                </div>
                            </div>
                        </div>

                        <FormTextInput 
                            v-model="member.address" 
                            class="lg:col-span-12" 
                            label="Address" 
                            name="address" 
                            placeholder="Address" 
                        />
                        
                        <FormTextInput 
                            v-model="member.city" 
                            class="lg:col-span-6" 
                            label="City" 
                            name="city" 
                            placeholder="City" 
                        />
                        
                        <FormSelectField
                            id="edit-company-country"
                            v-model="member.country_id"
                            name="edit-company-country"
                            class="lg:col-span-6"
                            label="Country"
                            placeholder="Select country"
                            :select-data="resources.countries"
                            labelvalue="name"
                            keyvalue="id"
                            imgvalue="imageUrl"
                        />
                    </div>

                    <div class="lg:col-span-12 grid lg:grid-cols-12 gap-5">
                        <FormTextInput 
                            v-model="member.email" 
                            class="lg:col-span-6" 
                            label="Login Email" 
                            name="login-email" 
                            placeholder="Login Email" 
                            type="email" 
                            disabled 
                        />
                        <FormTextInput 
                            v-model="member.company_email" 
                            class="lg:col-span-6" 
                            label="Company Email" 
                            name="company-email" 
                            placeholder="Company Email" 
                            type="email" 
                        />
                        <FormTextInput 
                            v-model="member.phone" 
                            class="lg:col-span-6" 
                            label="Phone" 
                            name="phone" 
                            placeholder="Phone" 
                        />
                        <FormTextInput 
                            v-model="member.website" 
                            class="lg:col-span-6" 
                            label="Website" 
                            name="website" 
                            placeholder="Website" 
                        />
                    </div>

                    <div class="lg:col-span-12 grid lg:grid-cols-12 gap-5">
                        <FormSelectField
                            v-model="member.status"
                            class="lg:col-span-4"
                            label="Status"
                            placeholder="Select status"
                            :select-data="[
                                { name: 'Pending', value: 'pending' },
                                { name: 'Approved', value: 'approved' },
                                { name: 'Suspended', value: 'suspended' },
                                { name: 'Blacklisted', value: 'blacklisted' },
                            ]"
                            labelvalue="name"
                            keyvalue="value"
                        />
                        <FormSelectField
                            v-model="member.type"
                            class="lg:col-span-4"
                            label="Member Type"
                            placeholder="Select member type"
                            :select-data="[
                                { name: 'Member', value: 'member' },
                                { name: 'Founder', value: 'founder' },
                                { name: 'Vendor', value: 'vendor' },
                                { name: 'Partner', value: 'partner' },
                            ]"
                            labelvalue="name"
                            keyvalue="value"
                        />
                        <FormSelectField
                            v-model="member.type_company"
                            class="lg:col-span-4"
                            label="Company Type"
                            placeholder="Select company type"
                            :select-data="[
                                { name: 'Headquarters', value: 'hq' },
                                { name: 'Branch', value: 'branch' },
                            ]"
                            labelvalue="name"
                            keyvalue="value"
                        />
                    </div>

               

                
                </div>
            </template>
            <template #footer>
                <div class="w-full flex items-center justify-end gap-5">
                    <button :disabled="formLoading" class="btn-rounded btn-sm btn btn-danger px-4" type="button" @click="closeMemberModal">
                        <Icon :name="formLoading ? 'svg-spinners:3-dots-fade' : 'solar:close-circle-linear'" class="w-5 h-5 mr-2" />
                        <span>Cancel</span>
                    </button>
                    <button :disabled="formLoading" class="btn-rounded btn-sm btn btn-primary px-4" type="button" @click="updateMember">
                        <Icon :name="formLoading ? 'svg-spinners:3-dots-fade' : 'solar:check-circle-broken'" class="w-5 h-5 mr-2" />
                        <span>Update</span>
                    </button>
                </div>
            </template>
        </TheModal>
    </div>
</template>