<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/banner' }">轮播图列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="add">添加</el-button>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="编号" width="130" prop="id"></el-table-column>
      <el-table-column label="轮播图标题" width="200" prop="title"></el-table-column>
    
      <el-table-column label="图片" width="200" prop="img">
        <template slot-scope="scope" v-if="scope.row.img">
          <img :src="'http://localhost:3000' + scope.row.img" />
        </template>
      </el-table-column>
      
      <el-table-column label="状态" width="200">
        <template slot-scope="scope">
          <el-button type="primary">{{scope.row.status | status}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="del(scope.row)" @onCancel="cancel">
            <el-button size="mini" type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="currentPage"
      @current-change="change"
      :page-size="5"
    ></el-pagination> -->
  </div>
</template>

<script>
export default {
  mounted() {
    this.getList();
    //获取商品总数
    // this.$http.get("/goodscount").then((res) => {
    //   console.log(res);
    //   this.total = res.data.list[0].total;
    // });
  },
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
    };
  },
  methods: {
    // change(n) {
    //   this.currentPage = n
    //   this.getList()
    // },
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push("/banner/" + row.id);
    },
    add() {
      this.$router.push("/banner/add");
    },
    del(row) {
      console.log("确定删除");
      this.$http.post("/bannerdelete", { id: row.id }).then((res) => {
        if (res.data.code == 200) {
          this.getList();
        }
      });
    },
    cancel() {
      console.log("点错了");
    },
    getList() {
      this.$http.get("/bannerlist").then((res) => {
        console.log(res);
        this.tableData = res.data.list;
      });
    },
  },
  filters: {
    status(num) {
      switch (num) {
        case 1:
          return "启用";
          break;
        default:
          return "禁用";
          break;
      }
    },
    isNew(flag) {
      switch (flag) {
        case 0:
          return "否";
          break;
        case 1:
          return "是";
          break;
        case 2:
          return "否";
          break;
      }
    },
  },
};
</script>

<style scoped>
img {
  width: 150px;
}
</style>