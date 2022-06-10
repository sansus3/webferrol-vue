import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
      path: '/workexperience',
      name: 'workexperience',
      meta: {
        title: 'Experiencias',
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
      component: () => import('../views/SignInView.vue')
    }
  ]
});

router.beforeEach((to,from,next)=>{
  window.document.title = to.meta.title?to.meta.title:'WebFerrol';
  next();
});

export default router
