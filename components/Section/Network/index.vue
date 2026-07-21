<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

const { data: networkLogos, status } = await useApiFetch(`/api/get-logo-company/public`, {
    lazy: true,
    transform: (networkLogos) => (networkLogos as ApiResponse).data as Network[],
});

const props = defineProps<{
    section: PageSection;
}>();

// إنشاء نسخة مضاعفة من البيانات للانسياب المستمر
const duplicatedLogos = ref<Network[]>([]);
const sliderRef = ref<HTMLElement | null>(null);
const animationRef = ref<number | null>(null);
const position = ref(0);
const speed = ref(0.5); // سرعة الحركة (بكسل لكل إطار)
const isPaused = ref(false);

// تهيئة السلايدر
onMounted(() => {
    if (networkLogos.value) {
        // مضاعفة البيانات 3 مرات لضمان الانسيابية
        duplicatedLogos.value = [...networkLogos.value, ...networkLogos.value, ...networkLogos.value];
        startAnimation();
    }
    
    // إضافة مستمعات للماوس
    if (sliderRef.value) {
        sliderRef.value.addEventListener('mouseenter', () => isPaused.value = true);
        sliderRef.value.addEventListener('mouseleave', () => isPaused.value = false);
    }
});

// بدء الحركة
const startAnimation = () => {
    const animate = () => {
        if (!isPaused.value) {
            position.value -= speed.value;
            
            // إعادة التعيين عندما يتحرك السلايدر بالكامل
            if (position.value <= -sliderRef.value!.scrollWidth / 3) {
                position.value = 0;
            }
            
            if (sliderRef.value) {
                sliderRef.value.style.transform = `translateX(${position.value}px)`;
            }
        }
        
        animationRef.value = requestAnimationFrame(animate);
    };
    
    animate();
};

// تنظيف عند تدمير المكون
onUnmounted(() => {
    if (animationRef.value) {
        cancelAnimationFrame(animationRef.value);
    }
});
</script>

<template>
    <section class="py-8 overflow-hidden">
        <div class="text-center max-w-4xl mx-auto pt-8 px-4">
            <div v-if="props.section.postTitle" class="text-lg font-medium" v-html="props.section.postTitle" />
            <div v-if="props.section.title" class="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary" v-html="props.section.title" />
            <div v-if="props.section.description" class="text-lg sm:text-xl font-light mt-3 text-center" v-html="props.section.description" />
        </div>
        
        <!-- حاوية السلايدر -->
        <div class="relative overflow-hidden py-8">
            <!-- تأثير التلاشي من الجوانب -->
            <div class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            
            <!-- السلايدر المتحرك -->
            <ul 
                ref="sliderRef"
                class="flex items-center gap-8 min-w-max"
                :style="{ transform: `translateX(${position}px)` }"
            >
                <li 
                    v-for="(network, index) in duplicatedLogos" 
                    :key="`${network.link}-${index}`"
                    class="flex-shrink-0 px-2"
                >
                    <div class="flex flex-col items-center gap-2 text-center ease-in-out duration-300">
                        <a :href="network.link" target="_blank" rel="noopener noreferrer" class="block w-full">
                            <NuxtImg 
                                :src="network.imageUrl" 
                                :title="network.name" 
                                :alt="network.name" 
                                class="w-full object-contain h-14 sm:h-16 md:h-20 mx-auto rounded-lg transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg"
                            />
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<style scoped>
/* تحسينات للأداء */
ul {
    will-change: transform;
}

/* تأثيرات الشد للصور */
.hover\:scale-105:hover {
    transform: scale(1.05);
}

.hover\:shadow-lg:hover {
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* تلميحات الأداء */
* {
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
}
</style>