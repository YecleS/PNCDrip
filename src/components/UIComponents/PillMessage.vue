<script setup>
defineProps({
    label: String,
    customClass: String,
})
</script>

<template>
    <div :class="['pill-message', customClass]">
        <p>{{ label }}</p>
    </div>
</template>

<style scoped>
.pill-message {
    background: var(--light-green);
    border: 1px solid var(--primary-color);
    padding: 5px 5px;
    border-radius: 3px;
    font-size: 0.9rem;
    font-weight: 400;
    width: fit-content;
}
</style>