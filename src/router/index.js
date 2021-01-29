import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Welcome from '../components/welcome.vue'
import Home from '../components/home.vue'
import Department from '../components/rights/department.vue'
import Employee from '../components/rights/employee.vue'
import Company from '../components/rights/company.vue'
import Role from '../components/rights/role.vue'
import Menu from '../components/rights/menu.vue'
import Configuration from '../components/data/configuration.vue'
import Maintenance from '../components/data/maintenance.vue'
import Contract from '../components/contract/contract.vue'
import ContractAdd from '../components/contract/add.vue'
import ContractEdit from '../components/contract/edit.vue'
import ContractReview from '../components/contract/review.vue'
import Purchas_order from '../components/purchas/purchas_order.vue'
import Return_order from '../components/purchas/return_order.vue'
import Report from '../components/report/report.vue'
import BOM from '../components/data/Bom.vue'
import Dict from '../components/data/dict.vue'
import DictList from '../components/data/dictList.vue'
import Process from '../components/data/process.vue'
import Sales_order from '../components/purchas/sales_order.vue'
import Library from '../components/material/library'
import Outof from '../components/material/outof.vue'
import Raw from '../components/material/raw.vue'
import Cj from '../components/Production/cj.vue'
import Sdcj from '../components/Production/sdcj.vue'
import Ny from '../components/Production/ny.vue'
import Fj from '../components/Production/fj.vue'
import Txjlb from '../components/Production/txjlb.vue'
import Scdd from '../components/Production/scdd.vue'
import Dmdb from '../components/Production/dmdb.vue'
import Pcjh from '../components/Production/pcjh.vue'
import Scsjdm from '../components/Production/scsjdm.vue'
import Scsjly from '../components/Production/scsjly.vue'
import Gd from '../components/Production/gd.vue'
import Bgxx from '../components/Production/bgxx.vue'
import Ymdz from '../components/quality/ymdz.vue'
import Gdohq from '../components/quality/gdohq.vue'
import Jtxzq from '../components/quality/jtxzq.vue'
import Sbejg from '../components/quality/sbejg.vue'
import Dc from '../components/quality/dc.vue'
import Yj from '../components/quality/yj.vue'
import Dlhgq from '../components/quality/dlhgq.vue'
import Cpjc from '../components/quality/cpjc.vue'
import Sbgzgl from '../components/device/sbgzgl.vue'
import Sbrcwh from '../components/device/sbrcwh.vue'

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
    redirect: '/welcome',
    children: [
      { path: '/welcome', name: 'Welcome', component: Welcome },
      { path: '/department', name: 'Department', component: Department },
      { path: '/employee', name: 'Employee', component: Employee },
      { path: '/company', name: 'Company', component: Company },
      { path: '/role', name: 'Role', component: Role },
      { path: '/menu', name: 'Menu', component: Menu },
      { path: '/configuration', name: 'Configuration', component: Configuration },
      { path: '/maintenance', name: 'Maintenance', component: Maintenance },
      { path: '/contract', name: 'Contract', component: Contract },
      { path: '/purchas_order', name: 'Purchas_order', component: Purchas_order },
      { path: '/return_order', name: 'Return_order', component: Return_order },
      { path: '/contract/add', name: 'ContractAdd', component: ContractAdd },
      { path: '/contract/edit', name: 'ContractEdit', component: ContractEdit },
      { path: '/contract/review', name: 'ContractReview', component: ContractReview },
      { path: '/report', name: 'Report', component: Report },
      { path: '/bom', name: 'BOM', component: BOM },
      { path: '/dict', name: 'Dict', component: Dict },
      { path: '/dictList', name: 'DictList', component: DictList },
      { path: '/process', name: "Process", component: Process },
      { path: '/sales_order', name: 'Sales_order', component: Sales_order },
      { path: '/itemIn', name: 'Library', component: Library },
      { path: '/itemOut', name: 'Outof', component: Outof },
      { path: '/raw', name: 'Raw', component: Raw },
      { path: '/cj', name: 'Cj', component: Cj },
      { path: '/sdcj', name: 'Sdcj', component: Sdcj },
      { path: '/dmdb', name: 'Dmdb', component: Dmdb },
      { path: '/ny', name: 'Ny', component: Ny },
      { path: '/fj', name: 'Fj', component: Fj },
      { path: '/txjlb', name: 'Txjlb', component: Txjlb },
      { path: '/scdd', name: 'Scdd', component: Scdd },
      { path: '/pcjh', name: 'Pcjh', component: Pcjh },
      { path: '/scsjdm', name: 'Scsjdm', component: Scsjdm },
      { path: '/scsjly', name: 'Scsjly', component: Scsjly },
      { path: '/gd', name: 'Gd', component: Gd },
      { path: '/bgxx', name: 'Bgxx', component: Bgxx },
      { path: '/ymdz', name: 'Ymdz', component: Ymdz },
      { path: '/gdohq', name: 'Gdohq', component: Gdohq },
      { path: '/jtxzq', name: 'Jtxzq', component: Jtxzq },
      { path: '/sbejg', name: 'Sbejg', component: Sbejg },
      { path: '/dc', name: 'Dc', component: Dc },
      { path: '/yj', name: 'Yj', component: Yj },
      { path: '/dlhgq', name: 'Dlhgq', component: Dlhgq },
      { path: '/cpjc', name: 'Cpjc', component: Cpjc },
      { path: '/sbgzgl', name: 'Sbgzgl', component: Sbgzgl },
      { path: '/sbrcwh', name: 'Sbrcwh', component: Sbrcwh },
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
