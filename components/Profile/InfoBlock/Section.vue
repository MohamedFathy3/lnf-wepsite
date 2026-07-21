<script lang="ts" setup>
const props = defineProps<{
    title: string;
    icon: string;
}>();
</script>

<template>
    <div>
        <div class="flex items-center gap-3">
            <Icon v-if="props.icon" :name="props.icon" class="size-6 opacity-65" />
            <div v-if="props.title">{{ props.title }}</div>
        </div>
        <div class="mt-2 font-light ml-9">
            <slot />
        </div>
    </div>
</template>
