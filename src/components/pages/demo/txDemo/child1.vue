<template>
    <div class="box">
        <h3>子组件1</h3>
        <el-row class="_item">
            <el-button type="primary" plain @click="toEdit">1，点击通过父组件作为中间件修改child2的展示内容</el-button>
        </el-row>
        <el-row class="_item">
            <el-button type="warning" plain @click="toEdit1">2，点击通过bus中间件修改child2的展示内容</el-button>
        </el-row>
        <el-row class="_item">
            <el-button type="success" plain @click="toVuexEdit">3，点击vue全局状态管理修改child2的展示内容</el-button>
        </el-row>
    </div>
</template>
<script>
import bus from './bus.js'
export default {
    methods:{
        toEdit() {
            this.$emit('toEdit','我是来自child1的值--通过父组件传递')
        },
        toEdit1() {
            bus.$emit('toEdit','我是来自child1的值--通过bus传递') 
        },
        toVuexEdit() {
            console.log(1);
            this.$store.commit('toVuexEdit');
        }
    }
}
</script>
<style lang="scss" scoped>
    .box {
        width: 480px;
        border: 1px solid #EBEEF5;
        border-radius: 10px;
        padding: 40px;
        h3 {
            margin-bottom: 40px;
            font-weight: 400;
            font-weight: 400;
            color: #1f2f3d;
            font-size: 22px;
        }
        ._item {
            margin-top: 20px;
        }
    }
</style>