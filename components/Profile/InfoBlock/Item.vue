<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        title: string | null;
    }>(),
    {
        title: null,
    },
);
</script>

<template>
    <li class="grid grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] items-center gap-2 py-2 text-sm leading-5">
        <div v-if="props.title" class="min-w-0 text-sm font-medium text-slate-500">{{ props.title }}</div>
        <div class="min-w-0 break-words text-left font-medium text-slate-700">
            <slot />
        </div>
    </li>
</template>
