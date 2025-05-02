<script setup>
import { ref } from 'vue';
import * as yup from 'yup';
import LabeledInputImage from '@/components/UIComponents/LabeledInputImage.vue';
import FieldErrorMessage from '@/components/UIComponents/FieldErrorMessage.vue';
import PrimaryButton from '@/components/UIComponents/PrimaryButton.vue';

const formData = ref({
    imageUrl: '',
})

const fieldErrors = ref({
    imageUrl: '',
});

const schema = yup.object({
    imageUrl: yup.string().required('Image is required'),
});

const addProduct = async (e) => {
    e.preventDefault();
    fieldErrors.value = { imageUrl: '' };

    try {

        await schema.validate(formData.value, { abortEarly: false });

        console.log(formData.value)

    } catch (error) {
        // Check if the error is a validation error from Yup
        if (error.name === 'ValidationError') {
            if (error.inner) {
                error.inner.forEach(err => {
                    fieldErrors.value[err.path] = err.message;
                });
            }
        }
    }
}

</script>

<template>
    <div class="view-wrapper" id="add-product-view">
        <h3>Add Product</h3>


        <form>
            <div>
                <LabeledInputImage v-model="formData.imageUrl" />
                <FieldErrorMessage :message="fieldErrors.imageUrl" :visibility="!!fieldErrors.imageUrl" />
            </div>

            <PrimaryButton label="Add Product" @click="addProduct" />
        </form>
    </div>
</template>

<style scoped>
#add-product-view {
    padding: 30px 0;
    min-height: 100vh;

    max-width: 400px;
}

#add-product-view h3 {
    text-align: center;
    margin-bottom: 3rem;
}
</style>