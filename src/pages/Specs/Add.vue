<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/specs' }">商品规格</el-breadcrumb-item>
      <el-breadcrumb-item>商品添加</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic"
    >
      <el-form-item label="规格名称" prop="specsname">
        <el-input v-model="ruleForm.specsname"></el-input>
      </el-form-item>

      <el-form-item
        prop="email"
        label="规格属性"
        :rules="[{ required: true, message: '请输入属性', trigger: 'blur' },]"
      >
        <el-input v-model="dynamicValidateForm.email"></el-input>
          <el-button @click="addDomain">新增属性</el-button>
      </el-form-item>

      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :label="'规格属性'"
        :key="domain.key"
        :prop="'domains.' + index + '.value'"
        :rules="{required: true, message: '属性不能为空', trigger: 'blur'}"
      >
        <el-input v-model="domain.value"></el-input>
        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  mounted() {
    this.id = this.$route.params.id;
    if (this.id) {
      // this.$http.get("/specsinfo", { id: this.id }).then((res) => {
      //   console.log(res);
      //   // let {status,attrs} = res.data.list[0]
      //   // attrs = attrs.join(',')
      //   // this.ruleForm = {...res.data.list[0],status:status== 1?true:false }
      // });
    }
  },
  data() {
    return {

      dynamicValidateForm: {
        domains: [
          {
            value: "",
          },
        ],
        email: "",
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        key: Date.now(),
      });
    },
  },
};
</script>

<style scoped>
.el-form {
  width: 600px;
}
.inp2 {
  width: 350px;
}
.inp3 {
  width: 380px;
}
.newSpecs {
  width: 130px;
}
.delSpace {
  width: 100px;
  text-align: center;
  background: red;
}
</style>