<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/banner' }">商品分类</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      

      <el-form-item label="轮播图标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>

      <el-form-item label="图片" prop="img">
        <el-upload
          action="#"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="fileChange"
          :auto-upload="false"
          :file-list="showList"
        >
          <!-- <img :src="ruleForm.img" alt=""> -->
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  mounted() {

    this.id = this.$route.params.id
    // console.log(this.id);
    if(this.id){
      this.title= "轮播图编辑"
      this.$http.get('/bannerinfo',{id:this.id}).then(res=>{
        console.log(res);
        let {status,img} = res.data.list
        this.ruleForm = {...res.data.list,status:status==1?true:false}
        // console.log( this.ruleForm);
        this.showList.push({url:img.indexOf('http')!=-1?img:'http://localhost:3000'+img})
      })
    }else{
      this.title= "轮播图添加"
    }

  },
  data() {
    return {
      showList:[],
      id:"",
      title:"",
      // catelist: [],
      ruleForm: {
        // pid: "",
        title: "",
        status: false,
      },
      img: "",
    };
  },
  methods: {
    fileChange(file, filelist) {
      this.img = file.raw;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
           let form = new FormData();
            //form本质上就是一个对象
            for (let key in this.ruleForm) {
              form.append(key, this.ruleForm[key]);
            }
            if(this.img){
              form.append("img", this.img);
            }
            console.log(form);
          if(!this.id){
            //添加
            this.$http.post("/banneradd", form).then((res) => {
              console.log(res);
              this.$router.push('/banner')
            })
          }else{
            //编辑
            form.append('id',this.id)
            this.$http.post('/banneredit',form).then(res=>{
              console.log(res);
              this.$router.push('/banner')
            })
            
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
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      // this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
    },
  },
};
</script>

<style scoped>
img{
  width: 150px;
}
</style>