<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';

definePageMeta({
    middleware: 'guest',
});

const loginForm = reactive({
    email: '',
    password: '',
    rememberMe: false,
});

const rules = reactive({
    email: {
        required: helpers.withMessage('Email is required', required),
        email: helpers.withMessage('Invalid email format', email),
    },
    password: { required: helpers.withMessage('Password is required', required) },
    rememberMe: {},
});

const v$ = useVuelidate(rules, loginForm);
const formLoading = ref(false);

useSeoMeta({
    title: 'Login',
});

const userStore = useUserStore();

async function login() {
    formLoading.value = false;
    const result = await v$.value.$validate();
    if (!result) {
        formLoading.value = false;
        return false;
    }
    await userStore.signIn(loginForm as Credentials);
    formLoading.value = false;
}

const data = ref({
    name: 'Login',
    des: `
    <span class="text-primary">Empower</span>
    Your Global Logistics
    <br><span class="block mt-3">
    with <span class="text-primary">LNF</span>
    </span>
    `,
});
</script>

<template>
    <div>
        <div class="section-bg">
            <div class="container px-6 md:px-12 py-8 text-white flex flex-col gap-3">
                <div v-if="data.name" class="lg:text-4xl text-2xl font-semibold text-center" v-html="data.name" />
            </div>
        </div>
        <div class="px-1 sm:px-12">
            <div class="page-container !max-w-2xl mx-auto">
                <div class="mx-auto">
                    <div v-if="data.des" class="mt-8 relative">
                        <div class="text-center text-4xl font-extrabold" v-html="data.des" />
                    </div>
                    <div v-if="!userStore.token" class="mt-8 flex justify-center">
                        <NuxtLink class="btn btn-rounded btn-warning sm:px-12 px-2 w-fit" to="/application-form"> For Registration Click Here </NuxtLink>
                    </div>
                </div>
                <form
                    v-if="!userStore.token"
                    class="transform ease-in-out duration-300 bg-gradient-to-t from-slate-100 to-white dark:from-slate-950 dark:to-slate-900 rounded-3xl p-5 mt-8 max-w-md mx-auto"
                    @submit.prevent="login"
                >
                    <div class="grid gap-5 sm:grid-cols-1">
                        <FormTextInput
                            v-model="loginForm.email"
                            :errors="v$.email.$errors"
                            autocomplete="email"
                            icon="solar:streets-navigation-broken"
                            label="Email"
                            name="email"
                            placeholder="Email"
                            rounded
                            type="email"
                        />
                        <FormTextInput
                            v-model="loginForm.password"
                            :errors="v$.password.$errors"
                            autocomplete="current-password"
                            icon="solar:password-minimalistic-input-broken"
                            label="Password"
                            name="password"
                            placeholder="Password"
                            rounded
                            type="password"
                        />
                        <div>
                            <div class="form-check form-switch">
                                <input id="login-remember-me" v-model="loginForm.rememberMe" class="form-check-input mr-2" type="checkbox" />
                                <label class="form-check-label" for="login-remember-me">Remember me</label>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4">
                        <button :disabled="formLoading" class="btn btn-primary btn-rounded w-full group" type="submit">
                            <Icon v-if="formLoading" class="w-5 h-5 mr-4" name="eos-icons:three-dots-loading" />
                            <Icon v-else class="w-4 h-4 group-hover:w-5 group-hover:h-5 mr-4 group-hover:mr-2 ease-in-out duration-300" name="solar:login-2-broken" />
                            <span>{{ formLoading ? 'Logging in...' : 'Login' }}</span>
                        </button>
                    </div>
                </form>
                <div v-else class="mx-auto max-w-2xl flex place-content-center py-12">
                    <Icon class="w-12 h-12" name="svg-spinners:3-dots-bounce" />
                </div>
            </div>
        </div>
    </div>
</template>