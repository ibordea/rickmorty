<template>
	<div class="favorites-nav">
		<RouterLink to="/">Characters</RouterLink>
		<RouterLink to="/favorites">Favorites</RouterLink>
		<div class="favorites-heart">
			<RouterLink to="/favorites"
				>❤️ ({{ favoritesStore.favorites.length }})</RouterLink
			>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useFavoritesStore } from '../store/favoritesStore';

let favoritesStore = useFavoritesStore();
</script>

<style scoped>
.favorites {
	padding: 2rem;
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 3rem;
}
.favorites-nav {
	display: flex;
	align-items: center;
	gap: 2rem;
}

.favorites-nav a {
	text-decoration: none;
	color: black;
	font-weight: 600;
	font-size: 0.9rem;
}

.favorites-heart {
	margin-left: auto;
}
</style>
