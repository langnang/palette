<template>
    <el-row :gutter="20" style="margin-left:0;margin-right:0;">
        <h1>渐变色（双色）</h1>
        <el-col :span="4" class="el-col__color" v-for="(value,key) in colors" :key="key">
            <el-card
                class="el-card__color"
                :style="{'background':'linear-gradient(to '+value.direction+','+value.colors[0]+','+value.colors[1]+')'}"
            >
                <span>{{value.name}}</span>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import colors from "./../json/gradients.json";
export default {
    data() {
        return {
            colors: colors
        };
    }
};
</script>

<style scoped>
.color-box {
    height: 150px;
}
.box-card {
    height: 150px;
    border-radius: 10px;
}
.box-card .el-card__body {
    padding: 0 0 20px 0;
}
</style>