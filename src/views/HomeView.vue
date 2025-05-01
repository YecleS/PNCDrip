<script setup>
import PrimaryButton from '@/components/UIComponents/PrimaryButton.vue';
import DummyProducts from '../assets/dummy_products.json';
import ProductCard from '@/components/UIComponents/ProductCard.vue';


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

      <div class="product-card-wrapper">
        <ProductCard v-for="product in DummyProducts.slice(0, 8)" :key="product.name" :product-image="product.image"
          :product-name="product.name" :product-description="product.description" :product-price="product.price"
          :product-stock="product.stock" />
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
