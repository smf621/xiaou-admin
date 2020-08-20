<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/menu' }">菜单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="add">添加</el-button>

    <el-table
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="菜单编号" width="180" prop="id"></el-table-column>
      <el-table-column label="菜单名称" width="180" prop="title"></el-table-column>
      <el-table-column label="菜单图标" width="180" prop="icon"></el-table-column>
      <el-table-column label="菜单地址" width="180" prop="url"></el-table-column>
      <el-table-column label="状态" width="180">
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
      this.$router.push("/menu/" + row.id);
    },
    // handleDelete(index, row) {
    //   console.log(index, row);
    //   this.$http.post("/menudelete", { id: row.id }).then((res) => {
    //     console.log(res);
    //   });
    // },
    add() {
      this.$router.push("/menu/add");
    },
    del(row) {
      console.log("确定删除");
      this.$http.post("/menudelete", { id: row.id }).then((res) => {
        if (res.data.code == 200) {
          this.getList();
        }
      });
    },
    cancel() {
      console.log("点错了");
    },
    getList() {
      this.$http.get("/menulist", { istree: true }).then((res) => {
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