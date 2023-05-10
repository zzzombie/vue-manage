<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <!-- 侧边导航 -->
      <common-aside></common-aside>
    </el-aside>
    <!-- 内容 -->
    <el-container>
      <el-header>
        <!-- 内容顶部 -->
        <common-header/>
      </el-header>
      <!-- 标签 -->
      <common-tag/>
      <el-main>
        <!-- 内容content -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import CommonAside from "@/components/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader.vue";
import CommonTag from "@/components/CommonTag.vue";
export default {
  name: "Home",
  components: {
    CommonAside,
    CommonHeader,
    CommonTag,
  },
  data() {
    return {};
  },
};
</script>
<style lang='less' scoped>
.el-header {
  background-color: #333;
}
.el-main {
  padding-top: 0;
}
</style>