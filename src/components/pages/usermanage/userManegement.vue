<template>
    <div class="userManage">
        <Header :activeIndex="activeIndex"></Header>
        <div class="content_box">
            <div class="search_box">
                <div class="search_title">用户管理</div>
                <div class="input_box">
                    <el-input placeholder="查找用户" size="small" v-model="form.userName" clearable class="input-with-select">
                        <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-button class="addBtn" size="small" @click="addUserShow">
                        <i class="el-icon-plus"></i>新增
                    </el-button>
                </div>
            </div>
            <div class="table_box">
                <el-table ref="multipleTable" :data="rows" tooltip-effect="dark" style="width: 100%;font-size:12px">
					<el-table-column type="index" label="序号" width="55" align="center">
					</el-table-column>
					<el-table-column prop="userName" label="用户账号" min-width="100" align="center">
					</el-table-column>
					<!-- <el-table-column prop="password" label="用户密码" min-width="100" align="center">
                        <template slot-scope="scope">
							<span v-if="scope.row.password">******</span>
						</template>
					</el-table-column> -->
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
							<span v-if="scope.row.isStop == 0">禁用</span>
							<span v-if="scope.row.isStop == 1">启用</span>
						</template>
					</el-table-column>
                    <el-table-column prop="applicationTime" label="创建时间" min-width="150" align="center">
					</el-table-column>
					<el-table-column min-width="200" fixed="right" label="操作" align="center">
						<template slot-scope="scope">
							<el-button class="addBtnClass" @click="editUserManage(scope.row)" type="text" size="small">
                                <img src="../../../assets/images/userManage/list_icon_edit@2x.png" alt="">
                                <span>编辑</span>
                            </el-button>
                            <el-button v-if="scope.row.isStop == 1" class="addBtnClass" @click="changeStatus(scope.row)" type="text" size="small">
                                <img src="../../../assets/images/userManage/list_icon_prohibit@2x.png" alt="">
                                <span>禁用</span>
                            </el-button>
                            <el-button v-else class="addBtnClass" @click="changeStatus(scope.row)" type="text" size="small">
                                <img src="../../../assets/images/userManage/list_icon_enable@2x.png" alt="">
                                <span class="thisYesStyle">启用</span>
                            </el-button>
                            <el-button class="addBtnClass" @click="removeUser(scope.row)" type="text" size="small">
                                <img src="../../../assets/images/userManage/list_icon_delete@2x.png" alt="">
                                <span>删除</span> 
                            </el-button>
						</template>
					</el-table-column>
				</el-table>
                <div class="toolbar">
                    <pagination :current-page = page :page-sizes = [10,20,30,40,50,100] :page-size = pageSize :total = total @sizeChange = "sizeChange" @currentChange = "currentChange"></pagination>
                </div>
            </div>
        </div>
        <!-- 新增用户信息开始 -->
        <el-dialog center title="新增用户信息" width="800px" :visible.sync="addUserVisible"  @closed="addUserHide">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-form-item label="用户账户：" prop="userName">
					<el-input v-model="addForm.userName" size="small" auto-complete="off" placeholder="请设置用户账户"></el-input>
				</el-form-item>
				<el-form-item label="用户密码：" prop="password">
                    <el-input v-model="addForm.password" minlength="6" size="small" auto-complete="off" placeholder="请设置登录密码（至少6位字符）"></el-input>
				</el-form-item>
				<el-form-item label="公司名称：" prop="orgName">
					<el-input v-model="addForm.orgName" size="small" auto-complete="off" placeholder="请输入用户公司名称"></el-input>
				</el-form-item>
				<el-form-item label="项目部名：" prop="projectName">
					<el-input v-model="addForm.projectName" size="small" auto-complete="off" placeholder="请输入用户项目部名称"></el-input>
				</el-form-item>
				<el-form-item label="项目地址：" prop="projectAddress">
					<el-input v-model="addForm.projectAddress" size="small" auto-complete="off" placeholder="请输入用户项目部所在地址"></el-input>
				</el-form-item>
                <el-form-item label="联系人：" prop="contact">
					<el-input v-model="addForm.contact" size="small" auto-complete="off" placeholder="请输入联系人姓名"></el-input>
				</el-form-item>
                <el-form-item label="联系电话：" prop="contactPhone">
					<el-input v-model="addForm.contactPhone" size="small" auto-complete="off" placeholder="请输入联系人电话"></el-input>
				</el-form-item>
                <el-form-item label="用户状态：" prop="isStop">
                    <el-radio-group v-model="addForm.isStop">
                        <el-radio label="1">启用</el-radio>
                        <el-radio label="0">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
                <el-button class="yesBtn" @click="addSubmit('addForm')" :loading="addLoading">提交</el-button>
				<el-button @click="closeAdd('addForm')">取消</el-button>
			</div>
		</el-dialog>
		<!-- 新增用户信息结束 -->

        <!-- 编辑用户信息开始 -->
        <el-dialog center title="编辑用户信息" width="800px" :visible.sync="editUserVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item label="用户账户：" prop="userName">
					<el-input v-model="editForm.userName" disabled size="small" auto-complete="off" placeholder="请设置用户账户"></el-input>
				</el-form-item>
				<el-form-item label="用户密码：" class="is-required">
                    <el-input v-model="pass" disabled size="small" auto-complete="off" placeholder="请设置登录密码（至少6位字符）"></el-input>
				</el-form-item>
				<el-form-item label="公司名称：" prop="orgName">
					<el-input v-model="editForm.orgName" size="small" auto-complete="off" placeholder="请输入用户公司名称"></el-input>
				</el-form-item>
				<el-form-item label="项目部名：" prop="projectName">
					<el-input v-model="editForm.projectName" size="small" auto-complete="off" placeholder="请输入用户项目部名称"></el-input>
				</el-form-item>
				<el-form-item label="项目地址：" prop="projectAddress">
					<el-input v-model="editForm.projectAddress" size="small" auto-complete="off" placeholder="请输入用户项目部所在地址"></el-input>
				</el-form-item>
                <el-form-item label="联系人：" prop="contact">
					<el-input v-model="editForm.contact" size="small" auto-complete="off" placeholder="请输入联系人姓名"></el-input>
				</el-form-item>
                <el-form-item label="联系电话：" prop="contactPhone">
					<el-input v-model="editForm.contactPhone" size="small" auto-complete="off" placeholder="请输入联系人电话"></el-input>
				</el-form-item>
                <el-form-item label="用户状态：" prop="isStop">
                    <el-radio-group v-model="editForm.isStop">
                        <el-radio label="1">启用</el-radio>
                        <el-radio label="0">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
                <el-button class="yesBtn" @click="editSubmit('editForm')" :loading="addLoading">提交</el-button>
				<el-button @click="closeEdit('editForm')">取消</el-button>
			</div>
		</el-dialog>
		<!-- 编辑用户信息结束 -->
	</div>
