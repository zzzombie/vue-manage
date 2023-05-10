import Mock from 'mockjs'
import homeApi from './mockServeData/home';
import userApi from './mockServeData/user';
import permissionApi from './mockServeData/permission'

//拦截请求实现数据的获取    地址、请求方法、返回数据的模板
Mock.mock('/home/getData',homeApi.getStatisticalData)
Mock.mock(/user\/add/,'post',userApi.createUser)
Mock.mock(/user\/edit/,'post',userApi.updateUser)

Mock.mock(/user\/getUser/,'get',userApi.getUserList)
Mock.mock(/user\/del/,'post',userApi.deleteUser)

Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)


