<template>
    <nav 
        class="navbar" 
        :class="[logged ? 'is-dark' : 'is-info']"
        role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <RouterLink
                @click.prevent="isActive = false"
                class="navbar-item" 
                to="/">
                <div class="logo"></div> 
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
                    v-if="logged"
                    class="navbar-item" 
                    :to="{name:'workexperience'}">
                    Experiencia laboral
                </RouterLink>

                <!-- <a class="navbar-item">
                    Documentation
                </a> -->

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
                        <TheLogout 
                            v-if="logged"
                            @click.prevent="isActive = false"></TheLogout>
                        <RouterLink
                            v-else
                            @click.prevent="isActive = false"
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
});
</script>
<style lang="scss" scoped>
    .logo{
        display: inline-block;
        width: 112px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        &::before{
            content: "WebFerrol";
            font-variant: small-caps;
            font-size: 1.2em;
        }
    }
</style>