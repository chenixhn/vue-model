<template>
    <div class="box">
        <header>头部（Header）</header>
        <div class="content">
            <aside>侧边导航（Aside）</aside>
            <article>内容区域（main）</article>
        </div>
        <footer>底部（Footer）</footer>
    </div>
</template>
<style lang="scss">
    .box {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
    header, footer, article, aside {
        color: #fff;
        min-height: 60px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    header, footer {
        background-color: #7dbcea;
    }
    .content {
        flex: auto;
        display: flex;
    }
    .content aside {
        flex: none;
        width: 200px;
    }
    aside {
        background-color: #3ba0e9;
    }
    .content article {
        flex: auto;
    }
    article {
        min-height: 300px;
        background-color: #108ee9;
    }
</style>