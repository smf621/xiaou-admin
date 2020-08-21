<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/seckill' }">秒杀活动</el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="add">添加</el-button>

    <el-table :data="tableData" style="width: 100%">

      <el-table-column label="活动名称" width="200" prop="title"></el-table-column>
    
    
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
   
  </div>
</template>

<script>
export default {
  mounted() {
    this.getList();

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
      this.$router.push("/seckill/" + row.id);
    },
    add() {
      this.$router.push("/seckill/add");
    },
    del(row) {
      console.log("确定删除");
      this.$http.post("/seckdelete", { id: row.id }).then((res) => {
        if (res.data.code == 200) {
          this.getList();
        }
      });
    },
    cancel() {
      console.log("点错了");
    },
    getList() {
      this.$http.get("/secklist").then((res) => {
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