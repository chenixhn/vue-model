<template>
    <div>
        <el-row style="margin:40px;">
                <el-input v-model="inpText" placeholder="请输入内容进行筛选" style="width:30%;margin-bottom:10px;"></el-input>
        </el-row>
        
        <el-table
            :data="list"
            style="width: 100%">
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="age"
                label="年龄">
            </el-table-column>
            <el-table-column
                prop="like"
                label="爱好">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData:[
                    {name:'孙朋',age:'18',like:'篮球'},
                    {name:'陈浩',age:'19',like:'音乐'},
                    {name:'利兵',age:'17',like:'篮球'},
                    {name:'西奥名',age:'15',like:'足球'},
                    {name:'吐鲁番',age:'16',like:'篮球'},
                    {name:'奥西吧',age:'22',like:'排球'},
                    {name:'黑球',age:'21',like:'排球'},
                    {name:'咕嘟',age:'24',like:'篮球'},
                    {name:'冒泡泡',age:'20',like:'足球'},
                    {name:'黑凤梨',age:'14',like:'篮球'},
                    {name:'娃仔',age:'18',like:'音乐'},
                ],
                inpText:''
            }
        },
        computed:{
            list() {
                let list =  this.tableData.filter((item)=>{
                    if(this.inpText != '') {
                        return item.like.indexOf(this.inpText) != -1 || item.name.indexOf(this.inpText) != -1 || item.age.indexOf(this.inpText) != -1;
                    }
                    return item;
                })
                return list;
            }
        }
    }
</script>
<style lang="scss">
    .el-container {
        height: 100vh;
    }
    .el-header, .el-footer {
        background-color: #B3C0D1;
    }
    
    .el-aside {
        background-color: #D3DCE6;
    }
    
    .el-main {
        background-color: #E9EEF3;
    }
</style>
