<script setup>
defineProps({
    message: {
        type: String,
    },
    visibility: {
        type: Boolean,
        default: false,
    },
    customClass: {
        type: String,
    }
})
</script>

<template>
    <p :class="['field-error-message', customClass]" v-show="visibility">{{ message }}</p>
</template>

<style scoped>
.field-error-message {
    font-size: 14px !important;
    margin-top: 0.3rem;
    font-weight: 400 !important;
    color: rgb(187, 5, 5);
}
</style>