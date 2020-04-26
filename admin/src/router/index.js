import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import CategoryEdit from '@/components/CategoryEdit'
import CategoryList from '@/components/CategoryList'

import ItemList from '@/components/ItemList'
import ItemEdit from '@/components/ItemEdit'

import HeroList from '@/components/HeroList'
import HeroEdit from '@/components/HeroEdit'

import ArticleList from '@/components/ArticleList'
import ArticleEdit from '@/components/ArticleEdit'

import AdList from '@/components/AdList'
import AdEdit from '@/components/AdEdit'

import AdminUserList from '@/components/AdminUserList'
import AdminUserEdit from '@/components/AdminUserEdit'

import Login from '@/components/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', name: 'login', component: Login, meta: { isPublic: true } },
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        { path: '/categories/create', component: CategoryEdit },
        { path: '/categories/edit/:id', component: CategoryEdit, props: true },
        { path: '/categories/list', component: CategoryList },

        { path: '/items/create', component: ItemEdit },
        { path: '/items/edit/:id', component: ItemEdit, props: true },
        { path: '/items/list', component: ItemList },

        { path: '/heroes/create', component: HeroEdit },
        { path: '/heroes/edit/:id', component: HeroEdit, props: true },
        { path: '/heroes/list', component: HeroList },

        { path: '/articles/create', component: ArticleEdit },
        { path: '/articles/edit/:id', component: ArticleEdit, props: true },
        { path: '/articles/list', component: ArticleList },

        { path: '/ads/create', component: AdEdit },
        { path: '/ads/edit/:id', component: AdEdit, props: true },
        { path: '/ads/list', component: AdList },

        { path: '/admin_users/create', component: AdminUserEdit },
        { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
        { path: '/admin_users/list', component: AdminUserList },
      ]
    }
  ]
})
router.beforeEach((to,from,next)=>{
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})
export default router