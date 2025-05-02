<script setup>
defineProps({
    label: {
        type: String,
    },
    customClass: {
        type: String,
    }
})
</script>

<template>
    <button :class="['transparent-button', customClass]">{{ label }}</button>
</template>


<style scoped>
.transparent-button {
    font-size: 1rem;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 400;

    background: white;
    border: 1.5px solid black;
    transition: all 0.3s ease;

    color: black;
    cursor: pointer;
}

.transparent-button:hover {
    background: var(--light-green);
    color: black;
    border: 1px solid var(--primary-color);
}
</style>