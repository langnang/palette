<template>
	<el-dialog :visible.sync="palette_carousel.visible" :fullscreen="true">
		<el-carousel
			trigger="click"
			height="100%"
			:initial-index="palette_carousel.index"
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
						background: $func.palette.gradient(palette.colors),
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
				<div class="el-palette__info-name" :style="{}">
					{{ palette.name }}
				</div>
				<div class="el-palette__info-author" :style="{}">
					By {{ palette.user_name }}
				</div>
				<div class="el-palette__info-colors" :style="{}">
					{{
						palette.type == "single"
							? palette.colors[0]
							: palette.type == "gradient"
							? palette.colors.join("=>")
							: palette.colors.join()
					}}
				</div>
				<div class="el-palette__info-comment" :style="{}">
					<font-awesome-icon
						:icon="['far', 'thumbs-up']"
						@click="
							$store.dispatch('commentInsert', {
								type_id: palette.id,
								thumbs_up: 1,
								palette_index: index,
							})
						"
						v-if="
							!comment_info(palette.id) ||
							comment_info(palette.id).thumbs_up <= 0
						"
					/>
					<font-awesome-icon
						:icon="['fas', 'thumbs-up']"
						@click="
							$store.dispatch('commentInsert', {
								type_id: palette.id,
								thumbs_up: -1,
								palette_index: index,
							})
						"
						v-if="
							comment_info(palette.id) &&
							comment_info(palette.id).thumbs_up > 0
						"
					/>
					{{ palette.thumbs_up }}
					<font-awesome-icon
						:icon="['far', 'heart']"
						@click="
							$store.dispatch('commentInsert', {
								type_id: palette.id,
								heart: 1,
								palette_index: index,
							})
						"
						v-if="
							!comment_info(palette.id) ||
							comment_info(palette.id).heart <= 0
						"
					/><font-awesome-icon
						:icon="['fas', 'heart']"
						@click="
							$store.dispatch('commentInsert', {
								type_id: palette.id,
								heart: -1,
								palette_index: index,
							})
						"
						v-if="
							comment_info(palette.id) &&
							comment_info(palette.id).heart > 0
						"
					/>
					{{ palette.heart }}
					<font-awesome-icon
						:icon="['far', 'star']"
						@click="
							$store.dispatch('commentInsert', {
								type_id: palette.id,
								star: 1,
								palette_index: index,
							})
						"
						v-if="
							!comment_info(palette.id) ||
							comment_info(palette.id).star <= 0
						"
					/>
					<font-awesome-icon
						:icon="['fas', 'star']"
						@click="
							$store.dispatch('commentInsert', {
								type_id: palette.id,
								star: -1,
								palette_index: index,
							})
						"
						v-if="
							comment_info(palette.id) &&
							comment_info(palette.id).star > 0
						"
					/>
					{{ palette.star }}
				</div>
			</el-carousel-item>
		</el-carousel>
	</el-dialog>
</template>
<script>
	import { mapState, mapGetters } from "vuex";
	export default {
		data() {
			return {
				dialogVisible: true,
			};
		},
		computed: {
			...mapState({
				palette_carousel: (state) => state.palette.carousel,
			}),
			...mapGetters(["palette_list", "comment_info"]),
		},
		methods: {},
		watch: {
			"palette_carousel.index": function (newV) {
				if (this.$refs.carousel) {
					this.$refs.carousel.setActiveItem(newV);
				}
			},
		},
	};
</script>
<style lang="scss" scoped>
	::v-deep .el-dialog__header {
		display: none;
	}
	::v-deep .el-dialog__body {
		// padding: 0;
	}
	::v-deep .el-carousel {
		height: calc(100vh - 60px);
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
	.svg-inline--fa:hover {
		color: red;
	}
	.el-palette__info {
		&-name {
			position: absolute;
			top: 0;
			text-align: center;
			width: 100%;
			font-size: 20px;
		}
		&-author {
			margin-top: -30px;
			font-size: 20px;
		}
		&-colors {
			position: absolute;
			top: 30px;
			text-align: center;
			width: 100%;
			font-size: 20px;
		}
		&-comment {
			margin-top: -30px;
			text-align: right;
			font-size: 20px;
		}
	}
</style>