</template>

<script>
import Header from '@/components/common/header/header'
import pagination from '@/components/common/Pagination/Pagination.vue'
import {userShow,isStopUser,addOrEdit,removeUser} from '@/axios/service/userManage'
import Base from '@/base/base.vue'
export default Base.extend({
    data(){
        const orderNumber = (rule,value,callback)=>{
            if(!value){
                callback(new Error('手机号不能为空'))
            }else if(!/^1\d{10}$/.test(value)){
                callback('手机号格式不正确')
            }else{
                callback()
            }
        };
        const isMobileLength = (rule,value,callback)=>{
            if(!value){
                callback(new Error('用户密码不能为空'))
            }else if(value.length < 6){
                callback('用户密码不能少于6位字符')
            }else{
                callback()
            }
        }
        return{
            total: 0,             
            page: 1,            
            pageSize: 10,
            activeIndex:"2-1",
            name:"",
            rows:[],
            form:{
                status:"",
                userName:"",
                flag:1
            },

            //新增用户
            addUserVisible:false,
            addLoading:false,
            addForm:{
                userName: "",           //用户账户
                password: "",           //用户密码
                orgName: "",            //公司名称
                projectName: "",        //项目部名
                projectAddress: "",     //项目地址
                contact: "",            //联系人
                contactPhone:"",        //联系电话
                isStop:"1"              //用户状态
            },
            addFormRules: {
                userName: [
                    { required: true, message: '用户账户不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '用户密码不能为空', trigger: 'blur' },{ message: '用户密码不能少于6位字符', trigger: 'blur',validator: isMobileLength}
                ],
                orgName: [
                    { required: true, message: '公司名称不能为空', trigger: 'blur' }
                ],
                projectName: [
                    { required: true, message: '项目部名称不能为空', trigger: 'blur' }
                ],
                projectAddress: [
                    { required: true, message: '项目部地址不能为空', trigger: 'blur' }
                ],
                contact: [
                    { required: true, message: '联系人姓名不能为空', trigger: 'blur' }
                ],
                contactPhone: [
                    { required: true, message: '联系人电话不能为空', trigger: 'blur' },{ type:'number', message: '手机号格式错误', trigger: 'blur',transform(value){
            			return Number(value)
          			},validator: orderNumber}
                ],
                isStop: [
                    { required: true, message: '请选择用户状态', trigger: 'change' }
                ]
            },

            //编辑用户
            editUserVisible:false,      
            editForm:{
                userName: "",           //用户账户
                orgName: "",            //公司名称
                projectName: "",        //项目部名
                projectAddress: "",     //项目地址
                contact: "",            //联系人
                contactPhone:"",        //联系电话
                isStop:"1"              //用户状态
            },
            editFormRules: {
                userName: [
                    { required: true, message: '用户账户不能为空', trigger: 'blur' }
                ],
                orgName: [
                    { required: true, message: '公司名称不能为空', trigger: 'blur' }
                ],
                projectName: [
                    { required: true, message: '项目部名称不能为空', trigger: 'blur' }
                ],
                projectAddress: [
                    { required: true, message: '项目部地址不能为空', trigger: 'blur' }
                ],
                contact: [
                    { required: true, message: '联系人姓名不能为空', trigger: 'blur' }
                ],
                contactPhone: [
                    { required: true, message: '联系人电话不能为空', trigger: 'blur' },{ type:'number', message: '手机号格式错误', trigger: 'blur',transform(value){
            			return Number(value)
          			},validator: orderNumber}
                ],
                isStop: [
                    { required: true, message: '请选择用户状态', trigger: 'change' }
                ]
            },
            editUserId:"",
            pass:"******"
        }
    },
    components:{
        Header,
        pagination
    },
    methods:{
        // 分页改变后进行查询
        currentChange(val) {
            this.page = val
            this.search();
        },
        sizeChange(val) {
            this.pageSize = val
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
        //编辑
        editUserManage(row){
            this.editUserId = row.id;
            this.editForm = JSON.parse(JSON.stringify(row));
            this.editForm.isStop = JSON.stringify(this.editForm.isStop);
            console.log(this.editForm,'编辑数据')
            this.editUserVisible = true;
        },
        //启用 禁用
        changeStatus(row){
            let that = this;
            let id = row.id;
            let isStop = row.isStop == 0?1:0;
            isStopUser(id,isStop)
                .then(
                    function(result) {
                        if(result.code == '0'){
                            that.$message.success({
                                showClose: true,
                                message: '状态改变成功',
                                duration: 2000
                            });
                            that.search();
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

        //点击新增
        addUserShow(){
            this.addUserVisible = true
        },
        //新增确定按钮
        addSubmit(formName){
            let that = this;
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    let para = Object.assign({}, this.addForm);
                    console.log(para,'新增数据')
                    addOrEdit(para)
                        .then(
                            function(result) {
                                if(result.code == 0) {
                                    that.$message.success({
                                        showClose: true,
                                        message: "添加成功",
                                        duration: 2000
                                    });
                                    that.$refs[formName].resetFields();
                                    that.addUserVisible = false;
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
                }
            });
        },
        //新增取消按钮
        closeAdd(formName){
            this.addUserVisible = false
            this.$refs[formName].resetFields()
        },
        addUserHide(){
            this.closeAdd("addForm")
        },

        //编辑确定按钮
        editSubmit(formName){
            let that = this;
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    let para ={
                        id:that.editUserId,
                        userName: this.editForm.userName,               //用户账户
                        orgName: this.editForm.orgName,                 //公司名称
                        projectName: this.editForm.projectName,         //项目部名
                        projectAddress: this.editForm.projectAddress,   //项目地址
                        contact: this.editForm.contact,                 //联系人
                        contactPhone:this.editForm.contactPhone,        //联系电话
                        isStop: this.editForm.isStop                    //用户状态
                    };
                    console.log(para,'编辑数据')
                    addOrEdit(para)
                        .then(
                            function(result) {
                                if(result.code == 0) {
                                    that.$message.success({
                                        showClose: true,
                                        message: "编辑成功",
                                        duration: 2000
                                    });
                                    that.editUserVisible = false;
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
                }
            });
        },
        //编辑取消按钮
        closeEdit(formName){
            this.editUserVisible = false
        },
    },
    mounted(){
        this.search()
    }
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
        .search_box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 60px;
            border-bottom: 1px solid #EDEFF2;
            .search_title {
                font-size: 16px;
                color: #303133;
                margin-left:60px;
            } 
            .input_box {
                width: 500px;
                display: flex;
                justify-content: flex-end;
                margin-right:60px;
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
        }
    }
    .yesBtn{
        background:rgba(61,99,216,1);
        color:#fff;
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
        span.thisYesStyle{
            color:rgba(61,99,216,1);
        }
    }
    ::-webkit-scrollbar {
        /*设置滚动条的宽，高度自适应即可*/
        width: 14px;
        height: auto;
        display: none;
	}

	::-webkit-scrollbar-track,
	::-webkit-scrollbar-thumb {
        /*让外层轨道和指示块显示圆角，以及透明显示*/
        border-radius: 10px;
        border: 5px solid transparent;
	}

	::-webkit-scrollbar-track {
        /*设置外层轨道样式*/
        box-shadow: 1px 1px 5px rgba(0,0,0,.2) inset;
	}

	::-webkit-scrollbar-thumb {
        /*设置轨道内滑动指示块的大小以及呈现样式*/
        min-height: 20px;
        background-clip: content-box;
        box-shadow:0 0 5px rgba(0,0,0,.2) inset;
	}

	::-webkit-scrollbar-corner {
        /*边角透明显示*/
        background: transparent;
    }
    

    .content_box{
		scrollbar-arrow-color: #fff; /**//*三角箭头的颜色*/ 
		scrollbar-face-color: #f2f2f2; /**//*立体滚动条的颜色*/ 
		scrollbar-3dlight-color: #fff; /**//*立体滚动条亮边的颜色*/ 
		scrollbar-highlight-color: #fff; /**//*滚动条空白部分的颜色*/ 
		scrollbar-shadow-color: #fff; /**//*立体滚动条阴影的颜色*/ 
		scrollbar-darkshadow-color: #fff; /**//*立体滚动条强阴影的颜色*/ 
		scrollbar-track-color: #fff; /**//*立体滚动条背景颜色*/ 
		scrollbar-base-color:#ccc; /**//*滚动条的基本颜色*/ 
	}
</style>
