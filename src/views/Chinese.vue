<template>
    <el-row :gutter="20" style="margin-left:0;margin-right:0;">
        <h1>中国色</h1>
        <el-col :span="4" class="el-col__color" v-for="(value,key) in colors" :key="key">
            <el-card class="el-card__color" :style="{'background':value.color}">
                <span>{{value.name}}：{{value.color}}</span>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import colors from "./../json/chinese.json";
export default {
    data() {
        return {
            colors: colors
        };
    }
};
</script>

<style scoped>
</style>