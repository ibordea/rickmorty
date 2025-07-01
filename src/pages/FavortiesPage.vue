<template>
	<div class="favorites">
		<NavBar />
		<div>
			<h2>Favourites</h2>
			<div
				v-if="favorites.length"
				class="favorites-cards"
			>
				<CharacterCard
					v-for="char in favorites"
					:key="char.id"
					:character="char"
				/>
			</div>
			<div v-else>
				<p>No cards</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useFavoritesStore } from '../store/favoritesStore';
import CharacterCard from '../components/CharacterCard.vue';
import NavBar from '../components/NavBar.vue';

const favoritesStore = useFavoritesStore();
const favorites = favoritesStore.favorites;
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

.favorites-cards {
	display: flex;
	flex-wrap: wrap;
}
</style>
