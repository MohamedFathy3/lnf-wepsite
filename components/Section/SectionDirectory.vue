<!-- components/SectionDirectory.vue -->
<script setup>
const props = defineProps<{
    section: PageSection,
    id?: string,
}>();
</script>

<template>
    <div :id="id" class="section-directory py-8">
        <div v-if="section.title" class="text-center mb-8">
            <h2 class="text-2xl font-bold text-primary">{{ section.title }}</h2>
            <p v-if="section.subtitle" class="text-gray-600">{{ section.subtitle }}</p>
        </div>
        
        <!-- محتوى الدليل -->
        <NetworkDirectory :section="section" />
    </div>
</template>