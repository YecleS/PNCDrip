<script setup>
defineProps({
    label: String,
    placeholder: String,
    name: String,
    modelValue: [Number, null]
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <div class="input-field-number">
        <label>{{ label }}</label>
        <input type="number" :name="name" :placeholder="placeholder" :value="modelValue"
            @input="event => emit('update:modelValue', Number(event.target.value))" autocomplete="off" />
    </div>
</template>

<style scoped>
.input-field-number {
    display: flex;
    flex-direction: column;
}

.input-field-number label {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
}

.input-field-number input[type="number"] {
    width: 100%;
    font-size: 0.95rem;
    font-weight: 400;
    padding: 8px 15px;
    border: 1px solid black;
    outline: none;
    border-radius: 5px;
}
</style>
