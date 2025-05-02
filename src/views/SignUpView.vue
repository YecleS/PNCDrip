<script setup>
import axios from 'axios';
import FieldErrorMessage from '@/components/UIComponents/FieldErrorMessage.vue';
import { ref } from 'vue';
import * as yup from 'yup';
import LabeledInputText from '@/components/UIComponents/LabeledInputText.vue';
import LabeledInputPassword from '@/components/UIComponents/LabeledInputPassword.vue';
import PrimaryButton from '@/components/UIComponents/PrimaryButton.vue';
import { useToast } from 'vue-toastification';
import { useAuth } from '@/composables/useAuth';
import router from '@/router';

const toast = useToast();
const { setAuthData } = useAuth();

const formData = ref({
    username: '',
    email: '',
    password: ''
})

const fieldErrors = ref({
    username: '',
    email: '',
    password: ''
});

const schema = yup.object({
    username: yup
        .string()
        .min(5, 'Username must be at least 5 characters')
        .required('Username is required'),

    email: yup
        .string()
        .email('Must be a valid email')
        .required('Email is required'),

    password: yup
        .string()
        .min(5, 'Password must be at least 5 characters')
        .required('Password is required'),
});

const signup = async (e) => {
    e.preventDefault();
    fieldErrors.value = { username: '', email: '', password: '' };

    try {
        await schema.validate(formData.value, { abortEarly: false });

        const response = await axios.post('http://127.0.0.1:8000/api/register/', {
            username: formData.value.username,
            email: formData.value.email,
            password: formData.value.password
        });

        if (response.data.access && response.data.refresh) {
            setAuthData({
                access: response.data.access,
                refresh: response.data.refresh,
                user_id: response.data.user_id,
                username: response.data.username,
                role: response.data.role[0],
            })
        }

        formData.value = { username: '', email: '', password: '' };
        router.push('/');
    } catch (error) {

        if (error.name === 'ValidationError') {
            if (error.inner) {
                error.inner.forEach(err => {
                    fieldErrors.value[err.path] = err.message;
                });
            }
        } else {
            toast.error('Registration failed: ' + (error.response?.data?.error || error.message));
        }
    }
};
</script>

<template>
    <div class="view-wrapper" id="signup-view">
        <div class="signup-view-wrapper">
            <img src="../assets/images/signup-img.jpg" alt="Login Image">

            <div class="forms-wrapper">
                <p>PNC<span style="color: var(--primary-color);">Drip</span></p>
                <h2>Join Us Now</h2>

                <form>
                    <div class="field-group-wrapper">
                        <LabeledInputText label="Username" name="username" placeholder="Enter your username"
                            v-model="formData.username" />
                        <FieldErrorMessage :message="fieldErrors.username" :visibility="!!fieldErrors.username" />
                    </div>

                    <div class="field-group-wrapper" style="margin-top: 1.5rem;">
                        <LabeledInputText label="Email" name="email" placeholder="Enter your email"
                            v-model="formData.email" />
                        <FieldErrorMessage :message="fieldErrors.email" :visibility="!!fieldErrors.email" />
                    </div>

                    <div class="field-group-wrapper" style="margin-top: 1.5rem;">
                        <LabeledInputPassword label="Password" name="password" placeholder="Enter your password"
                            v-model="formData.password" />
                        <FieldErrorMessage :message="fieldErrors.password" :visibility="!!fieldErrors.password" />
                    </div>

                    <PrimaryButton label="Register Now" class="signup-button-custom-class" @click="signup" />
                    <p class="login-link"><a href="/login">Already Have an Account ? Login Here</a></p>
                </form>
            </div>
        </div>
    </div>
</template>


<style scoped>
#signup-view {
    width: 1000px;
}

.signup-view-wrapper {
    display: grid;
    grid-template-columns: 0.8fr 1fr;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
    border-radius: 5px;

    margin: 2rem 0;
    padding: 15px;
}

.signup-view-wrapper img {
    width: 100%;
    height: auto;
    object-fit: cover;

    border-radius: 10px;
}

.forms-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.forms-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.forms-wrapper p:nth-of-type(1) {
    font-size: 1rem;
    font-weight: 600;
}

.forms-wrapper h2 {
    font-size: 30px;
    margin-top: 1rem;
    font-weight: 600;
}

.forms-wrapper form {
    width: 350px;
    margin-top: 3rem;
}

.forms-wrapper input {
    width: 100%;
}

.signup-button-custom-class {
    width: 100%;
    margin-top: 2rem;
}

.login-link {
    text-align: center;
    margin-top: 1rem;
}

.login-link a {
    font-size: 14px;
    font-weight: 400;
}
</style>