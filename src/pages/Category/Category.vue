<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/category' }">商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="add">添加</el-button>

    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="分类编号" width="180" prop="id"></el-table-column>
      <el-table-column label="分类名称" width="180" prop="catename"></el-table-column>

      <el-table-column label="图片" width="180" prop="img">
        <template slot-scope="scope" v-if="scope.row.img">
          <img :src="scope.row.img.indexOf('http')!=-1?scope.row.img:'http://localhost:3000' + scope.row.img" />
        </template>
      </el-table-column>

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
      this.$router.push("/category/" + row.id);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    add() {
      this.$router.push("/category/add");
    },
    del(row) {
      console.log("确定删除");

      this.$http.post("/catedelete", { id: row.id }).then((res) => {
        if (res.data.code == 200) {
          this.getList();
        }
      });
    },
    cancel() {
      console.log("点错了");
    },
    getList() {
      this.$http.get("/catelist", { istree: true }).then((res) => {
        console.log(res);
        this.tableData = res.data.list;
      });
    },
  },
};
</script>

<style scoped>
img {
  width: 150px;
}
</style>