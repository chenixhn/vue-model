<template>
    <div class="userManage">
        <Header :activeIndex="activeIndex"></Header>
        <div class="content_box">
            <div class="search_box">
                <div class="search_title">用户审核</div>
                <div class="input_box">
                    <el-input placeholder="查找联系人" size="small" v-model="form.contact" clearable class="input-with-select">
                        <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
            </div>
            <div class="table_box">
                <div class="btnGroup">
                    <!-- 状态，1：待审核，2：已审核，3：未通过 -->
                    <span @click="btnchange(1)" :class="1 == form.status?'activeBtn':''">待审核</span>
                    <span @click="btnchange(2)" :class="2 == form.status?'activeBtn':''">已审核</span>
                    <span @click="btnchange(3)" :class="3 == form.status?'activeBtn':''">未通过</span>
                    <div class="delete_line" style="float:right" @click="commitAll" v-if="form.status == 1">
                        <img src="../../../assets/images/userAudit/operation_icon_batch@2x.png" alt="">批量审核
                    </div>
                </div>
                <el-table ref="multipleTable" :data="rows" tooltip-effect="dark" style="width: 100%;font-size:12px" @selection-change="handleSelectChange">
					<el-table-column type="selection" align="center"></el-table-column>
                    <el-table-column type="index" label="序号" width="55" align="center">
					</el-table-column>
                    <el-table-column prop="orgName" label="公司单位"  min-width="150" align="center">
					</el-table-column>
                    <el-table-column prop="projectName" label="项目部名称"  min-width="150" align="center">
					</el-table-column>
                    <el-table-column prop="projectAddress" label="项目部地址" min-width="180" align="center">
					</el-table-column>
                    <el-table-column prop="contact" label="联系人姓名" min-width="100" align="center">
					</el-table-column>
                    <el-table-column prop="contactPhone" label="联系人电话" min-width="100" align="center">
					</el-table-column>
                    <el-table-column label="状态" min-width="100" align="center">
                        <template slot-scope="scope">
							<span v-if="scope.row.status == 1">待审核</span>
                            <span v-if="scope.row.status == 2">审核通过</span>
                            <span v-if="scope.row.status == 3">审核未通过</span>
						</template>
					</el-table-column>
                    <el-table-column prop="applicationTime" label="申请时间" min-width="150" align="center">
					</el-table-column>
					<el-table-column min-width="200" fixed="right" label="操作" align="center">
						<template slot-scope="scope">
							<el-button class="addBtnClass" @click="lookDetial(scope.row)" type="text" size="small">
                                <img src="../../../assets/images/userAudit/list_icon_check@2x.png" alt="">
                                <span>查看</span>
                            </el-button>
                            <el-button class="addBtnClass" v-if="scope.row.status == 1" @click="changeStatus(scope.row)" type="text" size="small">
                                <img src="../../../assets/images/userAudit/list_icon_examine@2x.png" alt="">
                                <span>审核</span> 
                            </el-button>
                            <el-button class="addBtnClass" @click="removeUser(scope.row)" type="text" size="small">
                                <img src="../../../assets/images/userAudit/list_icon_delete_no@2x.png" alt="">
                                <span class="aloneStyle">删除</span> 
                            </el-button>
						</template>
					</el-table-column>
				</el-table>
                <div class="toolbar">
                    <pagination :current-page = page :page-sizes = [10,20,30,40,50,100] :page-size = pageSize :total = total @sizeChange = "sizeChange" @currentChange = "currentChange"></pagination>
                </div>
            </div>
            <!--查看详情页面开始-->
            <el-dialog class="view-details" title="用户详情" width="434px" :visible.sync="viewDetailsShow" :close-on-click-modal="false">
                <div slot="title" class="header-title">
                    <span class="title-name">用户详情</span>
                </div>
                <el-row class="rowitem">
                    <el-col :span="24">
                        <span class="info_title">用户账号：</span>
                        <span class="info_desc">{{detailsInfo.userName}}</span>
                    </el-col>
                </el-row>
                <el-row class="rowitem">
                    <el-col :span="24">
                        <span class="info_title">用户密码：</span>
                        <!-- <span class="info_desc">{{detailsInfo.password}}</span> -->
                        <span class="info_desc">******</span>
                    </el-col>
                </el-row>
                <el-row class="rowitem">
                    <el-col :span="24">
                        <span class="info_title">公司名称：</span>
                        <span class="info_desc">{{detailsInfo.orgName}}</span>
                    </el-col>
                </el-row>
                <el-row class="rowitem">
                    <el-col :span="24">
                        <span class="info_title">项目部名：</span>
                        <span class="info_desc">{{detailsInfo.projectName}}</span>
                    </el-col>
                </el-row>
                <el-row class="rowitem">
                    <el-col :span="24">
                        <span class="info_title">项目地址：</span>
                        <span class="info_desc">{{detailsInfo.projectAddress}}</span>
                    </el-col>
                </el-row>
                <el-row class="rowitem">
                    <el-col :span="24">
                        <span class="info_title">联 系 人 ：</span>
                        <span class="info_desc">{{detailsInfo.contact}}</span>
                    </el-col>
                </el-row>
                <el-row class="rowitem">
                    <el-col :span="24">
                        <span class="info_title">联系电话：</span>
                        <span class="info_desc">{{detailsInfo.contactPhone}}</span>
                    </el-col>
                </el-row>
                <el-row class="rowitem">
                    <el-col :span="24">
                        <span class="info_title">申请时间：</span>
                        <span class="info_desc">{{detailsInfo.applicationTime}}</span>
                    </el-col>
                </el-row>
                <hr style="margin: 20px 0;border:1px solid #fff;" />
                <div class="btn" style="width: 100%;text-align: center;">
                    <el-button @click="viewDetailsShow = false" class="hollow">关闭详情</el-button>
                </div>
            </el-dialog>
            <!--查看详情页面结束-->
        </div>
	</div>
