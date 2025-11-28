<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useSwal } from '@/utility/useSwal'
import { ROUTE_NAMES } from '@/constants/App-Routes-Names';
import { useAuthStore } from '@/stores/AuthStore';
import { getFriendlyFirebaseError } from '@/utility/FirebaseErrorFriendly'
const authStore = useAuthStore();
const { showSuccess, showError } = useSwal();
const router = useRouter();
const error = ref('');
const form = reactive({
    email: '',
    password: ''
});


const handleSignUp = async () => {
    try {
        error.value = '';
        await authStore.SignUpUser(form.email, form.password);
        showSuccess('Account created successfully!');
        router.push(ROUTE_NAMES.HOME);
    }
    catch (e) {
        error.value = e.message
        console.log(error.value)
        const errormsg = getFriendlyFirebaseError(error.value)
        showError(errormsg);
    }
}



</script>




<template>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-6 col-lg-4 border rounded">
                <div class="shadow-sm">
                    <div class="card-body p-4">
                        <h4 class="text-center mb-4">Create Account</h4>
                        <form @submit.prevent="handleSignUp()">
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" v-model="form.email" class="form-control" id="email" required />
                            </div>
                            <div class="mb-4">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" v-model="form.password" class="form-control" id="password"
                                    required />
                            </div>
                            <button :disabled="authStore.isLoading" type="submit" class="btn btn-success w-100">
                                <span v-if="authStore.isLoading" class="spinner-border spinner-border-sm me-2"></span>
                                Create Account
                            </button>
                            <div v-if="error" class="alert alert-danger mt-3 mb-0">{{ getFriendlyFirebaseError(error) }}
                            </div>
                        </form>
                        <p class="mt-3 form-label text-center">
                            Already have an account?
                            <router-link :to="ROUTE_NAMES.SIGN_IN">Login here</router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>