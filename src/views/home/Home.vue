<script setup>
import productService from '@/services/productService';
import { computed, onMounted, ref } from 'vue';
import ProductCard from '@/components/product/ProductCard.vue';
import { PRODUCT_CATEGORIES, SORT_OPTIONS, SORT_PRICE_LOW_HIGH, SORT_PRICE_HIGH_LOW, SORT_NAME_A_Z, SORT_NAME_Z_A } from '@/constants/App-Constants'

const selectedSortedOption = ref("SORT"); // SORT_PRICE_LOW_HIGH
const selectedCategory = ref("ALL");
const categories = ref(["ALL", ...PRODUCT_CATEGORIES]);
const products = ref([]);
const searchValue = ref("");
const loading = ref(false);
onMounted(() => {
    fetchProducts();

}

);

const filterProductList = computed(() => {
    let filteredArr = selectedCategory.value === "ALL" ? products.value :
        products.value.filter((item) => item.category.toUpperCase() === selectedCategory.value.toUpperCase());

    if (searchValue.value) {
        filteredArr = filteredArr.filter((item) => {
            return (
                item.name.toLowerCase().includes(searchValue.value.toLowerCase()) ||
                item.description.toLowerCase().includes(searchValue.value.toLowerCase()) ||
                item.category.toLowerCase().includes(searchValue.value.toLowerCase()) ||
                item.tags.some(tag => tag.toLowerCase().includes(searchValue.value.toLowerCase()))
            );
        }
        );
    }


    if (selectedSortedOption.value === SORT_PRICE_LOW_HIGH) {
        filteredArr.sort((a, b) => a.price - b.price);
    } else if (selectedSortedOption.value === SORT_PRICE_HIGH_LOW) {
        filteredArr.sort((a, b) => b.price - a.price);
    } else if (selectedSortedOption.value === SORT_NAME_A_Z) {
        filteredArr.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSortedOption.value === SORT_NAME_Z_A) {
        filteredArr.sort((a, b) => b.name.localeCompare(a.name));
    }
    return filteredArr;
})


const fetchProducts = async () => {
    try {

        loading.value = true;
        products.value = await productService.getProduct();
        console.log(products.value);

    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
        loading.value = false;

    }
}



</script>







<template>
    <div>
        <div
            class="bg-success w-100 position-relative overflow-hidden mb-4 py-5 d-flex align-items-center hero-section">
            <div class="position-absolute top-0 start-0 w-100 h-100 "></div>

            <div class="container-fluid position-relative z-1">
                <div class="row justify-content-center text-center">
                    <div class="col-lg-8 col-xl-7">
                        <h1 class="display-4 fw-bold text-white mb-4">
                            Your One-Stop Workspace Shop
                            <br class="d-none d-lg-block" />
                            Premium Desk Gear & Accessories for Every Style!
                        </h1>
                        <div class="input-group mt-3 mx-auto shadow-lg rounded-4" style="max-width: 700px">
                            <input v-model="searchValue" type="text" class="form-control border-0 py-3 px-4 fs-5"
                                placeholder="Search your favorite product..." />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="product-list" class="container">
            <h2 class="mb-5 text-center display-6">Discover Our Collection</h2>

            <div class="row g-3 mb-4 align-items-center">
                <div class="col-md-auto">
                    <div class="d-flex flex-wrap gap-3">
                        <button @click="selectedCategory = category" class="btn px-4 py-2" :class="{
                            'btn-success text-white': category === selectedCategory,
                            'btn-outline-success': category !== selectedCategory
                        }" v-for="(category, index) in categories" :key="index">{{ category }}
                        </button>
                    </div>
                </div>
                <div class="col-md-auto ms-md-auto">
                    <div class="dropdown">
                        <button class="btn btn-outline-secondary d-flex align-items-center gap-2 px-4 py-2"
                            type="button" data-bs-toggle="dropdown">
                            <i class="bi bi-sort-down"></i>
                            <span class="text-capitalize">{{ selectedSortedOption }}</span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end shadow-sm">
                            <li v-for="(sortedOption, index) in SORT_OPTIONS" :key="index">
                                <button @click="selectedSortedOption = sortedOption"
                                    class="dropdown-item py-2 d-flex align-items-center gap-2">
                                    <i class="bi"></i>
                                    <span class="text-capitalize"> {{ sortedOption }} </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div>
                <div class="row g-4 mb-3" v-if="filterProductList.length > 0">
                    <ProductCard v-for="product in filterProductList" :key="product.Id" :product="product">
                    </ProductCard>

                </div>
                <div v-else class="text-center py-5">
                    <h4 class="text-muted">No Products Found.</h4>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.hero-section {
    background: linear-gradient(to right, #6a11cb, #2575fc);
    color: white;
    padding: 80px 0;
}
</style>