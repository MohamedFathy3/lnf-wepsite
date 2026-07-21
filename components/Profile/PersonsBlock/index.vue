<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        persons: ContactPerson[];
        canEdit: boolean;
        canDelete: boolean;
    }>(),
    {
        canEdit: false,
        canDelete: false,
    },
);
</script>

<template>
    <div>
        <div class="flex items-center gap-3">
            <Icon class="size-6 opacity-65" name="solar:users-group-two-rounded-linear" />
            <div>Contact Persons</div>
        </div>
        <div class="mt-3 flex flex-col gap-3">
            <template v-if="props.persons && props.persons.length > 0">
                <template v-for="person in props.persons" :key="person.id">
                    <ProfilePersonsBlockCard :can-delete="canDelete" :can-edit="canEdit" :person="person" />
                </template>
            </template>
            <div v-else class="italic text-sm p-5 border-2 border-dashed bg-white text-center rounded-2xl text-slate-600 font-light">No Contact Persons found</div>
        </div>
    </div>
</template>
