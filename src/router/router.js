export default [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: resolve => require(['@/components/pages/index/index'],resolve)
  },
  {
    path: '/txDemo',
    component: resolve => require(['@/components/pages/demo/txDemo/txDemo'],resolve)
  },
  {
    path: '/computedDemo',
    component: resolve => require(['@/components/pages/demo/computedDemo/index'],resolve)
  },
  {
    path: '/eleDemo',
    component: resolve => require(['@/components/pages/demo/flexDemo/eleDemo'],resolve)
  },
  {
    path: '/flexDemo',
    component: resolve => require(['@/components/pages/demo/flexDemo/flexDemo'],resolve)
  },
  {
    path: '/promiseDemo',
    component: resolve => require(['@/components/pages/demo/promiseDemo/promiseDemo'],resolve)
  },
  {
    path: '/drag',
    component: resolve => require(['@/components/pages/demo/drag/drag'],resolve)
  }
]
