<script setup>
import { register } from 'swiper/element/bundle';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

register();

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});

// دالة للحصول على كلاسات الأزرار
const getButtonClass = (style) => {
    const classes = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
        outline: 'bg-transparent border-2 border-white text-white hover:bg-white/20',
        warning: 'bg-yellow-500 hover:bg-yellow-600 text-white', // أضفنا warning style
        danger: 'bg-red-600 hover:bg-red-700 text-white',
        success: 'bg-green-600 hover:bg-green-700 text-white',
    };
    return classes[style] || classes.primary;
};

// دالة للتحقق من الرابط الخارجي
const isExternalLink = (url) => {
    return url?.startsWith('http') || url?.startsWith('//') || url?.startsWith('https');
};



// دالة لفتح الرابط في تاب جديد
const openLink = (target, event) => {
    if (target) {
        if (isExternalLink(target)) {
            window.open(target, '_blank', 'noopener,noreferrer');
        } else {
            // رابط داخلي
            const nuxtApp = useNuxtApp();
            nuxtApp.$router.push(target);
        }
    }
    event.stopPropagation();
};
</script>

<template>
    <div class="slider-container">
        <ClientOnly>
            <swiper-container 
                :modules="[Autoplay, EffectFade, Navigation, Pagination]" 
                :navigation="true"
                :pagination="true" 
                :slides-per-view="1" 
                :loop="true" 
                :effect="'fade'"
                :autoplay="{ delay: 4000, disableOnInteraction: false }">
                
                <swiper-slide v-for="(slide, idx) in data" :key="slide.id || idx">
                    <!-- خلفية الصورة -->
                     <div 
                        class="slide-wrapper"
                        @click="slide.buttonOne && slide.buttonOneActive === 1 && slide.buttonOne.target ? openLink(slide.buttonOne.target, $event) : null"
                        :class="{
                            'cursor-pointer': slide.buttonOne && slide.buttonOneActive === 1 && slide.buttonOne.target,
                            'cursor-default': !slide.buttonOne || !slide.buttonOneActive || !slide.buttonOne.target
                        }">
                    <div 
                        class="slide-background"
                        :style="{
                            backgroundImage: slide.imageUrl ? `url(${slide.imageUrl})` : 'none',
                        }">
                    </div>
                    
                    <!-- محتوى السلايد - نعرضه حتى لو لا يوجد نص -->
                    <div class="slide-content">
                        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div class="text-center text-white">
                                <!-- العنوان -->
                                <div v-if="slide.text"
                                    class="slide-title"
                                    v-html="slide.text" />
                                
                                <!-- الوصف -->
                                <div v-if="slide.description" 
                                    class="slide-description"
                                    v-html="slide.description" />
                                
                                <!-- الأزرار - نعرضها إذا كان هناك زر نشط -->
                                <div v-if="slide.buttonOneActive === 1 || slide.buttonOneActive === true"
                                    class="slide-buttons">
                                    
                                    <!-- الحالة 1: رابط NuxtLink داخلي -->
                                    <!-- <NuxtLink 
                                        v-if="slide.buttonOne && slide.buttonOne.target && !isExternalLink(slide.buttonOne.target) && slide.buttonOne.label"
                                        :to="slide.buttonOne.target"
                                        class="button-link mt-10">
                                        <button
                                            :class="['btn btn-lg btn-rounded', getButtonClass(slide.buttonOne.style)]">
                                            {{ slide.buttonOne.label }}
                                        </button>
                                    </NuxtLink> -->
                                    
                                    <!-- الحالة 2: رابط خارجي -->
                                    <!-- <a 
                                        v-else-if="slide.buttonOne && slide.buttonOne.target && isExternalLink(slide.buttonOne.target) && slide.buttonOne.label"
                                        :href="slide.buttonOne.target"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="button-link mt-10">
                                        <button
                                            :class="['btn btn-lg btn-rounded', getButtonClass(slide.buttonOne.style)]">
                                            {{ slide.buttonOne.label }}
                                        </button>
                                    </a> -->
                                    
                                    <!-- الحالة 3: زر بدون رابط -->
                                    <!-- <button
                                        v-else-if="slide.buttonOne && slide.buttonOne.label"
                                        :class="['btn btn-lg btn-rounded', getButtonClass(slide.buttonOne.style)]">
                                        {{ slide.buttonOne.label }}
                                    </button> -->
                                </div>
                            </div>
                        </div>
                    </div>
