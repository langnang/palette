<template>
    <el-row :gutter="20" style="margin-left:0;margin-right:0;">
        <h1>中国色</h1>
        <el-col :span="4" style="text-align:center;" v-for="(value,key) in colors" :key="key">
            <el-card class="box-card" :style="{'background':value.color}">
                <span>{{value.name}}：{{value.color}}</span>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            colors: [
                {
                    color: "#5C2223",
                    name: "暗玉紫"
                },
                {
                    color: "#EEA2A4",
                    name: "牡丹粉红"
                }
            ]
        };
    }
};
</script>

<style scoped>
.box-card {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    border-radius: 10px;
}
.box-card span {
    display: none;
    color: white;
}
.box-card:hover span {
    display: block;
}
</style>