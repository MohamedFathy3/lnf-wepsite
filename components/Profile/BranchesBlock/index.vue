<script lang="ts" setup>
import type { User } from '~/types';

const props = withDefaults(
    defineProps<{
        members: User[];
        groupName?: string;
        showSummary?: boolean;
    }>(),
    { groupName: '', showSummary: false },
);

const isCompaniesModalOpen = ref(false);

const filteredMembers = computed(() => {
    const members = props.members;
    if (!Array.isArray(members) || members.length === 0) return [];

    return [...members]
        .filter((member) => Boolean(member))
        .sort((a, b) => {
            const aHq = a?.type_company === 'hq' || a?.typeCompany === 'hq';
            const bHq = b?.type_company === 'hq' || b?.typeCompany === 'hq';
            if (aHq === bHq) return 0;
            return aHq ? -1 : 1;
        });
});

const groupTitle = computed(() => props.groupName.trim() || 'Group companies');
const firstCompany = computed(() => filteredMembers.value[0]);
const additionalCompanies = computed(() => filteredMembers.value.slice(1));
const additionalCompaniesCount = computed(() => additionalCompanies.value.length);
</script>

<template>
    <div v-if="filteredMembers.length">
        <template v-if="props.showSummary">
            <div class="flex items-center gap-3">
                <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon class="size-5" name="solar:users-group-rounded-bold" />
                </span>
                <div class="min-w-0">
                    <div class="truncate font-semibold text-slate-800">{{ groupTitle }}</div>
                    <p class="mt-0.5 text-xs text-slate-500">Companies in this group</p>
                </div>
                <span class="ml-auto rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    {{ filteredMembers.length }}
                </span>
            </div>

            <div class="mt-3">
                <ProfileBranchesBlockCard :member="firstCompany" />
            </div>

            <button
                v-if="additionalCompaniesCount"
                class="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-primary/15 bg-primary/[0.04] px-4 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                type="button"
                @click="isCompaniesModalOpen = true"
            >
                <span>More companies</span>
                <span class="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-primary shadow-sm">
                    +{{ additionalCompaniesCount }}
                </span>
                <Icon class="size-4" name="solar:arrow-right-linear" />
            </button>

            <HeadlessTransitionRoot :show="isCompaniesModalOpen" appear as="template">
                <HeadlessDialog as="div" class="relative z-[9999]" @close="isCompaniesModalOpen = false">
                    <HeadlessTransitionChild
                        as="template"
                        enter="duration-200 ease-out"
                        enter-from="opacity-0"
                        enter-to="opacity-100"
                        leave="duration-150 ease-in"
                        leave-from="opacity-100"
                        leave-to="opacity-0"
                    >
                        <div class="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" />
                    </HeadlessTransitionChild>

                    <div class="fixed inset-0 overflow-y-auto p-4 sm:p-6">
                        <div class="flex min-h-full items-center justify-center">
                            <HeadlessTransitionChild
                                as="template"
                                enter="duration-200 ease-out"
                                enter-from="opacity-0 scale-95"
                                enter-to="opacity-100 scale-100"
                                leave="duration-150 ease-in"
                                leave-from="opacity-100 scale-100"
                                leave-to="opacity-0 scale-95"
                            >
                                <HeadlessDialogPanel class="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-2xl">
                                    <div class="flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-4 py-4 sm:px-6">
                                        <span class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <Icon class="size-6" name="solar:users-group-rounded-bold" />
                                        </span>
                                        <div class="min-w-0 flex-1">
                                            <HeadlessDialogTitle class="truncate text-base font-bold text-slate-900 sm:text-lg">
                                                {{ groupTitle }}
                                            </HeadlessDialogTitle>
                                            <p class="mt-0.5 text-xs text-slate-500 sm:text-sm">
                                                {{ additionalCompaniesCount }} more companies
                                            </p>
                                        </div>
                                        <button
                                            aria-label="Close companies"
                                            class="flex size-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-200 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                                            type="button"
                                            @click="isCompaniesModalOpen = false"
                                        >
                                            <Icon class="size-5" name="solar:close-circle-outline" />
                                        </button>
                                    </div>

                                    <div class="max-h-[65vh] overflow-y-auto p-4 sm:p-6">
                                        <div class="flex flex-col gap-3">
                                            <ProfileBranchesBlockCard
                                                v-for="member in additionalCompanies"
                                                :key="member.id"
                                                :member="member"
                                            />
                                        </div>
                                    </div>
                                </HeadlessDialogPanel>
                            </HeadlessTransitionChild>
                        </div>
                    </div>
                </HeadlessDialog>
            </HeadlessTransitionRoot>
        </template>

        <div v-else class="mt-3 flex flex-col gap-3">
            <ProfileBranchesBlockCard v-for="member in filteredMembers" :key="member.id" :member="member" />
        </div>
    </div>
</template>