<template>
    <div v-if="status !== 'pending'">
        <SectionEventsHeader :event="post as Exhibition" />
        <ApplicationWarning />
        <div class="px-6">
            <div class="container bg-white rounded-3xl p-5 my-5 flex flex-col gap-5 text-sm">
                <div class="grid lg:grid-cols-2 gap-5 items-center justify-between">
                    <div class="flex items-center gap-2">
                        <Icon class="size-5 opacity-75" name="solar:buildings-2-line-duotone" />
                        <span>{{ (post as Exhibition).venue }}</span>
                    </div>
                    <div class="lg:place-content-end flex items-center gap-2">
                        <Icon class="size-5 opacity-75" name="solar:map-point-wave-line-duotone" />
                        <div>
                            <span>{{ (post as Exhibition).country?.name }}</span>
                            <span v-if="(post as Exhibition).city" class="font-light">, {{ (post as Exhibition).city }}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon class="size-5 opacity-75" name="solar:calendar-outline" />
                        <span>{{ (post as Exhibition).startDateFormatted }}</span>
                    </div>
                    <div class="lg:place-content-end flex items-center gap-2">
                        <Icon class="size-5 opacity-75" name="solar:sun-line-duotone" />
                        <span>{{ (post as Exhibition).duration }} Days</span>
                    </div>
                </div>
                <div class="bg-slate-50 border rounded-2xl p-3 font-light text-justify">{{ (post as Exhibition).shortDes }}</div>
                <div v-if="(post as Exhibition).gallery.length > 0" class="flex flex-col gap-5">
                    <div class="text-lg text-center">Gallery</div>
                    <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-5">
                        <template v-for="(img, index) in (post as Exhibition).gallery" :key="img.id">
                            <button 
                                type="button"
                                @click="openLightbox(index)"
                                class="group relative rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 hover:scale-[1.02]"
                            >
                                <NuxtImg
                                    :src="img.fullUrl"
                                    :title="(post as Exhibition).title + ' - Photo ' + (index + 1)"
                                    alt="Gallery Image"
                                    class="object-cover w-full h-44"
                                    loading="lazy"
                                />
                                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                            </button>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <!-- Lightbox Overlay -->
        <div 
            v-if="lightbox.isOpen"
            class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95"
            @click.self="closeLightbox"
            tabindex="-1"
            ref="lightboxRef"
        >
            <!-- Close Button -->
            <button
                @click="closeLightbox"
                class="absolute top-4 right-4 z-10 p-2 text-white hover:bg-white/10 rounded-full transition-all duration-200"
                aria-label="Close lightbox"
            >
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <!-- Navigation Buttons -->
            <button
                v-if="lightbox.currentIndex > 0"
                @click="prevImage"
                class="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white hover:bg-white/10 rounded-full transition-all duration-200"
                aria-label="Previous image"
            >
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                v-if="lightbox.currentIndex < ((post as Exhibition)?.gallery.length || 0) - 1"
                @click="nextImage"
                class="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white hover:bg-white/10 rounded-full transition-all duration-200"
                aria-label="Next image"
            >
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>

            <!-- Main Image Container -->
            <div class="flex-1 flex items-center justify-center w-full px-4 pt-4 pb-0">
                <div class="relative max-w-6xl max-h-[70vh] w-full">
                    <!-- Current Image -->
                    <div class="flex items-center justify-center h-full">
                        <NuxtImg
                            :src="currentImage.fullUrl"
                            :alt="currentImage.alt || 'Gallery image'"
                            class="max-w-full max-h-[70vh] object-contain transition-opacity duration-300"
                            :class="{ 'opacity-100': !lightbox.isLoading, 'opacity-0': lightbox.isLoading }"
                            @load="lightbox.isLoading = false"
                            @error="lightbox.isLoading = false"
                        />
                    </div>

                    <!-- Loading Spinner -->
                    <div
                        v-if="lightbox.isLoading"
                        class="absolute inset-0 flex items-center justify-center"
                    >
                        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                    </div>

                    <!-- Image Counter -->
                    <div class="absolute top-4 left-1/2 -translate-x-1/2 text-white bg-black/70 px-4 py-2 rounded-full text-sm">
                        {{ lightbox.currentIndex + 1 }} / {{ (post as Exhibition)?.gallery.length || 0 }}
                    </div>

                    <!-- Image Title -->
                    <div
                        v-if="currentImage"
                        class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center bg-black/70 px-4 py-2 rounded-lg max-w-lg text-sm"
                    >
                        {{ (post as Exhibition)?.title }} - Photo {{ lightbox.currentIndex + 1 }}
                    </div>
                </div>
            </div>

            <!-- Paper Stack Thumbnails Container -->
          
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

