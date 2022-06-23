<template>
	<div id="about">
		<h1>This is an about page.</h1>
		<button @click="sendMessage('home')">Go to Home Page</button>
	</div>
</template>

<script lang="ts">
	import { VSCodeMessageMixin } from "../../src/plugins/vue-mixins";
	import { mixins } from "vue-class-component";

	export default class Home extends mixins(VSCodeMessageMixin) {}
</script>

<style lang="scss">
	#about {
		text-align: center;
		margin-top: 60px;
	}

	button {
		width: auto;
		margin: 3rem;
	}
</style>
