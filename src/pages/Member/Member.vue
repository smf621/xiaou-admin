<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/member' }">会员列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="用户编号" width="180" prop="id"></el-table-column>
      <el-table-column label="昵称  " width="180" prop="nickname"></el-table-column>

      <el-table-column label="手机号" width="180" prop="phone"></el-table-column>

      <el-table-column label="状态" width="180" prop="status">
        <template slot-scope="scope">
          <el-button type="primary">{{scope.row.status | status}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  filters: {
    status(num) {
      switch (num) {
        case 1:
          return "启用";
          break;
        case 2:
          return "禁用";
          break;
      }
    },
  },
  mounted() {
    this.$http.get('/memberlist').then(res=>{
      console.log(res)
      this.tableData = res.data.list
    })
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push("/member/" + row.uid);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    
  },
};
</script>

<style scoped>
img {
  width: 150px;
}
</style>