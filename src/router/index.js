import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component:() =>import('@/pages/Conitainer/Container'),
      children:[
        {
          path:'menu',
          component:()=>import('@/pages/Menu/Menu')
        },
        {
          path:"menu/add",
          component:()=>import('@/pages/Menu/Add')
        },
        {
          path:"/menu/:idw",
          component:()=>import('@/pages/Menu/Add')
        },
        {
          path:"role",
          component:()=>import('@/pages/Role/Role')
        },
        {
          path:"role/add",
          component:()=>import('@/pages/Role/Add')
        },
        {
          path:"/role/:id",
          component:()=>import('@/pages/Role/Add')
        },
        {
          path:"user",
          component:()=>import('@/pages/User/User')
        },
        {
          path:"user/add",
          component:()=>import('@/pages/User/Add')
        },
        {
          path:"/user/:id",
          component:()=>import('@/pages/User/Add')
        },
        {
          path:"category",
          component:()=>import('@/pages/Category/Category')
        },
        {
          path:"category/add",
          component:()=>import('@/pages/Category/Add')
        },
        {
          path:"/category/:id",
          component:()=>import('@/pages/Category/Add')
        },
        {
          path:"specs",
          component:()=>import('@/pages/Specs/Specs')
        },
        {
          path:"specs/add",
          component:()=>import('@/pages/Specs/Add')
        },
        {
          path:"/specs/:id",
          component:()=>import('@/pages/Specs/Add')
        },
        {
          path:"member",
          component:()=>import('@/pages/Member/Member')
        },
        {
          path:"/member/:id",
          component:()=>import('@/pages/Member/Edit')
        },
        
        {
          path:"goods",
          component:()=>import('@/pages/Goods/Goods')
        },
        {
          path:"goods/add",
          component:()=>import('@/pages/Goods/Add')
        },
        {
          path:"/goods/:id",
          component:()=>import('@/pages/Goods/Add')
        },
        {
          path:"banner",
          component:()=>import('@/pages/Banner/Banner')
        },
        {
          path:"banner/add",
          component:()=>import('@/pages/Banner/Add')
        },
        {
          path:"/banner/:id",
          component:()=>import('@/pages/Banner/Add')
        },

      ]
    },
    {
      path:"/login",
      component:()=>import('@/pages/Login/Login')
    }
  ]
})
