<template>
    <nav 
        class="navbar" 
        :class="[isLogged ? 'is-dark' : 'is-info']"
        role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <RouterLink
                @click.prevent="isActive = false"
                class="navbar-item" 
                to="/">
                <div v-if="isLogged" class="user">{{getUserEmail}}</div>
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
                class="navbar-item" 
                to="/portfolio">                
                    Portafolio
                </RouterLink>
                
                <div 
                    v-if="isLogged" 
                    class="navbar-item has-dropdown"
                    :class="{ 'is-hoverable': isHoverable }"
                    >
                    <a 
                        class="navbar-link"
                        @mouseover="isHoverable=true">
                        Experiencias
                    </a>
                    <div class="navbar-dropdown">
                        <RouterLink
                            @click.prevent="navbarDropdownClose"                            
                            class="navbar-item" 
                            :to="{name:'workexperience'}">
                            Experiencia laboral
                        </RouterLink>  
                        <hr class="navbar-divider">                      
                        <RouterLink
                            @click.prevent="navbarDropdownClose"
                            class="navbar-item" 
                            :to="{name:'newexperience'}">
                            Nueva experiencia
                        </RouterLink>
                    </div>
                </div>

                <div 
                    class="navbar-item has-dropdown"
                    :class="{ 'is-hoverable': isHoverable }">
                    <a 
                        class="navbar-link"
                        @mouseover="isHoverable=true">
                        Más
                    </a>

                    <div class="navbar-dropdown">
                        <RouterLink 
                            @click.prevent="navbarDropdownClose"
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
                        <!-- <a class="button is-primary">
                            <strong>Sign up</strong>
                        </a> -->
                        <TheLogout 
                            v-if="isLogged"
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
import { inject, ref, toRefs } from 'vue';
import TheLogout from '@/components/login/TheLogout.vue';
const isActive = ref(false);
const isHoverable = ref(false);//para la clase is-hoverable
const navbarDropdownClose = () => {
    isActive.value = false;
    isHoverable.value = false;
}
const {getUserEmail,isLogged} = toRefs(inject('store'));//Con toRefs mantenemos la reactividad aunque hagamos destructuring

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