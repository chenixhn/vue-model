<template>
    <div class="login_box">
        <div class="login_t_box">
            <div class="login_logo"></div>
            <div class="login_text_box">
                <h3>会议转播系统</h3>
                <p>为了您观看的最佳效果，建议使用谷歌浏览器</p>
                <a href="https://dl.google.com/tag/s/appguid%3D%7B8A69D345-D564-463C-AFF1-A69D9E530F96%7D%26iid%3D%7B6EB4AC79-84F3-6792-A8E1-B74EDAEAA3D4%7D%26lang%3Dzh-CN%26browser%3D4%26usagestats%3D1%26appname%3DGoogle%2520Chrome%26needsadmin%3Dprefers%26ap%3Dx64-stable-statsdef_1%26installdataindex%3Dempty/update2/installers/ChromeSetup.exe">点击下载</a>
            </div>
            <div class="login_form_box">
                <h3>欢迎登录</h3>
                <el-form ref="AccountFrom" :model="account" :rules="rules" class="inp_box">
                    <el-form-item prop="username">
                        <el-input type="text" class="_inp" v-model="account.username" auto-complete="off" placeholder="用户名">
                            <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" class="_inp" v-model="account.password" auto-complete="off" placeholder="密码" show-password>
                            <i slot="prefix" class="el-input__icon el-icon-s-goods"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="checked">记住密码</el-checkbox>
                        <router-link to="resetPwd"><span class="reset_password">忘记密码？</span></router-link>
                    </el-form-item>
                    <el-form-item style="width:100%;">
                        <el-button type="primary" class="_btn" style="width:100%;" @click.native.prevent="handleLogin">登录</el-button>
                    </el-form-item>
                    <el-form-item>
                        <span class="_c">还没有账号？<router-link to="register"><span class="_b">立即注册</span></router-link></span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import Base from '@/base/base.vue'
import {login} from '@/axios/service/login'
export default Base.extend({
    data() {
        return {
            account: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                { required: true, message: "请输入账号", trigger: "blur" }
                //{ validator: validaePass }
                ],
                password: [
                { required: true, message: "请输入密码", trigger: "blur" }
                //{ validator: validaePass2 }
                ]
            },
            checked: true
        }
    },
    methods: {
        handleLogin() {
            if(!this.checked) {
                sessionStorage.removeItem('username');
                sessionStorage.removeItem('password');
            } else {
                sessionStorage.setItem('username',this.account.username);
                sessionStorage.setItem('password',this.account.password);
            }
            
            // this.$router.push('playing');
            this.login();
        },
        login() {
            // login(this.account)
            // .then((res)=>{
                // this.$store.dispatch('changeLoginState');
                // this.$message({
                //     message: res,
                //     type: 'success'
                // });
                sessionStorage.setItem('isLogin','true');
                sessionStorage.setItem('name','张三')
                sessionStorage.setItem('admin','true')
                this.$router.push('txDemo');
            // }).catch((err)=>{
            //     this.$message.error(err);
            // });
        }
    },
    mounted() {
        let _u = sessionStorage.getItem('username');
        let _p = sessionStorage.getItem('password');
        if(_u != 'null' && _u != 'undefined' && _p != 'null' && _p != 'undefined') {
            this.account.username = _u;
            this.account.password = _p;
        }
        // this.login();
        // console.log(this.setA());
        // console.log(this.isA);
    },
})
</script>
<style lang="scss" scoped>
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
            left: 18%;
            top: 67.5%;
            color: #F0F2FA;
            text-align: center;
            h3 {
                font-weight: 500;
                font-size:36px;
                margin-bottom: 22px;
                letter-spacing: 5px;
            }
            p {
                font-size: 22px;
                letter-spacing: 5px;
            }
            a {
                padding-right: 30px;
                letter-spacing: 5px;
                display: inline-block;
                margin-top: 20px;
                color: #fff;
                font-weight: 500;
                font-size: 16px;
                background: url('~@/assets/images/login/download.png')no-repeat;
                background-size: 22px 16px;
                background-position: 90px 0px;
            }
        }
        .login_form_box {
            width: 35.55555%;
            height: 100%;
            background-color: #fff;
            position: absolute;
            right: 0;
            top: 0;
            h3 {
                font-weight: 600;
                color: #333333;
                font-size: 30px;
                position: absolute;
                top: 21.3%;
                left: 16.4%;
            }
        }
    }
    .inp_box {
        width: 68%;
        // height: 20.83333vw;
        position: absolute;
        left: 16.4%;
        top: 33.02%;
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

