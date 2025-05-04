<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useAuth } from '@/composables/useAuth';
import ProductCard from '@/components/UIComponents/ProductCard.vue';
import PrimaryButton from '@/components/UIComponents/PrimaryButton.vue';
import LoadingSpinner from '@/components/UIComponents/LoadingSpinner.vue';

const { userID, role } = useAuth();
const products = ref([]);
const isLoading = ref(true);

const searchQuery = ref('');
const sortOption = ref('')

const fetchProducts = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/products/');
        products.value = response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(fetchProducts);

const filteredProducts = computed(() => {

    let filtered = products.value.filter(product => {
        return product.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    });

    switch (sortOption.value) {
        case 'priceAsc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'priceDesc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'stockAsc':
            filtered.sort((a, b) => a.stock - b.stock);
            break;
        case 'stockDesc':
            filtered.sort((a, b) => b.stock - a.stock);
            break;
    }

    return filtered;
});
</script>

<template>
    <div class="view-wrapper" id="shop-view">
        <div class="filters-wrapper">
            <input type="text" name="search" placeholder="Search a product" class="search-field" v-model="searchQuery"
                autocomplete="off">

            <div class="filter-field-wrapper" style="margin-top: 2rem;">
                <hr style="border: none; border-top: 1px solid gainsboro;">
                <p class="filter-menu-label">Filter by prices</p>
                <p class="filter-label" @click="sortOption = 'priceAsc'">Price <i class="fa-solid fa-caret-up"></i></p>
                <p class="filter-label" @click="sortOption = 'priceDesc'">Price <i class="fa-solid fa-caret-down"></i>
                </p>
            </div>

            <div class="filter-field-wrapper" style="margin-top: 2rem;">
                <hr style="border: none; border-top: 1px solid gainsboro;">
                <p class="filter-menu-label">Filter by stocks</p>
                <p class="filter-label" @click="sortOption = 'stockAsc'">Stocks <i class="fa-solid fa-caret-up"></i></p>
                <p class="filter-label" @click="sortOption = 'stockDesc'">Stocks <i class="fa-solid fa-caret-down"></i>
                </p>
            </div>

            <a href="/add-product">
                <PrimaryButton label="Create Product" custom-class="primary-button-custom-class"
                    v-if="userID && role === 'employee'" />
            </a>

        </div>

        <LoadingSpinner v-if="isLoading" />

        <div class="cards-wrapper">
            <ProductCard v-for="product in filteredProducts" :key="product.id" :products="product" />
        </div>
    </div>
</template>


<style scoped>
#shop-view {
    display: grid;
    grid-template-columns: 0.3fr 1fr;

    padding: 30px 0;
    gap: 1.5rem;
    min-height: 100vh;
}

.filters-wrapper {
    padding-right: 20px;
    border-right: 1px solid var(--muted-color);
}

.search-field {
    margin-top: 0.3rem;
    width: 100%;
    padding: 8px 15px;
    border-radius: 5px;
    border: 1px solid black;
    font-size: 0.9rem;
    outline: none;
}

.filter-field-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.filter-menu-label {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

.filter-label {
    font-size: 15px;
}

.filter-label i {
    font-size: 15px;
    margin-left: 0.5rem;
}

.primary-button-custom-class {
    width: 100%;
    margin-top: 1.5rem;
}

.cards-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;

    margin-top: 2rem;
}
</style>