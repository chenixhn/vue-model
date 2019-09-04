<template>
    <div class="login_box">
        <div class="login_t_box">
            <div class="login_logo"></div>
            <div class="login_text_box">
                <h3>博大经开建设视频会议系统</h3>
                <p>管理系统后台</p>
            </div>
            <div class="login_form_box">
                <span class="_c _rText">已有账号？<router-link to="login"><span class="_b">去登录 > </span></router-link></span>
                <h3>新用户注册</h3>
                <el-form ref="form" :model="form" :rules="rules" class="inp_box reg_box">
                    <el-form-item prop="orgName">
                        <el-input type="text" class="_inp" v-model="form.orgName" auto-complete="off" placeholder="公司名称">
                            <!-- <i slot="prefix" class="el-input__icon el-icon-user-solid"></i> -->
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="projectName">
                        <el-input type="text" class="_inp" v-model="form.projectName" auto-complete="off" placeholder="项目部名称">
                            <!-- <i slot="prefix" class="el-input__icon el-icon-user-solid"></i> -->
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="projectAddress">
                        <el-input type="text" class="_inp" v-model="form.projectAddress" auto-complete="off" placeholder="项目地址">
                            <!-- <i slot="prefix" class="el-input__icon el-icon-user-solid"></i> -->
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="contact">
                        <el-input type="text" class="_inp" v-model="form.contact" auto-complete="off" placeholder="联系人姓名">
                            <!-- <i slot="prefix" class="el-input__icon el-icon-user-solid"></i> -->
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="contactPhone">
                        <el-input type="text" class="_inp" v-model="form.contactPhone" auto-complete="off" placeholder="联系人电话">
                            <!-- <i slot="prefix" class="el-input__icon el-icon-user-solid"></i> -->
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="userName">
                        <el-input type="text" class="_inp" v-model="form.userName" auto-complete="off" placeholder="登录账户">
                            <!-- <i slot="prefix" class="el-input__icon el-icon-user-solid"></i> -->
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" class="_inp" v-model="form.password" auto-complete="off" placeholder="登录密码" show-password>
                            <!-- <i slot="prefix" class="el-input__icon el-icon-s-goods"></i> -->
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password2">
                        <el-input type="password" class="_inp" v-model="form.password2" auto-complete="off" placeholder="确认密码" show-password>
                            <!-- <i slot="prefix" class="el-input__icon el-icon-s-goods"></i> -->
                        </el-input>
                    </el-form-item>
                    <!-- <el-form-item>
                        <el-checkbox v-model="checked">记住密码</el-checkbox>
                        <router-link to="resetPwd"><span class="reset_password">忘记密码？</span></router-link>
                    </el-form-item> -->
                    <el-form-item style="width:100%;">
                        <el-button type="primary" class="_btn" style="width:100%;"  @click.native.prevent="submitForm('form')">提交审核</el-button>
                    </el-form-item>
                    <!-- <el-form-item>
                        <span class="_c">还没有账号？<span class="_b">立即注册</span></span>
                    </el-form-item> -->
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import Base from '@/base/base.vue'
import {register} from '@/axios/service/register'
export default Base.extend({
    data() {
        var validateUser = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入账户名'));
            }else if(value.length > 16){
                callback(new Error('账户名不能超过16位'));
            }else if(!/^[0-9a-zA-Z]*$/g.test(value)){
                callback(new Error('账号只能包含字母、数字'));
            }else {
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            }else if(value.length < 6 || value.length > 16){
                callback(new Error('请输入6到16位的密码'));
            }else {
                if (this.form.password2 !== '') {
                    this.$refs.form.validateField('password2');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            }else if(value.length < 6 || value.length > 16){
                callback(new Error('请输入6到16位的密码'));
            } else if (value !== this.form.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            form: {
                contact: "",
                contactPhone: "",
                orgName: "",
                password: "",
                projectAddress: "",
                projectName: "",
                // status: "",
                userName: "",
                // isAdmin: ""
            },
            rules: {
                contact: [
                    { required: true, message: "请输入联系人姓名", trigger: "blur" },
                ],
                projectAddress: [
                    { required: true, message: "请输入项目地址", trigger: "blur" },
                ],
                projectName: [
                    { required: true, message: "请输入项目部名称", trigger: "blur" },
                ],
                orgName: [
                    { required: true, message: "请输入公司名称", trigger: "blur" },
                ],
                userName: [
                    { required: true, message: "请输入登录账号", trigger: "blur" },
                    { validator: validateUser }
                ],
                contactPhone: [
                    { required: true, message: "请输入手机号", trigger: "blur" },
                    {
                        pattern: /^1\d{10}$/,
                        message: "请输入正确的手机号"
                    }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { validator: validatePass }
                ],
                password2: [
                    { required: true, message: "请再次输入密码", trigger: "blur" },
                    { validator: validatePass2 }
                ]
            },
            checked: true
        }
    },
    methods: {
        showMsg() {
            this.$alert('您的注册申请已提交，请联系管理员进行审核，审核通过后即可登录，请耐心等待！', '审核提示', {
                confirmButtonText: '我知道了',
                type: 'success',
                 center: true,
                callback: action => {
                    this.$router.push('login');
                }
            });
        },
        submitForm(formName) {
            let that = this;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                register(this.form)
                    .then((res)=>{
                        if(res.code == '0') {
                            this.showMsg();
                        } else if(res.code == '0001') {
                            this.$message({
                                type:'warning',
                                message:'该账户名已存在，请重新输入'
                            })
                            this.form.userName = '';
                        }
                    }).catch((err)=>{
                        this.$message.error(err);
                    });
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
    }
})
</script>
<style lang="less" scoped>
    .login_box {
        width: 100vw;
        height: 100vh;
        min-width: 1200px;
        background: url('~@/assets/images/login/bbg.png')no-repeat;
        background-size: 100% 100%;
        min-height: 675px;
        position: relative;
    }
    .login_t_box {
        width: 93.75%;
        height: 88.88888%;
        background: url('~@/assets/images/login/tbg.png')no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 3.125%;
        top: 6.25%;
        .login_logo {
            width: 444px;
            height: 65px;
            position: absolute;
            left: 29px;
            top: 31px;
            background: url('~@/assets/images/login/logo.png') no-repeat;
            background-size: 100% 100%;
        }
        .login_text_box {
            position: absolute;
            left: 15.55%;
            top: 67.5%;
            color: #F0F2FA;
            text-align: center;
            h3 {
                font-weight: 500;
                font-size:50px;
                margin-bottom: 22px;
            }
            p {
                font-size: 24px;
            }
        }
        .login_form_box {
            width: 35.55555%;
            height: 100%;
            background-color: #fff;
            position: absolute;
            right: 0;
            top: 0;
            ._rText {
                position: absolute;
                right: 50px;
                top: 34px;
            }
            h3 {
                font-weight: 600;
                color: #333333;
                font-size: 30px;
                position: absolute;
                top: 10.3%;
                left: 16.4%;
            }
        }
    }
    ._c {
        color: #909399;
        font-size: 14px;
    }
    ._b {
        color: #3D63D8;
        font-size: 14px;
        cursor: pointer;
    }
    .inp_box {
        width: 68%;
        // height: 20.83333vw;
        position: absolute;
        left: 16.4%;
        top: 18.02%;
        ._btn {
            margin-top: 5%;
            width: 100%;
            background-color: #4D69F6;
            border-color: #4D69F6;
        }
        .reset_password {
            float: right;
            color:#909399;
            font-size: 14px;
            cursor: pointer;
        }
    }
</style>

