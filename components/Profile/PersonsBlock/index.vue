<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        persons?: ContactPerson[];
        networkPersons?: ContactPerson[];
        canEdit: boolean;
        canDelete: boolean;
    }>(),
    {
        canEdit: false,
        canDelete: false,
        persons: () => [],
        networkPersons: () => [],
    },
);

const allPersons = computed(() => {
    const combined = [...(props.persons || []), ...(props.networkPersons || [])];
    return combined.filter((person, index, self) => index === self.findIndex((p) => p.id === person.id));
});
</script>

<template>
    <div class="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.45)]">
        <div class="flex items-center gap-3">
            <span class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon class="size-5" name="solar:users-group-two-rounded-linear" />
            </span>
            <div>
                <div class="text-sm font-semibold text-slate-800">Contact persons</div>
                <div class="text-xs text-slate-400">People to reach at this company</div>
            </div>
            <span class="ml-auto rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">{{ allPersons.length }}</span>
        </div>

        <div class="mt-4 flex flex-col gap-3">
            <template v-if="allPersons && allPersons.length > 0">
                <template v-for="person in allPersons" :key="person.id">
                    <ProfilePersonsBlockCard :can-delete="canDelete" :can-edit="canEdit" :person="person" />
                </template>
            </template>
            <div v-else class="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-8 text-center text-sm italic text-slate-400">No contact persons found</div>
        </div>
    </div>
</template>
