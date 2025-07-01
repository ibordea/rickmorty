import { defineStore } from 'pinia';
import axios from 'axios';

interface Character {
	id: number;
	name: string;
	status: string;
	species: string;
	type: string;
	gender: string;
	origin: { name: string; url: string };
	location: { name: string; url: string };
	image: string;
	episode: string[];
	url: string;
	created: string;
}

interface ApiResponse {
	info: {
		count: number;
		pages: number;
		next: string | null;
		prev: string | null;
	};
	results: Character[];
}

export const useCharactersStore = defineStore('characters', {
	state: () => ({
		characters: [] as Character[],
		pageCount: 0,
		currentPage: 1,
		loading: false,
		error: '' as string | null,
	}),
	actions: {
		async fetchCharacters(page = 1) {
			this.loading = true;
			this.error = null;
			try {
				const res = await axios.get<ApiResponse>(
					`https://rickandmortyapi.com/api/character/?page=${page}`
				);
				this.characters = res.data.results;
				this.pageCount = res.data.info.pages;
				this.currentPage = page;
			} catch (err: any) {
				this.error = err.message || 'Failed to fetch characters';
			} finally {
				this.loading = false;
			}
		},

		async setPage(page: number) {
			if (page < 1 || (this.pageCount && page > this.pageCount)) {
				return;
			}
			await this.fetchCharacters(page);
		},
	},
});
