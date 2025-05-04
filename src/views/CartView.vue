<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { API_BASE_URL } from '@/config';
import { useToast } from 'vue-toastification';

import axios from 'axios';
import TransparentButton from '@/components/UIComponents/TransparentButton.vue';
import PrimaryButton from '@/components/UIComponents/PrimaryButton.vue';
import LoadingSpinner from '@/components/UIComponents/LoadingSpinner.vue';
import router from '@/router';

const { userID } = useAuth();
const toast = useToast();
const isLoading = ref(true);
const cartItems = ref([]);

const fetchCartItems = async () => {
    isLoading.value = true;

    try {
        const response = await axios.get(`${API_BASE_URL}/api/cart/items/${userID.value}`);
        cartItems.value = response.data || [];

    } catch (error) {
        console.error('Error fetching cart items:', error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    if (userID) {
        fetchCartItems();
    }
});

const computeProductSubtotal = (productPrice, productQty) => {
    return productPrice * productQty
}

const overallSubTotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
        return total + (item.price * item.qty);
    }, 0);
});

const overallCartTotal = computed(() => {
    const subtotal = cartItems.value.reduce((total, item) => {
        return total + (item.price * item.qty);
    }, 0);
    return subtotal + 35;
});


const removeItemFromCart = async (cartItemID) => {

    const userResponse = window.confirm('Are you sure you want to delete the item ?');
    if (!userResponse) {
        return
    }

    isLoading.value = true
    try {
        const response = await axios.post(`${API_BASE_URL}/api/cart/remove/`, {
            cart_item_id: cartItemID
        });

        if (response.data.success) {
            await fetchCartItems(); // Refresh cart
        } else {
            console.error(response.data.error || 'Failed to remove item');
        }
    } catch (error) {
        console.error('Error removing item from cart:', error);
    } finally {
        isLoading.value = false;
    }
};

const checkout = async () => {

    if (!userID.value) {
        toast.error('You must be logged in to proceed with checkout.');
        router.push('/');
        return;
    }

    // Check if cart is empty
    if (cartItems.value.length === 0) {
        toast.error('Cart is empty. Please add items to your cart before checking out.');
        return;
    }

    isLoading.value = true;

    try {
        const response = await axios.post(`${API_BASE_URL}/api/cart/checkout/`, {
            user_id: userID.value,
        });

        if (response.data.success) {
            toast.success('Order placed successfully!');

            fetchCartItems();
        } else {
            console.error("Checkout failed:", response.data.error);
            toast.error('Checkout failed. Please try again.');
        }
    } catch (error) {
        console.error("Error during checkout:", error);
        toast.error('An error occurred during checkout. Please try again.');
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="view-wrapper" id="cart-view">
        <div class="unauthenticated-cart-view" v-show="!userID">
            <h3>Login First To View Cart</h3>
            <a href="/login">
                <PrimaryButton label="Login" />
            </a>
        </div>

        <div class="cart-wrapper">
            <a href="/shop">
                <TransparentButton label="Back" />
            </a>

            <table class="cart-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Variant</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in cartItems" :key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.size }}</td>
                        <td>₱ {{ item.price }}</td>
                        <td> {{ item.qty }}</td>
                        <td>₱ {{ computeProductSubtotal(item.price, item.qty) }}.00</td>
                        <td style="cursor: pointer;" @click="removeItemFromCart(item.id)"><i
                                class="fa-solid fa-trash"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="cart-checkout-wrapper">
            <h3>Order Summary</h3>

            <table>
                <tr>
                    <td>Sub Total</td>
                    <td style="text-align: right;">₱ {{ overallSubTotal.toFixed(2) }}</td>
                </tr>
                <tr>
                    <td style=" padding: 1rem 0px 0.8rem 0px; border-bottom: 1px solid gainsboro;">Shipping Fee</td>
                    <td style=" padding: 1rem 0px 0.8rem 0px; border-bottom: 1px solid gainsboro; text-align: right;">
                        ₱ 35</td>
                </tr>
                <tr>
                    <td style=" padding-top: 2rem;">Total</td>
                    <td style="padding-top: 2rem; text-align: right;">₱ {{ overallCartTotal.toFixed(2) }}</td>
                </tr>
            </table>

            <div class="mode-of-payment-wrapper">
                <label class="payment-label">
                    <i class="fa-solid fa-truck"></i>
                    <div class="description-wrapper">
                        <span>Cash on Delivery</span>
                        <span style="font-size: 13px; color: var(--muted-color);">
                            Pay as you receive your parcel
                        </span>
                    </div>
                </label>
            </div>

            <PrimaryButton label="Proceed To Checkout" @click="checkout" custom-class="cart-checkout-button" />
        </div>

        <LoadingSpinner v-show="isLoading" />
    </div>
</template>

<style scoped>
#cart-view {
    padding: 50px 0;
    min-height: 100vh;

    display: grid;
    grid-template-columns: 1fr 0.4fr;
    gap: 3rem;

    width: 1250px;
}

.unauthenticated-cart-view {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cart-table {
    width: 100%;
    border-collapse: collapse;
}

.cart-table th {
    font-size: 0.95rem;
    font-weight: 400;
    text-align: left;
    padding: 40px 10px;
}

.cart-table td {
    text-align: left;
    padding: 40px 10px;
    font-size: 0.9rem;

    border-bottom: 1px solid gainsboro;
}

.cart-checkout-wrapper {
    display: flex;
    flex-direction: column;
    padding: 0 40px;
    border-left: 1px solid gainsboro;
}

.cart-checkout-wrapper table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 2rem;
}

.cart-checkout-wrapper table td {
    font-size: 0.95rem;
}



/* MODE OF PAYMENT SELECTOR STYLE */
.mode-of-payment-wrapper {
    margin-top: 2rem;
}

.payment-label {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    border-radius: 5px;
    transition: all 0.3s ease;
    padding: 15px 25px;
    cursor: pointer;

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


.cart-checkout-button {
    width: 100%;
    margin-top: 2rem;
}
</style>