<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/member' }">会员列表</el-breadcrumb-item>
      <el-breadcrumb-item>会员编辑</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="ruleForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$route.params);
    this.uid = this.$route.params.id
    this.$http.get("/memberinfo",{uid:this.uid}).then((res) => {
      console.log(res);
      let {status} = res.data.list
      this.ruleForm = {...res.data.list,password:'',status:status ==1 ?true:false};
    });
  },
  data() {
    return {
      uid:'',
      ruleForm: {
        // pid: "",
        nickname: "",
        phone: "",
        password: "",
        status: false,
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          this.$http.post('/memberedit',{...this.ruleForm,uid:this.uid}).then(res=>{
              console.log(res);
              this.$router.push('/member')
          })
        } else {
          console.log("失败");
        }
      });
    },
  },
};
</script>

<style scoped>
</style>