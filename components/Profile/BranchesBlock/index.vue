<script lang="ts" setup>
import type { User } from '~/types';

const props = defineProps<{
    members: any[];
}>();

const route = useRoute();
const filteredMembers = computed(() => {
    const members = props?.members;
    if (!Array.isArray(members) || members.length === 0) return [];

    return members
        .filter((member) => Boolean(member))
        .sort((a, b) => {
            const aHq = a?.type_company === 'hq' || a?.typeCompany === 'hq';
            const bHq = b?.type_company === 'hq' || b?.typeCompany === 'hq';
            if (aHq === bHq) return 0;
            return aHq ? -1 : 1;
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