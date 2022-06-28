import { createRouter, createWebHistory } from 'vue-router'
import { useStoreUsers } from '../stores/users';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to,from,next)=>{
  const store = useStoreUsers();
  //await store.onAuthState();
  window.document.title = to.meta.title?to.meta.title:'WebFerrol';
  if(to.meta.protectedRoute===true && store.user?.uid===undefined){
    next('/sign-in');
  }else if(to.meta.authRoute===true && store.user?.uid!==undefined){
    next('/');
  }else{
    next();
  }
  
});

export default router
