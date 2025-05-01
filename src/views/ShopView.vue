<script setup>
import ProductCard from '@/components/UIComponents/ProductCard.vue';
import DummyProducts from '../assets/dummy_products.json';
import PrimaryButton from '@/components/UIComponents/PrimaryButton.vue';

</script>

<template>
    <div class="view-wrapper" id="shop-view">
        <div class="filters-wrapper">
            <input type="text" name="search" placeholder="Search a product" class="search-field" autocomplete="off">

            <div class="filter-field-wrapper" style="margin-top: 2rem;">
                <hr style="border: none; border-top: 1px solid gainsboro;">
                <p class="filter-menu-label">Filter by prices</p>
                <p class="filter-label">Price <i class="fa-solid fa-caret-up"></i></p>
                <p class="filter-label">Price <i class="fa-solid fa-caret-down"></i></p>
            </div>

            <div class="filter-field-wrapper" style="margin-top: 2rem;">
                <hr style="border: none; border-top: 1px solid gainsboro;">
                <p class="filter-menu-label">Filter by stocks</p>
                <p class="filter-label">Stocks <i class="fa-solid fa-caret-up"></i></p>
                <p class="filter-label">Stocks <i class="fa-solid fa-caret-down"></i></p>
            </div>

            <PrimaryButton label="Create Product" custom-class="primary-button-custom-class" />
        </div>
        <div class="cards-wrapper">
            <ProductCard v-for="product in DummyProducts" :key="product.name" :product-image="product.image"
                :product-name="product.name" :product-description="product.description" :product-price="product.price"
                :product-stock="product.stock" />
        </div>
    </div>
</template>


<style scoped>
#shop-view {
    display: grid;
    grid-template-columns: 0.3fr 1fr;

    padding: 30px 0;
    gap: 1.5rem;
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