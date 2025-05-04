<script setup>
import { computed } from 'vue';
import { API_BASE_URL } from '@/config.js';

const props = defineProps({
    products: {
        type: Object,
    }

});

const limitDescription = computed(() => {
    return props.products.description.slice(0, 50)
});

</script>


<template>
    <RouterLink :to="`/product-view/${products.id}`">
        <div class="product-card__wrapper">
            <img :src="`${API_BASE_URL}${products.image}`" alt="Product image" />

            <div class="product-card__content-wrapper">
                <h4 style="text-transform: capitalize;">{{ products.name }}</h4>
                <p style="margin-top: 0.5rem; font-size: 14px; font-weight: 400;">{{ limitDescription }}...</p>
                <footer>
                    <p style="font-size: 1.1rem; font-weight: 500;">₱ {{ products.price }}</p>
                    <p style="font-size: 14px; font-weight: 400; color: var(--muted-color);">{{ products.stock }}
                        left</p>
                </footer>
            </div>
        </div>
    </RouterLink>

</template>

<style scoped>
.product-card__wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: 300px;
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