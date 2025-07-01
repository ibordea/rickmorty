import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
	state: () => ({
		favorites: JSON.parse(localStorage.getItem('favorites') || '[]') as any[],
	}),
	actions: {
		addFavorite(character: any) {
			if (!this.favorites.find((c) => c.id === character.id)) {
				this.favorites.push(character);
				this.save();
			}
		},
		removeFavorite(id: number) {
			this.favorites = this.favorites.filter((c) => c.id !== id);
			this.save();
			location.reload();
		},
		save() {
			localStorage.setItem('favorites', JSON.stringify(this.favorites));
		},
	},
});
