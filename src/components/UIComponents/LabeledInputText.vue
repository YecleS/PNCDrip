<script setup>
defineProps({
    label: String,
    placeholder: String,
    name: String,
    modelValue: String
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <div class="input-field-text">
        <label>{{ label }}</label>
        <input type="text" :name="name" :placeholder="placeholder" :value="modelValue"
            @input="event => emit('update:modelValue', event.target.value)" autocomplete="off" />
    </div>
</template>

<style scoped>
.input-field-text {
    display: flex;
    flex-direction: column;
}

.input-field-text label {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
}

.input-field-text input[type="text"] {
    width: 100%;
    font-size: 0.95rem;
    font-weight: 400;
    padding: 8px 15px;
    border: 1px solid black;
    outline: none;
    border-radius: 5px;
}
</style>
