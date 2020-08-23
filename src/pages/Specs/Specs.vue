<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/specs' }">商品规格</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="primary" @click="add">添加</el-button>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="规格编号" width="180" prop="id"></el-table-column>
            <el-table-column label="规格名称" width="180" prop="specsname"></el-table-column>

            <el-table-column label="规格属性" width="280" prop="attrs">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        plain
                        v-for="(item) in scope.row.attrs"
                        :key="item.id"
                    >{{item}}</el-button>
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
                    <el-popconfirm
                        title="这是一段内容确定删除吗？"
                        @onConfirm="del(scope.row)"
                        @onCancel="cancel"
                    >
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
        this.$http.get("/specslist", { size: 5, page: 1 }).then((res) => {
            console.log(res);
            console.log(res.data.list);

            // res.data.list.attrs = res.data.list.attrs
            // res.data.list.attrs = JSON.parse(res.data.list.attrs)
            // console.log(res.data);
            this.tableData = res.data.list;
        });
    },
    data() {
        return {
            tableData: [],
        };
    },
    methods: {
        handleEdit(index, row) {
            console.log(index, row);
            this.$router.push("/specs/" + row.id);
        },
        add() {
            this.$router.push("/specs/add");
        },
        del(row) {
            console.log("确定删除");
            this.$http.post("/specsdelete", { id: row.id }).then((res) => {
                if (res.data.code == 200) {
                    this.getList();
                }
            });
        },
        cancel() {
            console.log("点错了");
        },
        getList() {
            this.$http.get("/specslist", { size: 5, page: 1 }).then((res) => {
                console.log(res.data.list);
                this.tableData = res.data.list;
            });
        },
    },
};
</script>

<style scoped>
</style>