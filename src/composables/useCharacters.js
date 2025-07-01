import { ref, computed } from 'vue';
import axios from 'axios';

export function useCharacters() {
	const characters = ref([]);
	const currentPage = ref(1);
	const totalPages = ref(0);
	const filters = ref({
		species: '',
		name: '',
	});

	const fetchCharacters = async () => {
		const { species, name } = filters.value;
		const response = await axios.get(
			'https://rickandmortyapi.com/api/character',
			{
				params: {
					page: currentPage.value,
					species,
					name,
				},
			}
		);
		characters.value = response.data.results;
		totalPages.value = response.data.info.pages;
	};

	return {
		characters,
		currentPage,
		totalPages,
		filters,
		fetchCharacters,
	};
}
