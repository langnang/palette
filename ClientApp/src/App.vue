<template>
    <div id="app">
        <el-button
            type="primary"
            icon="el-icon-share"
            circle
            :style="{'position':'absolute','right':0,'z-index':1}"
            @click.native="drawer.visible = true"
        ></el-button>
        <router-view v-wechat-title="$route.meta.title+' - Colors'" />
        <el-drawer title="我是标题" :visible.sync="drawer.visible" :with-header="false">
            <ul>
                <el-link
                    type="primary"
                    :underline="false"
                    v-for="(item,index) in refs"
                    :key="index"
                    :href="item.link"
                    target="_blank"
                    :title="item.title"
                >
                    <li>{{item.name}}</li>
                </el-link>
            </ul>
        </el-drawer>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            drawer: {
                visible: false
            },
            refs: [
                {
                    name: "「颜值即正义」那些管 UI 小姐姐要来的网站",
                    title: "「颜值即正义」那些管 UI 小姐姐要来的网站",
                    link: "https://juejin.im/post/5e7cdee26fb9a03c6e640cc7"
                }
            ]
        };
    }
};
</script>

<style>
html,
body {
    margin: 0;
    padding: 0;
    background-image: url("./assets/assorted-color-string-lights-752484.jpg");
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
h1 {
    margin-left: 8px;
    color: white;
}
</style>
