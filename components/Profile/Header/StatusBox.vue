<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        title: string | null;
        icon: string | null;
        image?: string | null;
        mode: string;
        value: string | number | null;
    }>(),
    {
        title: null,
        value: null,
        icon: null,
        image: null,
        mode: 'common',
    },
);

// ✅ نحسب لو القيمة طويلة
const isLongValue = computed(() => {
    return typeof props.value === 'string' && props.value.length > 12;
});
</script>

<template>
    <div
        :class="[
            props.mode === 'common' && 'border-white bg-white text-slate-900',
            props.mode === 'warning' && 'border-amber-200/30 bg-amber-300/15 text-white',
            props.mode === 'success' && 'bg-success !text-white',
            props.mode === 'danger' && 'border-rose-200/25 bg-rose-400/20 text-white',
            props.mode === 'primary' && 'border-sky-200/25 bg-sky-400/20 text-white',
            props.mode === 'success'
                ? 'text-center p-2 text-sm font-light rounded-2xl w-full min-h-20 flex flex-col items-center place-content-center gap-1 ring-4 !ring-slate-200/10'
                : 'flex min-h-20 w-full flex-col items-center justify-center gap-1 rounded-xl border px-3 py-2 text-center shadow-md shadow-slate-950/10 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] sm:px-3',
        ]"
    >
        <!-- العنوان -->
        <div
            v-if="props.title"
            :class="[
                'w-full text-[9px] font-semibold uppercase tracking-[0.14em] line-clamp-1 sm:text-[10px]',
                props.mode === 'common' ? 'text-slate-700' : props.image ? 'text-white' : 'text-white/75',
            ]"
        >
            {{ props.title }}
        </div>

        <!-- الصورة -->
        <NuxtImg
            v-if="props.image"
            :src="props.image"
            class="h-10 w-32 object-contain"
        />

        <!-- الأيقونة -->
            <Icon v-else-if="props.icon" :name="props.icon" class="size-7 text-white/90 sm:size-8" />

        <!-- القيمة -->
        <div
            v-if="props.value && !props.image"
            :class="[
                'w-full break-words px-0.5 text-xs font-semibold capitalize leading-tight sm:text-sm',
                'text-white',
                isLongValue ? 'line-clamp-2 text-[11px] sm:text-xs' : '',
            ]"
            :title="String(props.value)"
        >
            {{ props.value }}
        </div>
    </div>
</template>

