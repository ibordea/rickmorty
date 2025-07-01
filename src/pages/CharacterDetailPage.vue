<template>
	<div class="details-page">
		<NavBar />
		<div class="details">
			<div
				v-if="character"
				class="details-left"
			>
				<h2>{{ character.name }}</h2>
				<p>{{ character.species }} - {{ character.status }}</p>
				<p>Last known location: {{ character.location.name }}</p>
				<p>First seen in: {{ firstSeenEpisode?.name }}</p>
				<button @click="toggleFav">
					{{ isFav ? 'Remove from Favourites' : 'Add to Favourites' }}
				</button>
			</div>
			<img
				v-if="character"
				:src="character.image"
				:alt="character.name"
				class="details-right"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useFavoritesStore } from '../store/favoritesStore';
import NavBar from '../components/NavBar.vue';

const route = useRoute();
const character = ref<any>(null);
const firstSeenEpisode = ref<any>(null);
const favoritesStore = useFavoritesStore();

onMounted(async () => {
	const res = await axios.get(
		`https://rickandmortyapi.com/api/character/${route.params.id}`
	);
	character.value = res.data;
	const epRes = await axios.get(res.data.episode[0]);
	firstSeenEpisode.value = epRes.data;
});

const isFav = computed(() =>
	favoritesStore.favorites.some((c) => c.id === character.value?.id)
);

function toggleFav() {
	isFav.value
		? favoritesStore.removeFavorite(character.value.id)
		: favoritesStore.addFavorite(character.value);
}
</script>

<style scoped>
.details-page {
	padding: 2rem;
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 4rem;
}
.details {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
}
</style>
