<template>
  <el-container class="container">
   <Aside></Aside>
    <el-container>
       <el-header>Header</el-header> 
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "@/components/Aside/Aside"
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  components:{
    Aside
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.el-header,
.el-footer {
  background-color: tan;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  width: 100%;
  height: 100%;
  background-color:#333 ;
  color: #333;
}

.el-main {
  width: 100%;
  height: 100%;
  background-color: #e9eef3;
  color: #333;
}
</style>