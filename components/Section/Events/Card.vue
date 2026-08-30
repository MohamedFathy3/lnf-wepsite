<script lang="ts" setup>
// تأكد من تعريف الـ Props بشكل صحيح
const props = defineProps<{
    event: Exhibition;
}>();

// أو استخدم هذا إذا كان الـ Props مش بيشتغل
// const props = defineProps(['event']);

const screenWidth = ref(0);

function splitDate(dateString: string) {
    if (!dateString) return ['', '', ''];
    return dateString.split(','); 
}

// دالة للتحقق مما إذا كان الحدث مستقبلياً
function isEventUpcoming(endDate: string) {
    if (!endDate) return false;
    return new Date(endDate) > new Date();
}

// دالة للتحقق من وجود بيانات
function hasEventData() {
    return props.event && Object.keys(props.event).length > 0;
}

onMounted(() => {
    screenWidth.value = window.innerWidth;
    window.addEventListener('resize', handleResize);
    console.log('Event Data:', props.event); // للتأكد من وصول البيانات
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});

watch(screenWidth, () => {
    handleResize();
});

function handleResize() {
    screenWidth.value = window.innerWidth;
}
</script>

<template>
    <!-- إضافة شرط للتأكد من وجود بيانات -->
    <div v-if="event && Object.keys(event).length > 0" class="intro-x mt-4 grid grid-cols-12 items-start lg:gap-4 overflow-hidden text-base bg-white rounded-3xl min-h-64">
        <div class="relative xl:col-span-4 col-span-12 group bg-white border h-full overflow-hidden">
            <div class="z-30 absolute top-0 left-0 py-2 px-4 text-white bg-primary text-center">
                <template v-if="event.startDateFront">
                    <div class="font-bold">{{ splitDate(event.startDateFront)[0] }}</div>
                    <div class="font-light">{{ splitDate(event.startDateFront)[1] }}</div>
                    <div class="font-semibold">{{ splitDate(event.startDateFront)[2] }}</div>
                </template>
            </div>
            <NuxtImg 
                v-if="event.imageUrl" 
                :alt="event.title || 'Event Image'" 
                :src="event.imageUrl" 
                class="object-cover w-full h-full inset-0 group-hover:scale-125 ease-in-out duration-[4s]" 
                fallback="/images/fallback-image.jpg"
            />
            <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                <Icon name="solar:image-linear" class="size-12 text-gray-400" />
            </div>
        </div>
        <div class="xl:col-span-8 col-span-12 h-full p-4">
            <h1 v-if="event.title" class="text-lg font-semibold capitalize pb-2 border-b truncate">
                {{ event.title }}
            </h1>
            <h1 v-else class="text-lg font-semibold capitalize pb-2 border-b truncate text-gray-400">
                Untitled Event
            </h1>
            
            <div class="mt-2 border-b pb-3">
                <div class="md:flex items-center justify-between gap-6 py-1 md:space-y-0 space-y-2">
                    <div v-if="event.venue" class="flex items-center gap-2">
                        <Icon class="size-6 opacity-75" name="solar:buildings-2-line-duotone" />
                        <span>{{ event.venue }}</span>
                    </div>
                    <div v-if="event.country?.name" class="flex items-center gap-2">
                        <Icon class="size-6 opacity-75" name="solar:map-point-wave-line-duotone" />
                        <div>
                            <span>{{ event.country.name }}</span>
                            <span v-if="event.city" class="font-light">, {{ event.city }}</span>
                        </div>
                    </div>
                </div>
                
                <div class="md:flex items-center sm:mt-0 mt-2 md:gap-6 md:space-y-0 space-y-2 flex-wrap">
                    <div v-if="event.companies" class="flex items-center gap-2">
                        <Icon class="size-6 opacity-75" name="solar:buildings-linear" />
                        <div>
                            <span>{{ event.companies.toLocaleString() }}</span>
                            <span class="ml-1">Companies</span>
                        </div>
                    </div>
                    <div v-if="event.delegates" class="flex items-center gap-2">
                        <Icon class="size-6 opacity-75" name="solar:users-group-two-rounded-outline" />
                        <div>
                            <span>{{ event.delegates.toLocaleString() }}</span>
                            <span class="ml-1">Delegates</span>
                        </div>
                    </div>
                    <div v-if="event.sessions" class="flex items-center gap-2">
                        <Icon class="size-6 opacity-75" name="solar:chat-square-arrow-linear" />
                        <div>
                            <span>{{ event.sessions }}</span>
                            <span class="ml-1">Sessions</span>
                        </div>
                    </div>
                    <div v-if="event.countries" class="flex items-center gap-2">
                        <Icon class="size-6 opacity-75" name="solar:earth-outline" />
                        <div>
                            <span>{{ event.countries }}</span>
                            <span class="ml-1">Countries</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <p v-if="event.shortDes" class="mt-2 font-light text-justify line-clamp-5">
                {{ event.shortDes }}
            </p>
            
            <!-- عرض معرض الصور إذا وجد -->
            <div v-if="event.gallery && event.gallery.length > 0" class="flex items-center gap-4 p-1 border mt-2 rounded-md overflow-x-auto">
             <template v-for="(image, index) in event.gallery" :key="image.id">
  <div
    v-if="screenWidth >= 1400 ? index < 12 : screenWidth >= 768 ? index < 8 : index < 4"
    class="group bg-white w-12 h-12 rounded-md border overflow-hidden flex-shrink-0"
  >
    <NuxtImg
      :alt="event.title || 'Gallery Image'"
      :src="image.fullUrl"
      class="object-cover w-full h-full rounded-md group-hover:scale-125 ease-in-out duration-300"
      fallback="/images/fallback-image.jpg"
    />
  </div>
</template>
            </div>
            
            <!-- عرض الأزرار -->
            <div class="mt-5">
                <!-- إذا كان الحدث مستقبلي وله رابط -->
                <a v-if="isEventUpcoming(event.endDate) && event.urlPath" :href="event.urlPath" target="_blank">
                    <button class="btn btn-rounded btn-primary w-full">
                        {{ event.urlText || 'Register Now' }}
                    </button>
                </a>
                <!-- إذا كان الحدث منتهي وله معرض صور -->
                <template v-else-if="!isEventUpcoming(event.endDate) && event.gallery && event.gallery.length > 0">
                    <NuxtLink :href="'/event/' + event.slug">
                        <button class="btn btn-rounded btn-primary w-full">View Gallery</button>
                    </NuxtLink>
                </template>
                <!-- إذا كان الحدث منتهي وليس له معرض -->
                <div v-else-if="!isEventUpcoming(event.endDate)" class="text-center text-gray-500 text-sm py-2">
                    <Icon name="solar:calendar-close-linear" class="inline-block size-4 mr-1" />
                    Event has ended
                </div>
                <!-- إذا كان الحدث مستقبلي ولكن ليس له رابط -->
                <div v-else class="text-center text-gray-500 text-sm py-2">
                    <Icon name="solar:clock-circle-linear" class="inline-block size-4 mr-1" />
                    Registration coming soon
                </div>
            </div>
        </div>
    </div>
    
    <!-- عرض رسالة إذا لم توجد بيانات -->
    <div v-else class="intro-x mt-4 grid grid-cols-12 items-start lg:gap-4 overflow-hidden text-base bg-white rounded-3xl min-h-64 p-8 text-center">
        <div class="col-span-12">
            <Icon name="solar:database-linear" class="size-12 text-gray-400 mx-auto" />
            <p class="text-gray-500 mt-2">No event data available</p>
        </div>
    </div>
</template>