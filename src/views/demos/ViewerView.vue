<template>
    <div class="section">
        <!-- Trabajos -->
        <div class="home content is-medium p-5">
            <h1 class="title has-text-centered">Viewer</h1>
        </div>
        <div>
            <code class="box">npm install v-viewer@next</code>
            <div class="notification is-link">
                <a href="https://github.com/mirari/vue3-viewer">Enlace a Github</a>
            </div>
           <!-- Gallery -->
           <viewer :images="images" @inited="inited" class="viewer" ref="viewer">
           <div class="columns is-multiline">
                <div  v-for="(src,index) in images" :key="index" class="column is-one-quarter-desktop is-half-tablet">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-3by2">
                            <img :src="src" :key="src">
                            </figure>
                            <div class="card-content is-overlay is-clipped">
                            <span class="tag is-info">
                                Foto {{index+1}}
                            </span>       
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a class="card-footer-item">
                            Texto de muestra {{index+1}}
                            </a>
                        </footer>
                    </div>
                </div>
            </div>
            </viewer>
           <!-- end Gallery -->
        </div>
        <div class="section has-text-centered"><button class="button" type="button" @click="show">Show</button></div>
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