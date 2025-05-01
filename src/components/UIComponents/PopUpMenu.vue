<script setup>
import { ref } from 'vue';

defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    customClass: {
        type: String,
    }
});

const menuRoot = ref(null);
defineExpose({ menuRoot });

</script>

<template>
    <transition name="fade">
        <div ref="menuRoot" :class="['popup-menu', customClass]" v-show="visible">
            <slot />
        </div>
    </transition>
</template>

<style scoped>
.popup-menu {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    position: absolute;
    top: 1.5rem;
    right: 0;
    background: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 15px;
    z-index: 999;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    pointer-events: auto;
    opacity: 1;
    transition: all 0.3s ease, pointer-events 0s linear 0.3s;
}

.popup-menu.fade-enter-active,
.popup-menu.fade-leave-active {
    transition: all 0.3s ease;
}

.popup-menu.fade-enter,
.popup-menu.fade-leave-to {
    opacity: 0;
    pointer-events: none;
}
</style>
