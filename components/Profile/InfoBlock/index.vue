<script lang="ts" setup>
const props = defineProps<{
    member: User;
}>();
</script>

<template>
    <div v-if="props.member" class="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_18px_45px_-30px_rgba(15,23,42,0.45)]">
        <div class="flex items-center gap-4 border-b border-slate-100 bg-slate-50/70 px-5 py-5 sm:px-7">
            <div class="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon class="size-6" name="solar:buildings-2-linear" />
            </div>
            <div>
                <div class="text-base font-semibold text-slate-900 sm:text-lg">Company Overview</div>
                <div class="mt-0.5 text-xs text-slate-500">Key details and contact channels</div>
            </div>
        </div>

        <div class="divide-y divide-slate-100 px-5 sm:px-7">
            <ProfileInfoBlockSection class="py-6 first:pt-6" icon="solar:clipboard-list-outline" title="Company details">
                <ProfileInfoBlockList>
                    <ProfileInfoBlockItem title="Company name">{{ props.member.name || 'Not provided' }}</ProfileInfoBlockItem>
                    <ProfileInfoBlockItem title="Address">
                        <div class="text-left md:text-right">
                            <template v-if="props.member.addressLine1 || props.member.addressLine2">
                                <span v-if="props.member.addressLine1">{{ props.member.addressLine1 }}</span>
                                <span v-if="props.member.addressLine2">, {{ props.member.addressLine2 }}</span>
                            </template>
                            <span v-else class="italic text-slate-400">Not provided</span>
                        </div>
                    </ProfileInfoBlockItem>
                    <ProfileInfoBlockItem title="City">{{ props.member.city || 'Not provided' }}</ProfileInfoBlockItem>
                    <ProfileInfoBlockItem title="Country">
                        <ApplicationCountry v-if="props.member.country" :country="props.member.country" size="base" />
                        <span v-else class="italic text-slate-400">Not provided</span>
                    </ProfileInfoBlockItem>
                    <ProfileInfoBlockItem title="Established year">{{ props.member.businessEst || 'Not provided' }}</ProfileInfoBlockItem>
                    <ProfileInfoBlockItem title="Company type">{{ props.member.type_company || props.member.typeCompany || 'Not provided' }}</ProfileInfoBlockItem>
                    <ProfileInfoBlockItem title="IATA / FIATA">{{ props.member.iataFiata || 'Not provided' }}</ProfileInfoBlockItem>
                </ProfileInfoBlockList>
            </ProfileInfoBlockSection>

            <ProfileInfoBlockSection class="py-6" icon="solar:chat-square-call-linear" title="Contact information">
                <ProfileInfoBlockList>
                    <ProfileInfoBlockItem title="Phone">
                        <div class="flex flex-wrap items-center gap-1.5">
                            <span v-if="props.member.phone">{{ props.member.phoneKey ? `+${props.member.phoneKey} ` : '' }}{{ props.member.phone }}</span>
                            <span v-else class="italic text-slate-400">Not provided</span>
                        </div>
                    </ProfileInfoBlockItem>
                    <ProfileInfoBlockItem title="Company email">{{ props.member.companyEmail ?? props.member.email ?? 'Not provided' }}</ProfileInfoBlockItem>
                    <ProfileInfoBlockItem title="Website">{{ props.member.website || 'Not provided' }}</ProfileInfoBlockItem>
                </ProfileInfoBlockList>
            </ProfileInfoBlockSection>

        </div>
    </div>
</template>
