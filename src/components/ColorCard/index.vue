<template>
	<el-row :gutter="30" style="margin-left: 0; margin-right: 0">
		<el-col
			:span="6"
			v-for="(palette, index) in palette_list"
			:key="index"
			class="el-col"
			:style="{
				position: 'relative',
			}"
		>
			<i
				:class="[
					is_select(palette.id) === true ? 'el-icon-success' : '',
				]"
				:style="{
					position: 'absolute',
					right: '5px',
					top: '5px',
					color: '#66b1ff',
				}"
				v-if="false"
			></i>
			<el-card
				v-if="palette.type === 'single'"
				class="el-card__palette"
				:style="{ 'background-color': palette.colors[0] }"
				@click.native="showCarousel(index)"
			>
			</el-card>
			<el-card
				v-else-if="palette.type === 'gradient'"
				class="el-card__palette"
				:style="{
					background: $func.palette.gradient(palette.colors),
				}"
				@click.native="showCarousel(index)"
			>
			</el-card>
			<el-card
				v-else-if="palette.type === 'multi'"
				class="el-card__palette"
				@click.native="showCarousel(index)"
			>
				<span
					class="el-card__body-multi"
					v-for="color in palette.colors"
					:key="color"
					:style="{ 'background-color': color }"
				></span>
			</el-card>
			<!-- <p>{{ palette.name }}</p> -->
			<!-- <p>{{ palette.colors }}</p> -->
			<div class="el-palette__icons" :style="{}" v-if="false">
				<el-button
					icon="el-icon-view"
					circle
					@click="showCarousel(index)"
				></el-button>
				<!-- <el-button
					icon="el-icon-edit"
					circle
					@click="editPalette(palette.id)"
					v-if="user.id"
				></el-button>
				<el-popconfirm
					title="确定要删除吗"
					@onConfirm="$store.dispatch('deletePalette', index)"
					:style="{ margin: '0 10px' }"
					v-if="user.id"
				>
					<el-button
						icon="el-icon-delete"
						circle
						slot="reference"
					></el-button>
				</el-popconfirm> -->
				<el-popover
					placement="top-start"
					:title="palette.name"
					trigger="hover"
					:style="{ margin: '0 10px' }"
					:content="palette.colors.join()"
				>
					<el-button
						icon="el-icon-info"
						circle
						slot="reference"
					></el-button>
				</el-popover>
				<font-awesome-icon
					:icon="['far', 'thumbs-up']"
					@click="$func.comment.thumbsUp(palette.id)"
				/>
				0
				<font-awesome-icon
					:icon="['far', 'heart']"
					@click="$func.comment.heart(palette.id)"
				/>
				0
				<font-awesome-icon
					:icon="['far', 'star']"
					@click="$func.comment.star(palette.id)"
				/>
				0
			</div>
			<div
				class="el-palette__info"
				:style="{ 'background-color': 'white' }"
			>
				<span
					class="el-palette__info-name"
					:style="{
						margin: '0',
					}"
				>
					{{ palette.name }}
				</span>
				<span
					class="el-palette__info-author"
					:style="{
						margin: '0',
					}"
				>
					By {{ palette.user_name }}
				</span>
				<br />
				<span
					class="el-palette__info-colors"
					:style="{
						margin: '0',
					}"
				>
					{{
						palette.type == "single"
							? palette.colors[0]
							: palette.type == "gradient"
							? palette.colors.join("=>")
							: palette.colors.join()
					}}
				</span>
				<span
					class="el-palette__info-comment"
					:style="{
						margin: '0',
					}"
				>
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
				</span>
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
				palette_select: (state) => state.palette.select,
				palette_carousel: (state) => state.palette.carousel,
				user: (state) => state.user.info,
			}),
			...mapGetters(["palette_list", "comment_info"]),
		},
		methods: {
			editPalette(id) {
				this.palette_dialog.target = "update";
				this.palette_dialog.visible = true;
				this.$store.commit("setPaletteItem", id);
			},
			showCarousel(index) {
				this.palette_carousel.index = index;
				this.palette_carousel.visible = true;
			},
			clickCard(id) {
				const _index = this.palette_select.indexOf(id);
				if (_index == -1) {
					this.palette_select.push(id);
				} else {
					this.palette_select.splice(_index, 1);
				}
				this.palette_select.sort();
			},
			is_select(id) {
				return this.palette_select.filter((v) => v === id).length != 0
					? true
					: false;
			},
			downloadPalette(index) {
				console.log(index);
			},
		},
	};
</script>
<style lang="scss" scoped>
	::v-deep .el-col {
		padding: 6px 0;
		height: 180px;
		text-align: center;
	}
	// .box-card .el-card__body {
	// 	padding: 0 0 20px 0;
	// }
	// .box-card span {
	// 	display: none;
	// 	color: white;
	// }
	// .box-card:hover span {
	// 	display: block;
	// }
	::v-deep .el-button.is-circle {
		padding: 5px;
		font-size: 5px;
	}
	::v-deep .el-palette__icons {
		display: none;
		margin-top: -24px;
		position: absolute;
		width: calc(100% - 20px);
		left: 0;
	}
	::v-deep .el-col:hover .el-palette__icons {
		display: inline-block;
	}
	.svg-inline--fa:hover {
		color: red;
	}
	.el-palette__info {
		text-align: left;
		&-name {
		}
		&-author,
		&-comment {
			float: right;
		}
	}
</style>