</template>

<script>
import Header from '@/components/common/header/header'
import pagination from '@/components/common/Pagination/Pagination.vue';
import {userShow,removeUser,examineUser} from '@/axios/service/userManage'
import Base from '@/base/base.vue'
export default Base.extend({
    data(){
        return{
            total: 0, //列表总条数
            page: 1, //当前页码
            pageSize: 10,
            activeIndex:"2-1",
            name:"",
            customerid:[],
            namestr:"",
            rows:[],
            form:{
                status:1,
                contact:"",
                flag:2
            },
            detailsInfo:{},
            viewDetailsShow:false
        }
    },
    components:{
        Header,
        pagination
    },
    methods:{
        // 状态流转
        btnchange(val) {
            this.form.status = val;
            this.page = 1;
            this.search();
        },
        // 分页改变后进行查询
        currentChange(val) {
            this.page = val;
            this.search();
        },
        sizeChange(val) {
            this.pageSize = val;
            this.search();
        },
        // 查询按钮逻辑
        handleSearch() {
            this.page = 1;
            this.search()
        },
        search() {
            let that = this;
            let params = Object.assign({
                pageNum: that.page,
                pageSize: that.pageSize
            }, that.form);

            userShow(params)
                .then(
                    function(result) {
                        console.log(result)
                        if(result.code == '0'){
                            let res = result.data;
                            that.total = res.total;
                            that.rows = res.records;
                        }else {
                            that.$message.error({
                                showClose: true,
                                message: result.msg,
                                duration: 2000
                            });
                        }
                    }
                )
                .catch(function(error) {
                    that.$message.error(error);
                });
        },
        //查看
        lookDetial(row){
            this.viewDetailsShow = true;
            this.detailsInfo = JSON.parse(JSON.stringify(row));
        },
        //审核
        changeStatus(row){
            let that = this;
            let name = row.contact;
            let id = [];
            id.push(row.id);
            this.$confirm(`是否通过用户 ${name} 的注册申请?`, '用户审核', {
                distinguishCancelAndClose: true,
                cancelButtonText: '审核不通过',
                confirmButtonText: '审核通过',
                type: 'warning'
            }).then(() => {
                this.gotoChange(id,2)
            })
            .catch( action => {
                if(action === 'cancel'){
                    // '我是不通过'
                    this.gotoChange(id,3)
                }
            });
        },
        gotoChange(id,status){
            let that = this;
            let para = {
                ids:id,
                status
            }
            console.log(para,'555555555555555555555555')
            examineUser(para)
                .then(
                    function(result) {
                        if (result.code == 0) {
                            that.$message.success({
                                showClose: true,
                                message: "状态改变成功",
                                duration: 2000
                            });
                            that.search();
                        } else {
                            that.$message.error({
                                showClose: true,
                                message: result.msg,
                                duration: 2000
                            });
                        }
                    }
                )
                .catch(function(error) {
                    that.$message.error(error);
                });
        },
        //删除
        removeUser(row){
            let that = this;
            let id = row.id;
            this.$confirm('确认删除该条用户信息吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                removeUser(id)
                    .then(
                        function(result) {
                            if (result.code == 0) {
                                that.$message.success({
                                    showClose: true,
                                    message: "删除成功",
                                    duration: 2000
                                });
                                that.search();
                            } else {
                                that.$message.error({
                                    showClose: true,
                                    message: result.msg,
                                    duration: 2000
                                });
                            }
                        }
                    )
                    .catch(function(error) {
                        that.$message.error(error);
                    });
            })
        },
        //批量审核
        commitAll(){
            let that = this;
            let ids = this.customerid;
            let names = this.namestr;
			if(ids.length == 0){
				that.$message.warning({
					showClose: true,
					message: "请选择要审核的数据",
					duration: 2000
				});
				return;
            }
            this.$confirm(`是否通过用户 ${names} 的注册申请?`, '用户审核', {
                distinguishCancelAndClose: true,
                cancelButtonText: '审核不通过',
                confirmButtonText: '审核通过',
                type: 'warning'
            }).then(() => {
                this.gotoChange(ids,2)
            })
            .catch( action => {
                if(action === 'cancel'){
                    // '我是不通过'
                    this.gotoChange(ids,3)
                }
            });
        },
        handleSelectChange(selection) {
            this.customerid = [];
            this.namestr = "";
            for(var i = 0; i < selection.length; i++) {
                this.customerid.push(selection[i].id);
                this.namestr = this.namestr + selection[i].contact + ','
            }
            this.namestr = this.namestr.slice(0,this.namestr.length-1);
        }
    },
    mounted(){
        this.search()
        document.querySelector('.el-dialog__header').style = "padding:15px 20px;background:rgba(245,247,250,1);"
    },
})
</script>

