import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to,from,next)=>{
  window.document.title = to.meta.title?to.meta.title:'WebFerrol';
  const user = JSON.parse(window.localStorage.getItem("user"));
  if(to.meta.protectedRoute===true && user?.uid===null){
    next('/sign-in');
  }else{
    next();
  }
  
});

export default router
