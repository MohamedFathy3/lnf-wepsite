import type { User, Credentials, ApiResponse } from "~/types";

export const useUserStore = defineStore('user', () => {
    // Main Objects
    const user = ref<User>();
    const authenticated = useCookie('LNF_AUTHENTICATED', {
        maxAge: 60 * 60 * 2,
        default: () => false,
    });

    const token = useCookie('LNF_AUTH_TOKEN', {
        maxAge: 60 * 60 * 2,
        default: () => null,
    });
    
    const refValue = useCookie('LNF_REF_ID', {
        maxAge: 60 * 60 * 24 * 365,
        default: () => null,
    });

    // Setting Data to the Main Objects
    const setToken = (data?: string) => {
        if (data) {
            token.value = data;
        } else {
            token.value = null;
        }
    };
    
    const setRefValue = (data?: string) => {
        if (data) {
            refValue.value = data;
        } else {
            refValue.value = null;
        }
    };
    
    const setUser = (data?: User) => {
        if (data) {
            user.value = data;
        } else {
            user.value = undefined;
        }
    };
    
    const setAuthentication = (data?: boolean) => {
        authenticated.value = data ? true : false;
    };

    // User Actions
    const signIn = async (data: Credentials) => {
        try {
            await useApiFetch('/sanctum/csrf-cookie');
            const { data: userData, error } = await useApiFetch(`/api/member/login`, {
                method: 'POST',
                body: data,
                lazy: true,
            });

            if (userData.value) {
                const accessToken = (userData.value as any)?.message?.access_token;
                
                if (accessToken) {
                    setToken(accessToken);
                    setAuthentication(true);
                    
                    // جلب بيانات المستخدم بعد التسجيل
                    const { data: userInfo, error: userError } = await useApiFetch('/api/member/current', {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        },
                        transform: (res) => (res as ApiResponse).data as User,
                    });
                    
                    if (userInfo.value) {
                        setUser(userInfo.value as User);
                        useToast({ title: 'Welcome', message: 'Logged in Successfully', type: 'success', duration: 5000 });
                        navigateTo('/dashboard');
                        return true;
                    }
                    
                    if (userError.value) {
                        console.error('Error fetching user:', userError.value);
                        useToast({ title: 'Error', message: 'Failed to fetch user data', type: 'error', duration: 5000 });
                        setToken();
                        setAuthentication(false);
                        return false;
                    }
                } else {
                    useToast({ title: 'Error', message: 'Invalid response from server', type: 'error', duration: 5000 });
                    return false;
                }
            }

            if (error.value) {
                setAuthentication(false);
                setToken();
                setUser();
                useToast({ 
                    title: 'Login Failed', 
                    message: error.value?.data?.message || 'Invalid credentials', 
                    type: 'error', 
                    duration: 5000 
                });
                return false;
            }
        } catch (err) {
            console.error('Login error:', err);
            useToast({ 
                title: 'Error', 
                message: 'Something went wrong during login', 
                type: 'error', 
                duration: 5000 
            });
            return false;
        }
    };

    const fetchAuthUser = async () => {
        if (import.meta.server) {
            return false;
        }

        if (token.value) {
            try {
                const { data: res, error } = await useApiFetch('/api/member/current', {
                    headers: {
                        Authorization: `Bearer ${token.value}`
                    },
                    transform: (res) => (res as ApiResponse).data as User,
                });
                
                if (res.value) {
                    setUser(res.value as User);
                    setAuthentication(true);
                    return true;
                }
                
                if (error.value) {
                    console.error('Error fetching user:', error.value);
                    if (error.value.status === 401) {
                        logout();
                    }
                    return false;
                }
            } catch (err) {
                console.error('Fetch user error:', err);
                return false;
            }
        }
        return false;
    };

    const logout = () => {
        setAuthentication(false);
        setToken();
        setUser();
        // مسح الـ cookies
        const cookieOptions = {
            maxAge: 0,
            path: '/',
        };
        document.cookie = `LNF_AUTH_TOKEN=; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`;
        document.cookie = `LNF_AUTHENTICATED=; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`;
        navigateTo('/login');
    };

    // ✅ إضافة دالة للتحقق من صحة التوكن
    const checkAuth = async () => {
        if (!token.value) {
            setAuthentication(false);
            setUser();
            return false;
        }
        
        const isValid = await fetchAuthUser();
        if (!isValid) {
            setAuthentication(false);
            setUser();
            setToken();
            return false;
        }
        return true;
    };

    return {
        user,
        token,
        logout,
        signIn,
        fetchAuthUser,
        setUser,
        setToken,
        authenticated,
        setAuthentication,
        refValue,
        setRefValue,
        checkAuth,
    };
});