<style lang="less" scoped>
    .userManage {
        width: 100vw;
        height: 100vh;
        background: #F5F7FA;
    }
    .content_box {
        box-sizing: border-box;
        width: calc(100vw - 120px);
        height: calc(100vh - 160px);
        margin: 30px 60px 60px 60px;
        // border-radius: 8px 8px 0px 0px;
        overflow-y: auto;
        background: #fff;
    }
    .search_box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        border-bottom: 1px solid #EDEFF2;
        .search_title {
            font-size: 16px;
            color: #303133;
            margin-left:40px;
        } 
        .input_box {
            width: 500px;
            display: flex;
            justify-content: flex-end;
            margin-right:20px;
            .input-with-select{
                width:233px;
            }
            .addBtn{
                width:80px;
                height:32px;
                background:rgba(61,99,216,1);
                border-radius:4px;
                font-size:12px;
                font-family:PingFangSC-Regular;
                color:rgba(255,255,255,1);
                margin-left:50px;
                .el-icon-plus{
                    width:14px;
                    height:14px;
                    color:#fff;
                    margin-right:7px;
                }
            }
        }
    }
    .table_box{
        padding:31px;
        box-sizing: border-box;
        .btnGroup{
            margin-bottom:18px;
            cursor: pointer;
            span{
                display: inline-block;
                width:70px;
                height:32px;
                line-height: 32px;
                text-align: center;
                background:rgba(240,246,255,1);
                border-radius:4px;
                font-size:12px;
                font-family:PingFangSC-Regular;
                color:rgba(61,99,216,1);
                margin-right:10px;
            }
            .activeBtn {
                background:rgba(61,99,216,1);
                color: #fff;
            }
            .delete_line {
                height:32px;
                display: flex;
                align-items: center;
                color: #F88800;
                font-size: 14px;
                img{
                    width: 18px;
                    height:18px;
                    margin-right:6px;
                }
            }
        }
    }
    .addBtnClass{
        img{
            width:16px;
            height:14px;
            display: inline-block;
            vertical-align: middle;
        }
        span{
            vertical-align: middle;
            font-size:12px;
            font-family:PingFangSC-Regular;
            color:rgba(96,98,102,1);
        }
        span.aloneStyle{
            color:rgba(191,194,204,1);
        }
    }
    .hollow{
        width:120px;
        height:40px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(61, 99, 216, 1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,99,216,1);
    }
    .rowitem {
		height: 30px;
		line-height: 30px;
    }
    .info_title {
		display: inline-block;
        width: 100px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(96,98,102,1);
        text-align: right;
	}
	
	.info_desc {
		display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(48,49,51,1);
    }
    .header-title{
        .title-name{
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(96,98,102,1);
        }
    }   
</style>
