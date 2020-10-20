<template>
	<el-menu
		:default-active="'home'"
		class="theme-dark"
		mode="horizontal"
		background-color="#545c64"
		text-color="#fff"
		active-text-color="#ffd04b"
	>
		<el-menu-item index="home">
			<router-link to="/"> 首页 </router-link>
		</el-menu-item>
		<el-submenu v-for="nav_1 in navs" :key="nav_1.id" :index="nav_1.type">
			<template slot="title">{{ nav_1.name }}</template>
			<el-menu-item
				v-for="nav_2 in nav_1.children"
				:key="nav_2.id"
				:index="nav_1.type + '-' + nav_2.id"
			>
				<a :href="nav_2.link" target="_blank">
					{{ nav_2.name }}
				</a>
			</el-menu-item>
		</el-submenu>
		<span
			:style="{
				'line-height': '60px',
				float: 'right',
				'margin-right': '30px',
			}"
		>
			<el-select
				v-model="palette_filter.type"
				placeholder="请选择"
				:style="{ 'margin-right': '10px', width: '90px' }"
			>
				<el-option label="全部" value="all"> </el-option>
				<el-option label="单色" value="single"> </el-option>
				<el-option label="渐变" value="gradient"> </el-option>
				<el-option label="多色" value="multi"> </el-option>
			</el-select>
			<el-button
				icon="el-icon-plus"
				circle
				@click="addPalette()"
				v-if="false"
			></el-button>
			<el-button
				icon="el-icon-delete"
				circle
				:disabled="palette_select.length ? false : true"
				@click="deletePalette()"
				v-if="false"
			></el-button>
			<el-button
				icon="el-icon-download"
				circle
				:disabled="palette_select.length ? false : true"
				@click="downloadPaletteList()"
				v-if="false"
			></el-button>
			<el-button circle v-if="user">
				<font-awesome-icon :icon="['fas', 'user']" />
			</el-button>
			<router-link
				to="/user/register"
				:style="{ 'margin-left': '10px' }"
				v-if="user === null"
			>
				<el-button
					circle
					:style="{
						'border-radius': '8px',
					}"
				>
					注 册
				</el-button>
			</router-link>
			<router-link
				to="/user/sign-in"
				:style="{ 'margin-left': '10px' }"
				v-if="user === null"
			>
				<el-button
					circle
					:style="{
						'border-radius': '8px',
					}"
				>
					登 录
				</el-button>
			</router-link>
			<el-button
				circle
				:style="{
					'border-radius': '8px',
				}"
				@click="$store.dispatch('userSignOut')"
				v-if="user"
			>
				登 出
			</el-button>
		</span>
	</el-menu>
</template>
<script>
	import { mapState, mapGetters } from "vuex";
	import FileSaver from "file-saver";
	export default {
		data() {
			return {};
		},
		computed: {
			...mapState({
				palette_dialog: (state) => state.palette.dialog,
				palette_list: (state) => state.palette.list,
				palette_select: (state) => state.palette.select,
				palette_filter: (state) => state.palette.filter,
				navs: (state) => state.navs,
				user: (state) => state.user.info,
			}),
			...mapGetters([]),
		},
		methods: {
			addPalette() {
				this.palette_dialog.target = "insert";
				this.palette_dialog.visible = true;
			},
			deletePalette() {
				this.$confirm("此操作将永久删除所选调色板, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
					.then(() => {
						// console.log(this.palette_select);
						this.$store.dispatch("batchDeletePalette");
					})
					.catch(() => {});
			},
			downloadPaletteList() {
				let data = this.palette_list.filter(
					(v) => this.palette_select.indexOf(v.id) != -1
				);
				var content = JSON.stringify(data);
				var blob = new Blob([content], {
					type: "text/plain;charset=utf-8",
				});
				FileSaver.saveAs(blob, "palette_list.json");
			},
		},
		watch: {},
	};
</script>
<style lang="scss" scoped>
	a {
		text-decoration: none;
	}
	a:-webkit-any-link {
		color: white;
	}
	.theme-dark {
		::v-deep .el-select {
			.el-input__inner {
				background-color: transparent;
				color: white;
				// border: 0;
			}
		}
		.el-button.is-disabled,
		.el-button.is-disabled:focus,
		.el-button.is-disabled:hover {
			background-color: transparent;
			opacity: 0.5;
		}
	}
	.el-button-group {
		float: right;
	}
	::v-deep .el-button--default {
		color: #fff;
		background-color: transparent;
	}
	::v-deep .el-button.is-circle {
		font-size: 17px;
		padding: 5px;
	}
	.el-button {
		// line-height: 60px;
		// height: 60px;
		// font-size: 25px;
		// padding: 0;
		// padding-left: 14px;
		// padding-right: 14px;
	}
</style>