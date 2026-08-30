<script lang="ts" setup>
const props = defineProps<{
    title: string;
    icon: string;
}>();
</script>

<template>
    <div>
        <div class="flex items-center gap-3 text-sm font-semibold text-slate-800">
            <span class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon v-if="props.icon" :name="props.icon" class="size-5" />
            </span>
            <div v-if="props.title">{{ props.title }}</div>
        </div>
        <div class="mt-4 font-light">
            <slot />
        </div>
    </div>
</template>
