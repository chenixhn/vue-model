<template>
    <el-container>
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>
                Main
            </el-main>
        </el-container>
        <el-footer>Footer</el-footer>
    </el-container>
</template>
<script>
    export default {
        
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
