import Vue from 'vue'
import Router from 'vue-router'
import { cookie } from 'vux'
const HelloWorld = () => import('@/components/HelloWorld')
const ManagePur = () => import('@/components/manage/man_purchase')
const Allot = () => import('@/components/manage/allot')
const Enquiry = () => import('@/components/manage/enquiry')
const ManQuote = () => import('@/components/manage/man_quote')
const QuoteDetail = () => import('@/components/manage/quote_detail')

// import HelloWorld from '@/components/HelloWorld'
// import ManagePur from '@/components/manage/man_purchase'
// import Allot from '@/components/manage/allot'
// import Enquiry from '@/components/manage/enquiry'
// import ManQuote from '@/components/manage/man_quote'
// import QuoteDetail from '@/components/manage/quote_detail'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect: '/man_purchase'
    },
    {
      path: '/man_purchase',
      name: 'man_purchase',
      component: ManagePur,
      meta: { requireAuth: true }
    },
    {
      path: '/allot',
      name: 'allot',
      component: Allot,
      meta: { requireAuth: true }
    },
    {
      path: '/enquiry',
      name: 'enquiry',
      component: Enquiry,
      meta: { requireAuth: true }
    },
    {
      path: '/man_quote',
      name: 'man_quote',
      component: ManQuote,
      meta: { requireAuth: true }
    },
    {
      path: '/quote_detail',
      name: 'quote_detail',
      component: QuoteDetail,
      meta: { requireAuth: true }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (cookie.get('MC_UID')) {  // 获取当前的token是否存在
      console.log(cookie.get('MC_UID'))
      next()
    } else {
      // next({
      window.location.href = 'http://member.miningcircle.com/login'
      // })
    }
  } else {
    next()
  }
})
export default router
