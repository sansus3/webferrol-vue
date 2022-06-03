<template>
    <nav class="navbar is-info" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <RouterLink
                @click.prevent="isActive = false"
                class="navbar-item" 
                to="/">
                <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"> 
            </RouterLink>

            <a 
                role="button" 
                @click.prevent="isActive = !isActive" 
                class="navbar-burger"
                :class="{ 'is-active': isActive }" 
                aria-label="menu" 
                :aria-expanded="isActive"
                data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div 
            id="navbarBasicExample" 
            class="navbar-menu"
            :class="{ 'is-active': isActive }">
            <div class="navbar-start">
                <RouterLink
                    @click.prevent="isActive = false"
                    class="navbar-item" 
                    to="/">
                    Home
                </RouterLink>

                <a class="navbar-item">
                    Documentation
                </a>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        Más
                    </a>

                    <div class="navbar-dropdown">
                        <RouterLink 
                            @click.prevent="isActive = false"
                            class="navbar-item" 
                            to="/about">
                            About
                        </RouterLink> 
                        <!-- <a class="navbar-item">
                            Jobs
                        </a>
                        <a class="navbar-item">
                            Contact
                        </a>
                        <hr class="navbar-divider">
                        <a class="navbar-item">
                            Report an issue
                        </a> -->
                    </div>
                </div>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a class="button is-primary">
                            <strong>Sign up</strong>
                        </a>
                        <TheLogout v-if="logged"></TheLogout>
                        <RouterLink
                            v-else
                            class="button is-light" 
                            :to="{ name: 'singin' }">
                            Log in
                        </RouterLink>                        
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
//Libraries
import { ref } from 'vue';
import TheLogout from './login/TheLogout.vue';
const isActive = ref(false);

defineProps({
    /**
     * @type {Boolean} looged - Con esta propieda si el usuario está logueado hacemos desaparecer el botón de "Log in"
     */
    logged: {
        type: Boolean,
        default: false
    }
})

</script>