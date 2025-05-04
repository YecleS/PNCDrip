<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { API_BASE_URL } from '@/config';
import { useRoute, RouterLink } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import router from '@/router';
import PrimaryButton from '@/components/UIComponents/PrimaryButton.vue';
import PopUpMenu from '@/components/UIComponents/PopUpMenu.vue';
import LoadingSpinner from '@/components/UIComponents/LoadingSpinner.vue';


const route = useRoute();
const toast = useToast();
const { username, role, userID } = useAuth();
const productId = route.params.id;

const selectedProduct = ref({});
const isLoading = ref(true);
const error = ref(null);

const productQty = ref(1);
const selectedSize = ref('XS');
const isPopUpMenuVisible = ref(false);
const ellipsisRef = ref(null);
const menuRef = ref(null);

const togglePopUpMenu = () => {
    isPopUpMenuVisible.value = !isPopUpMenuVisible.value
}

const closePopUpMenu = () => {
    isPopUpMenuVisible.value = false;
};

const handleClickOutside = (event) => {
    const clickedOutsideEllipsis = ellipsisRef.value?.contains(event.target);
    const clickedOutsideMenu = menuRef.value?.menuRoot?.contains(event.target);

    if (!clickedOutsideEllipsis && !clickedOutsideMenu) {
        isPopUpMenuVisible.value = false;
    }
}

const increaseQty = () => {
    return productQty.value++
}

const decreaseQty = () => {
    if (productQty.value > 1) {
        return productQty.value--
    }
}

const navigateToShop = () => {
    router.push('/shop')
}

const addToCart = async () => {
    if (username.value) {
        const cartItem = {
            user_id: userID.value,
            product_id: productId,
            name: selectedProduct.value.name,
            qty: productQty.value,
            size: selectedSize.value
        };

        try {
            await axios.post(`${API_BASE_URL}/api/cart/add/`, cartItem, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            toast.success('Product Added to Cart Successfully');

            // Reset values after success
            productQty.value = 1;
            selectedSize.value = 'XS';
        } catch (error) {
            console.error('Failed to add to cart:', error);
            toast.error('Failed to add product to cart.');
        }
    } else {
        router.push('/login');
    }
};

const fetchProduct = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/product/${productId}/`);
        const data = await response.json();

        if (response.ok && data) {
            selectedProduct.value = data;
        } else {
            throw new Error('Product does not exist');
        }
    } catch (err) {
        console.error('Fetch product error:', err);
        error.value = 'PRODUCT DOESNT EXIST'; // Set the error message here
    } finally {
        isLoading.value = false;
    }
};

const deleteProduct = async (productId) => {

    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (!confirmed) return;

    try {
        const response = await fetch(`${API_BASE_URL}/api/product/${productId}/delete/`, {
            method: 'DELETE',
        });

        const result = await response.json();

        if (response.ok) {
            router.push('/shop');
        } else {
            alert(result.error || 'Failed to delete product');
        }
    } catch (error) {
        console.error('Delete failed:', error);
    }
};


onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    fetchProduct();
})

onBeforeUnmount(() => {
    document.addEventListener('click', handleClickOutside)
})
</script>

<template>
    <div class="view-wrapper" id="product-view">
        <div v-show="error" class="error-message" style="color: red; margin-top: 2rem;">
            <p>{{ error }}</p>
            <a href="/shop">
                <PrimaryButton label="Go Back to Shopping" @click="navigateToShop" />
            </a>
        </div>

        <img :src="`${API_BASE_URL}${selectedProduct.image}`" alt="product image" v-show="!error">

        <div class="content-wrapper" v-show="!error">
            <div style="display: flex; align-items: flex-start; justify-content: space-between; position: relative;">
                <h3>{{ selectedProduct.name }}</h3>
                <i class="fa-solid fa-ellipsis-vertical" style="font-size: 1rem; cursor: pointer;"
                    @click="togglePopUpMenu" ref="ellipsisRef" v-if="username && role === 'employee'"></i>

                <PopUpMenu ref="menuRef" :visible="isPopUpMenuVisible" @close="closePopUpMenu">
                    <RouterLink :to="`/edit-product/${productId}`">
                        <p><i class="fa-solid fa-pen-to-square" style="font-size: 1.2rem; margin-right: 0.2rem;"></i>
                            Edit
                            Product</p>
                    </RouterLink>

                    <a href="#" @click="deleteProduct(productId)"><i class="fa-solid fa-trash"
                            style="font-size: 1.2rem; margin-right: 0.2rem;"></i>
                        Delete Product</a>
                </PopUpMenu>
            </div>

            <p style="font-size: 1rem; margin-top: 1rem;">
                {{ selectedProduct.description }}
            </p>
            <p style="font-size: 14px; color: var(--muted-color); margin-top: 0.5rem;">{{ selectedProduct.stock }}
                stocks left</p>
            <p style="margin-top: 2rem; font-size: 1.3rem; font-weight: 400;">₱ {{ selectedProduct.price }}</p>



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
            </form>

            <footer>
                <button class="product-view-button" @click="navigateToShop">View More</button>
                <PrimaryButton label="Add To Cart" custom-class="primary-button-custom-style" @click="addToCart" />
            </footer>
        </div>


        <LoadingSpinner v-show="isLoading" />
    </div>
</template>

<style scoped>
#product-view {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    padding: 100px 0px;
    max-width: 900px;
    min-height: 100vh;
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


/* FOOTER STYLE */
footer {
    display: flex;
    align-items: center;

    margin-top: 3rem;
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