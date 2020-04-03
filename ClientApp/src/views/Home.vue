<template>
    <div class="home">
        <el-row>
            <h1>Pure Colors</h1>
            <router-link to="/web-safe">
                <el-tag>216 Web 安全色</el-tag>
            </router-link>
            <router-link to="/palettes">
                <el-tag>主色调</el-tag>
            </router-link>
            <router-link to="/random">
                <el-tag>随机色</el-tag>
            </router-link>
            <router-link to="/chinese">
                <el-tag>中国色 - 中国传统颜色</el-tag>
            </router-link>
        </el-row>
        <el-row>
            <h1>Graduated Colors</h1>
            <router-link to="/gradients">
                <el-tag>渐变色(双色)</el-tag>
            </router-link>
        </el-row>
        <el-row>
            <h1>Mixed Colors</h1>
        </el-row>
        <el-row>
            <h1>Color Tools</h1>
        </el-row>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: "Home",
    components: {}
};
</script>
