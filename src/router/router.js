import Main from "@/pages/Main"
import AuthorizationPage from "@/pages/AutorizationPage"
import DocumentPage from "@/pages/DocumentPage"
import CreateDocumentPage from "@/pages/CreateDocumentPage"
import EditDocumentPage from "@/pages/EditDocumentPage"
import LoginComponent from '@/pages/Login'
import RegisterComponent from '@/pages/Register'
import AdminPage from '@/pages/AdminPage'
import FavoritesPage from '@/pages/FavoritesPage'
import RegisterOfDocumentsPage from '@/pages/RegisterOfDocumentsPage'
import { createRouter, createWebHistory } from "vue-router"
import { auth } from '@/store/auth.module'

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
        path: '/smk/favorites',
        component: FavoritesPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/create',
        component: CreateDocumentPage,
        meta: { requiresAuth: true },
        beforeEnter(to, from, next) {
            if (!auth.state.user.roles.includes('ROLE_ADMIN')) {
                next(from.path)
            } else {
                next()
            }
        }
    },
    {
        path: '/admin/edit/:id',
        component: EditDocumentPage,
        meta: { requiresAuth: true },
        beforeEnter(to, from, next) {
            if (!auth.state.user.roles.includes('ROLE_ADMIN')) {
                next(from.path)
            } else {
                next()
            }
        }
    },
    {
        path: "/login",
        component: LoginComponent,
        meta: { requiresAuth: false }
    },
    {
        path: "/admin/register",
        component: RegisterComponent,
        meta: { requiresAuth: false },
        beforeEnter(to, from, next) {
            if (!auth.state.user.roles.includes('ROLE_ADMIN')) {
                next(from.path)
            } else {
                next()
            }
        }
    },
    {
        path: "/admin",
        component: AdminPage,
        meta: { requiresAuth: false },
        beforeEnter(to, from, next) {
            if (!auth.state.user.roles.includes('ROLE_ADMIN')) {
                next(from.path)
            } else {
                next()
            }
        }
    },
    {
        path: "/admin/docregister",
        component: RegisterOfDocumentsPage,
        meta: { requiresAuth: false },
        beforeEnter(to, from, next) {
            if (!auth.state.user.roles.includes('ROLE_ADMIN')) {
                next(from.path)
            } else {
                next()
            }
        }
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

    // if(!auth.state.user.roles.includes('ROLE_ADMIN')) {
    //     return {
    //         path: '/smk',
    //         query: { redirect: to.fullPath },
    //       }
    // }
})

export default router