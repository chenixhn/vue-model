<template>
    <div class="login_box">
        <div class="login_logo"></div>
        <div class="reset_box">
            <h3>重置密码</h3>
            <router-link to="login"><i></i></router-link>
            <el-form ref="form" :model="form" :rules="rules" class="inp_box">
                <el-form-item prop="phoneNo">
                    <el-input type="text" class="_inp" v-model="form.phoneNo" auto-complete="off" placeholder="手机号">
                        <!-- <i slot="prefix" class="el-input__icon el-icon-user-solid"></i> -->
                    </el-input>
                </el-form-item>
                <el-form-item prop="verificationCode">
                    <el-input type="text" class="_inp" style="width:60%;margin-right:6px;" v-model="form.verificationCode" auto-complete="off" placeholder="验证码">
                        <!-- <i slot="prefix" class="el-input__icon el-icon-s-goods"></i> -->
                    </el-input>
                    <el-button type="primary" plain @click="getYzm" :disabled="isDis">{{btnText}}</el-button>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" class="_inp" v-model="form.password" auto-complete="off" placeholder="新密码" show-password>
                        <!-- <i slot="prefix" class="el-input__icon el-icon-user-solid"></i> -->
                    </el-input>
                </el-form-item>
                <el-form-item prop="password2">
                    <el-input type="password" class="_inp" v-model="form.password2" auto-complete="off" placeholder="确认新密码" show-password>
                        <!-- <i slot="prefix" class="el-input__icon el-icon-s-goods"></i> -->
                    </el-input>
                </el-form-item>
                <!-- <el-form-item>
                    <el-checkbox v-model="checked">记住密码</el-checkbox>
                    <span class="reset_password">忘记密码？</span>
                </el-form-item> -->
                <el-form-item style="width:100%;">
                    <el-button type="primary" class="_btn" style="width:100%;" @click.native.prevent="submitForm('form')">完成</el-button>
                </el-form-item>
                <!-- <el-form-item>
                    <span class="_c">还没有账号？<span class="_b">立即注册</span></span>
                </el-form-item> -->
            </el-form>
        </div>
    </div>
</template>
<script>
import Base from '@/base/base.vue'
import {resetPwd,getYzm} from '@/axios/service/resetPwd'
export default Base.extend({
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            if (this.form.password2 !== '') {
                this.$refs.form.validateField('password2');
            }
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.form.password) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        return {
            isDis:false,
            btnText:'发送验证码',
            form: {
                phoneNo: '',
                verificationCode:'',
                password: '',
                password2: '',
            },
            rules: {
                phoneNo: [
                { required: true, message: "请输入手机号", trigger: "blur" },
                {
                    pattern: /^1\d{10}$/,
                    message: "请输入正确的手机号"
                }
                ],
                password: [
                { required: true, message: "请输入新密码", trigger: "blur" },
                { validator: validatePass }
                ],
                password2: [
                { required: true, message: "请再次输入新密码", trigger: "blur" },
                { validator: validatePass2 }
                ],
                verificationCode: [
                { required: true, message: "请输入验证码", trigger: "blur" }
                ]
            },
            checked: true
        }
    },
    methods: {
        submitForm(formName) {
            let that = this;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                resetPwd(this.form)
                    .then((res)=>{
                        this.$message({
                            message: '重置成功',
                            type: 'success',
                            duration:1500,
                            onClose() {
                                that.$router.push('login');
                            }
                        });
                    }).catch((err)=>{
                        this.$message.error(err);
                    });
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        getYzm() {
            if(this.form.phoneNo == '') {
					this.$message({
                        message: '请先输入手机号再获取验证码',
                        type: 'warning',
                        duration:2000
                    });
					return;
                }
            this.isDis = true;
            getYzm(this.form.phoneNo)
                .then((res)=>{
                    // this.$store.dispatch('changeLoginState');
                    if(res.code == '0') {
                        this.$message({
                            message: '验证码已发送，请留意短信通知',
                            type: 'success',
                            duration:2000
                        });
                        let iNow = 59;
                        this.btnText = `重新发送 ${iNow}s`
                        let clear = setInterval(()=>{
                            iNow--;
                            this.btnText = `重新发送 ${iNow}s`
                            if(iNow == 0) {
                                this.btnText = `发送验证码`;
                                this.isDis = false;
                                clearInterval(clear);
                            }
                        },1000);
                    } else if(res.code == '0001') {
                        this.$message({
                            message: '该手机号尚未注册，请重新输入',
                            type: 'warning',
                            duration:2000
                        });
                        this.form.phoneNo = '';
                        this.isDis = false;
                    }
                }).catch((err)=>{
                    console.log(err);
                    this.$message.error(err);
                });
        },
    },
    mounted() {
        // let _u = sessionStorage.getItem('username');
        // let _p = sessionStorage.getItem('password');
        // if(_u != '' && _u != 'undefined' && _p != '' && _p != 'undefined') {
        //     this.account.username = _u;
        //     this.account.pwd = _p;
        // }
    },
})
</script>
<style lang="less" scoped>
    .login_box {
        width: 100vw;
        height: 100vh;
        min-width: 1200px;
        background: url('~@/assets/images/resetPwd/reset_bg.png')no-repeat;
        background-size: 100% 100%;
        min-height: 675px;
        position: relative;
    }
    .login_logo {
        width: 444px;
        height: 65px;
        position: absolute;
        left: 29px;
        top: 31px;
        background: url('~@/assets/images/login/logo.png') no-repeat;
        background-size: 100% 100%;
    }
    .reset_box {
        width: 500px;
        height: 666px;
        position: absolute;
        left: 50%;
        top: 50%;
        border-radius: 8px;
        background-color: #fff;
        transform: translate(-50%,-50%);
        h3 {
            color: #333333;
            font-size: 28px;
            position: absolute;
            left: 40px;
            top: 60px;
        }
        i {
            position: absolute;
            right: 28px;
            top: 55px;
            width: 40px;
            height: 40px;
            background: url('~@/assets/images/resetPwd/btn_close.png') no-repeat;
            background-size: 100% 100%;
            cursor: pointer;
        }
    }
    .inp_box {
        width: 68%;
        // height: 20.83333vw;
        position: absolute;
        left: 16.4%;
        top: 30.02%;
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
        ._c {
            color: #909399;
            font-size: 14px;
        }
        ._b {
            color: #3D63D8;
            font-size: 14px;
            cursor: pointer;
        }
    }
</style>

