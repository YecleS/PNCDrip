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
    <div class="input-field-text-area">
        <label>{{ label }}</label>
        <textarea :name="name" :placeholder="placeholder"
            @input="event => emit('update:modelValue', event.target.value)" :value="modelValue"
            autocomplete="off"></textarea>
    </div>
</template>

<style scoped>
.input-field-text-area {
    display: flex;
    flex-direction: column;
}

.input-field-text-area label {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
}

.input-field-text-area textarea {
    width: 100%;
    font-size: 0.95rem;
    font-weight: 400;
    padding: 8px 15px;
    border: 1px solid black;
    outline: none;
    border-radius: 5px;
    min-height: 100px;
}
</style>
