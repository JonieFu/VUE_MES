import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import User from "../components/user.vue"
import Department from '../components/rights/department.vue'
import Employee from '../components/rights/employee.vue'
import Company from '../components/rights/company.vue'
import Role from '../components/rights/role.vue'
import Menu from '../components/rights/menu.vue'
import Configuration from '../components/data/configuration.vue'
import Maintenance from '../components/data/maintenance.vue'
import Contract from '../components/contract/contract.vue'
import Purchas_order from '../components/purchas/purchas_order.vue'
import Return_order from '../components/purchas/return_order.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/home',
    component: Home,
    redirect: '/department',
    children: [
      { path: '/user', name: 'User', component: User },
      { path: '/department', name: 'Department', component: Department },
      { path: '/employee', name: 'Employee', component: Employee },
      { path: '/company', name: 'Company', component: Company },
      { path: '/role', name: 'Role', component: Role },
      { path: '/menu', name: 'Menu', component: Menu },
      { path: '/configuration', name: 'Configuration', component: Configuration },
      { path: '/maintenance', name: 'Maintenance', component: Maintenance },
      { path: '/contract', name: 'Contract', component: Contract },
      { path: '/purchas_order', name: 'Purchas_order', component: Purchas_order },
      { path: '/return_order', name: 'Return_order', component: Return_order }


    ]
  }
]

const router = new VueRouter({
  routes
})

// 设置路由导航守卫，如果用户没有登录的话则直接跳转到登录页面

// router.beforeEach((to,from,next)=>{
//   if(to.path ==='/login') return next()
//   const tokenStr = window.sessionStorage.getItem('token')
//   if(!tokenStr) return next('/login')
//   next()
// })

export default router
