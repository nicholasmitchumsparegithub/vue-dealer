import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import UserLogin from '@/views/UserLogin.vue';
import Dashboard from '@/views/DashboardView.vue';
import NewMessage from '@/views/NewMessage.vue';
import EditMessage from '@/views/EditMessage.vue';
import ViewMessage from '@/views/ViewMessage.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'UserLogin',
            component: UserLogin,
            meta: { onlyGuest: true }
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: { requiresAuth: true }
        },
        {
            path: '/new-message',
            name: 'NewMessage',
            component: NewMessage,
            meta: { requiresAuth: true }
        },
        {
            path: '/edit-message/:capsuleId',
            name: 'EditMessage',
            component: EditMessage,
            props: true,
            meta: { requiresAuth: true }
        },
        {
            path: '/view-message/:capsuleId',
            name: 'ViewMessage',
            component: ViewMessage,
            props: true,
            meta: { requiresAuth: true }
        },
        {
            path: '*',
            redirect: '/login',
            exclude: ['/login']
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters["auth/isAuthenticated"]) {
            next({ name: 'UserLogin' })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.onlyGuest)) {
        if (store.getters["auth/isAuthenticated"]) {
            next({name: "Dashboard"});
        } else {
            next();
        }
    }
    else {
        next()
    }
});

export default router;

