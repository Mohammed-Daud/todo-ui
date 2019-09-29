import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/auth/Login'
import ToDoList from '@/components/ToDoList'
import Register from '@/components/auth/Register'
import Auth from '../packages/auth/Auth'


Vue.use(Router)
Vue.use(Auth);


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if(Vue.auth.isAuthenticated()){
          next({
            path:'/my-todos'
          });
        } else {
          next();
        }
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter: (to, from, next) => {
        if(Vue.auth.isAuthenticated()){
          next({
            path:'/my-todos'
          });
        } else {
          next();
        }
      }
    },
    {
      path: '/my-todos',
      name: 'ToDoList',
      component: ToDoList,
      beforeEnter: (to, from, next) => {
        if(Vue.auth.isAuthenticated()){
          next();
        } else {
          next({
            path:'/login'
          });
        }
      }
    }
  ]
})