</div>
                </swiper-slide>
            </swiper-container>
        </ClientOnly>
    </div>
</template>

<style scoped>
/* Container للسلايدر */
.slider-container {
    width: 100%;
    position: relative;
    overflow: hidden;
}

/* خلفية الصورة */
.slide-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 1;
}

/* محتوى السلايد */
.slide-content {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

/* العنوان */
.slide-title {
    font-weight: bold;
    line-height: 1.2;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    margin-bottom: 1rem;
}

/* الوصف */
.slide-description {
    line-height: 1.4;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    margin-bottom: 1.5rem;
}

/* الأزرار */
.slide-buttons {
    display: flex;
    justify-content: center;
}

/* تنسيق رابط الأزرار */
.button-link {
    text-decoration: none;
    display: inline-block;
    position: relative;
    z-index: 10;
}

/* تصميم الأزرار */
.btn {
    padding: 0.75rem 2rem;
    font-size: 1.125rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
    outline: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-weight: 600;
}

.btn-lg {
    padding: 1rem 2.5rem;
    font-size: 1.25rem;
}

/* تأثيرات Hover */
.btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn:active {
    transform: translateY(-1px);
}

/* ============ RESPONSIVE BREAKPOINTS ============ */

/* Mobile Extra Small (0-359px) */
@media (max-width: 359px) {
    swiper-slide {
        min-height: 280px !important;
        height: 280px !important;
    }
    
    .slide-title {
        font-size: 1.25rem;
        line-height: 1.3;
    }
    
    .slide-description {
        font-size: 0.875rem;
    }
    
    .btn {
        padding: 0.5rem 1.25rem;
        font-size: 0.875rem;
    }
    
    .btn-lg {
        padding: 0.625rem 1.5rem;
        font-size: 0.875rem;
    }
}

/* Mobile Small (360-479px) */
@media (min-width: 360px) and (max-width: 479px) {
    swiper-slide {
        min-height: 220px !important;
        height: 220px !important;
    }
    
    .slide-title {
        font-size: 1.5rem;
        line-height: 1.3;
    }
    
    .slide-description {
        font-size: 1rem;
    }
    
    .slide-content {
        padding: 1rem;
    }
}

/* Mobile (480-639px) */
@media (min-width: 480px) and (max-width: 639px) {
    swiper-slide {
        min-height: 310px !important;
        height: 310px !important;
    }
    
    .slide-title {
        font-size: 1.75rem;
    }
    
    .slide-description {
        font-size: 1.125rem;
    }
}

/* Tablet Small (640-767px) */
@media (min-width: 640px) and (max-width: 767px) {
    swiper-slide {
        min-height: 380px !important;
        height: 380px !important;
    }
    
    .slide-title {
        font-size: 2rem;
    }
    
    .slide-description {
        font-size: 1.25rem;
    }
    
    .slide-content {
        padding: 1.5rem;
    }
}

/* Tablet (768-1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
    swiper-slide {
        min-height: 420px !important;
        height: 420px !important;
    }
    
    .slide-title {
        font-size: 2.25rem;
    }
    
    .slide-description {
        font-size: 1.375rem;
    }
    
    .btn-lg {
        padding: 0.875rem 2.25rem;
        font-size: 1.25rem;
    }
}

/* Laptop Small (1024-1279px) */
@media (min-width: 1024px) and (max-width: 1279px) {
    swiper-slide {
        min-height: 500px !important;
        height: 500px !important;
    }
    
    .slide-title {
        font-size: 2.75rem;
    }
    
    .slide-description {
        font-size: 1.5rem;
    }
    
    .slide-content {
        padding: 2rem;
    }
}

/* Laptop Large (1280-1439px) */
@media (min-width: 1280px) and (max-width: 1439px) {
    swiper-slide {
        min-height: 550px !important;
        height: 550px !important;
    }
    
    .slide-title {
        font-size: 3.25rem;
    }
    
    .slide-description {
        font-size: 1.75rem;
    }
}
@media (min-width: 1440px) and (max-width: 1636px) {
    swiper-slide {
        min-height: 500px !important;
        height: 700px !important;
    }
    
    .slide-title {
        font-size: 3.75rem;
    }
    
    .slide-description {
        font-size: 2rem;
    }
    
    .btn-lg {
        padding: 1rem 3rem;
        font-size: 1.5rem;
    }
}

/* Desktop (1440-1919px) */
@media (min-width: 1636px) and (max-width: 1736px) {
    swiper-slide {
        min-height: 400px !important;
        height: 700px !important;
    }
    
    .slide-title {
        font-size: 3.75rem;
    }
    
    .slide-description {
        font-size: 2rem;
    }
    
    .btn-lg {
        padding: 1rem 3rem;
        font-size: 1.5rem;
    }
}

/* Desktop Large (1736-1999px) */
@media (min-width: 1736px) and (max-width: 1999px) {
    swiper-slide {
        min-height: 800px !important;
        height: 800px !important;
    }
    
    .slide-title {
        font-size: 4rem;
    }
    
    .slide-description {
        font-size: 2.25rem;
    }
    
    .btn-lg {
        padding: 1.25rem 3.5rem;
        font-size: 1.75rem;
    }
}

/* Desktop Extra Large (1920px فما فوق) */
@media (min-width: 1920px) {
    swiper-slide {
        min-height: 800px !important;
        height: 800px !important;
    }
    
    .slide-title {
        font-size: 4.5rem;
    }
    
    .slide-description {
        font-size: 2.5rem;
    }
}

/* ============ FIXES ============ */

/* تأكد من أن swiper-slide يأخذ الأبعاد الصحيحة */
swiper-slide {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* إصلاح للشاشات الطويلة (Landscape) */
@media (orientation: landscape) and (max-height: 500px) {
    swiper-slide {
        min-height: 100vh !important;
        height: 100vh !important;
    }
    
    .slide-title {
        font-size: 1.5rem !important;
    }
    
    .slide-description {
        font-size: 1rem !important;
    }
    
    .btn {
        padding: 0.5rem 1.5rem !important;
        font-size: 0.875rem !important;
    }
}

/* تحسين لشاشات 4K */
@media (min-width: 2560px) {
    swiper-slide {
        min-height: 900px !important;
        height: 900px !important;
    }
    
    .slide-title {
        font-size: 5rem;
    }
    
    .slide-description {
        font-size: 3rem;
    }
    
    .btn-lg {
        padding: 2rem 5rem;
        font-size: 2.5rem;
    }
}

/* تحسينات Hover */
@media (hover: hover) and (pointer: fine) {
    .btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
    }
}

/* تحسينات للمس الشاشة */
@media (hover: none) and (pointer: coarse) {
    .btn:active {
        transform: scale(0.98);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
}

/* تحسين للقراءة على الشاشات الصغيرة */
@media (max-width: 639px) {
    .slide-content {
        padding-top: 3rem;
        padding-bottom: 3rem;
    }
}

/* إخفاء الأزرار الافتراضية على الموبايل */
@media (max-width: 767px) {
    :deep(.swiper-button-next),
    :deep(.swiper-button-prev) {
        display: none !important;
    }
}

/* تحسين للـ Pagination على الشاشات الصغيرة */
@media (max-width: 639px) {
    :deep(.swiper-pagination-bullet) {
        width: 8px;
        height: 8px;
        margin: 0 4px !important;
    }
    
    :deep(.swiper-pagination) {
        bottom: 10px !important;
    }
}

/* تحسينات للوصول Accessibility */
.btn:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
}

/* تحسينات للتحميل */
.slide-background {
    background-color: #f3f4f6; /* لون خلفية أثناء التحميل */
}

/* تحسينات للطباعة */
@media print {
    .slider-container {
        display: none;
    }
}
</style>