//Libraries
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useStoreUsers } from '@/stores/users'
import App from './App.vue'
import router from './router'
//Viewer
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

const app = createApp(App)

app.use(createPinia())

app.use(VueViewer)
//La inicialización del store tiene que ir necesariamente después de la carga de Pinia (app.use(CreatePinia()))
const store = useStoreUsers();
(async ()=>{
    try {
        await store.onAuthState();
    app.use(router)
    app.mount('#app');
    } catch (error) {
        console.log("main.js",error.message);
    }    
})()