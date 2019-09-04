<template>
    <div>
        {{sMsg}}
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
    
</style>