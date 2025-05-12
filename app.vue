<script setup>
import "./assets/css/index.css"
</script>

<template>
	<div class="h-full">
		<div
			class="h-full flex flex-col bg-white max-w-360 mx-auto my-0 px-2.5 sm:px-5"
		>
			<app-header />
			<app-main-content />
		</div>
	</div>
</template>

<!-- Отключен SSR в Nuxt (для работы setInterval в AppSpeedPrint.vue) -->
<!-- // nuxt.config.ts
export default defineNuxtConfig({
  ssr: false
}) -->
