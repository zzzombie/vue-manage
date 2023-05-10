<template>
  <el-form ref="form" :rules="rules" :model="form" :inline="inline" label-width="100px">
    <el-form-item
      v-for="item in formLabel"
      :key="item.label"
      :label="item.label"
      :prop="item.model"
    >
      <el-input
        v-if="item.type === 'input'"
        :placeholder="'请输入' + item.label"
        v-model="form[item.model]"
      ></el-input>
      <el-switch
        v-if="item.type === 'switch'"
        v-model="form[item.model]"
        active-color="#13ce66"
        inactive-color="#ff4949"
      ></el-switch>
      <el-date-picker
        v-if="item.type === 'date'"
        value-format="yyyy-MM-dd"
        v-model="form[item.model]"
        type="date"
        placeholder="选择日期"
      ></el-date-picker>
      <el-select
        v-if="item.type === 'select'"
        v-model="form[item.model]"
        placeholder="请选择"
      >
        <el-option
          v-for="item in item.opts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "CommonForm",
  props: {
    formLabel: Array,
    form: Object,
    inline: Boolean,
    rules:Object,
  },
  data() {
    return {
    //   rules: {
    //     //   name: [
    //     //     { required: true, message: '请输入活动名称', trigger: 'blur' },
    //     //     { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
    //     //   ],
    //   }
    };
  },
};
</script>