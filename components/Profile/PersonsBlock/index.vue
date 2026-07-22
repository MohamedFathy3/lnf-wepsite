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

// دمج الـ persons مع الـ networkPersons
const allPersons = computed(() => {
    const combined = [...(props.persons || []), ...(props.networkPersons || [])];
    // إزالة التكرارات بناءً على الـ id
    const unique = combined.filter((person, index, self) => 
        index === self.findIndex((p) => p.id === person.id)
    );
    return unique;
});
</script>

<template>
    <div>
        <div class="flex items-center gap-3">
            <Icon class="size-6 opacity-65" name="solar:users-group-two-rounded-linear" />
            <div>Contact Persons</div>
            <span class="text-xs bg-slate-100 px-2 py-0.5 rounded-full opacity-75">{{ allPersons.length }}</span>
        </div>
        <div class="mt-3 flex flex-col gap-3">
            <template v-if="allPersons && allPersons.length > 0">
                <template v-for="person in allPersons" :key="person.id">
                    <ProfilePersonsBlockCard :can-delete="canDelete" :can-edit="canEdit" :person="person" />
                </template>
            </template>
            <div v-else class="italic text-sm p-5 border-2 border-dashed bg-white text-center rounded-2xl text-slate-600 font-light">
                No Contact Persons found
            </div>
        </div>
    </div>
</template>