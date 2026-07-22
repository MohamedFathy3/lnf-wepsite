<script lang="ts" setup>
import GlobalFreightDay from '@/components/GlobalFreightDay.vue'
import type { ApiResponse, Page, PageSection, Slider } from '~/types';
const route = useRoute();
const slug = ref(route.params.slug);

const { data: page, status } = await useApiFetch(`/api/get-page/${slug.value}`, {
    lazy: true,
    transform: (page) => (page as ApiResponse).data as Page,
});

const { 
    data: sliders, 
    execute: loadSliders,
    status: slidersStatus 
} = await useApiFetch(`/api/get-slider`, {
    transform: (sliders) => (sliders as ApiResponse).data as Slider[],
    immediate: slug.value === 'welcome-network'
});

useSeoMeta({
    title: (page.value as Page)?.name,
    description: (page.value as Page)?.des,
});

const texts = ref<Slider[]>([]);
const currentText = ref('');
const currentId = ref(0);
const currentImageUrl = ref('');
const currentDescription = ref('');
const currentButtonOneActive = ref(false);
const currentButtonTwoActive = ref(false);
const currentButtonOneData = ref({ icon: '', label: '', style: '', target: '' });
const currentButtonTwoData = ref({ icon: '', label: '', style: '', target: '' });
const addIntroClass = ref(false);

let textIndex = 0;
let charIndex = 0;
const typingSpeed = 100;
const pauseDuration = 4000;

const typeText = () => {
    if (!texts.value.length || !texts.value[textIndex]?.text) return;

    const currentSlider = texts.value[textIndex];
    const textToType = currentSlider.text || '';
    
    if (charIndex < textToType.length) {
        currentText.value = textToType.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeText, typingSpeed);
    } else {
        setTimeout(() => {
            textIndex = (textIndex + 1) % texts.value.length;
            charIndex = 0;
            
            const nextSlider = texts.value[textIndex];
            if (nextSlider) {
                currentId.value = nextSlider.id || 0;
                currentImageUrl.value = nextSlider.imageUrl || '';
                currentDescription.value = nextSlider.description || '';
                currentButtonOneActive.value = nextSlider.buttonOneActive || false;
                currentButtonTwoActive.value = nextSlider.buttonTwoActive || false;
                currentButtonOneData.value = nextSlider.buttonOne || { icon: '', label: '', style: '', target: '' };
                currentButtonTwoData.value = nextSlider.buttonTwo || { icon: '', label: '', style: '', target: '' };
            }
            
            typeText();
        }, pauseDuration);
    }
};

watch(sliders, (newSliders) => {
    if (slug.value === 'welcome-network' && newSliders && Array.isArray(newSliders) && newSliders.length > 0) {
        texts.value = newSliders as Slider[];
        
        const firstSlider = texts.value[0];
        if (firstSlider) {
            currentText.value = '';
            currentId.value = firstSlider.id || 0;
            currentImageUrl.value = firstSlider.imageUrl || '';
            currentDescription.value = firstSlider.description || '';
            currentButtonOneActive.value = firstSlider.buttonOneActive || false;
            currentButtonTwoActive.value = firstSlider.buttonTwoActive || false;
            currentButtonOneData.value = firstSlider.buttonOne || { icon: '', label: '', style: '', target: '' };
            currentButtonTwoData.value = firstSlider.buttonTwo || { icon: '', label: '', style: '', target: '' };
            
            textIndex = 0;
            charIndex = 0;
            typeText();
        }
    }
}, { immediate: true });

watch(currentId, () => {
    if (slug.value === 'welcome-network') {
        addIntroClass.value = true;
        setTimeout(() => {
            addIntroClass.value = false;
        }, 1000);
    }
});

onMounted(async () => {
    if (slug.value === 'welcome-network') {
        await loadSliders();
    }
});
</script>

