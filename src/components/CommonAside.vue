<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{isCollapse ? '后台': '通用后台管理系统'}}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren " :index="item.path+''" :key="item.path">
      <i :class="'el-icon-'+item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :index="item.path+''" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <!-- 二级菜单 -->
      <el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="subIndex.toString()">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>


<style lang="less" scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    }
    .el-menu{
        height: 100%;
        border: none;
        h3{
            color: #fff;
            text-align: center;
            line-height: 48px;
        }
    }
</style>

<script>
import {mapState} from 'vuex';
export default {
  data() {
    return {
      // isCollapse: true,
      //侧边栏数据
      menu: [],
    };
  },
  methods: {
    // 子菜单打开关闭的回调
    handleOpen(key, keyPath) {
      // console.log('子菜单被打开了',key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log('子菜单被收起了',key, keyPath);
    },
    // 首页跳转
    clickMenu(item){
      // 编程式路由导航
        this.$router.push(
            {name:item.name}
        )
        // 存储面包屑数据
        this.$store.commit('tab/selectMenu',item)
    }
  },
  computed:{
      // 没有子菜单的菜单数据
      noChildren(){
          return this.asyncMenu.filter(item => !item.children)
      },
      // 有子菜单的菜单数据
      hasChildren(){
          return this.asyncMenu.filter(item => item.children)
      },
      // 是否折叠状态
      // isCollapse(){
      //   return this.$store.state.tab.isCollapse
      // },
      ...mapState('tab',['isCollapse']),

      // 动态获取菜单
      asyncMenu(){
        return this.$store.state.tab.menu
      }
  },
};
</script>