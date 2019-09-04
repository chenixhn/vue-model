<template>
    <div class="box">
        <child1 @toEdit="toEdit"></child1>
        <child2 :msg="msg"></child2>
    </div>
</template>
<script>
import child1 from './child1';
import child2 from './child2';
export default {
    data() {
        return {
            msg:'我是来自父组件的值'
        }
    },
    components:{
        child1,child2
    },
    methods:{
        toEdit(str) {
            console.log(str)
            this.msg = str;
        }
    },
    mounted() {
        console.log('---向下获取子组件---',this.$children);
    },
}
</script>
<style lang="scss" scoped>
    .box {
        padding: 40px;
    }
</style>