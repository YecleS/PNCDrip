<script setup>
import { watch, ref } from 'vue';

const props = defineProps({
    modelValue: {
        type: [File, String],
    }
});
const emit = defineEmits(['update:modelValue']);

const fileInput = ref(null);
const imagePreview = ref(null);

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        imagePreview.value = URL.createObjectURL(file);
        emit('update:modelValue', file);
    }
}

// Watch modelValue to clear the input if it's empty
watch(() => props.modelValue, (newValue) => {
    if (!newValue && fileInput.value) {
        fileInput.value.value = '';
    }
});



</script>

<template>
    <div class="labeled-input-image">
        <div class="image-container">
            <img v-if="modelValue" :src="imagePreview" alt="Image Preview" class="image-preview" />
            <div v-else class="image-placeholder">No image selected</div>
        </div>

        <p class="label-text">Insert Image</p>
        <input type="file" id="product-image" name="product-image" class="file-input" ref="fileInput"
            accept="image/jpeg, image/png, image/jpg, image/webp" @change="handleFileChange" />
    </div>
</template>


<style scoped>
.labeled-input-image {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.image-container {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
}

.image-preview {
    width: auto;
    max-height: 200px;
    object-fit: cover;
    border-radius: 8px;
    border: 2px solid #ddd;
}

.image-placeholder {
    width: 100%;
    height: 150px;
    border-radius: 8px;
    border: 2px dashed #ccc;
    background-color: #fafafa;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #aaa;
    font-size: 1rem;
    text-align: center;
}

.label-text {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
}

.file-input {
    padding: 6px;
    border: 1px solid #2e7d32;
    /* dark green */
    border-radius: 4px;
    background-color: #d4edda;
    /* very light green */
    font-size: 0.95rem;
    cursor: pointer;
    color: black;
    transition: border-color 0.3s ease;
    width: 100%;
}

/* Style the actual "Choose File" button inside the input */
.file-input::-webkit-file-upload-button {
    background-color: #90ee90;
    /* light green */
    color: black;
    border: 1px solid #2e7d32;
    /* dark green */
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.file-input::-webkit-file-upload-button:hover {
    background-color: #7bdc7b;
}

.file-input:hover {
    border-color: #4CAF50;
}
</style>
