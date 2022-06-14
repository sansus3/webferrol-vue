import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useStoreUsers } from '../stores/users';

const PiniaUseStoreUsers = async () => {
  const store = useStoreUsers();
  await store.logged();
  //console.log(store.user)
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: () => {
      PiniaUseStoreUsers();
    }
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: 'Acerca de Xurxo',
    },
    beforeEnter: () => {
      PiniaUseStoreUsers();
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
    beforeEnter: () => {
      PiniaUseStoreUsers();
    },
    component: () => import('../views/PortfolioView.vue')
  },
  {
    path: '/workexperience',
    name: 'workexperience',
    meta: {
      title: 'Experiencias',
    },
    component: function () {
      return import(/* webpackChunkName: "about" */ '@/views/private/WorkExperienceView.vue')
    },
    beforeEnter: () => {
      PiniaUseStoreUsers();
    },
  },
  {
    path: '/new-experience',
    name: 'newexperience',
    meta: {
      title: 'Nueva experiencia',
    },
    component: function () {
      return import('@/views/backend/NewExperienceView.vue')
    },
    beforeEnter: () => {
      PiniaUseStoreUsers();
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
    beforeEnter: () => {
      PiniaUseStoreUsers();
    },
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to,from,next)=>{
  window.document.title = to.meta.title?to.meta.title:'WebFerrol';
  next();
});

export default router
