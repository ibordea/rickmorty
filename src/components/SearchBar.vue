<template>
	<div>
		<input
			v-model="search"
			@input="$emit('search', search)"
			placeholder="Search by name..."
		/>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const search = ref('');
</script>

<style scoped>
input {
	padding: 0.5rem 1rem;
	border: 1px solid #ddd;
	border-radius: 8px;
	font-size: 1rem;
	margin-bottom: 1rem;
	width: 100%;
	max-width: 400px;
	margin: 0;
}
</style>
