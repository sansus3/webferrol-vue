<template>
    <div class="container">
        <div class="home content is-medium p-5">
            <h1 class="title has-text-centered">Mapa Web</h1>
        </div>
        <div class="content">
            <ul>
                <li v-for="(route,index) of routes" :key="index">
                    <RouterLink 
                            class="navbar-item" 
                            :to="route['path']">
                            {{(route['meta'])?.title??'Home'}}
                        </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { routes } from '@/router/routes';
</script>