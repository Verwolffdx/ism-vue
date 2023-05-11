import Main from "@/pages/Main"
import AuthorizationPage from "@/pages/AutorizationPage"
import DocumentPage from "@/pages/DocumentPage"
import CreateDocomentPage from "@/pages/CreateDocumentPage"
import LoginComponent from '@/pages/Login'
import RegisterComponent from '@/pages/Register'
import { createRouter, createWebHistory } from "vue-router"
import {auth} from '@/store/auth.module'

const routes = [

    {
        path: '/',
        redirect: "/login"
    },
    {
        path: '/smk',
        component: Main,
        meta: { requiresAuth: true }
    },
    {
        path: '/smk/document/:id',
        component: DocumentPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/create',
        component: CreateDocomentPage,
        meta: { requiresAuth: true }
    },
    {
        path: "/login",
        component: LoginComponent,
        meta: { requiresAuth: false }
    },
    {
        path: "/admin/register",
        component: RegisterComponent,
        meta: { requiresAuth: false}
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

router.beforeEach((to, from) => {
    // const isAuth = auth.state.status.loggedIn;


    if (to.meta.requiresAuth && !auth.state.status.loggedIn) {
      return {
        path: '/login',
        query: { redirect: to.fullPath },
      }
    }
  })

export default router