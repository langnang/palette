<template>
	<el-row :gutter="20" style="margin-left: 0; margin-right: 0">
		<el-col
			:span="4"
			v-for="(palette, index) in palette_list"
			:key="index"
			class="el-col__color"
			:title="palette.name + '：[' + palette.colors + ']'"
			:style="{
				position: 'relative',
			}"
			@click.native="clickCard(index)"
		>
			<i
				:class="[is_select(index) === true ? 'el-icon-success' : '']"
				:style="{
					position: 'absolute',
					right: '5px',
					top: '5px',
					color: '#66b1ff',
				}"
			></i>
			<el-card
				v-if="palette.type === 'single'"
				class="el-card__color"
				:style="{ 'background-color': palette.colors[0] }"
			>
			</el-card>
			<el-card
				v-else-if="palette.type === 'gradient'"
				class="el-card__color"
				:style="{
					background: gradient(palette.colors),
				}"
			>
			</el-card>
			<el-card
				v-else-if="palette.type === 'multi'"
				class="el-card__color"
			>
				<span
					class="color-multi"
					v-for="color in palette.colors"
					:key="color"
					:style="{ 'background-color': color }"
				></span>
			</el-card>
			<div
				:style="{
					'margin-top': '-12px',
					position: 'absolute',
					width: '100%',
				}"
			>
				<el-button
					icon="el-icon-view"
					circle
					@click="showCarousel(index)"
				></el-button>
				<el-button
					icon="el-icon-edit"
					circle
					@click="editPalette(index)"
				></el-button>
				<el-popconfirm
					title="确定要删除吗"
					@onConfirm="deletePalette(index)"
					:style="{ 'margin-left': '10px' }"
				>
					<el-button
						icon="el-icon-delete"
						circle
						slot="reference"
					></el-button>
				</el-popconfirm>
			</div>
		</el-col>
	</el-row>
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
				palette_list: (state) => state.palette.list,
				palette_select: (state) => state.palette.select,
				palette_carousel: (state) => state.palette.carousel,
			}),
			...mapGetters([]),
		},
		methods: {
			gradient(colors) {
				return `linear-gradient(to right, ${colors.join(",")})`;
			},
			editPalette(index) {
				this.palette_dialog.target = "update";
				this.palette_dialog.visible = true;
				this.$store.commit("setPaletteItem", index);
			},
			deletePalette(index) {
				this.$store.dispatch("deletePalette", index);
			},
			showCarousel(index) {
				this.palette_carousel.index = index;
				this.palette_carousel.visible = true;
			},
			clickCard(index) {
				const _index = this.palette_select.indexOf(index);
				if (_index == -1) {
					this.palette_select.push(index);
				} else {
					this.palette_select.splice(_index, 1);
				}
				this.palette_select.sort();
			},
			is_select(index) {
				return this.palette_select.filter((v) => v === index).length != 0
					? true
					: false;
			},
		},
	};
</script>
<style lang="scss" scoped>
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
	.box-card span {
		display: none;
		color: white;
	}
	.box-card:hover span {
		display: block;
	}
	::v-deep .el-card__body {
		width: 100%;
		height: 100%;
		padding: 0;
		display: flex;
	}
	.color-multi {
		display: inline-block;
		flex-grow: 1;
	}
	::v-deep .el-button.is-circle {
		padding: 5px;
		font-size: 5px;
		display: none;
	}
	::v-deep .el-col:hover .el-button.is-circle {
		display: inline-block;
	}
</style>