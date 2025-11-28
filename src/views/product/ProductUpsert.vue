<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { PRODUCT_CATEGORIES } from '@/constants/App-Constants';
import productService from '@/services/productService';
import { ROUTE_NAMES } from '@/constants/App-Routes-Names';
import { useSwal } from '@/utility/useSwal';
import { uploadToCloudinary } from '@/utility/cloudinary';
const { showSuccess, showError } = useSwal();
const router = useRouter();
const route = useRoute();
const loading = ref(false);
const imageLoading = ref(false)
const errorList = reactive([]);
const productObj = reactive({
    name: '',
    description: '',
    price: 0.0,
    salePrice: 0.0,
    tags: [],
    isBestSeller: false,
    category: '',
    image: '',
});
const productIdForEdit = route.params.id;
onMounted(async () => {
    if (!productIdForEdit) return;
    loading.value = true;
    try {
        const product = await productService.getProductById(productIdForEdit);
        Object.assign(productObj, {
            ...product,
            tags: product.tags.join(', ')
        });
    }
    catch (error) {
        console.error('Error fetching product for edit:', error);
    }
    finally {
        loading.value = false;
    }


})



async function submitForm() {
    errorList.length = 0;
    if (productObj.name < 3) {
        errorList.push('Product name must be at least 3 characters long.');
    }
    if (productObj.price <= 0) {
        errorList.push('Price must be a positive number.');
    }
    if (productObj.category === '') {
        errorList.push('Category must be selected.');
    }
    if (!errorList.length) {

        try {
            loading.value = true;
            const productData = {
                ...productObj,
                price: Number(productObj.price),
                salePrice: productObj.salePrice ? Number(productObj.salePrice) : null,
                tags: productObj.tags.length > 0 ? productObj.tags.split(',').map((tag) => tag.trim()) : [],
                bestSeller: Boolean(productObj.isBestSeller),

            }
            if (productIdForEdit) {
                await productService.UpdateProduct(productIdForEdit, productData)
                showSuccess('Product Updated successfully!');
            }
            else {

                await productService.createProduct(productData)
                showSuccess('Product created successfully!');
            }

            router.push({ name: ROUTE_NAMES.PRODUCT_LIST });
        }
        catch (error) {
            showError(error)
        }
        finally {
            loading.value = false;
        }
    }



}


async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return

    try {
        imageLoading.value = true;
        const imageUrl = await uploadToCloudinary(file)
        productObj.image = imageUrl
    } catch (e) {
        throw e
    } finally {
        imageLoading.value = false;
    }
}


</script>



<template>
    <div class="container">
        <div class="row border p-4 my-5 rounded">
            <div class="col-9">
                <form v-on:submit.prevent="submitForm">
                    <div class="h2 text-center text-success">Create Product</div>
                    <hr />
                    <div v-if="errorList.length" class="alert alert-danger pb-0">
                        Please fix the following errors:
                        <ul>
                            <li v-for="error in errorList">{{ error }}</li>
                        </ul>
                    </div>

                    <div class="mt-3">
                        <span class="text-muted">Name</span>
                        <input type="text" class="form-control" v-model.trim="productObj.name" />
                    </div>
                    <div class="mt-3">
                        <span class="text-muted">Description</span>
                        <textarea type="text" class="form-control" v-model="productObj.description"></textarea>
                    </div>
                    <div class="mt-3">
                        <span class="text-muted">Price</span>
                        <input type="number" class="form-control" v-model.number="productObj.price" />
                    </div>

                    <div class="mt-3">
                        <span class="text-muted">Sale Price</span>
                        <input type="number" class="form-control" v-model.number="productObj.salePrice" />
                    </div>
                    <div class="mt-3">
                        <span class="text-muted">Tags (comma-separated)</span>
                        <input type="text" class="form-control" placeholder="e.g., modern, classic, luxury"
                            v-model="productObj.tags" />
                    </div>
                    <div class="form-check form-switch pt-3">
                        <input class="form-check-input" type="checkbox" role="switch"
                            v-model="productObj.isBestSeller" />

                        <label class="form-check-label" for="bestseller">
                            Bestseller
                        </label>
                    </div>
                    <div class="mt-3">
                        <label class="text-muted">Category</label>
                        <select class="form-select" v-model="productObj.category">
                            <option value="">Choose a Category</option>
                            <option v-for="option in PRODUCT_CATEGORIES" :key="option" :value="option">{{ option }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Image</label>
                        <div class="input-group">
                            <input type="file" class="form-control" @change="handleImageUpload"
                                :disabled="imageLoading" />
                        </div>
                    </div>
                    <div class="pt-3">
                        <button class="btn btn-success m-2 w-25" :disabled="loading || imageLoading">
                            <span v-if="loading || imageLoading"
                                class="spinner-border spinner-border-sm me-2"></span>Submit
                        </button>
                        <router-link :to="ROUTE_NAMES.PRODUCT_LIST" class="btn btn-secondary m-2 w-25"> Cancel
                        </router-link>
                    </div>
                </form>
            </div>
            <div v-if="imageLoading" class="col-3">
                <img :src="productObj.image" class="img-fluid w-100 m-3 p-3 rounded" alt="Product
        preview" />
            </div>
        </div>
    </div>
</template>