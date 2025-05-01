<script setup>
defineProps({
    label: {
        type: String,
        default: 'Click Me'
    },
    customClass: {
        type: String
    },
    onClick: Function
});

</script>

<template>
    <button @click="onClick" :class="customClass">{{ label }}</button>
</template>

<style scoped>
button {
    font-size: 1rem;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 400;

    background: var(--primary-color);
    border: 1.5px solid var(--primary-color);
    transition: all 0.3s ease;

    color: white;
    cursor: pointer;
}

button:hover {
    background: transparent;
    color: black;
}
</style>