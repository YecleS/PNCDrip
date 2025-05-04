<script setup>
import { ref, computed, onMounted } from 'vue';
import { API_BASE_URL } from '@/config';
import { useAuth } from '@/composables/useAuth';

import axios from 'axios';
import dayjs from 'dayjs';
import TransparentButton from '@/components/UIComponents/TransparentButton.vue';
import PillMessage from '@/components/UIComponents/PillMessage.vue';
import LoadingSpinner from '@/components/UIComponents/LoadingSpinner.vue';

const { userID } = useAuth();
const ordersHistory = ref([]);
const orderItems = ref([]);
const isLoading = ref(false);


const fetchOrdersHistory = async () => {
    if (!userID.value) return;

    isLoading.value = true;
    try {
        const response = await axios.post(`${API_BASE_URL}/api/orders/`, {
            user_id: userID.value
        });
        ordersHistory.value = response.data;
        orderItems.value = response.data.flatMap(order => order.items);

    } catch (error) {
        console.error('Error fetching orders:', error);
    } finally {
        isLoading.value = false;
    }
};

const computeSubtotal = (itemPrice, itemQty) => {
    const subTotal = Number(itemPrice) * Number(itemQty);
    return subTotal.toLocaleString('en-US', { minimumFractionDigits: 2 });
};

// const groupedOrders = computed(() => {
//     const grouped = {};

//     for (const order of ordersHistory.value) {
//         const dateKey = dayjs(order.date).format('YYYY-MM-DD');

//         if (!grouped[dateKey]) {
//             grouped[dateKey] = {
//                 date: dateKey,
//                 orders: []
//             };
//         }

//         grouped[dateKey].orders.push(order);
//     }

//     return Object.values(grouped).sort((a, b) => new Date(b.date) - new Date(a.date));
// });

const groupedOrderItems = computed(() => {
    const flatItems = [];

    for (const order of ordersHistory.value) {
        const dateKey = dayjs(order.date).format('YYYY-MM-DD');

        for (const item of order.items) {
            flatItems.push({
                date: dateKey,
                ...item
            });
        }
    }

    return flatItems.sort((a, b) => new Date(b.date) - new Date(a.date));
});

onMounted(() => {
    fetchOrdersHistory();
});

</script>

<template>
    <div class="view-wrapper" id="orders-view">
        <TransparentButton label="Back" />

        <h2 style="margin-top: 2rem;">Orders history</h2>

        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Variant</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Fee</th>
                    <th>Total</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in groupedOrderItems" :key="index">
                    <td>{{ item.date }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.size }}</td>
                    <td>{{ item.qty }}</td>
                    <td>{{ item.price.toFixed(2) }}</td>
                    <td>₱ 35.00</td>
                    <td>₱ {{ computeSubtotal(item.price, item.qty) }}</td>
                    <td>
                        <PillMessage label="COD: On Shipping" />
                    </td>
                </tr>
            </tbody>
        </table>

        <LoadingSpinner v-show="isLoading" />
    </div>
</template>


<style scoped>
#orders-view {
    min-height: 100vh;
    padding: 2rem 0px;

    position: relative;
}

#orders-view table {
    margin-top: 2rem;
    width: 100%;
    text-align: left;
    border-collapse: collapse;
}

#orders-view table thead th {
    font-size: 0.95rem;
    font-weight: 500;
    padding: 20px 5px;
}

#orders-view table tbody td {
    font-size: 0.9rem;
    font-weight: 400;
    padding: 20px 5px;
}

#orders-view table tbody .fa-eye {
    font-size: 1.5rem;
    font-weight: 400;
    cursor: pointer;
}

.order-items-menu {
    width: fit-content;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.menu-button {
    width: fit-content;
}

.order-items-menu table template {
    width: 100%;
}
</style>