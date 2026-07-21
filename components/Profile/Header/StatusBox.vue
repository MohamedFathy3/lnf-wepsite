<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        title: string | null;
        icon: string | null;
        mode: string;
        value: string | number | null;
    }>(),
    {
        title: null,
        value: null,
        icon: null,
        mode: 'common', // common, warning, success, danger, primary
    },
);
</script>

<template>
    <div
        :class="[
            props.mode === 'common' && 'bg-slate-50 !text-slate-700',
            props.mode === 'warning' && 'bg-warning !text-slate-900',
            props.mode === 'success' && 'bg-success !text-white',
            props.mode === 'danger' && 'bg-danger !text-white',
            props.mode === 'primary' && 'bg-primary !text-white',
            'text-center p-3 text-sm font-light rounded-2xl w-full min-h-24 flex flex-col items-center place-content-center gap-2 ring-4 !ring-slate-200/10',
        ]"
    >
        <div v-if="props.title" class="font-light">{{ props.title }}</div>
        <Icon v-if="props.icon" :name="props.icon" class="size-6 mx-auto" />
        <div v-if="props.value" class="font-medium">{{ props.value }}</div>
    </div>
</template>
