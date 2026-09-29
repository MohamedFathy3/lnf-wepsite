<script setup lang="ts">
const route = useRoute();
const userStore = useUserStore();
const headerMenuId = ref<number>(useSettingValue('header_menu'));

const { data: headerMenu } = await useApiFetch(`/api/get-menu/${headerMenuId.value}`, {
    lazy: true,
    transform: (headerMenu) => (headerMenu as ApiResponse).data as NavigationMenu,
});

const company = computed(() => userStore.user);

const logout = () => {
    userStore.logout();
};
</script>

<template>
    <div class="w-full border-b-4 border-primary/85">
        <div class="sm:px-12 px-6 py-2 flex items-center gap-5 justify-between container">
            <!-- Logo -->
            <NuxtLink href="/">
                <NuxtImg class="h-20 shrink-0" :title="useSettingValue('app_name')" :alt="useSettingValue('app_name')" :src="useSettingValue('app_logo_light')" />
            </NuxtLink>

            <!-- القسم الأيمن -->
            <div class="lg:block hidden">
                <div class="flex items-center gap-5 justify-end">
                    <!-- ✅ حالة تسجيل الدخول - Dropdown -->
                    <template v-if="userStore.token && company">
                        <HeadlessMenu as="div" class="relative">
                            <HeadlessMenuButton class="group flex items-center gap-3 rounded-full px-3 py-1.5 text-left transition-all hover:bg-slate-100">
                                <NuxtImg
                                    :src="company.imageUrl &&   company.imageUrl"
                                    :alt="company.name"
                                    :title="company.name"
                                    class="h-11 w-[72px] shrink-0 rounded-md bg-white p-1 object-contain ring-1 ring-slate-200"
                                />
                                <div class="min-w-0 max-w-[180px]">
                                    <div class="truncate text-sm font-bold text-black">{{ company.name }}</div>
                                    <div class="flex min-w-0 items-center gap-1 truncate text-xs text-slate-500">
                                        <span v-if="company.country?.name">{{ company.country.name }}</span>
                                        <span v-if="company.country?.name && company.city">,</span>
                                        <span v-if="company.city">{{ company.city }}</span>
                                    </div>
                                </div>
                                <Icon name="solar:alt-arrow-down-linear" class="size-4 opacity-50 group-hover:rotate-180 transition-all" />
                            </HeadlessMenuButton>
                            
                            <TransitionExpand>
                                <HeadlessMenuItems class="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none text-slate-600 z-50 border">
                                    <ul class="p-1">
                                        <HeadlessMenuItem as="li">
                                            <NuxtLink href="/dashboard" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 transition-all">
                                                <Icon name="solar:home-2-outline" class="size-4 opacity-60" />
                                                <span class="text-sm">Profile</span>
                                            </NuxtLink>
                                        </HeadlessMenuItem>
                                        <!-- Logout -->
                                        <HeadlessMenuItem as="li" class="border-t border-dashed pt-1 mt-1">
                                            <button @click="logout" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-danger/10 text-danger w-full transition-all">
                                                <Icon name="solar:logout-2-outline" class="size-4" />
                                                <span class="text-sm">Logout</span>
                                            </button>
                                        </HeadlessMenuItem>
                                    </ul>
                                </HeadlessMenuItems>
                            </TransitionExpand>
                        </HeadlessMenu>
                    </template>

                    <!-- ✅ حالة عدم تسجيل الدخول -->
                    <template v-else>
                        <div class="flex gap-3 items-center">
                            <NuxtLink href="/application-form">
                                <button class="btn btn-sm btn-primary gap-2 px-4">
                                    <Icon name="solar:documents-linear" class="size-4" />
                                    <span>Application Form</span>
                                </button>
                            </NuxtLink>
                            <NuxtLink href="/login">
                                <button class="btn btn-sm btn-primary gap-2 px-4">
                                    <Icon name="solar:login-3-linear" class="size-4" />
                                    <span>Login</span>
                                </button>
                            </NuxtLink>
                        </div>
                    </template>

                    <!-- Menu Toggle for Mobile -->
                    <button class="lg:hidden btn btn-sm btn-secondary gap-2">
                        <Icon name="solar:hamburger-menu-outline" class="size-5" />
                    </button>
                </div>

                <!-- الـ Menu -->
                <div class="mt-1 flex justify-end">
                    <ul class="flex items-center divide-x divide-slate-100/10 font-medium">
                        <template v-for="item in (headerMenu as NavigationMenu).menuItems as NavigationMenuItem[]" :key="item.id">
                            <template v-if="item.children.length > 0">
                                <li>
                                    <HeadlessMenu as="div" class="relative group">
                                        <HeadlessMenuButton
                                            class="flex items-center gap-3 py-2 px-3 hover:text-primary whitespace-nowrap cursor-pointer"
                                            :class="route.fullPath === item.link && 'text-primary font-semibold'"
                                        >
                                            <Icon v-if="item.icon" :name="item.icon" class="shrink-0 size-5" />
                                            <span class="leading-10 capitalize">{{ item.name }}</span>
                                            <Icon name="solar:alt-arrow-down-linear" class="group-hover:-rotate-90 transition-all shrink-0 size-4" />
                                        </HeadlessMenuButton>
                                        <TransitionExpand>
                                            <HeadlessMenuItems
                                                class="absolute left-0 text-xs border border-slate-200 ease-in-out duration-1000 bg-slate-100 overflow-hidden mt-4 rounded-lg shadow-lg z-50"
                                            >
                                                <HeadlessMenuItem v-for="child in item.children" :key="child.id">
                                                    <NuxtLink
                                                        :href="child.link"
                                                        class="flex items-center gap-3 whitespace-nowrap px-3 transition-all hover:bg-primary hover:text-white"
                                                    >
                                                        <Icon v-if="child.icon" :name="child.icon" class="shrink-0 size-4" />
                                                        <span class="leading-10">{{ child.name }}</span>
                                                    </NuxtLink>
                                                </HeadlessMenuItem>
                                            </HeadlessMenuItems>
                                        </TransitionExpand>
                                    </HeadlessMenu>
                                </li>
                            </template>
                            <template v-else>
                                <li>
                                    <NuxtLink
                                        :href="item.link"
                                        class="flex items-center gap-3 py-2 px-3 hover:text-blue-400 whitespace-nowrap cursor-pointer"
                                        :class="route.fullPath === item.link && 'text-primary font-semibold'"
                                    >
                                        <Icon v-if="item.icon" :name="item.icon" class="shrink-0 size-5" />
                                        <span class="leading-10 capitalize">{{ item.name }}</span>
                                    </NuxtLink>
                                </li>
                            </template>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>