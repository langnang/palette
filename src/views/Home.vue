<template>
    <div class="home">
        <el-row v-for="(item,key) in colors" :key="key">
            <h1>{{item.name}}</h1>
            <router-link
                v-for="(i,i_k) in item.children"
                :to="'/'+key+'/'+i_k+'?type='+key"
                :key="i_k"
            >
                <el-tag>{{i.name}}</el-tag>
            </router-link>
        </el-row>
        <el-row v-if="utils.length>0">
            <h1>Color Utils</h1>
            <el-link
                type="primary"
                target="_blank"
                :underline="false"
                v-for="(util,key) in utils"
                :title="util.name"
                :href="util.link"
                :key="key"
            >
                <el-tag>{{util.name}}</el-tag>
            </el-link>
        </el-row>
    </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapGetters } from "vuex";
export default {
    name: "Home",
    components: {},
    created() {
        this.$store.dispatch("loadMenu");
    },
    computed: {
        ...mapState({}),
        ...mapGetters(["colors", "utils"])
    }
};
</script>
