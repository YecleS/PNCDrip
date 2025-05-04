<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import PrimaryButton from '@/components/UIComponents/PrimaryButton.vue';
import ProductCard from '@/components/UIComponents/ProductCard.vue';
import LoadingSpinner from '@/components/UIComponents/LoadingSpinner.vue';

const products = ref([]);
const isLoading = ref(true);

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

</script>

<template>
  <div class="view-wrapper">
    <section id="hero-section">
      <h1>Drip That Speaks Volumes.</h1>
      <a href="/shop"><button>Get the Drip</button></a>
    </section>

    <section id="featured-products-section">
      <div class="section-title-wrapper">
        <h2>Featured Products</h2>
        <a href="/shop">
          <PrimaryButton label="View More" />
        </a>
      </div>

      <LoadingSpinner v-if="isLoading" />

      <div class="product-card-wrapper">
        <ProductCard v-for="product in products.slice(0, 8)" :key="product.id" :products="product" />
      </div>
    </section>
  </div>
</template>


<style scoped>
/* HERO SECTION STYLE */
#hero-section {
  background: url(../assets/images/bg-hero.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 13rem;
  margin-top: 1rem;
  border-radius: 10px;
}

h1 {
  color: white;
}

#hero-section button {
  font-size: 1rem;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 400;

  background: transparent;
  border: 1px solid white;
  transition: all 0.3s ease;

  color: white;
  cursor: pointer;
  margin-top: 1.5rem;
}

#hero-section button:hover {
  background: var(--primary-color);
  color: rgb(255, 255, 255);
}



/* FEATURED SECTION STYLE */
#featured-products-section {
  padding: 50px 0;
}

#featured-products-section .section-title-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;

}

.product-card-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;

  margin-top: 2rem;
}
</style>
