<template>
    <div class="home content is-medium p-5">
        <h1 class="title has-text-centered">Componentes Vue</h1>
        <div class="columns is-multiline">
            <!-- Contenido 1 -->
            <div class="column is-full">
                <div class="tile is-ancestor">
                    <div class="tile is-parent">
                        <article class="tile is-child notification is-warning">
                            <div class="content">
                                <p class="title">Vue3 Viewer</p>
                                <a class="subtitle" href="https://github.com/mirari/vue3-viewer"
                                    target="_blank">
                                    Image viewer component for vue, supports rotation, scale, zoom and so on, based on viewer.js</a>
                                <div class="content">
                                    <RouterLink
                                        :to="{name:'viewer'}">
                                        Ver demo
                                    </RouterLink>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
            <!-- Fin contenido 1 -->

            <!-- Contenido 2 -->


            <!-- Fin de contenido 2 -->
        </div>
    </div>
</template>