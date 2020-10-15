<template>
	<div>
		<el-menu
			:default-active="'home'"
			class="el-menu-demo"
			mode="horizontal"
			background-color="#545c64"
			text-color="#fff"
			active-text-color="#ffd04b"
		>
			<el-menu-item index="home">
				<router-link to="/"> 首页 </router-link>
			</el-menu-item>
			<el-submenu index="sigle">
				<template slot="title">单色类</template>
				<el-menu-item index="sigle-1">
					<router-link to="/single/websafe">
						216 Web 安全色
					</router-link>
				</el-menu-item>
				<el-menu-item index="sigle-2">
					<router-link to="/single/random">随机色</router-link>
				</el-menu-item>
				<el-menu-item index="sigle-3">
					<a href="http://zhongguose.com/" target="_blank"
						>中国色 - 中国传统颜色</a
					>
				</el-menu-item>
			</el-submenu>
			<el-submenu index="gradient">
				<template slot="title">渐变类</template>
				<el-menu-item index="gradient-1">
					<a href="https://uigradients.com/" target="_blank">
						uiGradients - Beautiful colored gradients
					</a>
				</el-menu-item>
			</el-submenu>
			<el-submenu index="multi">
				<template slot="title">多色类</template>
				<el-menu-item index="multi-1">
					<a href="http://tool.c7sky.com/webcolor/" target="_blank">
						网页设计常用色彩搭配表 - 配色表 | 小影的工具箱
					</a>
				</el-menu-item>
			</el-submenu>
			<el-submenu index="util">
				<template slot="title">工具类</template>
				<el-menu-item index="util-1">
					<a href="https://colors.muz.li/">
						Color Palette Generator - Create Beautiful Color Schemes
					</a>
				</el-menu-item>
				<el-menu-item index="util-2">
					<a href="https://mycolor.space/">
						ColorSpace - Color Palettes Generator and Color Gradient
						Tool
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
				<el-button
					icon="el-icon-plus"
					circle
					@click="addPalette()"
				></el-button>
				<el-button
					icon="el-icon-delete"
					circle
					:disabled="palette_select.length ? false : true"
					@click="deletePalette()"
				></el-button>
			</span>
		</el-menu>
	</div>
</template>
<script>
	import { mapState, mapGetters } from "vuex";
	export default {
		data() {
			return {};
		},
		computed: {
			...mapState({
				palette_dialog: (state) => state.palette.dialog,
				palette_select: (state) => state.palette.select,
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
						this.$message({
							type: "success",
							message: "删除成功!",
						});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除",
						});
					});
			},
		},
	};
</script>
<style lang="scss" scoped>
	a {
		text-decoration: none;
	}
	.el-button-group {
		float: right;
	}
	::v-deep .el-button--default {
		color: #fff;
		background-color: transparent;
	}
	::v-deep .el-button.is-circle {
		font-size: 5px;
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