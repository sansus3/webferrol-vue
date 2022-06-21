import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

//Ejemplo de lanzar el store de Pinia con el método beforeEnter
//import { useStoreUsers } from '../stores/users';
// const PiniaUseStoreUsers = async () => {
//   const store = useStoreUsers();
//   store.loadingSession = true;
//   await store.onAuthState();
//   store.loadingSession = false;
// }

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    //beforeEnter: PiniaUseStoreUsers,
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: 'Acerca de Xurxo',
    },
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    meta: {
      title: 'Portafolio',
    },
    component: () => import('../views/PortfolioView.vue')
  },
  {
    path: '/workexperiences',
    name: 'workexperiences',
    meta: {
      title: 'Experiencias',
      protectedRoute: true,
    },
    component: function () {
      return import(/* webpackChunkName: "about" */ '@/views/private/WorkExperienceView.vue')
    },
  },
  {
    path: '/new-experience',
    name: 'newexperience',
    meta: {
      title: 'Nueva experiencia',
      protectedRoute: true,
    },
    component: function () {
      return import('@/views/backend/NewExperienceView.vue')
    },
  },
  {
    path: '/sign-in',
    name: 'singin',
    meta: {
      title: 'Log in',
    },
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/SignInView.vue'),
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to,from,next)=>{
  window.document.title = to.meta.title?to.meta.title:'WebFerrol';
  //console.log(window.localStorage.getItem("user"))
  if(to.meta.protectedRoute===true && window.localStorage.getItem("user")===null){
    next('/sign-in');
  }else{
    next();
  }
  
});

export default router
