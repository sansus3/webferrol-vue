<template>
    <div class="container is-max-desktop">
        <div class="section columns is-centered">
            <div class="column">
                <h1 class="title">Acceso a área privada</h1>
                <SignInEmailPassword></SignInEmailPassword>
            </div>
        </div>
    </div>
</template>

<script setup>
//Libraries
import SignInEmailPassword from '@/components/login/SignInEmailPassword.vue';
</script>