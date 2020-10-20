<template>
	<el-form
		ref="form"
		:model="form"
		label-width="80px"
		:style="{
			padding: '0 35%',
		}"
	>
		<el-form-item label="用户">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="密码">
			<el-input v-model="form.password" show-password></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="onSubmit"> 登 录 </el-button>
			<router-link to="/" :style="{ 'margin-left': '10px' }">
				<el-button> 取 消 </el-button>
			</router-link>
		</el-form-item>
	</el-form>
</template>

<script>
	import crypto from "crypto";
	export default {
		data() {
			return {
				form: {
					name: "",
					password: "",
				},
			};
		},
		methods: {
			onSubmit() {
				this.$store.dispatch("userSignIn", {
					name: this.form.name,
					password: crypto
						.createHash("md5")
						.update(this.form.password)
						.digest("hex"),
				});
			},
		},
	};
</script>