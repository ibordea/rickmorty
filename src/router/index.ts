// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import CharactersPage from '../pages/CharactersPage.vue';
import CharacterDetailPage from '../pages/CharacterDetailPage.vue';
import FavoritesPage from '../pages/FavortiesPage.vue';

const routes: RouteRecordRaw[] = [
	{ path: '/', component: CharactersPage },
	{ path: '/character/:id', component: CharacterDetailPage },
	{ path: '/favorites', component: FavoritesPage },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
