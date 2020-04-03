<template>
    <el-row :gutter="20" style="margin-left:0;margin-right:0;">
        <h1>主色调</h1>
        <el-col :span="4" style="padding:10px;" v-for="(value,key) in colors" :key="key">
            <el-card class="box-card">
                <div class="box-card__piece" :style="{'background-color':value[0]}">
                    <span>{{value[0]}}</span>
                </div>
                <div class="box-card__piece" :style="{'background-color':value[1]}">
                    <span>{{value[1]}}</span>
                </div>
                <div class="box-card__piece" :style="{'background-color':value[2]}">
                    <span>{{value[2]}}</span>
                </div>
                <div class="box-card__piece" :style="{'background-color':value[3]}">
                    <span>{{value[3]}}</span>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            colors: [["#FFBCBC", "#363636", "#4CD3C2", "#B7EFCD"]]
        };
    }
};
</script>

<style scoped>
.box-card {
    height: 240px;
    border-radius: 10px;
}
.box-card .box-card__piece span {
    color: white;
    display: none;
}
.box-card .box-card__piece:hover span {
    display: block;
}
.box-card .box-card__piece:first-child {
    height: 65px;
}
.box-card .box-card__piece:nth-child(2) {
    height: 55px;
}
.box-card .box-card__piece:nth-child(3) {
    height: 45px;
}
.box-card .box-card__piece:nth-child(4) {
    height: 35px;
}
</style>