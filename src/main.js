import Vue from 'vue'
import App from './App.vue'
import {Button,Radio,Container,Main,Header,Aside,Menu,Submenu,
  MenuItem,MenuItemGroup, Dropdown,DropdownItem,DropdownMenu,
  Row,Col,Card,Table,TableColumn,Breadcrumb,BreadcrumbItem,
  Tag,Form,FormItem,Input,Select,Switch,DatePicker,Option,
  Dialog,Pagination,MessageBox,Message,Progress} from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/less/index.less'

import router from './router'
import store from './store'
import http from 'axios';
import '../api/mock.js'


Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Radio)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Progress)




//请求
Vue.prototype.$http = http
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

// 导航守卫
router.beforeEach((to,from,next) => {
  // 防止页面刷新后丢失用户信息
  store.commit('user/getToken')
  const token = store.state.user.token
  // token不存在或当前登陆页不是登陆页
  if(!token && to.name !== 'login'){
    next({name:'login'})
    // token存在并且当前是登录页
  }else if(token && to.name === 'login'){
    next({name:'home'})
  }else{
    next()
  }
})

new Vue({
  store,
  router,
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  created(){
    store.commit('tab/addMenu',router)
  }
}).$mount('#app')
