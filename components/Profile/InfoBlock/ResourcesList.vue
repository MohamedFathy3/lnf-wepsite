<script lang="ts" setup>
const props = defineProps<{
    resource: Resource[] | number[];
    extraResource: string;
    resourceType: string; // service, certificate
}>();
const resourceStore = useResourceStore();
const resourceData = ref<Resource[]>([]);
onMounted(() => {
    if (props.resource && props.resourceType) {
        if (props.resourceType === 'service') {
            resourceData.value = resourceStore.services as Resource[];
        } else if (props.resourceType === 'certificate') {
            resourceData.value = resourceStore.certificates as Resource[];
        }
    }
});
</script>

<template>
    <ul v-if="(props.resource && props.resource.length > 0 && resourceData.length > 0) || props.extraResource" class="flex items-center flex-wrap gap-3">
        <template v-if="props.resource.length > 0">
            <template v-for="(item, index) in resource as number[]" :key="index">
                <li v-if="resourceData.find((_) => _.id === item)?.slug !== 'others'" class="px-3 text-sm py-1 rounded-full bg-primary text-white font-light">
                    {{ resourceData.find((_) => _.id === item)?.name }}
                </li>
            </template>
        </template>
        <li v-if="props.extraResource" class="px-3 text-sm py-1 rounded-full bg-primary text-white font-light">
            {{ props.extraResource }}
        </li>
    </ul>
    <div v-else class="italic">No {{ props.resourceType }} selected</div>
</template>
