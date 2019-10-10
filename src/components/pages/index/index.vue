<template>
   <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>实例：组件通讯</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="toDemo('txDemo')">点击查看实例</el-button>
            </div>
            <div class="item">
                此实例涉及以下内容：
            </div>
            <div class="text item">
                1，父组件向子组件传递数据（props）；
            </div>
            <div class="text item">
                2，子组件向父组件发送自定义事件（$emit）；
            </div>
            <div class="text item">
                3，向上获取父链（$parent）&向下获取子链（$children）
            </div>
            <div class="text item">
                4，使用bus中间组件进行通讯；
            </div>
            <div class="text item">
                5，使用vuex进行全局状态管理；
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>实例：flex/element-ui实现项目常用布局</span>
            </div>
            <div class="text item">
                1，flex实现  <el-button style="padding: 3px 0" type="text" @click="toDemo('flexDemo')">点击查看</el-button>
            </div>
            <div class="text item">
                2，element-ui实现  <el-button style="padding: 3px 0" type="text" @click="toDemo('eleDemo')">点击查看</el-button>
            </div>
            <div class="text item">
                3，了解flex语法详情请点击 <el-link href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html" target="_blank" type="primary">阮一峰：flex布局</el-link>
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>实例：计算属性实现表格筛选</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="toDemo('computedDemo')">点击查看实例</el-button>
            </div>
            <div class="item">
                此实例涉及以下内容：
            </div>
            <div class="text item">
                1，vue.js计算属性基础用法；
            </div>
            <div class="text item">
                2，element-ui表格&输入框使用；
            </div>
            <div class="text item">
                3，数组方法Array.filter
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>实例：promise基础用法</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="toDemo('promiseDemo')">点击查看实例</el-button>
            </div>
            <div class="text item">
                promise的执行顺序及状态判断
            </div>
        </el-card>
   </div>
</template>
<script>
import Base from '@/base/base.vue'
export default Base.extend({
    data() {
        return {
        }
    },
    methods: {
        toDemo(url) {
            this.$router.push(url);
        }
    },
    mounted() {

    },
})
</script>
<style lang="scss">
    .text {
        color:#F56C6C;
    }

    .item {
        font-size: 14px;
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        float: left;
        margin: 40px;
        width: 480px;
    }
</style>