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
    <li class="flex flex-col items-start gap-1.5 py-3.5 text-sm sm:flex-row sm:justify-between sm:gap-6">
        <div v-if="props.title" class="shrink-0 text-xs font-medium uppercase tracking-[0.12em] text-slate-400">{{ props.title }}</div>
        <div class="min-w-0 max-w-full break-words text-left font-medium text-slate-700 sm:text-right">
            <slot />
        </div>
    </li>
</template>
