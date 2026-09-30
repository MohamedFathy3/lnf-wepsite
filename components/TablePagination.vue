<script setup lang="ts">
type PaginationMeta = {
    current_page?: number;
    last_page?: number;
    total?: number;
    per_page?: number;
    from?: number | null;
    to?: number | null;
};

const props = withDefaults(
    defineProps<{
        page: number;
        pending: boolean;
        meta?: PaginationMeta | null;
        rows?: { meta?: PaginationMeta } | null;
    }>(),
    {
        meta: null,
        rows: null,
    },
);

const emit = defineEmits<{
    'change-page': [page: number];
}>();

const paginationMeta = computed(() => props.meta ?? props.rows?.meta ?? null);
const currentPage = computed(() => paginationMeta.value?.current_page ?? props.page ?? 1);
const lastPage = computed(() => paginationMeta.value?.last_page ?? Math.ceil((paginationMeta.value?.total ?? 0) / (paginationMeta.value?.per_page ?? 1)));
const pageNumbers = computed(() => {
    const visiblePages = 5;
    const firstPage = Math.max(1, Math.min(currentPage.value - 2, lastPage.value - visiblePages + 1));
    const finalPage = Math.min(lastPage.value, firstPage + visiblePages - 1);

    return Array.from({ length: finalPage - firstPage + 1 }, (_, index) => firstPage + index);
});

const changePage = (page: number) => {
    if (props.pending || page < 1 || page > lastPage.value || page === currentPage.value) {
        return;
    }

    emit('change-page', page);
};
</script>

<template>
    <nav
        v-if="paginationMeta && lastPage > 1"
        aria-label="Table pagination"
        class="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between"
    >
        <p class="text-sm text-slate-600">
            Showing {{ paginationMeta.from ?? 0 }}-{{ paginationMeta.to ?? 0 }} of {{ paginationMeta.total ?? 0 }}
        </p>

        <div class="flex flex-wrap items-center justify-center gap-1.5">
            <button
                class="btn btn-secondary btn-sm"
                type="button"
                :disabled="pending || currentPage <= 1"
                @click="changePage(1)"
            >
                First
            </button>
            <button
                class="btn btn-secondary btn-sm"
                type="button"
                :disabled="pending || currentPage <= 1"
                @click="changePage(currentPage - 1)"
            >
                Previous
            </button>
            <button
                v-for="pageNumber in pageNumbers"
                :key="pageNumber"
                class="btn btn-sm"
                :class="pageNumber === currentPage ? 'btn-primary' : 'btn-secondary'"
                type="button"
                :aria-current="pageNumber === currentPage ? 'page' : undefined"
                :disabled="pending || pageNumber === currentPage"
                @click="changePage(pageNumber)"
            >
                {{ pageNumber }}
            </button>
            <button
                class="btn btn-secondary btn-sm"
                type="button"
                :disabled="pending || currentPage >= lastPage"
                @click="changePage(currentPage + 1)"
            >
                Next
            </button>
            <button
                class="btn btn-secondary btn-sm"
                type="button"
                :disabled="pending || currentPage >= lastPage"
                @click="changePage(lastPage)"
            >
                Last
            </button>
        </div>
    </nav>
</template>