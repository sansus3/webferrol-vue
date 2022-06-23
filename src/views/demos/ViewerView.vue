<template>
    <div class="container">
        <!-- Trabajos -->
        <div class="home content is-medium p-5">
            <h1 class="title has-text-centered">Viewer</h1>
        </div>
        <div>
            <code class="box">npm install v-viewer@next</code>
            <div class="notification is-link">
                <a href="https://github.com/mirari/vue3-viewer">Enlace a Github</a>
            </div>
            <viewer :images="images" @inited="inited" class="viewer" ref="viewer">
                <template #default="scope">
                    <img v-for="src in scope.images" :src="src" :key="src">
                </template>
            </viewer>
            <button class="button" type="button" @click="show">Show</button>
        </div>
    </div>
</template>

<script setup>
import { component as Viewer } from "v-viewer"
//var VueViewer = require('VueViewer');
const images = [
    "https://picsum.photos/200/200",
    "https://picsum.photos/300/200",
    "https://picsum.photos/250/200"
];
let v = null;
const inited = viewer => {
    v = viewer;

}
const show = () => {
    console.log(v.show())
}

</script>