<script setup>
import { ref } from 'vue';

defineProps({
    label: String,
    placeholder: String,
    name: String,
    modelValue: String
});

const passwordEye = ref('fa-eye');
const fieldType = ref('password');

const toggleFieldType = () => {
    if (passwordEye.value == 'fa-eye' && fieldType.value == 'password') {
        passwordEye.value = 'fa-eye-slash'
        fieldType.value = 'text'
    } else {
        passwordEye.value = 'fa-eye'
        fieldType.value = 'password'
    }
}

const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <div class="input-field-password">
        <label>{{ label }}</label>
        <div class="input-field-password-wrapper">
            <i :class="['fa-solid', passwordEye]" @click="toggleFieldType"></i>
            <input :type="fieldType" :name="name" :value="modelValue"
                @input="event => emit('update:modelValue', event.target.value)" :placeholder="placeholder"
                autocomplete="off" />
        </div>

    </div>
</template>


<style scoped>
.input-field-password {
    display: flex;
    flex-direction: column;
}

.input-field-password label {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
}

.input-field-password-wrapper {
    position: relative;
}

.input-field-password-wrapper i {
    font-size: 1.2rem;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;

}

.input-field-password input {
    width: 100%;
    font-size: 0.95rem;
    font-weight: 400;
    padding: 8px 15px;
    border: 1px solid black;
    outline: none;
    border-radius: 5px;
}
</style>