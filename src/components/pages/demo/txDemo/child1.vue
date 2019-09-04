<template>
    <div>
        <el-button @click="toVuexEdit">点击修改child2的值</el-button>
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
    div {
        margin-bottom: 40px;
    }
</style>