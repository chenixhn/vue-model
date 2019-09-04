<template>
   <div>
       <Header activeIndex="1"></Header>
       <input type="text" v-model="Num">
       <VueBtm v-if="aa" style="visibility:hidden;" :value="Num" :options="options" id="dayin"></VueBtm>
       <button @click="toP">打印</button>
   </div>
</template>
<script>
import Base from '@/base/base.vue'
import Header from '@/components/common/header/header'
import VueBtm from '@xkeshi/vue-barcode'
import printJS from 'print-js';
export default Base.extend({
    data() {
        return {
            aa:false,
            Num:'',
            options:{
                displayValue:true,//是否显示数字
                // textPosition: 'top' //条形码数据显示的位置
                background:'#fff',
                valid:(valid)=>{
                    console.log(valid);
                },
                margin:0,
                width:2,
                height:55,
                fontSize:16
            }

        }
    },
    components:{
        Header,VueBtm
    },
    methods: {
        toP() {
            this.aa = true;
            setTimeout(()=>{
                printJS('dayin','html')
            })
        }
    },
    mounted() {
        // document.execCommand("print",false,null)
		// printJS('dayin','html');
    },
})
</script>
<style lang="less">
    #dayin {
        position: absolute;
    }
</style>