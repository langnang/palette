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
    </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapGetters } from "vuex";
export default {
    name: "Home",
    components: {},
    computed: {
        ...mapState({
            refs: state => state.colors.refs
        }),
        ...mapGetters(["colors"])
    }
};
</script>
