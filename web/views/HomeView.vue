<template>
	<div id="home">
		<h1>This is a home page.</h1>
		<button @click="sendMessage('about')">Go to About Page</button>
	</div>
</template>

<script lang="ts">
	import { VSCodeMessageMixin } from "../../src/plugins/vue-mixins";
	import { mixins } from "vue-class-component";

	export default class Home extends mixins(VSCodeMessageMixin) {}
</script>

<style lang="scss">
	#home {
		text-align: center;
		margin-top: 60px;
	}

	button {
		width: auto;
		margin: 3rem;
	}
</style>
