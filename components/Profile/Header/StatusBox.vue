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
        mode: 'common',
    },
);
</script>

<template>
    <div
        :class="[
            props.mode === 'common' && 'border-white/20 bg-white/10 text-white',
            props.mode === 'warning' && 'border-amber-200/30 bg-amber-300/15 text-white',
            props.mode === 'success' && 'border-emerald-200/25 bg-emerald-400/20 text-white',
            props.mode === 'danger' && 'border-rose-200/25 bg-rose-400/20 text-white',
            props.mode === 'primary' && 'border-sky-200/25 bg-sky-400/20 text-white',
            'flex min-h-[96px] flex-col items-center justify-center gap-2 rounded-2xl border px-3 py-4 text-center shadow-lg shadow-slate-950/10 backdrop-blur-sm',
        ]"
    >
        <div v-if="props.title" class="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/65">{{ props.title }}</div>
        <Icon v-if="props.icon" :name="props.icon" class="size-6 text-white/90" />
        <div v-if="props.value" class="text-sm font-semibold capitalize sm:text-base">{{ props.value }}</div>
    </div>
</template>
