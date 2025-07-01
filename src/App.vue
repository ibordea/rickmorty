<template>
	<router-view />
</template>

<script setup lang="ts"></script>

<style>
body {
	margin: 0;
	font-family: 'Segoe UI', sans-serif;
	background-color: #f2f2f2;
	color: #333;
}

h1,
h2,
h3 {
	margin: 0.5rem 0;
}

button {
	cursor: pointer;
	border: none;
	background-color: black;
	color: white;
	padding: 0.5rem 1rem;
	border-radius: 8px;
	font-weight: bold;
	transition: background-color 0.2s;
}

button:hover {
	background-color: #0ea5e9;
}
</style>
