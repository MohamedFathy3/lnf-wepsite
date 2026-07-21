<script lang="ts" setup>
const props = defineProps<{
    section: PageSection;
}>();
</script>

<template>
    <div class="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div class="container mx-auto px-4 md:px-6">
            <!-- Header Section -->
            <div class="flex flex-col items-center text-center mb-12 md:mb-16 gap-6">
                <!-- Optional Image/Icon -->
                <template v-if="props.section.imageUrl">
                    <div class="relative w-32 h-32 md:w-60 md:h-70 rounded-full ">
                        <NuxtImg
                            :alt="props.section.name"
                            :src="props.section.imageUrl"
                            :title="props.section.name"
                            class="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                        />
                        <!-- Animated ring -->
                        <div class="absolute inset-0 rounded-full border-2 border-primary-400/30 animate-ping" style="animation-duration: 3s;"></div>
                    </div>
                </template>

                <!-- Title & Subtitle -->
                <div class="max-w-4xl mx-auto">
                    <!-- Title with custom color #32456c -->
                    <div v-if="props.section.title" 
                         class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
                        <span class="bg-gradient-to-r from-[#32456c] to-[#4a6491] bg-clip-text text-transparent" v-html="props.section.title" />
                    </div>
                    
                    <!-- Subtitle -->
                    <div v-if="props.section.subTitle" 
                         class="text-xl md:text-2xl font-semibold text-[#32456c] dark:text-primary-400 mb-5">
                        <span v-html="props.section.subTitle" />
                    </div>
                    
                    <!-- Description -->
                    <div v-if="props.section.description" 
                         class="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                        <span v-html="props.section.description" />
                    </div>
                </div>

                <!-- Action Buttons -->
                <div v-if="props.section.buttonOneActive || props.section.buttonTwoActive" 
                     class="flex flex-wrap justify-center gap-4 mt-8">
                    <NuxtLink v-if="props.section.buttonOneActive && props.section.buttonUrlOne" 
                             :to="props.section.buttonUrlOne"
                             class="inline-flex items-center gap-2 transition-all duration-300 hover:scale-105">
                        <button :class="[
                            'px-6 py-3 rounded-lg font-medium transition-all duration-300',
                            'shadow-lg hover:shadow-xl flex items-center gap-2',
                            'min-w-[140px]',
                            props.section.buttonStyleOne === 'primary' 
                                ? 'bg-gradient-to-r from-[#32456c] to-[#4a6491] hover:from-[#4a6491] hover:to-[#32456c] text-white border border-transparent' 
                                : props.section.buttonStyleOne === 'secondary'
                                ? 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-[#32456c] dark:text-primary-400 border border-[#32456c] dark:border-primary-400'
                                : 'bg-gray-800 dark:bg-gray-900 hover:bg-gray-900 dark:hover:bg-gray-950 text-white border border-transparent'
                        ]">
                            <Icon v-if="props.section.buttonIconOne" 
                                 :name="props.section.buttonIconOne" 
                                 class="w-5 h-5" />
                            {{ props.section.buttonTextOne }}
                        </button>
                    </NuxtLink>
                    
                    <NuxtLink v-if="props.section.buttonTwoActive && props.section.buttonUrlTwo" 
                             :to="props.section.buttonUrlTwo"
                             class="inline-flex items-center gap-2 transition-all duration-300 hover:scale-105">
                        <button :class="[
                            'px-6 py-3 rounded-lg font-medium transition-all duration-300',
                            'shadow-lg hover:shadow-xl flex items-center gap-2',
                            'min-w-[140px]',
                            props.section.buttonStyleTwo === 'primary' 
                                ? 'bg-gradient-to-r from-[#32456c] to-[#4a6491] hover:from-[#4a6491] hover:to-[#32456c] text-white border border-transparent' 
                                : props.section.buttonStyleTwo === 'secondary'
                                ? 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-[#32456c] dark:text-primary-400 border border-[#32456c] dark:border-primary-400'
                                : 'bg-gray-800 dark:bg-gray-900 hover:bg-gray-900 dark:hover:bg-gray-950 text-white border border-transparent'
                        ]">
                            <Icon v-if="props.section.buttonIconTwo" 
                                 :name="props.section.buttonIconTwo" 
                                 class="w-5 h-5" />
                            {{ props.section.buttonTextTwo }}
                        </button>
                    </NuxtLink>
                </div>
            </div>

            <!-- Features/Steps Grid -->
            <div v-if="props.section.children && props.section.children.length > 0" 
                 class="relative">
                <!-- Decorative line for desktop -->
                <div class="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#32456c] to-transparent hidden lg:block opacity-30" 
                     style="transform: translateY(-50%);" />
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    <div v-for="(item, index) in props.section.children" 
                         :key="item.id || index"
                         class="relative intro-x">
                        <!-- Step/Card Container -->
                        <div class="relative h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg 
                                  hover:shadow-2xl transition-all duration-500 hover:-translate-y-3
                                  border border-gray-200 dark:border-gray-700 overflow-hidden
                                  group before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#32456c]/5 before:to-transparent before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:duration-500">
                            <!-- Number Badge with gradient -->
                            <div class="absolute -top-4 -left-4 w-16 h-16 rounded-full 
                                      bg-gradient-to-br from-[#32456c] to-[#4a6491] 
                                      flex items-center justify-center text-white font-bold 
                                      text-xl shadow-xl z-10 group-hover:scale-110 
                                      transition-transform duration-300 ring-4 ring-white dark:ring-gray-800">
                                {{ index + 1 }}
                            </div>
                            
                            <!-- Card Content -->
                            <div class="p-6 md:p-8 pt-12 relative z-0">
                                <!-- Title with accent color -->
                                <h3 class="text-xl font-bold text-[#32456c] dark:text-primary-400 mb-4 
                                          group-hover:text-[#4a6491] dark:group-hover:text-primary-300 
                                          transition-colors duration-300">
                                    {{ item.title }}
                                </h3>
                                
                                <!-- Description -->
                                <p class="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">
                                    {{ item.des }}
                                </p>
                                
                                <!-- Optional Icon/Image for item -->
                                <template v-if="item.imageUrl">
                                    <div class="mt-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                        <NuxtImg
                                            :src="item.imageUrl"
                                            :alt="item.title"
                                            class="w-full h-48 object-cover rounded-lg 
                                                   group-hover:scale-110 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                        <!-- Image overlay -->
                                        <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>
                                </template>
                                
                                <!-- Optional Item Button -->
                                <div v-if="item.buttonText && item.buttonUrl" class="mt-6">
                                    <NuxtLink :to="item.buttonUrl" 
                                             class="inline-flex items-center gap-2 text-[#32456c] dark:text-primary-400 
                                                    hover:text-[#4a6491] dark:hover:text-primary-300 font-medium 
                                                    group/btn">
                                        <span class="relative">
                                            {{ item.buttonText }}
                                            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#32456c] dark:bg-primary-400 group-hover/btn:w-full transition-all duration-300"></span>
                                        </span>
                                        <Icon name="heroicons:arrow-right" class="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                                    </NuxtLink>
                                </div>
                            </div>
                            
                      
                            
                            <!-- Hover effect border -->
                            <div class="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#32456c]/20 dark:group-hover:border-primary-400/20 transition-all duration-500 pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </div>

         
        </div>
    </div>
</template>

<style scoped>
/* Animation for the cards */
.intro-x {
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Stagger animation delay for cards */
.intro-x:nth-child(1) { animation-delay: 0.1s; }
.intro-x:nth-child(2) { animation-delay: 0.2s; }
.intro-x:nth-child(3) { animation-delay: 0.3s; }
.intro-x:nth-child(4) { animation-delay: 0.4s; }
.intro-x:nth-child(5) { animation-delay: 0.5s; }
.intro-x:nth-child(6) { animation-delay: 0.6s; }

/* Gradient text for the title */
.gradient-text {
    background: linear-gradient(135deg, #32456c 0%, #4a6491 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Custom scrollbar for the section */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #32456c, #4a6491);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #4a6491, #32456c);
}

/* Dark mode scrollbar */
.dark ::-webkit-scrollbar-track {
    background: #2d3748;
}

.dark ::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #4a6491, #32456c);
}

.dark ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #5b7bb4, #4a6491);
}
</style>