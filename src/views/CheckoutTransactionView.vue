<script setup>
import { onMounted, ref, computed } from 'vue';
import { API_BASE_URL } from '@/config';
import axios from 'axios';
import dayjs from 'dayjs';
import LoadingSpinner from '@/components/UIComponents/LoadingSpinner.vue';
import PillMessage from '@/components/UIComponents/PillMessage.vue';
import PrimaryButton from '@/components/UIComponents/PrimaryButton.vue';
import PopUpMenu from '@/components/UIComponents/PopUpMenu.vue';


const orders = ref({});
const orderItems = ref([]);
const isLoading = ref(true);
const isVisible = ref(false);
const selectedOrderId = ref(null);

const fetchCheckoutTransactionHistory = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/checkout/`);

        orders.value = response.data.orders;
        orderItems.value = response.data.order_items;
    } catch (error) {
        console.error('Error fetching transaction history:', error);
    } finally {
        isLoading.value = false;
    }

};

// Calculate total price for an order
const calculateTotal = (orderId) => {
    const itemsForOrder = orderItems.value.filter(item => item.order === orderId);
    return itemsForOrder.reduce((total, item) => total + (parseFloat(item.price) * item.qty), 0).toFixed(2);
};

// Format date into readable format
const formatDate = (date) => {
    return `${dayjs(date).format('YYYY-MM-DD')}`;
};

const filteredOrderItems = computed(() => {
    return orderItems.value.filter(item => item.order === selectedOrderId.value);
});

const togglePopUpMenu = (order_id) => {
    if (!isVisible.value) {
        isVisible.value = true;
        selectedOrderId.value = order_id
    } else {
        selectedOrderId.value = null
        isVisible.value = false;
    }
}

onMounted(() => {
    fetchCheckoutTransactionHistory();
});
</script>

<template>
    <div class="view-wrapper" id="checkout-transaction-view">
        <div class="header-wrapper">
            <h2 style="margin-top: 2rem;">Checkout Transaction History</h2>

            <form>
                <div class="field-group">
                    <label for="date">Filter by date</label>
                    <input type="date" name="" id="date">
                </div>
                <div class="field-group" style="margin-top: 1.5rem;">
                    <label for="time">Filter by time</label>
                    <input type="time" name="" id="time">
                </div>
            </form>

        </div>

        <table class="checkout-transaction-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Customer name</th>
                    <th>Total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id">
                    <td>{{ formatDate(order.date) }}</td>
                    <td>{{ new Date(order.date).toLocaleTimeString() }}</td>
                    <td>{{ order.username }}</td>
                    <td>₱ {{ calculateTotal(order.id) }}</td>
                    <td style="text-align: right;">
                        <PrimaryButton label="Show Transaction" @click="togglePopUpMenu(order.id)" />
                    </td>
                </tr>
            </tbody>
        </table>

        <PopUpMenu :visible="isVisible" custom-class="order-items-menu">
            <div class="pop-up-menu-wrapper">
                <PrimaryButton label="Close Menu" @click="togglePopUpMenu" />

                <h3 style="margin-top: 2rem;">Ordered Items</h3>

                <table>
                    <thead>
                        <th>Product Name</th>
                        <th>Variant</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        <tr v-for="item in filteredOrderItems" :key="item.id">
                            <td>{{ item.name }}</td>
                            <td>{{ item.size }}</td>
                            <td>{{ item.qty }}</td>
                            <td>{{ item.price }}</td>
                            <td>{{ item.name }}</td>
                            <td>
                                <PillMessage label="COD: On Shipping" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </PopUpMenu>

        <LoadingSpinner v-show="isLoading" />
    </div>
</template>

<style scoped>
#checkout-transaction-view {
    padding: 30px 0;
    min-height: 100vh;
}

#checkout-transaction-view .header-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}

.header-wrapper .field-group {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.header-wrapper .field-group label {
    font-size: 0.95rem;
    font-weight: 400;
}

.order-items-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.671);
    border: black;
    z-index: 99999;

    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(20px);
}

.checkout-transaction-table {
    width: 100%;
    margin-top: 2rem;
    text-align: left;
}

.checkout-transaction-table th {
    font-size: 0.95rem;
    font-weight: 500;

    padding: 15px 5px;
}

.checkout-transaction-table td {
    font-size: 0.9rem;
    font-weight: 400;

    padding: 15px 5px;
    border-bottom: 1px solid gainsboro;
}

.pop-up-menu-wrapper {
    background: white;
    border-radius: 5px;
    padding: 20px;

    height: 80vh;
    overflow: auto;
    width: 1100px;
}

.pop-up-menu-wrapper table {
    width: 100%;
    margin-top: 2rem;
    text-align: left;
}

.pop-up-menu-wrapper table th {
    font-size: 0.95rem;
    font-weight: 500;

    padding: 15px 5px;
}

.pop-up-menu-wrapper table td {
    font-size: 0.9rem;
    font-weight: 400;

    padding: 15px 5px;
    border-bottom: 1px solid gainsboro;
}
</style>