const route = useRoute()
const slug = ref(route.params.slug)

const { data: post, status } = await useApiFetch(`/api/get-event/${slug.value}`, {
    lazy: true,
    transform: (post) => (post as ApiResponse).data as Exhibition,
})

// Lightbox state
const lightbox = reactive({
    isOpen: false,
    currentIndex: 0,
    isLoading: false
})

const lightboxRef = ref<HTMLElement>()
const hoveredThumb = ref<number | null>(null)

// Computed current image
const currentImage = computed(() => {
    if (!post.value || !lightbox.isOpen) return { fullUrl: '', alt: '' }
    const img = (post.value as Exhibition).gallery[lightbox.currentIndex]
    return img ? { fullUrl: img.fullUrl, alt: img.alt || '' } : { fullUrl: '', alt: '' }
})

// Calculate thumbnail rotation for paper stack effect
const getThumbRotation = (index: number): number => {
    if (lightbox.currentIndex === index) return 0
    if (hoveredThumb.value === index) return Math.random() * 2 - 1 // subtle random rotation on hover
    
    // Stack effect: slight random rotations
    const baseRotation = (index % 3) - 1 // -1, 0, or 1
    return baseRotation + (Math.random() * 0.5 - 0.25) // Add some randomness
}

// Calculate thumbnail vertical offset for stack effect
const getThumbOffset = (index: number): number => {
    if (lightbox.currentIndex === index) return -5 // Selected thumb pops up
    if (hoveredThumb.value === index) return -3 // Hovered thumb lifts slightly
    return Math.abs(index - lightbox.currentIndex) * 0.5 // Gradual offset based on distance
}

// Open lightbox with specific image
const openLightbox = (index: number) => {
    lightbox.currentIndex = index
    lightbox.isOpen = true
    lightbox.isLoading = true
    document.body.style.overflow = 'hidden'
    
    // Focus lightbox for keyboard navigation
    nextTick(() => {
        lightboxRef.value?.focus()
    })
}

// Close lightbox
const closeLightbox = () => {
    lightbox.isOpen = false
    hoveredThumb.value = null
    document.body.style.overflow = 'auto'
}

// Navigate to specific image
const goToImage = (index: number) => {
    if (index >= 0 && index < ((post.value as Exhibition)?.gallery.length || 0)) {
        lightbox.isLoading = true
        lightbox.currentIndex = index
    }
}

// Next image
const nextImage = () => {
    const galleryLength = (post.value as Exhibition)?.gallery.length || 0
    if (lightbox.currentIndex < galleryLength - 1) {
        lightbox.isLoading = true
        lightbox.currentIndex++
    }
}

// Previous image
const prevImage = () => {
    if (lightbox.currentIndex > 0) {
        lightbox.isLoading = true
        lightbox.currentIndex--
    }
}

// Keyboard navigation
const handleKeydown = (e: KeyboardEvent) => {
    if (!lightbox.isOpen) return
    
    switch(e.key) {
        case 'Escape':
            closeLightbox()
            break
        case 'ArrowLeft':
            e.preventDefault()
            prevImage()
            break
        case 'ArrowRight':
            e.preventDefault()
            nextImage()
            break
    }
}

// Add keyboard event listeners
onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = 'auto'
})

useSeoMeta({
    title: (post.value as Exhibition)?.title,
    description: (post.value as Exhibition)?.shortDes,
})
</script>

<style scoped>
/* Custom scrollbar for paper stack */
.scrollbar-thin {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.scrollbar-thin::-webkit-scrollbar {
    height: 8px;
}

.scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 4px;
    margin: 0 50px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
    background: linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.4));
    border-radius: 4px;
    border: 2px solid transparent;
    background-clip: padding-box;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.5));
}

/* Animation for scroll hint arrows */
@keyframes bounce-x {
    0%, 100% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(5px);
    }
}

.animate-bounce-x {
    animation: bounce-x 1s infinite;
}

/* Paper texture effect */
.bg-paper-texture {
    background-image: 
        radial-gradient(circle at 25% 25%, rgba(255,255,255,.05) 0%, transparent 55%),
        radial-gradient(circle at 75% 75%, rgba(255,255,255,.05) 0%, transparent 55%);
}

/* Smooth transitions for thumbnails */
.thumbnail-transition {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Glow effect for selected thumbnail */
@keyframes selected-glow {
    0%, 100% {
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.3),
                    inset 0 0 20px rgba(255, 255, 255, 0.1);
    }
    50% {
        box-shadow: 0 0 25px rgba(255, 255, 255, 0.4),
                    inset 0 0 30px rgba(255, 255, 255, 0.2);
    }
}

.border-white {
    animation: selected-glow 2s infinite;
}
</style>