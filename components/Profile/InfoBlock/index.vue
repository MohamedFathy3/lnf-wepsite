<script lang="ts" setup>
const props = defineProps<{
    member: User;
}>();
</script>

<template>
    <div v-if="props.member" class="bg-white p-5 rounded-2xl border flex flex-col gap-5 divide-y divide-dashed">
        <ProfileInfoBlockSection class="py-3" icon="solar:clipboard-list-outline" title="Company Details">
            <ProfileInfoBlockList>
                <ProfileInfoBlockItem v-if="props.member.addressLine1 || props.member.addressLine2" title="Address">
                    <div class="text-left md:text-right">
                        <span v-if="props.member.addressLine1">{{ props.member.addressLine1 }}</span>
                        <span v-if="props.member.addressLine2">, {{ props.member.addressLine2 }}</span>
                    </div>
                </ProfileInfoBlockItem>
                <ProfileInfoBlockItem v-if="props.member.postalCode" title="Postal Code"> {{ props.member.postalCode }} </ProfileInfoBlockItem>
                <ProfileInfoBlockItem v-if="props.member.city" title="City"> {{ props.member.city }} </ProfileInfoBlockItem>
                <ProfileInfoBlockItem v-if="props.member.state" title="State"> {{ props.member.state }} </ProfileInfoBlockItem>
                <ProfileInfoBlockItem v-if="props.member.country" title="Country">
                    <ApplicationCountry :country="props.member.country" size="base" />
                </ProfileInfoBlockItem>
                <ProfileInfoBlockItem v-if="props.member.businessEst" title="Established Year">
                    {{ props.member.businessEst }}
                </ProfileInfoBlockItem>
                <ProfileInfoBlockItem v-if="props.member.profile">
                    <p class="font-light">{{ props.member.profile }}</p>
                </ProfileInfoBlockItem>
            </ProfileInfoBlockList>
        </ProfileInfoBlockSection>
        <ProfileInfoBlockSection class="py-3" icon="solar:chat-square-call-linear" title="Contact Information">
            <ProfileInfoBlockList>
                <ProfileInfoBlockItem v-if="props.member.phone" title="Phone">
                    <div class="flex items-center gap-1.5">
                        <span>+{{ props.member.phoneKey }}</span>
                        <span>{{ props.member.phone }}</span>
                    </div>
                </ProfileInfoBlockItem>
                <ProfileInfoBlockItem v-if="props.member.fax" title="Fax">
                    <div class="flex items-center gap-1.5">
                        <span>+{{ props.member.faxKey }}</span>
                        <span>{{ props.member.fax }}</span>
                    </div>
                </ProfileInfoBlockItem>
                <ProfileInfoBlockItem v-if="props.member.city" title="Company Email">
                    {{ props.member.companyEmail ?? props.member.email }}
                </ProfileInfoBlockItem>
            </ProfileInfoBlockList>
        </ProfileInfoBlockSection>
        <ProfileInfoBlockSection class="py-3" icon="solar:global-outline" title="Website">
            <div>{{ props.member.website }}</div>
        </ProfileInfoBlockSection>
        <ProfileInfoBlockSection class="py-3" icon="solar:round-transfer-vertical-outline" title="Services">
            <ProfileInfoBlockResourcesList :extra-resource="props.member.otherServices as string" :resource="props.member.services as number[]" resource-type="service" />
        </ProfileInfoBlockSection>
        <ProfileInfoBlockSection class="py-3" icon="solar:medal-ribbon-star-outline" title="Certificates">
            <ProfileInfoBlockResourcesList :extra-resource="props.member.otherCertificates as string" :resource="props.member.certificates as number[]" resource-type="certificate" />
        </ProfileInfoBlockSection>
    </div>
</template>
