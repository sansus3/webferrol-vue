<template>
    <div class="section">
        <!-- Trabajos -->
        <div class="home content is-medium p-5">
            <h1 class="title has-text-centered">Viewer</h1>
        </div>
        <pre>
            {{ form }}
        </pre>
        <the-geolocation></the-geolocation>
    </div>
</template>

<script setup>
import { reactive, provide } from 'vue';
import TheGeolocation from '@/components/TheGeolocation.vue';
const form = reactive({
    location: { lat: 0, lng: 0 }
})
provide('location', form.location);


</script>