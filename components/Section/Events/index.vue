<script lang="ts" setup>
const tabs = ref([
    { id: 'conferences', name: 'Conferences' },
    { id: 'exhibitions', name: 'Exhibitions' },
]);
const activeTab = ref('conferences');
const viewTab = (tabId: string) => {
    activeTab.value = tabId;
};

const { data: events, status } = await useApiFetch(`/api/get-event`, {
    lazy: true,
    transform: (events) => (events as ApiResponse).data as Exhibition[],
});

console.log('data:', events.value);

// دوال مساعدة للتصفية
const getConferences = () => {
    if (!events.value) return [];
    return events.value.filter(e => e.type === 'conferences');
};

const getExhibitions = () => {
    if (!events.value) return [];
    return events.value.filter(e => e.type === 'exhibitions');
};

const getUpcomingConferences = () => {
    return getConferences().filter(e => !e.eventOver);
};

const getPastConferences = () => {
    return getConferences().filter(e => e.eventOver);
};

const getUpcomingExhibitions = () => {
    return getExhibitions().filter(e => !e.eventOver);
};

const getPastExhibitions = () => {
    return getExhibitions().filter(e => e.eventOver);
};
</script>

<template>
    <div class="w-full bg-[#16508d] py-10 md:py-16 lg:py-20 flex items-center justify-center"
        style="position: relative;top: -24px;"
    >
        <div class="text-center text-white">
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide">
                Conferences & Exhibitions
            </h1>
         
        </div>
    </div>

    <!-- ===== المحتوى ===== -->
    <div v-if="status !== 'pending'">
        <!-- المحتوى داخل Container -->
        <div class="mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-12 max-w-7xl">
            <!-- التبويبات -->
            <div class="max-w-2xl mx-auto flex items-center gap-3 sm:gap-5 place-content-center flex-wrap">
                <template v-for="tab in tabs" :key="tab.id">
                    <button 
                        :class="[
                            activeTab === tab.id 
                                ? 'bg-[#16508d] text-white shadow-lg shadow-[#16508d]/30' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                            'btn btn-rounded px-5 sm:px-6 gap-2 sm:gap-3 transition-all duration-300 ease-in-out'
                        ]"
                        type="button" 
                        @click="viewTab(tab.id)"
                    >
                        <Icon class="size-4 sm:size-5" name="solar:calendar-line-duotone" />
                        <span class="text-sm sm:text-base">{{ tab.name }}</span>
                      
                       
                    </button>
                </template>
            </div>

            <!-- محتوى الأحداث -->
            <div class="mt-8 md:mt-12">
                <!-- ============ تبويب المؤتمرات ============ -->
                <div v-if="activeTab === 'conferences'" class="flex flex-col gap-5 md:gap-6">
                    <!-- المؤتمرات القادمة -->
                    <template v-if="getUpcomingConferences().length > 0">
                        <div class="flex items-center gap-3">
                            <div class="w-1 h-8 bg-green-500 rounded-full"></div>
                            <Icon class="size-6 text-green-500" name="solar:calendar-check-line-duotone" />
                            <div class="font-semibold text-xl text-gray-800">Upcoming Conferences</div>
                            <span class="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                {{ getUpcomingConferences().length }}
                            </span>
                        </div>
                        <template v-for="event in getUpcomingConferences()" :key="event.id">
                            <div class="transform transition-all duration-300 hover:scale-[1.01] hover:shadow-lg rounded-2xl">
                                <SectionEventsCard :event="event" />
                            </div>
                        </template>
                        <div class="border-b border-gray-200 my-4" />
                    </template>

                    <!-- المؤتمرات السابقة -->
                    <template v-if="getPastConferences().length > 0">
                        <div class="flex items-center gap-3 mt-4">
                            <div class="w-1 h-8 bg-[#ff2929] rounded-full"></div>
                            <Icon class="size-6 text-[#ff2929]" name="solar:calendar-close-line-duotone" />
                            <div class="font-semibold text-xl text-gray-800">Previous Conferences</div>
                            <span class="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                {{ getPastConferences().length }}
                            </span>
                        </div>
                        <template v-for="event in getPastConferences()" :key="event.id">
                            <div class="transform transition-all duration-300 hover:scale-[1.01] hover:shadow-lg rounded-2xl opacity-90">
                                <SectionEventsCard :event="event" />
                            </div>
                        </template>
                    </template>

                    <!-- حالة عدم وجود مؤتمرات -->
                    <div v-if="getConferences().length === 0" 
                         class="text-center py-12 bg-gray-50 rounded-2xl">
                        <Icon name="solar:microphone-3-slash-line-duotone" class="size-16 text-gray-300 mx-auto" />
                        <p class="text-gray-500 mt-3 text-lg">No conferences found</p>
                        <p class="text-gray-400 text-sm">Check back later for upcoming events</p>
                    </div>
                </div>

                <!-- ============ تبويب المعارض ============ -->
                <div v-if="activeTab === 'exhibitions'" class="flex flex-col gap-5 md:gap-6">
                    <!-- المعارض القادمة -->
                    <template v-if="getUpcomingExhibitions().length > 0">
                        <div class="flex items-center gap-3">
                            <div class="w-1 h-8 bg-green-500 rounded-full"></div>
                            <Icon class="size-6 text-green-500" name="solar:gallery-check-line-duotone" />
                            <div class="font-semibold text-xl text-gray-800">Upcoming Exhibitions</div>
                            <span class="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                {{ getUpcomingExhibitions().length }}
                            </span>
                        </div>
                        <template v-for="event in getUpcomingExhibitions()" :key="event.id">
                            <div class="transform transition-all duration-300 hover:scale-[1.01] hover:shadow-lg rounded-2xl">
                                <SectionEventsCard :event="event" />
                            </div>
                        </template>
                        <div class="border-b border-gray-200 my-4" />
                    </template>

                    <!-- المعارض السابقة -->
                    <template v-if="getPastExhibitions().length > 0">
                        <div class="flex items-center gap-3 mt-4">
                            <div class="w-1 h-8 bg-[#ff2929] rounded-full"></div>
                            <Icon class="size-6 text-[#ff2929]" name="solar:gallery-close-line-duotone" />
                            <div class="font-semibold text-xl text-gray-800">Previous Exhibitions</div>
                            <span class="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                {{ getPastExhibitions().length }}
                            </span>
                        </div>
                        <template v-for="event in getPastExhibitions()" :key="event.id">
                            <div class="transform transition-all duration-300 hover:scale-[1.01] hover:shadow-lg rounded-2xl opacity-90">
                                <SectionEventsCard :event="event" />
                            </div>
                        </template>
                    </template>

                    <!-- حالة عدم وجود معارض -->
                    <div v-if="getExhibitions().length === 0" 
                         class="text-center py-12 bg-gray-50 rounded-2xl">
                        <Icon name="solar:gallery-slash-line-duotone" class="size-16 text-gray-300 mx-auto" />
                        <p class="text-gray-500 mt-3 text-lg">No exhibitions found</p>
                        <p class="text-gray-400 text-sm">Check back later for upcoming events</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- حالة التحميل -->
    <div v-else class="min-h-[40vh] flex items-center justify-center">
        <div class="flex flex-col items-center gap-4">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#16508d] border-t-transparent"></div>
            <p class="text-gray-500 text-sm">Loading events...</p>
        </div>
    </div>
</template>

<style scoped>
/* تنسيقات عامة */
.btn {
    transition: all 0.3s ease-in-out;
    font-weight: 500;
    border-radius: 9999px;
    padding: 0.5rem 1.25rem;
    position: relative;
}

.btn:active {
    transform: scale(0.95);
}

.btn:hover:not(.bg-[#16508d]) {
    transform: translateY(-2px);
}

.rounded-2xl {
    border-radius: 1rem;
}

.animate-spin {
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.max-w-7xl {
    max-width: 80rem;
}

/* استجابة للشاشات الصغيرة */
@media (max-width: 640px) {
    .max-w-7xl {
        padding-left: 1rem;
        padding-right: 1rem;
    }
}
</style>