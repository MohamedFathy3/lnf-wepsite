<script lang="ts" setup>
import type { User } from '~/types';

const props = defineProps<{
    members: any[];
}>();

const route = useRoute();
const userStore = useUserStore();

const filteredMembers = computed(() => {
    const currentUserId = userStore.user?.id || (userStore.user as User & { user_id?: number })?.user_id;

    return props.members
        .filter((member) => {
            const isHeadquarters = member.type_company === 'hq' || member.typeCompany === 'hq';
            return isHeadquarters || member.user_id !== currentUserId;
        })
        .sort((firstMember, secondMember) => {
            const firstIsHeadquarters = firstMember.type_company === 'hq' || firstMember.typeCompany === 'hq';
            const secondIsHeadquarters = secondMember.type_company === 'hq' || secondMember.typeCompany === 'hq';

            if (firstIsHeadquarters === secondIsHeadquarters) {
                return 0;
            }

            return firstIsHeadquarters ? -1 : 1;
        });
});
</script>

<template>
    <div v-if="filteredMembers.length">
        <div class="flex items-center gap-3">
            <Icon class="size-6 opacity-65 text-primary" name="solar:globus-outline" />
            <div class="font-semibold text-slate-800">Branches</div>
            <span class="ml-auto rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-500">
                {{ filteredMembers.length }}
            </span>
        </div>
        <div class="mt-3 flex flex-col gap-3">
            <template v-for="member in filteredMembers" :key="member.id">
                <ProfileBranchesBlockCard :member="member" />
            </template>
        </div>
    </div>
</template>