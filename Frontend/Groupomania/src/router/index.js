import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'
import signUp from '../views/signUp.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import( /* webpackChunkName: "about" */ '../views/login.vue')
        component: Login
    },
    {
        path: '/signup',
        name: 'Sign up',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import( /* webpackChunkName: "about" */ '../views/signUp.vue')
        component: signUp
    }
]

const router = new VueRouter({
    routes
})

export default router