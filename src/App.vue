<template>
    <div
        id="app"
        v-loading="user.loading"
        :element-loading-text="user.loading_text"
        :element-loading-spinner="user.loading_spinner"
    >
        <el-scrollbar style="height:100vh;">
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
                    <li v-for="(item,index) in refs" :key="index">
                        <el-link
                            type="primary"
                            :underline="false"
                            :href="item.link"
                            target="_blank"
                            :title="item.name"
                        >{{item.name}}</el-link>
                    </li>
                </ul>
            </el-drawer>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
    name: "app",
    data() {
        return {
            drawer: {
                visible: false
            }
        };
    },
    created() {},
    mounted() {},
    computed: {
        ...mapState(["user"]),
        ...mapState({}),
        ...mapGetters(["refs"])
    }
};
</script>

<style>
html,
body {
    margin: 0;
    padding: 0;
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
}
.particles-js-canvas-el {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
}
.el-scrollbar__wrap {
    height: calc(100% + 17px) !important;
}
.el-loading-mask .el-icon-close {
    font-size: 40px;
}
.el-loading-spinner .path {
    stroke-width: 4px !important;
}
.el-tag {
    margin-left: 20px;
}
.el-col__color {
    border: 0px;
    text-align: center;
    padding: 10px;
}
.el-card__color {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    border-radius: 10px !important;
    border: 0px !important;
}
.el-card__color span {
    display: none;
    color: white;
}
.el-card__color:hover span {
    display: block;
}
.el-card__palette .el-card__body {
    width: 100%;
    height: 100%;
    padding: 0;
}
.el-card__palette .el-card__body .el-row {
    height: 100%;
}
.el-card__palette .el-card__body .el-row .el-col {
    height: 100%;
}
</style>
