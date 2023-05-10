<template>
  <div class="progress">
    <p>我是商品管理页面</p>
    <h3>{{ ftmTime }}</h3>
    <h4>{{ time1 }}</h4>
    <h5>{{ getFmtTime() }}</h5>
    <h3>{{ time1 | timeFormater }}</h3>
    <h3>现在是：{{ time1 | timeFormater("YYYY_MM_DD") }}</h3>

    <el-progress :percentage="50"></el-progress>
    <el-progress :percentage="100" :format="format"></el-progress>
    <el-progress :percentage="100" status="success"></el-progress>
    <el-progress :percentage="100" status="warning"></el-progress>
    <el-progress :percentage="50" status="exception"></el-progress>

    <template>
      <el-form ref="form2" :rules="rules" :model="form1" label-width="80px">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="form1.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="form1.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="即时配送" prop="deliver">
          <el-switch v-model="form1.delivery"></el-switch>
        </el-form-item>

        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" v-model="form1.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form2')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('form2')">取消</el-button>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  name: "Mall",
  data() {
    return {
      time1: 1648026631390,
      form1: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules:{
        name: [
          { required: true, message: "请输入a", trigger: "blur" },
        ],
        desc: [
          { required: true, message: "请输入b", trigger: "blur" },
        ],
      }
    };
  },
  methods: {
    format(percentage) {
      return percentage === 100 ? "满" : `${percentage}`;
    },
    getFmtTime() {
      return dayjs(this.time).format("YYYY-MM-DD HH:mm:ss");
    },
    onSubmit(formName) {
      console.log('++++',this.$refs);
      this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      console.log('reset');
    },
  },
  computed: {
    ftmTime() {
      return dayjs(this.time).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  filters: {
    timeFormater(value, str = "YYYY-MM-DD HH:mm:ss") {
      return dayjs(value).format(str);
    },
  },
};
</script>
<style lang="less" scoped>
.progress {
  width: 300px;
}
</style>