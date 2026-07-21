<script lang="ts" setup>
const membershipTypes = ref([
    { name: 'Member', value: 'member' },
    { name: 'Founder', value: 'founder' },
    { name: 'Partner', value: 'partner' },
    { name: 'Vendor', value: 'vendor' },
    { name: 'Non Member', value: 'non_member' },
    { name: 'WSA Team', value: 'wsa_team' },
]);
const props = defineProps<{
    type: string;
}>();

const elementStyle = computed(() => {
    if (props.type && membershipTypes.value.some((type) => type.value === props.type)) {
        const type = props.type;
        switch (type) {
            case 'member':
                return 'bg-success/25 text-green-700 border !border-success/25';
            case 'founder':
                return 'bg-blue-100 text-blue-700 border !border-blue-200';
            case 'partner':
                return 'bg-yellow-100 text-yellow-700 border !border-yellow-200';
            case 'vendor':
                return 'bg-yellow-100 text-yellow-700 border !border-yellow-200';
            case 'non_member':
                return 'bg-slate-100 text-slate-700 border !border-slate-200';
            case 'wsa_team':
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
    <span :class="elementStyle" class="text-xs font-medium py-[0.23rem] px-2 rounded-full">{{ membershipTypes.find((t) => t.value === props.type)?.name }}</span>
</template>
