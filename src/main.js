import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useStoreUsers } from '@/stores/users'

import App from './App.vue'
import router from './router'

import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueViewer)
const store = useStoreUsers();
(async ()=>{
    await store.onAuthState();
    app.mount('#app');
})()