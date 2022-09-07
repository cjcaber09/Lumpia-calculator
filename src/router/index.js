import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
const Entry = () => import('../views/Entries.vue')
const Settings = () => import('../views/Settings.vue')
const Piggery = () => import('../views/Piggery.vue')
// import  from './modules/'
const FatteningView = () => import('../views/FatteningView.vue')
const Login = () => import('../views/Login.vue')
const AppLayout = () =>import('../components/AppLayout.vue')
Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: AppLayout,
    children:[{
      path: '/piggery',
      name: 'Piggery',
      component: Piggery,
    },{
      path: '/lumpia',
      name: 'Entries',
      component: Entry
    },
    {
      path: '/piggery',
      name: 'Piggery',
      component: Piggery,
    },
    {
      path: '/fattening',
      name: 'Fattening',
      children: [{
        path: ':fatteningId',
        name: 'FatteningView',
        component: FatteningView
      }]
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },]
  },
  
  {
    path:'*',
    component: {
      render(c) {
        return c("router-view")
      }
    },
    children:[{
      path: 'login',
      name: 'Login',
      component: Login
    }]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router