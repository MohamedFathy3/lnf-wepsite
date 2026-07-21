<script setup>
definePageMeta({
    middleware: ['auth'],
});

const isLoading = ref(false);
const user = ref(useUserStore().user);
const votes = ref(
    Array.from({ length: 5 }, () => ({
        countryId: null,
        memberId: null,
        countryMembers: [],
    })),
);

// استخدم computed بدلاً من watchEffect
const filteredVotes = computed(() => {
    return votes.value
        .filter((vote) => vote.countryId !== null && vote.memberId !== null)
        .map((vote) => ({
            countryId: vote.countryId,
            memberId: vote.memberId,
        }));
});

const finalVotes = computed(() => ({
    userId: user.value?.id,
    vote: filteredVotes.value,
}));

const pageTitle = ref(useSettingValue('vote_page_title'));
const submitVoteButton = ref(useSettingValue('vote_submit_button_text'));
const skipVoteButton = ref(useSettingValue('vote_skip_button_text'));
const voteErrorTitle = ref(useSettingValue('vote_error_title'));
const voteErrorMessage = ref(useSettingValue('vote_error_message'));
const page = ref({
    name: pageTitle.value,
});

// استخدام cache أفضل
const countryMembersCache = ref({});
const loadingCountries = ref({}); 

async function getCountryUsers(id, index) {
    if (!id) return;
    
    if (countryMembersCache.value[id]) {
        votes.value[index].countryMembers = countryMembersCache.value[id];
        return;
    }
    
    if (loadingCountries.value[id]) return;
    
    loadingCountries.value[id] = true;
    
    try {
        const { data, error } = await useApiFetch(`/api/network-report/vote/country/${id}`, {
            lazy: true,
        });
        
        if (data.value) {
            const filteredMembers = data.value.data.filter(
                (member) => member.id !== user.value?.id || id !== user.value?.countryId
            );
            
            votes.value[index].countryMembers = filteredMembers;
            countryMembersCache.value[id] = filteredMembers;
        }
    } catch (error) {
        console.error('Error fetching country users:', error);
    } finally {
        loadingCountries.value[id] = false;
    }
}

watch(
    () => votes.value.map(v => v.countryId),
    async (newCountryIds, oldCountryIds) => {
        for (let index = 0; index < votes.value.length; index++) {
            const vote = votes.value[index];
            const oldId = oldCountryIds?.[index];
            
            if (vote.countryId && vote.countryId !== oldId) {
                await getCountryUsers(vote.countryId, index);
            }
            
            if (!vote.countryId) {
                vote.memberId = null;
                vote.countryMembers = [];
            }
        }
    },
    { deep: true }
);

function isCountryIdDuplicated(countryId, currentIndex) {
    return votes.value.some((vote, index) => index !== currentIndex && vote.countryId === countryId);
}

async function submitVote() {
    if (finalVotes.value.vote.length === 0) {
        useToast({ title: voteErrorTitle.value, message: voteErrorMessage.value, type: 'error', duration: 5000 });
        return false;
    } else {
        const { data, error } = await useApiFetch(`/api/network/vote/member`, {
            method: 'POST',
            body: finalVotes.value,
            lazy: true,
        });
        if (data.value) {
            useToast({ title: voteErrorTitle.value, message: voteErrorMessage.value, type: 'error', duration: 5000 });
            await navigateTo('/dashboard');
        }
    }
}

const resources = useResourceStore();
</script>

<template>
    <div>
        <PageHeader :page="page" />
        <PageContainer>
            <div v-if="!isLoading" class="max-w-6xl mx-auto my-8">
                <div class="bg-primary text-white rounded-full p-3 2xl:mx-0 mx-5">
                    <div class="text-center" v-html="useSettingValue('vote_page_description')" />
                </div>
                <div class="mt-5">
                    <ul class="list-decimal divide-y divide-slate-200">
                        <li v-for="(vote, index) in votes" :key="index" class="grid lg:grid-cols-5 grid-cols-1 gap-5 py-5">
                            <FormSelectInput
                                v-model="vote.countryId"
                                :clearable="true"
                                :name="'country'"
                                :select-data="resources.countries"
                                class="lg:col-span-2"
                                imgvalue="imageUrl"
                                keyvalue="id"
                                labelvalue="name"
                                placeholder="Select a country"
                                @select="getCountryUsers(vote.countryId, index)"
                            />
                            <FormSelectInput
                                v-model="vote.memberId"
                                :clearable="true"
                                :disabled="vote.countryId === null"
                                :placeholder="vote.countryId !== null ? 'Select a member' : 'Please select a country first'"
                                :select-data="vote.countryMembers"
                                class="lg:col-span-3"
                                imgvalue="imageUrl"
                                keyvalue="id"
                                labelvalue="name"
                                secondlabelvalue="city"
                            />
                        </li>
                    </ul>
                    <div class="flex items-center justify-between gap-5 mt-5">
                        <NuxtLink to="/dashboard">
                            <button class="btn btn-dark btn-rounded">
                                <Icon class="size-5 mr-2" name="solar:close-circle-outline" />
                                <span>{{ skipVoteButton }}</span>
                            </button>
                        </NuxtLink>
                        <button class="btn btn-primary btn-rounded" @click="submitVote">
                            <Icon class="size-5 mr-2" name="solar:check-circle-linear" />
                            <span>{{ submitVoteButton }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </PageContainer>
    </div>
</template>
