<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/role' }">角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="ruleForm.rolename"></el-input>
      </el-form-item>

      <el-form-item label="角色权限" prop="menus">
        <el-tree
          ref="tree"
          :data="data"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="ruleForm.menus"
          :props="defaultProps"
          check-strictly
        ></el-tree>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  mounted() {
    this.id = this.$route.params.id;

    if (this.id) {
      this.title = "角色编辑";
      this.$http.get("/roleinfo", { id: this.id }).then((res) => {
        console.log(res);
        let { status } = res.data.list;
        this.ruleForm = {
          ...res.data.list,
          status: status == 1 ? true : false,
          menus: JSON.parse(res.data.list.menus),
        };
      });
    } else {
      this.title = "角色添加";
    }
    // console.log(this.title);

    //调用菜单接口，在下拉框中使用
    this.$http.get("/menulist", { istree: true }).then((res) => {
      // console.log(res);
      this.data = res.data.list;
    });
  },
  data() {
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: "title",
      },

      id: "",
      title: "",
      ruleForm: {
        rolename: "",
        menus: [],
        status: false,
      },
      rules: {
        rolename: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = JSON.parse(JSON.stringify(this.ruleForm));
          obj.status = obj.status ? 1 : 2;
          let arr = this.$refs.tree.getCheckedKeys();
          obj.menus = JSON.stringify(arr);
          if (!this.id) {
            this.$http.post("/roleadd", obj).then((res) => {
              console.log(res);
              this.$router.push("/role");
            });
          } else {
              this.$http.post("/roleedit", { ...obj, id: this.id }).then((res) => {
                this.$router.push("/role");
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
</style>