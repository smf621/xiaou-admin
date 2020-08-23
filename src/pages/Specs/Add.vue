<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/specs' }">商品规格</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-dynamic"
    >
      <el-form-item label="规格名称" prop="specsname">
        <el-input v-model="ruleForm.specsname"></el-input>
      </el-form-item>

      <!-- <el-form-item
        prop="email"
        label="规格属性"
        :rules="[{ required: true, message: '请输入属性', trigger: 'blur' },]"
      >
        <el-input v-model="ruleForm.email"></el-input>
         
      </el-form-item> -->

      <el-form-item
        v-for="(domain, index) in ruleForm.attrs"
        :label="'规格属性'"
        :key="domain.key"
        :prop="'attrs.' + index + '.value'"
        :rules="{required: true, message: '属性不能为空', trigger: 'blur'}"
      >
        <el-input v-model="domain.value"></el-input>
         <el-button @click="addDomain">新增属性</el-button>
        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  mounted() {
    this.id = this.$route.params.id;
    if (this.id) {
      this.title = "规格编辑"
      this.$http.get("/specsinfo", { id: this.id }).then((res) => {
        console.log(res);
        let {status,attrs} = res.data.list[0]
        // attrs = attrs.join(',')
        console.log(attrs);
        this.ruleForm = {...res.data.list[0],status:status == 1 ? true:false }
      });
    }else{
      this.title = "规格添加"
    }
  },
  data() {
    return {
      title:"",
      
      ruleForm: {
        attrs: [
          {
            value: '',
          },
        ],
        specsname: "",
        status:false,
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
              this.ruleForm.status = this.ruleForm.status ? 1 :2
              let arr = this.ruleForm.attrs.map(item=>{
                // console.log(item.value);// 大 小
                return item.value
              })
              let obj = JSON.parse(JSON.stringify(this.ruleForm))
              // obj.attrs = JSON.stringify(arr)
              obj.attrs = arr.join(',')

          if(this.id){
            //编辑
          }else{
            // 添加
            this.$http.post('/specsadd',{...obj}).then(res=>{
              console.log(res);
              this.$router.push('/specs')
            })
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    removeDomain(item) {
      var index = this.ruleForm.attrs.indexOf(item);
      if (index !== -1) {
        this.ruleForm.attrs.splice(index, 1);
      }
    },
    addDomain() {
      this.ruleForm.attrs.push({
        value: '',
        // key: Date.now(),
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