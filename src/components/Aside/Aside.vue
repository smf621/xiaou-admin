<template>
  <el-aside width="200px">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#333"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu :index="index.toString()" v-for="(item,index) in menuList" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item :index="itemSon.url" v-for="(itemSon) in item.children" :key="itemSon.id">{{itemSon.title}}</el-menu-item>

          </el-submenu>
          
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
export default {
  // mounted(){
  //   this.$http.get('/menulist',{istree:true}).then(res=>{
  //     this.menuList = res.data.list
  //   })
  // },
  data() {
    return {
      // menuList: [],
    }
  },
  computed: {
    menuList(){
      return this.$store.state.user.menus
    }
  },
};
</script>

<style scoped>
</style>