<template>
    <el-row :gutter="20" style="margin-left:0;margin-right:0;">
        <h1>渐变配色</h1>
        <el-col :span="4" style="text-align:center;" v-for="(value,key) in colors" :key="key">
            <el-card
                class="box-card"
                :style="{'background':'linear-gradient(to right,'+value[0]+','+value[1]+')'}"
            ></el-card>
            <span>{{key}}</span>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            colors: {
                Blu: ["#00416a", "#e4e5e6"]
            }
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