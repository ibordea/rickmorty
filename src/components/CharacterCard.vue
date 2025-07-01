<template>
	<div class="card">
		<div @click="goToCharacterDetails(character.id)">
			<img
				:src="character.image"
				:alt="character.name"
			/>
			<h3>{{ character.name }}</h3>
			<p>{{ character.species }} - {{ character.status }}</p>
		</div>
		<button @click="toggleFav">
			{{ isFav ? 'Remove from Favourites' : 'Add to Favourites' }}
		</button>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useFavoritesStore } from '../store/favoritesStore';
import router from '../router';

const props = defineProps<{ character: any }>();
const favoritesStore = useFavoritesStore();

const isFav = computed(() =>
	favoritesStore.favorites.some((c) => c.id === props.character.id)
);

function toggleFav() {
	isFav.value
		? favoritesStore.removeFavorite(props.character.id)
		: favoritesStore.addFavorite(props.character);
}

function goToCharacterDetails(id: number) {
	router.push(`/character/${id}`);
}
</script>

<style scoped>
.card {
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
	padding: 1rem;
	border-radius: 16px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s ease;
	width: 220px;
	margin: 1rem;
	text-align: center;
	gap: 1rem;
}

.card:hover {
	transform: translateY(-5px);
}

.card img {
	width: 120px;
	height: 120px;
	border-radius: 50%;
	margin-bottom: 0.5rem;
}

.card h3 {
	margin: 0.5rem 0 0.2rem;
	font-size: 1.2rem;
}

.card p {
	margin: 0.2rem 0;
	color: #555;
}
</style>
