<template>
	<el-dialog :visible.sync="palette_carousel.visible" :fullscreen="true">
		<el-carousel
			trigger="click"
			height="100%"
			:autoplay="false"
			indicator-position="none"
			ref="carousel"
		>
			<el-carousel-item
				v-for="(palette, index) in palette_list"
				:key="index"
			>
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
			</el-carousel-item>
		</el-carousel>
	</el-dialog>
</template>
<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				dialogVisible: true,
			};
		},
		computed: {
			...mapState({
				palette_list: (state) => state.palette.list,
				palette_carousel: (state) => state.palette.carousel,
			}),
		},
		methods: {
			gradient(colors) {
				return `linear-gradient(to right, ${colors.join(",")})`;
			},
		},
		watch: {
			"palette_carousel.index": function (newV) {
				console.log(newV);
				this.$refs.carousel.setActiveItem(newV);
			},
		},
	};
</script>
<style lang="scss" scoped>
	::v-deep .el-dialog__header {
		display: none;
	}
	::v-deep .el-dialog__body {
		padding: 0;
	}
	::v-deep .el-carousel {
		height: 100vh;
	}
	::v-deep .el-card {
		height: 100%;
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
</style>