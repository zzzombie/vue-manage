<template>
    <el-form 
    class="login_container" 
    status-icon 
    :rules="rules" 
    ref="form" 
    :model="form" 
    label-width="100px">
        <h3 class="login_title">系统登陆</h3>
        <el-form-item label="用户名" label-width="80px" prop="username" class="username">
            <el-input type="input" v-model="form.username" auto-complete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password">
            <el-input type="password"  v-model="form.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="login_submit">
            <el-button type="primary" @click="login" class="login_submit">登录</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
// import Mock from 'mockjs';
import { getMenu } from '../../../api/data'
export default {
    name: 'login',
    data(){
        return{
            form:{},
            rules:{
                username:[
                    {required: true, message:'请输入用户名', trigger: 'blur'},
                    {
                        min:3,
                        message:'用户名长度不能小于3位',
                        trigger: 'blur'
                    }
                ],
                password:[
                    {required: true, message:'请输入密码', trigger: 'blur'}
                ]
            }
        }
    },
    methods:{
        login(){
            // 调用getMenu请求数据，getMenu里验证账号生成token
            getMenu(this.form).then(({ data: res }) => {
                console.log(res,'res登陆接口回调');
                if(res.code === 20000){
                    // 清除路由
                    this.$store.commit('tab/clearMenu')
                    this.$store.commit('tab/setMenu',res.data.menu)
                    // 存入token
                    this.$store.commit('user/setToken',res.data.token)
                    this.$store.commit('tab/addMenu',this.$router)
                    this.$router.push({name: 'home'})
                }else{
                    this.$message.warning(res.data.message)
                }
            })
            // const token = Mock.random.guid()
            // this.$store.commit('setToken',token)
            // this.$router.push({name: 'home'})
        },
        
    }
}
</script>
<style lang="less" scoped>
    .login_container{
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background-color: #fff;
        border: 1px solid #eaeaea;
        box-shadow:  0 0 25px #cac6c6;
    }
    .login_title{
        margin: 0 auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .login_submit{
        margin: 10px auto 0px auto;
    }
</style>