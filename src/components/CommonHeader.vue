<template>
  <header>
    <div class="l-content">
      <!-- 左侧菜单折叠按钮 -->
      <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
      <!-- <h3 style="color: #fff">首页</h3> -->
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 右侧 -->
    <div class="r-content">
      <!-- 头像下拉 -->
      <el-dropdown trigger="click" size="mini">
        <span>
          <!-- 头像 -->
          <img class="user" :src="userImg" />
        </span>
        <!-- 头像下拉菜单 -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "CommonHeader",
  data() {
    return {
      shouye:'首页',
      userImg: require("../assets/images/profile.png"),
    };
  },
  methods: {
    handleMenu() {
      this.$store.commit("tab/collapseMenu");
      // console.log(222);
    },
    logOut(){
      this.$store.commit('user/clearToken')
      this.$store.commit('tab/clearMenu')
      this.$router.push("/login")


    }
  },
  computed: {
    // 获取state中的面包屑数据
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  mounted(){
    // console.log(this.$store);
  }
};

</script>
<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
  /deep/.el-breadcrumb__inner{
        color: #c0c0c0;
      }
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
