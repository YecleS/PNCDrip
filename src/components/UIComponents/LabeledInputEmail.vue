<script setup>
defineProps({
    label: String,
    name: String,
    placeholder: String,
    modelValue: String,
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <div class="input-field-text">
        <label>{{ label }}</label>
        <input type="email" :name="name" :placeholder="placeholder" :value="modelValue"
            @input="event => emit('update:modelValue', event.target.value)" autocomplete="off" />
    </div>
</template>

<style scoped></style>