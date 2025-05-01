<script setup>
import { computed } from 'vue';

const props = defineProps({
    productImage: {
        type: String
    },
    productName: {
        type: String
    },
    productDescription: {
        type: String
    },
    productPrice: {
        type: Number
    },
    productStock: {
        type: Number
    }
});

const limitDescription = computed(() => {
    return props.productDescription.slice(0, 50);
});

</script>


<template>
    <a href="/product-view">
        <div class="product-card__wrapper">
            <img :src="productImage" alt="Product image" />

            <div class="product-card__content-wrapper">
                <h4>{{ productName }}</h4>
                <p style="margin-top: 0.5rem; font-size: 14px; font-weight: 400;">{{ limitDescription }}...</p>
                <footer>
                    <p style="font-size: 1.1rem; font-weight: 500;">₱ {{ productPrice }}</p>
                    <p style="font-size: 14px; font-weight: 400; color: var(--muted-color);">{{ productStock }} left</p>
                </footer>
            </div>
        </div>
    </a>

</template>

<style scoped>
.product-card__wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.product-card__wrapper img {
    object-fit: cover;
    object-position: top;
    width: 100%;
    height: 250px;
    border-radius: 5px;
}

.product-card__content-wrapper {
    display: flex;
    flex-direction: column;
    padding: 15px 10px;

    flex-grow: 1;
}

footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 25px;

    margin-top: auto;
}
</style>