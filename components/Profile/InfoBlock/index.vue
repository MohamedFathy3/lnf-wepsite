<script lang="ts" setup>
const props = defineProps<{
    member: User;
}>();

const copyEmail = async (email: string) => {
    await navigator.clipboard.writeText(email);
    useToast({ title: 'Copied', message: 'Company email copied to clipboard', type: 'success', duration: 2500 });
};
</script>

<template>
    <div v-if="props.member" class="w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_18px_45px_-30px_rgba(15,23,42,0.45)]">
        <!-- Header -->
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/70 px-5 py-5 sm:flex-nowrap sm:px-7">
            <div class="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary">
                <Icon class="size-6" name="solar:buildings-2-linear" />
            </div>
            <div class="mr-auto">
                <div class="text-base font-bold text-slate-900 sm:text-lg">Company Overview</div>
                <div class="typewriter-text mt-0.5 text-xs text-slate-400">Key details and contact channels</div>
            </div>
            <ProfileUpdateButton
                class="w-full sm:w-auto"
                label="Edit Company"
                icon="solar:pen-outline"
                soft
            />
        </div>

        <div class="px-5 py-3 sm:px-12">
            <!-- Company details -->
            <div class="pb-8">
                <div class="mb-4 flex items-center gap-2.5">
                    <div class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary">
                        <Icon class="size-4" name="solar:clipboard-list-outline" />
                    </div>
                    <h3 class="text-sm font-semibold text-slate-800">Company Details</h3>
                </div>

                <div class="">
                    <div class="grid grid-cols-2 items-center gap-4 py-3">
                        <span class="border-b border-dashed border-slate-200 pb-2 text-sm text-slate-400">Company Name</span>
                        <span class="border-b border-dashed border-slate-200 pb-2 text-left text-sm font-medium text-slate-900">{{ props.member.name || 'Not provided' }}</span>
                    </div>
                    <div class="grid grid-cols-2 items-center gap-4 py-3">
                        <span class="border-b border-dashed border-slate-200 pb-2 text-sm text-slate-400">City</span>
                        <span class="border-b border-dashed border-slate-200 pb-2 text-left text-sm font-medium text-slate-900">{{ props.member.city || 'Not provided' }}</span>
                    </div>
                    <div class="grid grid-cols-2 items-center gap-4 py-3">
                        <span class="border-b border-dashed border-slate-200 pb-2 text-sm text-slate-400">Country</span>
                        <span class="flex min-w-0 items-center gap-2 border-b border-dashed border-slate-200 pb-2 text-left text-sm font-medium text-slate-900">
                            <NuxtImg
                                v-if="props.member.country"
                                :alt="props.member.country.name"
                                :src="props.member.country.imageUrl"
                                class="h-4 w-6 shrink-0 rounded-sm"
                            />
                            <span v-if="props.member.country">{{ props.member.country.name }}</span>
                            <span v-else class="text-sm italic text-slate-400">Not provided</span>
                        </span>
                    </div>
                    <div class="grid grid-cols-2 items-center gap-4 py-3">
                        <span class="border-b border-dashed border-slate-200 pb-2 text-sm text-slate-400">Website</span>
                        <span class="border-b border-dashed border-slate-200 pb-2 text-left text-sm font-medium text-slate-900" :class="{ 'italic text-slate-400 font-normal': !props.member.website }">
                            {{ props.member.website || 'Not provided' }}
                        </span>
                    </div>
                    <div class="grid grid-cols-2 items-center gap-4 py-3">
                        <span class="border-b border-dashed border-slate-200 pb-2 text-sm text-slate-400">Year Established</span>
                        <span class="border-b border-dashed border-slate-200 pb-2 text-left text-sm font-medium text-slate-900" :class="{ 'italic text-slate-400 font-normal': !props.member.businessEst }">
                            {{ props.member.businessEst || 'Not provided' }}
                        </span>
                    </div>
                    <div class="grid grid-cols-2 items-center gap-4 py-3">
                        <span class="border-b border-dashed border-slate-200 pb-2 text-sm text-slate-400">Company Type</span>
                        <span
                            class="border-b border-dashed border-slate-200 pb-2 text-left text-sm font-medium text-slate-900"
                            :class="{ 'italic text-slate-400 font-normal': !(props.member.type_company || props.member.typeCompany) }"
                        >
                            {{ props.member.type_company || props.member.typeCompany || 'Not provided' }}
                        </span>
                    </div>
                    <div class="grid grid-cols-2 items-center gap-4 py-3">
                        <span class="border-b border-dashed border-slate-200 pb-2 text-sm text-slate-400">IATA / FIATA</span>
                        <span class="border-b border-dashed border-slate-200 pb-2 text-left text-sm font-medium text-slate-900" :class="{ 'italic text-slate-400 font-normal': !props.member.iataFiata }">
                            {{ props.member.iataFiata || 'Not provided' }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Contact information -->
            <div class="border-t border-slate-100 pt-6">
                <div class="mb-4 flex items-center gap-2.5">
                    <div class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary">
                        <Icon class="size-4" name="solar:chat-square-call-linear" />
                    </div>
                    <h3 class="text-sm font-semibold text-slate-800">Contact Information</h3>
                </div>

                <div class="divide-y divide-slate-100">
                    <div class="grid grid-cols-2 items-center gap-4 py-3">
                        <span class="text-sm text-slate-400">Phone</span>
                        <span v-if="props.member.phone" class="text-left text-sm font-medium text-slate-900">
                            {{ props.member.phoneKey ? `+${props.member.phoneKey} ` : '' }}{{ props.member.phone }}
                        </span>
                        <span v-else class="text-sm italic text-slate-400">Not provided</span>
                    </div>
                    <div class="grid grid-cols-2 items-center gap-4 py-3">
                        <span class="text-sm text-slate-400">Company Email</span>
                        <button
                            v-if="props.member.companyEmail || props.member.email"
                            class="cursor-pointer text-left text-sm font-medium text-slate-900 transition-colors hover:text-primary"
                            type="button"
                            @click="copyEmail(props.member.companyEmail || props.member.email)"
                        >
                            {{ props.member.companyEmail || props.member.email }}
                        </button>
                        <span
                            v-else
                            class="text-sm font-medium text-slate-900"
                            :class="{ 'italic text-slate-400 font-normal': !(props.member.companyEmail || props.member.email) }"
                        >
                            Not provided
                        </span>
                    </div>
                    <div class="grid grid-cols-2 items-center gap-4 py-3">
                        <span class="text-sm text-slate-400">Address</span>
                        <span
                            class="text-left text-sm font-medium text-slate-900"
                            :class="{ 'italic text-slate-400 font-normal': !(props.member.addressLineOne || props.member.addressLineTwo) }"
                        >
                            <template v-if="props.member.addressLineOne || props.member.addressLineTwo">
                                {{ props.member.addressLineOne }}<span v-if="props.member.addressLineTwo">, {{ props.member.addressLineTwo }}</span>
                            </template>
                            <template v-else>Not provided</template>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.typewriter-text {
    width: 0;
    max-width: 100%;
    overflow: hidden;
    border-right: 1px solid currentColor;
    white-space: nowrap;
    animation:
        typewriter 5s steps(32, end) infinite,
        typewriter-caret 0.75s step-end infinite;
}

@keyframes typewriter {
    from {
        width: 0;
    }

    to {
        width: 100%;
    }
}

@keyframes typewriter-caret {
    50% {
        border-color: transparent;
    }
}
</style>