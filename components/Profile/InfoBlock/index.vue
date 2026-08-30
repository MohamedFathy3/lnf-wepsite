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
                <div class="text-base font-semibold text-slate-900 sm:text-lg">Company overview</div>
                <div class="mt-0.5 text-xs text-slate-500">Key details and contact channels</div>
            </div>
        </div>

        <div class="divide-y divide-slate-100 px-5 sm:px-7">
            <ProfileInfoBlockSection class="py-6 first:pt-6" icon="solar:clipboard-list-outline" title="Company details">
                <ProfileInfoBlockList>
                    <ProfileInfoBlockItem v-if="props.member.addressLine1 || props.member.addressLine2" title="Address">
                        <div class="text-left md:text-right">
                            <span v-if="props.member.addressLine1">{{ props.member.addressLine1 }}</span>
                            <span v-if="props.member.addressLine2">, {{ props.member.addressLine2 }}</span>
                        </div>
                    </ProfileInfoBlockItem>
                    <ProfileInfoBlockItem v-if="props.member.postalCode" title="Postal code">{{ props.member.postalCode }}</ProfileInfoBlockItem>
                    <ProfileInfoBlockItem v-if="props.member.city" title="City">{{ props.member.city }}</ProfileInfoBlockItem>
                    <ProfileInfoBlockItem v-if="props.member.state" title="State">{{ props.member.state }}</ProfileInfoBlockItem>
                    <ProfileInfoBlockItem v-if="props.member.country" title="Country">
                        <ApplicationCountry :country="props.member.country" size="base" />
                    </ProfileInfoBlockItem>
                    <ProfileInfoBlockItem v-if="props.member.businessEst" title="Established year">{{ props.member.businessEst }}</ProfileInfoBlockItem>
                    <ProfileInfoBlockItem v-if="props.member.profile" title="About">
                        <p class="leading-6 text-slate-600">{{ props.member.profile }}</p>
                    </ProfileInfoBlockItem>
                </ProfileInfoBlockList>
            </ProfileInfoBlockSection>

            <ProfileInfoBlockSection class="py-6" icon="solar:chat-square-call-linear" title="Contact information">
                <ProfileInfoBlockList>
                    <ProfileInfoBlockItem v-if="props.member.phone" title="Phone">
                        <div class="flex flex-wrap items-center gap-1.5">
                            <span v-if="props.member.phoneKey">+{{ props.member.phoneKey }}</span>
                            <span>{{ props.member.phone }}</span>
                        </div>
                    </ProfileInfoBlockItem>
                    <ProfileInfoBlockItem v-if="props.member.fax" title="Fax">
                        <div class="flex flex-wrap items-center gap-1.5">
                            <span v-if="props.member.faxKey">+{{ props.member.faxKey }}</span>
                            <span>{{ props.member.fax }}</span>
                        </div>
                    </ProfileInfoBlockItem>
                    <ProfileInfoBlockItem v-if="props.member.companyEmail || props.member.email" title="Company email">
                        {{ props.member.companyEmail ?? props.member.email }}
                    </ProfileInfoBlockItem>
                </ProfileInfoBlockList>
            </ProfileInfoBlockSection>

            <ProfileInfoBlockSection v-if="props.member.website" class="py-6 last:pb-6" icon="solar:global-outline" title="Website">
                <a
                    :href="props.member.website"
                    class="inline-flex max-w-full items-center gap-2 break-all text-primary transition hover:text-[#0e477c] hover:underline"
                    rel="noreferrer"
                    target="_blank"
                >
                    <span>{{ props.member.website }}</span>
                    <Icon class="size-4 shrink-0" name="solar:arrow-up-right-linear" />
                </a>
            </ProfileInfoBlockSection>
        </div>
    </div>
</template>
