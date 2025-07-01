<template>
	<div class="characters-page">
		<NavBar />
		<div class="filters">
			<div>
				<button
					@click="filterSpecies('All')"
					:class="{ active: speciesFilter === 'All' }"
				>
					All
				</button>
				<button
					@click="filterSpecies('Human')"
					:class="{ active: speciesFilter === 'Human' }"
				>
					Human
				</button>
				<button
					@click="filterSpecies('Alien')"
					:class="{ active: speciesFilter === 'Alien' }"
				>
					Alien
				</button>
			</div>

			<SearchBar @search="onSearch" />
		</div>

		<div class="grid">
			<CharacterCard
				v-for="char in filteredCharacters"
				:key="char.id"
				:character="char"
			/>
		</div>

		<div class="pagination">
			<button
				@click="prevPage"
				:disabled="charactersStore.currentPage === 1"
			>
				Prev
			</button>
			<span
				>Page {{ charactersStore.currentPage }} /
				{{ charactersStore.pageCount }}</span
			>
			<button
				@click="nextPage"
				:disabled="charactersStore.currentPage === charactersStore.pageCount"
			>
				Next
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCharactersStore } from '../store/charactersStore';
import CharacterCard from '../components/CharacterCard.vue';
import SearchBar from '../components/SearchBar.vue';
import NavBar from '../components/NavBar.vue';

const charactersStore = useCharactersStore();
const speciesFilter = ref('All');
const searchQuery = ref('');

onMounted(() => {
	charactersStore.fetchCharacters();
});

const filteredCharacters = computed(() => {
	let filtered = charactersStore.characters;

	if (speciesFilter.value !== 'All') {
		filtered = filtered.filter((c) => c.species === speciesFilter.value);
	}

	if (searchQuery.value.trim()) {
		filtered = filtered.filter((c) =>
			c.name.toLowerCase().includes(searchQuery.value.toLowerCase())
		);
	}

	return filtered;
});

function filterSpecies(species: string) {
	speciesFilter.value = species;
}

function onSearch(query: string) {
	searchQuery.value = query;
}

function nextPage() {
	if (charactersStore.currentPage < charactersStore.pageCount) {
		charactersStore.setPage(charactersStore.currentPage + 1);
	}
}

function prevPage() {
	if (charactersStore.currentPage > 1) {
		charactersStore.setPage(charactersStore.currentPage - 1);
	}
}
</script>

<style scoped>
.characters-page {
	padding: 2rem;
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.filters {
	display: flex;
	gap: 2rem;
	align-items: center;
	margin-bottom: 1.5rem;
	flex-wrap: wrap;
}

.filters a {
	text-decoration: none;
	color: #ef4444;
	font-weight: bold;
	font-size: 1rem;
}

.filters button {
	background-color: #e2e8f0;
	color: #333;
	border-radius: 8px;
	padding: 0.5rem 1rem;
	font-weight: 600;
	transition: background-color 0.2s;
}

.filters button:hover {
	background-color: #cbd5e1;
}

.filters button.active {
	background-color: black;
	color: white;
}

.grid {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 1rem;
}

.pagination {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	margin-top: 2rem;
}

.pagination button {
	background-color: black;
	color: white;
	border-radius: 8px;
	padding: 0.5rem 1rem;
	font-weight: bold;
	border: none;
	transition: background-color 0.2s;
}

.pagination button:disabled {
	background-color: #94a3b8;
	cursor: not-allowed;
}
</style>
