<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品添加</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="一级分类" prop="first_cateid">
        <el-select @change="firstCateChange" v-model="ruleForm.first_cateid" placeholder="请选择">
          <el-option
            :label="item.catename"
            :value="item.id"
            v-for="(item) in firstList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" prop="second_cateid">
        <el-select  v-model="ruleForm.second_cateid" placeholder="请选择">
          <el-option
            :label="item.catename"
            :value="item.id"
            v-for="(item) in secondList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品" prop="goodsname">
        <el-input v-model="ruleForm.goodsname"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="市场价格" prop="market_price">
        <el-input v-model="ruleForm.market_price"></el-input>
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
      <el-form-item label="商品规格" prop="specsid">
        <el-select @change="specsChange" v-model="ruleForm.specsid" placeholder="请选择">
          <el-option
            :label="item.specsname"
            :value="item.id"
            v-for="(item) in specslist"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品属性" prop="specsattr">
        <el-select v-model="ruleForm.specsattr" placeholder="请选择">
          <el-option :label="item" :value="item" v-for="(item) in specsattr" :key="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否新品" prop="isnew">
        <el-radio-group v-model="ruleForm.isnew">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否热卖" prop="ishot">
        <el-radio-group v-model="ruleForm.ishot">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item label="商品描述">
        <div class="editor"></div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import wangEditor from "wangEditor";
export default {
  mounted() {
    //富文本插件
    this.editor = new wangEditor(".editor");
    this.editor.create();
    //请求一级分类
    this.$http.get("/catelist", { pid: 0 }).then((res) => {
      // console.log(res);
      this.firstList = res.data.list;
    });
    //商品规格
    this.$http.get("/specslist", { size: 10, page: 1 }).then((res) => {
      // console.log(res);
      this.specslist = res.data.list;
    });
    
    this.id = this.$route.params.id;
    if (this.id) {
      this.title = "商品编辑";
      this.$http.get("/goodsinfo", { id: this.id }).then((res) => {
        console.log(res);
        let { status, img } = res.data.list;
        this.ruleForm = {
          ...res.data.list,
          status: status == 1 ? true : false,
          isnew:isnew == 0 ? 2 :1,
          ishot:ishot == 0 ? 2 :1
        };
        this.editor.txt.html(res.data.list.description)
        
       this.firstCateChange(this.ruleForm.first_cateid)
        // console.log( this.ruleForm);
        this.showList.push({
          url: img.indexOf("http") != -1 ? img : "http://localhost:3000" + img,
        });
      });

    } else {
      this.title = "商品添加";
    }
  },
  data() {
    return {
      showList: [],
      id: "",
      title: "",
      catelist: [],
      editor: null, //富文本
      firstList: [], //一级分类
      secondList: [], //二级分类
      specslist: [], //商品规格
      specsattr: [], //商品属性
      ruleForm: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        specsid: "",
        specsattr: "",
        isnew: "",
        ishot: "",
        status: true,
        description: "",
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
          this.ruleForm.description = this.editor.txt.html();
          //form本质上就是一个对象
          console.log(this.ruleForm);
          for (let key in this.ruleForm) {
            form.append(key, this.ruleForm[key]);
          }
          if(this.img){
            form.append("img", this.img);
          }
          if (!this.id) {
            //添加
            this.$http.post("/goodsadd", form).then((res) => {
              console.log(res);
              this.$router.push("/goods");
            });
          } else {
            //编辑
            form.append("id", this.id);
            this.$http.post("/goodsedit", form).then((res) => {
              this.$router.push("/goods");
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
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      // this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
    },
    firstCateChange(id) {
      this.$http.get("/catelist", { pid: id }).then((res) => {
        console.log(res);

        this.secondList = {...res.data.list};
      });
    },
    specsChange(id) {
      this.specsattr = this.specslist.find((item) => {
        return item.id == id;
      }).attrs;
    },
  },
};
</script>

<style scoped>
img {
  width: 150px;
}
</style>