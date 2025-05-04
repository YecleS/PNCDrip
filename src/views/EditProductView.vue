<script setup>
import { ref, onMounted } from 'vue';
import { API_BASE_URL } from '@/config';
import * as yup from 'yup';
import axios from 'axios';
import { useRoute } from 'vue-router';
import LoadingSpinner from '@/components/UIComponents/LoadingSpinner.vue';
import FieldErrorMessage from '@/components/UIComponents/FieldErrorMessage.vue';
import PrimaryButton from '@/components/UIComponents/PrimaryButton.vue';
import LabeledInputText from '@/components/UIComponents/LabeledInputText.vue';
import LabeledInputTextArea from '@/components/UIComponents/LabeledInputTextArea.vue';
import LabeledInputNumber from '@/components/UIComponents/LabeledInputNumber.vue';
import router from '@/router';

const route = useRoute();
const productId = route.params.id;

const isLoading = ref();

const imageFile = ref(null);
const imagePreview = ref('');

const formValues = ref({
    id: 0,
    imageUrl: null,
    productName: '',
    description: '',
    stocks: 0,
    price: 0,
})

const fieldErrors = ref({
    imageUrl: null,
    productName: '',
    description: '',
    stocks: '',
    price: '',
});

const schema = yup.object({
    imageUrl: yup.mixed().required('Image is required').test('fileType', 'Only image files are allowed', value => {
        return value && value.type && value.type.startsWith('image/');
    }),
    productName: yup.string().required('Product name is required').matches(/^[a-zA-Z0-9\s.,-]*$/, 'Product name can only contain letters, numbers, and spaces'),
    description: yup.string().required('Product name is required').min(5, 'Username must be at least 5 characters').matches(/^[a-zA-Z0-9\s.,-]*$/, 'Product name can only contain letters, numbers, and spaces'),
    stocks: yup.number().min(1, 'Stocks must be greater than 0').required('Stocks are required'),
    price: yup.number().min(1, 'Price must be greater than 0').required('Price is required'),
});

// Handle file input
const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        imageFile.value = file;
        imagePreview.value = URL.createObjectURL(file);
        formValues.value.imageUrl = file; // for validation
    }
};


const fetchProduct = async () => {
    isLoading.value = true;

    try {
        const response = await axios.get(`${API_BASE_URL}/api/product/${productId}/`);

        if (response && response.data) {
            const data = response.data;

            formValues.value = {
                id: data.id,
                imageUrl: data.image,
                productName: data.name,
                description: data.description,
                stocks: Number(data.stock),
                price: Number(data.price),
            };
            imagePreview.value = `${API_BASE_URL}${data.image}`;
        }
    } catch (err) {
        console.error('Fetch product error:', err);
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchProduct();
})


const updateProduct = async (e) => {
    e.preventDefault();
    fieldErrors.value = { imageUrl: null, productName: '', description: '', stocks: '', price: '' };
    isLoading.value = true;

    try {

        await schema.validate(formValues.value, { abortEarly: false });

        const formData = new FormData();
        formData.append('id', formValues.value.id);
        formData.append('name', formValues.value.productName);
        formData.append('description', formValues.value.description);
        formData.append('stock', formValues.value.stocks);
        formData.append('price', formValues.value.price);
        formData.append('image', formValues.value.imageUrl);

        const response = await axios.put(`${API_BASE_URL}/api/product/${productId}/edit/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response && response.data) {
            router.push(`/product-view/${productId}`)
        }

        formValues.value = { id: 0, imageUrl: null, productName: '', description: '', stocks: 0, price: 0 };
    } catch (error) {
        // Check if the error is a validation error from Yup
        if (error.name === 'ValidationError') {
            if (error.inner) {
                error.inner.forEach(err => {
                    fieldErrors.value[err.path] = err.message;
                });
            }
        }

    } finally {
        isLoading.value = false
    }
}

</script>


<template>
    <div class="view-wrapper" id="edit-product-view">
        <h3>Edit Product</h3>

        <form>
            <div class="labeled-input-image">
                <div class="image-container">
                    <img v-if="imagePreview" :src="imagePreview" alt="Preview" class="image-preview" />
                    <div v-else class="image-placeholder"></div>
                </div>

                <label class="label-text">Product Image</label>
                <input type="file" accept="image/jpeg, image/png, image/jpg, image/webp" class="file-input"
                    @change="handleFileChange" />
                <FieldErrorMessage :message="fieldErrors.imageUrl" :visibility="!!fieldErrors.imageUrl" />
            </div>

            <div class="field-group-wrapper">
                <LabeledInputText label="Product name" placeholder="Enter product name"
                    v-model="formValues.productName" />
                <FieldErrorMessage :message="fieldErrors.productName" :visibility="!!fieldErrors.productName" />
            </div>
            <div class="field-group-wrapper">
                <LabeledInputTextArea label="Product description" placeholder="Enter product description"
                    v-model="formValues.description" />
                <FieldErrorMessage :message="fieldErrors.description" :visibility="!!fieldErrors.description" />
            </div>
            <div class="field-group-wrapper">
                <LabeledInputNumber label="Product Stocks" placeholder="Enter product stocks"
                    v-model="formValues.stocks" />
                <FieldErrorMessage :message="fieldErrors.stocks" :visibility="!!fieldErrors.stocks" />
            </div>

            <div class="field-group-wrapper">
                <LabeledInputNumber label="Product Price" placeholder="Enter product price"
                    v-model="formValues.price" />
                <FieldErrorMessage :message="fieldErrors.price" :visibility="!!fieldErrors.price" />
            </div>

            <PrimaryButton label="Update Product" @click="updateProduct" custom-class="edit-product-button" />
        </form>

        <LoadingSpinner v-if="isLoading" />
    </div>
</template>


<style scoped>
#edit-product-view {
    padding: 5rem 0;
    min-height: 100vh;

    max-width: 400px;
}

#edit-product-view h3 {
    text-align: center;
    margin-bottom: 3rem;
}

#edit-product-view .field-group-wrapper {
    margin-top: 1rem;
}

.edit-product-button {
    width: 100%;
    margin-top: 2rem;
}

/* IMAGE INPUT STYLE */
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
    border-radius: 4px;
    background-color: #d4edda;
    font-size: 0.95rem;
    cursor: pointer;
    color: black;
    transition: border-color 0.3s ease;
    width: 100%;
}

.file-input::-webkit-file-upload-button {
    background-color: #90ee90;
    color: black;
    border: 1px solid #2e7d32;
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