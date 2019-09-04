export default [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: resolve => require(['@/components/pages/login/login'],resolve)
    },
    {
      path: '/register',
      component: resolve => require(['@/components/pages/register/register'],resolve)
    },
    {
      path: '/playing',
      component: resolve => require(['@/components/pages/playing/playing'],resolve)
    },
    {
      path: '/playback',
      component: resolve => require(['@/components/pages/playback/playback'],resolve)
    },
    {
      path: '/resetPwd',
      component: resolve => require(['@/components/pages/resetPwd/resetPwd'],resolve)
    },
    {
      path: '/index',
      component: resolve => require(['@/components/pages/index/index'],resolve)
    },
    {
      path: '/userManegement',
      component: resolve => require(['@/components/pages/usermanage/userManegement'],resolve)
    },
    {
      path: '/txDemo',
      component: resolve => require(['@/components/pages/demo/txDemo/txDemo'],resolve)
    },
    {
      path: '/userAudit',
      component: resolve => require(['@/components/pages/userAudit/userAudit'],resolve)
    }
]
