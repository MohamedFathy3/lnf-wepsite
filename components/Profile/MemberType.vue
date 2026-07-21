<script lang="ts" setup>
const companyTypes = ref([
    { name: 'HQ', id: 'hq' },
    { name: 'Branch', id: 'branch' },
]);
const props = defineProps<{
    status: string;
}>();
</script>

<template>
    <span
        v-if="props.status"
        :class="[props.status === 'hq' ? 'bg-yellow-300 !border-yellow-400' : 'bg-slate-200 !border-slate-300']"
        class="text-slate-800 truncate text-xs py-0.5 px-2 rounded-full border font-normal"
    >
        {{ companyTypes.find((t) => t.id === props.status)?.name }}
    </span>
</template>
