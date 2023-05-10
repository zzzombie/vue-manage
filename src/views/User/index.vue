<template>
  <div class="manage">
    <!-- 新增或更新用户弹出框 -->
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="dialogform"
        :rules="rules"
      >
      </common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false" ref="btn">取 消</el-button>
        <el-button type="primary" @click="confirm('dialogform')">确 定</el-button>
      </div>
    </el-dialog>

    <div class="manage-header">
      <el-button type="primary" @click="addUser">+新增</el-button>
      <common-form
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form">
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </common-form>
    </div>

    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>
<script>
import CommonForm from "@/components/CommonForm.vue";
import CommonTable from "@/components/CommonTable.vue";
import { getUser } from "../../../api/data";
// import { Message, row } from "element-ui";

export default {
  name: "User",
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 30,
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
      },
    };
  },
  methods: {
    // dialog的确认按钮方法
    confirm(formName) {
      // console.log("-----", this.$refs);
      // 校验表单
      this.$refs[formName].$children[0].validate((valid) => {
        if (valid) {
          alert("submit!");
          // 判断弹出dialog是新增还是编辑，编辑
          if (this.operateType === "edit") {
            // 调用用户表接口
            this.$http.post("/user/edit", this.operateForm).then((res) => {
              console.log("调用用户表接口", res);
              this.isShow = false;
              this.getList();
            });
          } else {
            // 新增
            this.$http.post("/user/add", this.operateForm).then((res) => {
              this.isShow = false;
              this.getList();
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增按钮
    addUser() {
      //使dialog显示
      this.isShow = true;
      // 改变dialog的标题
      this.operateType = "add";
      // 初始化
      this.operateForm = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      };
    },
    // 编辑
    editUser(row) {
      console.log(row,'user接收的row');
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = {...row};
    },
    
    // 删除
    delUser(row) {
      this.$confirm("此操作将永久删除该组件，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        this.$http.post("/user/del", {
            params: { id },
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getList();
          });
      });
    },
    // 用户表搜索
    getList(name = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      // 接口调用
      getUser({
        page: this.config.page,
        name,
      }).then(({ data: res }) => {
        // console.log(res, "res用户表接口回调");
        this.tableData = res.list.map((item) => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>