<script setup>
import { ref } from 'vue';
import PrimaryButton from '@/components/UIComponents/PrimaryButton.vue';
import PopUpMenu from '@/components/UIComponents/PopUpMenu.vue';
import router from '@/router';

const productQty = ref(1);
const selectedSize = ref('XS');
const selectedModeOfPayment = ref('cod');
const isPopUpMenuVisible = ref(false);

const togglePopUpMenu = () => {
    isPopUpMenuVisible.value = !isPopUpMenuVisible.value
}

const closePopUpMenu = () => {
    isPopUpMenuVisible.value = false;
};

const increaseQty = () => {
    return productQty.value++
}

const decreaseQty = () => {
    if (productQty.value > 1) {
        return productQty.value--
    }
}

const navigateToShop = () => {
    router.push('/')
}

const addToCart = () => {
    console.log(productQty.value, selectedSize.value, selectedModeOfPayment.value)
}

</script>

<template>
    <div class="view-wrapper" id="product-view">
        <img src="https://res.cloudinary.com/dfdkbgjgw/image/upload/v1746021038/Rectangle_9-1_brxoag.webp"
            alt="product image">

        <div class="content-wrapper">
            <div style="display: flex; align-items: flex-start; justify-content: space-between; position: relative;">
                <h3>Compression Training Shorts and resistance t-shirt</h3>
                <i class="fa-solid fa-ellipsis-vertical" style="font-size: 1rem; cursor: pointer;"
                    @click="togglePopUpMenu"></i>

                <PopUpMenu :visible="isPopUpMenuVisible" @close="closePopUpMenu">
                    <a href="#"><i class="fa-solid fa-pen-to-square"
                            style="font-size: 1.2rem; margin-right: 0.2rem;"></i> Edit
                        Product</a>
                    <a href="#"><i class="fa-solid fa-trash" style="font-size: 1.2rem; margin-right: 0.2rem;"></i>
                        Delete Product</a>
                </PopUpMenu>
            </div>

            <p style="font-size: 1rem; margin-top: 1rem;">
                Flexible, high-stretch shorts that enhance performance and
                reduce muscle
                fatigue.
            </p>
            <p style="font-size: 14px; color: var(--muted-color); margin-top: 0.5rem;">35003 stocks left</p>
            <p style="margin-top: 2rem; font-size: 1.3rem; font-weight: 400;">₱ 24.5</p>



            <form action="">
                <div class="field-group">
                    <p style="font-size: 14px; color: var(--muted-color); margin-top: 1.5rem;">Select Quantity</p>

                    <div class="quantity-selector-wrapper">
                        <span @click="decreaseQty"><i class="fa-solid fa-minus"></i></span>
                        <p>{{ productQty }}</p>
                        <span @click="increaseQty"><i class="fa-solid fa-plus"></i></span>
                    </div>
                </div>

                <div class="field-group">
                    <p style="font-size: 14px; color: var(--muted-color); margin-top: 1.5rem;">Select Size</p>

                    <div class="size-selector-wrapper">
                        <label v-for="size in ['XS', 'S', 'M', 'L', 'XL']" :key="size" class="size-label">
                            <input type="radio" name="size" :value="size" v-model="selectedSize"
                                class="size-input-field">
                            <span>{{ size }}</span>
                        </label>
                    </div>
                </div>


                <div class="field-group">
                    <p style="font-size: 14px; color: var(--muted-color); margin-top: 2.3rem;">
                        Select Mode of Payment
                    </p>

                    <div class="mode-of-payment-wrapper">
                        <label class="payment-label">
                            <input type="radio" name="payment" value="cod" v-model="selectedModeOfPayment"
                                class="payment-field" />
                            <i class="fa-solid fa-truck"></i>
                            <div class="description-wrapper">
                                <span>Cash on Delivery</span>
                                <span style="font-size: 13px; color: var(--muted-color);">
                                    Pay as you receive your parcel
                                </span>
                            </div>
                        </label>
                    </div>
                </div>
            </form>

            <footer>
                <button class="product-view-button" @click="navigateToShop">View More</button>
                <PrimaryButton label="Add To Cart" custom-class="primary-button-custom-style" @click="addToCart" />
            </footer>
        </div>
    </div>
</template>

<style scoped>
#product-view {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    padding: 30px 0px;

    max-width: 900px;
}

#product-view img {
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
}

/* PUP UP MENU STYLE */
.popup-menu-custom-style {}


/* QUANTITY SELECTOR STYLE */
.quantity-selector-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;

    margin-top: 0.5rem;
}

.quantity-selector-wrapper span {
    border: 1px solid black;
    padding: 10px 10px;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.quantity-selector-wrapper span:hover {
    border: 1px solid var(--primary-color);
    background: rgb(205, 240, 205);
}

.quantity-selector-wrapper span i {
    font-size: 0.6rem;
}

/* SIZE SELECTOR STYLE */

.size-selector-wrapper {
    margin-top: 1.2rem;

    display: flex;
    align-items: center;
    gap: 1rem;
}

.size-label span {
    background: white;
    padding: 10px 15px;
    border: 1px solid black;
    border-radius: 5px;

    cursor: pointer;
    transition: all 0.3s ease;
}

.size-label span:hover {
    border: 1px solid var(--primary-color);
    background: rgb(205, 240, 205);
}

input[type="radio"] {
    display: none;
}

.size-input-field:checked+span {
    border: 1px solid var(--primary-color);
    background: rgb(205, 240, 205);
}



/* MODE OF PAYMENT SELECTOR STYLE */
.mode-of-payment-wrapper {
    margin-top: 0.5rem;
}

.payment-label {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    background: white;
    border: 1px solid black;
    border-radius: 5px;
    transition: all 0.3s ease;
    padding: 15px 25px;
    cursor: pointer;
}

.payment-label:hover {
    border: 1px solid var(--primary-color);
    background: rgb(205, 240, 205);
}

.payment-label:has(.payment-field:checked) {
    border: 1px solid var(--primary-color);
    background: rgb(205, 240, 205);
}

.payment-label .fa-truck {
    font-size: 1.4rem;
}

.description-wrapper {
    display: flex;
    flex-direction: column;
}


/* FOOTER STYLE */
footer {
    display: flex;
    align-items: center;

    margin-top: 1.5rem;
    gap: 0.5rem;
}

.primary-button-custom-style {
    flex-grow: 1;
}

.product-view-button {
    font-size: 1rem;
    padding: 10px 10px;
    border-radius: 8px;
    font-weight: 400;

    background: white;
    border: 1.5px solid black;
    transition: all 0.3s ease;

    color: black;
    cursor: pointer;
    width: 30%;
}

.product-view-button:hover {
    background: var(--light-green);
    color: black;
    border: 1px solid var(--primary-color);
}
</style>