<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/role' }">角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="add">添加</el-button>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="角色编号" width="180" prop="id"></el-table-column>
      <el-table-column label="角色名称" width="180" prop="rolename"></el-table-column>
      <el-table-column label="状态" width="180" prop="status">
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
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getList()
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push("/role/" + row.id);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    add() {
      this.$router.push("/role/add");
    },
    del(row) {
      console.log("确定删除");

        this.$http.post("/roledelete", { id: row.id }).then((res) => {
                if (res.data.code == 200) {
                  this.getList()
                }
        })
      
    },
    cancel() {
      console.log("点错了");
    },
    getList(){
      this.$http.get("/rolelist").then(res => {
          // console.log(res)
          this.tableData = res.data.list
        })
    }
  },
  filters: {
    status(num) {
      switch (num) {
        case 1:
          return "正常";
          break;
        case 2:
          return "禁用";
          break;
      }
    },
  },
};
</script>

<style scoped>
</style>