<script setup>
import { ROUTE_NAMES } from '@/constants/App-Routes-Names.js'
import { useRouter } from 'vue-router';
import { useThemeStore } from '@/stores/ThemeStore.js';
import { useAuthStore } from '@/stores/AuthStore.js';


const authStore = useAuthStore();
const themeStore = useThemeStore();
const router = useRouter();




const signOutButton = async () => {
    await authStore.SignOutUser();
    router.push({ name: ROUTE_NAMES.SIGN_IN })

}
</script>



<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div class="container-fluid">
            <router-link class="nav-link active" aria-current="page" :to="{ name: ROUTE_NAMES.HOME }">
                <img src="../../assets/logo.png" alt="Shopopedia Logo" width="40" height="40" class="rounded-circle" />
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page"
                            :to="{ name: ROUTE_NAMES.HOME }">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page"
                            :to="{ name: ROUTE_NAMES.PRODUCT_LIST }">Products</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page"
                            :to="{ name: ROUTE_NAMES.CONTACT_US }">Contact Us</router-link>
                    </li>


                </ul>
                <ul class="d-flex navbar-nav">
                    <li class="nav-link" v-if="authStore.isAuthenticated">
                        Welcome, {{ authStore.user?.email.split('@')[0] }}
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i class="bi bi-display"></i>
                        </a>
                        <ul class="dropdown-menu">

                            <li>
                                <button @click="themeStore.SetTheme('light')" class="dropdown-item">
                                    <i class="bi bi-brightness-high-fill"></i> Light
                                </button>
                            </li>
                            <li>
                                <button @click="themeStore.SetTheme('dark')" class="dropdown-item">
                                    <i class="bi bi-moon-stars-fill"></i> Dark

                                </button>
                            </li>

                        </ul>
                    </li>
                    <li class="nav-item" v-if="!authStore.isAuthenticated">
                        <router-link class="nav-link active" aria-current="page"
                            :to="{ name: ROUTE_NAMES.SIGN_IN }">Sign In</router-link>
                    </li>
                    <li class="nav-item" v-if="!authStore.isAuthenticated">
                        <router-link class="nav-link active" aria-current="page"
                            :to="{ name: ROUTE_NAMES.SIGN_UP }">Sign Up</router-link>
                    </li>

                    <li class="nav-item" v-if="authStore.isAuthenticated">
                        <button @click="signOutButton()" class="nav-link active" aria-current="page">Sign Out </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