<template>
    <div v-if="status !== 'pending'">
        <GlobalFreightDay v-if="slug === 'global-freight-day'" />

        <div v-else-if="slug === 'about'">
            <div v-if="(page as Page).name && (page as Page).des" class="container my-5 px-6">
                <div class="pl-5 border-l-4 border-primary mb-8">
                    <div class="leading-5 text-xl font-semibold text-justify text-primary" v-html="(page as Page).name" />
                    <div class="leading-5 text-justify mt-1.5" v-html="(page as Page).des" />
                </div>
            </div>
            <SectionAbout :sections="(page as Page).pageSections as PageSection[]" />
        </div>

        <!-- ✅ welcome-network -->
        <div v-else-if="slug === 'welcome-network'">
            <div v-if="(page as Page).pageSections && (page as Page).pageSections.length > 0" class="dynamic-sections">
                <template v-for="(section, index) in (page as Page).pageSections as PageSection[]" :key="`section-${section.id || index}`">
                    <SectionIntro v-if="section.type === 'intro' || section.type === 'grid-home-section'" :section="section" :id="`section-${index}`" />
                    <SectionEventsGrid v-if="section.type === 'events-grid'" :section="section" :id="`section-${index}`" />
                    <SectionTeam v-if="section.type === 'team-grid'" :section="section" :id="`section-${index}`" />
                    <SectionNetwork v-if="section.type === 'network-grid'" :section="section" :id="`section-${index}`" />
                    <SectionIntroNoTitle v-if="section.type === 'intro-no-title'" :section="section" :id="`section-${index}`" />
                    <SectionDefaultWithImage v-if="section.type === 'image-banner-section'" :section="section" :id="`section-${index}`" />
                    <SectionBenefitsGrid v-if="section.type === 'benefits-grid'" :section="section" :id="`section-${index}`" />
                    <SectionBenefitsList v-if="section.type === 'benefits-list'" :section="section" :id="`section-${index}`" />
                    <SectionStatus v-if="section.type === 'site-states'" :section="section" :id="`section-${index}`" />
                    <SectionTestimonials v-if="section.type === 'testimonials-slider'" :section="section" :id="`section-${index}`" />
                    <SectionPartners v-if="section.type === 'partners-slider'" :section="section" :id="`section-${index}`" />
                    <SectionCallToAction v-if="section.type === 'cta'" :section="section" :id="`section-${index}`" />
                    <SectionEvents v-if="section.type === 'events-list'" :section="section" :id="`section-${index}`" />
                    <SectionDirectory v-if="section.type === 'network-directory'" :section="section" :id="`section-${index}`" />
                    <SectionDirectoryBlacklist v-if="section.type === 'blacklisted-directory'" :section="section" :id="`section-${index}`" />
                    <SectionPolicy v-if="section.type === 'privacy-policy'" :section="section" :id="`section-${index}`" />
                    <SectionFaq v-if="section.type === 'faqs-list'" :section="section" :id="`section-${index}`" />
                    <SectionIncoterms v-if="section.type === 'incoterms-list'" :section="section" :id="`section-${index}`" />
                    <SectionFreightCalculator v-if="section.type === 'freight-tools'" :section="section" :id="`section-${index}`" />
                    <SectionContactForm v-if="section.type === 'contact-form'" :section="section" :id="`section-${index}`" />
                    <SectionDefault v-if="section.type === 'about-right-image' || section.type === 'about-left-image' || section.type === 'about-no-image'" :section="section" :id="`section-${index}`" />
                </template>
            </div>

            <div v-else-if="(!(page as Page).pageSections || (page as Page).pageSections.length === 0) && (!sliders || sliders.length === 0)" class="text-center py-20">
                <div class="text-gray-500 dark:text-gray-400">
                    <Icon name="heroicons:inbox" class="w-20 h-20 mx-auto mb-4 opacity-50" />
                    <p class="text-lg font-medium">لا توجد محتويات في هذه الصفحة بعد</p>
                    <p class="text-sm mt-2">أضف بعض الأقسام أو الشرائح لعرضها هنا</p>
                </div>
            </div>
        </div>

        <!-- ✅ dynamic-page, services, home -->
        <div v-else-if="slug === 'dynamic-page' || slug === 'services' || slug === 'home'">
            <div v-if="(page as Page).pageSections && (page as Page).pageSections.length > 0">
                <template v-for="(section, index) in (page as Page).pageSections as PageSection[]" :key="`section-${section.id || index}`">
                    <SectionIntro v-if="section.type === 'intro' || section.type === 'grid-home-section'" :section="section" :id="`section-${index}`" />
                    <SectionEventsGrid v-if="section.type === 'events-grid'" :section="section" :id="`section-${index}`" />
                    <SectionTeam v-if="section.type === 'team-grid'" :section="section" :id="`section-${index}`" />
                    <SectionNetwork v-if="section.type === 'network-grid'" :section="section" :id="`section-${index}`" />
                    <SectionIntroNoTitle v-if="section.type === 'intro-no-title'" :section="section" :id="`section-${index}`" />
                    <SectionDefaultWithImage v-if="section.type === 'image-banner-section'" :section="section" :id="`section-${index}`" />
                    <SectionBenefitsGrid v-if="section.type === 'benefits-grid'" :section="section" :id="`section-${index}`" />
                    <SectionBenefitsList v-if="section.type === 'benefits-list'" :section="section" :id="`section-${index}`" />
                    <SectionStatus v-if="section.type === 'site-states'" :section="section" :id="`section-${index}`" />
                    <SectionTestimonials v-if="section.type === 'testimonials-slider'" :section="section" :id="`section-${index}`" />
                    <SectionPartners v-if="section.type === 'partners-slider'" :section="section" :id="`section-${index}`" />
                    <SectionCallToAction v-if="section.type === 'cta'" :section="section" :id="`section-${index}`" />
                    <SectionEvents v-if="section.type === 'events-list'" :section="section" :id="`section-${index}`" />
                    <SectionDirectory v-if="section.type === 'network-directory'" :section="section" :id="`section-${index}`" />
                    <SectionDirectoryBlacklist v-if="section.type === 'blacklisted-directory'" :section="section" :id="`section-${index}`" />
                    <SectionPolicy v-if="section.type === 'privacy-policy'" :section="section" :id="`section-${index}`" />
                    <SectionFaq v-if="section.type === 'faqs-list'" :section="section" :id="`section-${index}`" />
                    <SectionIncoterms v-if="section.type === 'incoterms-list'" :section="section" :id="`section-${index}`" />
                    <SectionFreightCalculator v-if="section.type === 'freight-tools'" :section="section" :id="`section-${index}`" />
                    <SectionContactForm v-if="section.type === 'contact-form'" :section="section" :id="`section-${index}`" />
                    <SectionDefault v-if="section.type === 'about-right-image' || section.type === 'about-left-image' || section.type === 'about-no-image'" :section="section" :id="`section-${index}`" />
                </template>
            </div>
        </div>

        <!-- ✅ صفحة network-directory مباشرة -->
        <div v-else-if="slug === 'network-directory'">
            <div class="container mx-auto px-4 py-8">
                <div class="text-center mb-8">
                    <h1 class="text-3xl font-bold text-primary">Network Directory</h1>
                    <p class="text-gray-600 mt-2">Browse through our network of members</p>
                </div>
                <!-- ✅ عرض الـ Directory مباشرة -->
                <NetworkDirectory :section="null" />
            </div>
        </div>

        <!-- باقي الصفحات -->
        <div v-else-if="['membership', 'policies', 'terms-and-conditions', 'faq', 'contact', 'events', 'news'].includes(slug as string)">
            <div class="container my-5 px-6"></div>
            <SectionGuideLine v-if="slug === 'membership'" />
            <SectionPolicy v-if="slug === 'policies'" />
            <SectionTOS v-if="slug === 'terms-and-conditions'" />
            <SectionFaq v-if="slug === 'faq'" />
            <SectionContactForm v-if="slug === 'contact'" />
            <SectionEvents v-if="slug === 'events'" :page="page as Page" />
            <SectionArticles v-if="slug === 'news'" />
        </div>

        <!-- صفحة غير معروفة -->
        <div v-else>
            <div class="container my-5 px-6">
                <div v-if="(page as Page).name && (page as Page).des" class="pl-5 border-l-4 border-primary">
                    <div class="leading-5 text-xl font-semibold text-justify text-primary" v-html="(page as Page).name" />
                    <div class="leading-5 text-justify mt-1.5" v-html="(page as Page).des" />
                </div>
            </div>
        </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="status === 'pending'" class="flex justify-center items-center min-h-screen">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
</template>

<style scoped>
.welcome-slider-section {
    margin-top: 0;
    padding-top: 0;
}

.dynamic-sections {
    margin-top: 0;
}

.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
</style>