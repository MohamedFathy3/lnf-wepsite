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
    <li class="py-2 flex md:flex-row flex-col items-start md:justify-between gap-y-2 gap-x-5">
        <div v-if="props.title" class="opacity-65">{{ props.title }}:</div>
        <div class="font-light">
            <slot />
        </div>
    </li>
</template>
