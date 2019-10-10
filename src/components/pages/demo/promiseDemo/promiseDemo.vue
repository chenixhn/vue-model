<template>
    <div>
        
    </div>
</template>
<script>
export default {
    mounted() {
        const promise = new Promise((resolve, reject) => {
            for (let i =0;i<3;i++) {
                console.log(i);
            }
            setTimeout(()=>{
                if (false) {
                    resolve('成功')
                }else{
                    reject('失败')
                }
            },3000)
            console.log('1')
        }).then(res=>{
            console.log(res);
            //后面可以用传过来的数据做些其他操作
            //......
        },
        error=>{
            console.log(error);
            //后面可以用传过来的数据做些其他操作
            //......
        }).catch((err)=>{
            console.log('catch',err);
        }).finally(()=>{
            console.log('总会执行的操作')
        });


        function runAsync1(){
            var p = new Promise(function(resolve, reject){
                //做一些异步操作
                setTimeout(function(){
                    console.log('异步任务1执行完成');
                    resolve('随便什么数据1');
                }, 1000);
            });
            return p;            
        }
        function runAsync2(){
            var p = new Promise(function(resolve, reject){
                //做一些异步操作
                setTimeout(function(){
                    console.log('异步任务2执行完成');
                    resolve('随便什么数据2');
                }, 2000);
            });
            return p;            
        }
        function runAsync3(){
            var p = new Promise(function(resolve, reject){
                //做一些异步操作
                setTimeout(function(){
                    console.log('异步任务3执行完成');
                    resolve('随便什么数据3');
                }, 2000);
            });
            return p;            
        }
        Promise.all([runAsync1(), runAsync2(), runAsync3()]).then(function(results){
            console.log(results);
        });
        Promise.race([runAsync1(), runAsync2(), runAsync3()]).then(function(results){
            console.log(results);
        });
    }
}
</script>
<style lang="scss">
    
</style>