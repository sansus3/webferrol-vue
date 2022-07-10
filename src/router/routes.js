export const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue')
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
        path: '/sitemap',
        name: 'sitemap',
        meta: {
            title: 'Mapa del sitio',
        },
        component: () => import('../views/SiteMapView.vue')
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
        path: '/workexperience/:ref',
        name: 'Workexperience',
        meta: {
            title: 'Editar experiencia',
            protectedRoute: true,
        },
        component: function () { 
            return import('@/views/private/WorkExperienceEditView.vue')
        }
    },
    {
        path: '/new-experience',
        name: 'newexperience',
        meta: {
            title: 'Nueva experiencia',
            protectedRoute: true,
        },
        component: function () {
            return import('@/views/private/WorkExperienceInsertView.vue')
        },
    },
    {
        path: '/sign-in',
        name: 'singin',
        meta: {
            title: 'Log in',
            authRoute: true,
        },
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/SignInView.vue'),
    },
    {
        path: '/viewer',
        name: 'viewer',
        meta: {
            title: 'Viewer Vue 3',
        },
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/demos/ViewerView.vue'),
    },
    {
        path: '/geolocation',
        name: 'Geolocation',
        meta: {
            title: 'Geolocation JavaScript',
        },
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/demos/GeolocationView.vue'),
    },
]