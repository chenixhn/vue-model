<template>
    <div class="box">
        <h3>子组件2</h3>
        <el-row class="_item">
            1，{{msg}}
        </el-row>
        <el-row class="_item">
            2，{{msg1}}
        </el-row>
        <el-row class="_item">
            3，{{sMsg}}
        </el-row>
    </div>
</template>
<script>
import bus from './bus'
export default {
    data() {
        return {
            msg1:'我是child2本身的值'
        }
    },
    computed: {
        sMsg() {
            return this.$store.state.sMsg;
        }
    },
    props:{
        msg:{
            default:'我是默认值，父组件没传值会显示我'
        }
    },
    mounted() {
        bus.$on("toEdit", (str) => {
        this.msg1 = str;
        });
        console.log('---向上获取父组件---',this.$parent);
    }
}
</script>
<style lang="scss" scoped>
    .box {
        width: 480px;
        border: 1px solid #EBEEF5;
        border-radius: 10px;
        padding: 40px;
        margin-top:40px;
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