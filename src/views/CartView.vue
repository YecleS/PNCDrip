<script setup>
import { useAuth } from '@/composables/useAuth';
import TransparentButton from '@/components/UIComponents/TransparentButton.vue';
import PrimaryButton from '@/components/UIComponents/PrimaryButton.vue';

const { userID } = useAuth();
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
                <tbody>
                    <tr>
                        <td>Compression Training Shorts and resistance t-shirt</td>
                        <td>₱ 24.5</td>
                        <td>3</td>
                        <td>₱ 234.5</td>
                        <td><i class="fa-solid fa-trash"></i></td>
                    </tr>
                    <tr>
                        <td>Compression Training Shorts and resistance t-shirt</td>
                        <td>₱ 24.5</td>
                        <td>3</td>
                        <td>₱ 234.5</td>
                        <td><i class="fa-solid fa-trash"></i></td>
                    </tr>
                    <tr>
                        <td>Compression Training Shorts and resistance t-shirt</td>
                        <td>₱ 24.5</td>
                        <td>3</td>
                        <td>₱ 234.5</td>
                        <td><i class="fa-solid fa-trash"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="cart-checkout-wrapper">
            <h3>Order Summary</h3>

            <table>
                <tr>
                    <td>Sub Total</td>
                    <td style="text-align: right;">₱ 234.5</td>
                </tr>
                <tr>
                    <td style=" padding: 1rem 0px 0.8rem 0px; border-bottom: 1px solid gainsboro;">Shipping Fee</td>
                    <td style=" padding: 1rem 0px 0.8rem 0px; border-bottom: 1px solid gainsboro; text-align: right;">
                        ₱ 34.5</td>
                </tr>
                <tr>
                    <td style=" padding-top: 2rem;">Total</td>
                    <td style="padding-top: 2rem; text-align: right;">₱ 300.5</td>
                </tr>
            </table>

            <PrimaryButton label="Proceed To Checkout" custom-class="cart-checkout-button" />
        </div>
    </div>
</template>

<style scoped>
#cart-view {
    padding: 50px 0;
    min-height: 100vh;

    display: grid;
    grid-template-columns: 1fr 0.4fr;
    gap: 5rem;

    width: 1300px;
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

.cart-table td {
    text-align: left;
    padding: 40px 10px;
    font-size: 1rem;

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

.cart-checkout-button {
    width: 100%;
    margin-top: 2rem;
}
</style>