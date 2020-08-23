<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/seckill' }">秒杀活动</el-breadcrumb-item>
            <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>

            <el-form-item label="活动期限" required>
                <el-col :span="11">
                    <el-form-item prop="begintime">
                        <el-date-picker
                            type="date"
                            placeholder="选择日期"
                            v-model="ruleForm.begintime"
                            style="width: 100%;"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-form-item prop="endtime">
                        <el-time-picker
                            placeholder="选择时间"
                            v-model="ruleForm.endtime"
                            style="width: 100%;"
                        ></el-time-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item label="一级分类" prop="first_cateid">
                <el-select @change="firstChange" v-model="ruleForm.first_cateid" placeholder="请选择">
                    <el-option
                        :label="item.catename"
                        :value="item.id"
                        v-for="(item) in firstList"
                        :key="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类" prop="second_cateid">
                <el-select
                    @change="secondChange"
                    v-model="ruleForm.second_cateid"
                    placeholder="请选择"
                >
                    <el-option
                        :label="item.catename"
                        :value="item.id"
                        v-for="(item) in secondList"
                        :key="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品" prop="goodsid">
                <el-select v-model="ruleForm.goodsid" placeholder="请选择">
                    <el-option
                        :label="item.goodsname"
                        :value="item.id"
                        v-for="(item) in goodsList"
                        :key="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="状态" prop="status">
                <el-switch v-model="ruleForm.status"></el-switch>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    mounted() {
        this.$http.get("/catelist", { pid: 0 }).then((res) => {
            // console.log(res);
            this.firstList = res.data.list;
            this.firstChange(this.ruleForm.first_cateid);
            this.secondChange(this.ruleForm.second_cateid);
        });
        this.id = this.$route.params.id;

        if (this.id) {
            this.title = "秒杀编辑";
            this.$http.get("/seckinfo", { id: this.id }).then((res) => {
                console.log(res);
                let { status, goodsid, begintime, endtime } = res.data.list;
                begintime = this.formatTime(begintime)
                endtime = this.formatTime(endtime)
                this.ruleForm = {
                    ...res.data.list,
                    status: status == 1 ? true : false,
                    begintime,
                    endtime
                };
                console.log( this.ruleForm);
            });
        } else {
            this.title = "秒杀添加";
        }
    },
    data() {
        return {
            id: "",
            title: "",
            firstList: [],
            secondList: [],
            goodsList: [],
            ruleForm: {
                title: "",
                begintime: "",
                endtime: "",
                first_cateid: "",
                second_cateid: "",
                goodsid: "",

                status: false,
            },
            img: "",
        };
    },
    methods: {
        formatTime(time) {
            var date = new Date(time/1000);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            return year+"-"+month+"-"+day+" " + h+":"+m+":"+s
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.status = this.ruleForm.status ? 1 : 2;

                    if (!this.id) {
                        // //添加
                        this.ruleForm.begintime = this.ruleForm.begintime.getTime();
                        this.ruleForm.endtime = this.ruleForm.endtime.getTime();
                        console.log(this.ruleForm.begintime);
                        this.$http
                            .post("/seckadd", this.ruleForm)
                            .then((res) => {
                                // console.log(res);
                                this.$router.push("/seckill");
                            });
                    } else {
                        //编辑
                        // form.append("id", this.id);
                        this.$http
                            .post("/seckedit", { id: this.id })
                            .then((res) => {
                                console.log(res);
                                // this.$router.push("/seckill");
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
        firstChange(id) {
            this.$http.get("/catelist", { pid: id }).then((res) => {
                console.log(res);
                this.secondList = res.data.list;
            });
        },
        secondChange(id) {
            this.$http.get("/goodslist").then((res) => {
                console.log(res);
                this.goodsList = res.data.list.filter((item) => {
                    return item.second_cateid == id;
                });

                // this.goodsName = res.data.list;
                console.log(this.goodsList);
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