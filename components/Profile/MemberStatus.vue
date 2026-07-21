<script lang="ts" setup>
const membershipStatues = ref([
    { name: 'Pending', value: 'pending' },
    { name: 'Approved', value: 'approved' },
    { name: 'Suspended', value: 'suspended' },
    { name: 'Blacklisted', value: 'blacklisted' },
]);

const props = defineProps<{
    type: string;
}>();

const elementStyle = computed(() => {
    if (props.type && membershipStatues.value.some((type) => type.value === props.type)) {
        const type = props.type;
        switch (type) {
            case 'approved':
                return 'bg-success/25 text-green-700 border !border-success/25';
            case 'suspended':
                return 'bg-yellow-100 text-yellow-700 border !border-yellow-200';
            case 'pending':
                return 'bg-slate-100 text-slate-700 border !border-slate-200';
            case 'blacklisted':
                return 'bg-red-100 text-red-700 border !border-red-200';
            default:
                return 'bg-slate-100 text-slate-700 border !border-slate-200';
        }
    } else {
        return '';
    }
});
</script>

<template>
    <span :class="elementStyle" class="text-xs font-medium py-[0.23rem] px-2 rounded-full">{{ membershipStatues.find((t) => t.value === props.type)?.name }}</span>
</template>
