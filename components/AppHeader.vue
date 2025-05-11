<script setup>
const { locales, setLocale } = useI18n()
</script>
<template>
	<!-- <button @click="fetchData()">Обновить текст</button>
			<br />
			<button @click="runCountdownClock()">Начать</button> -->
	<!-- <p>Переменная typedText {{ typedText }}</p>
			<p>Переменная correctLetterByInput {{ correctLetterByInput }}</p>
			<p>Переменная mistakesByInput {{ mistakesByInput }}</p> -->
	<div class="basis-1/3">
		<div class="intern flex justify-end">
			<el-button
				v-for="locale in locales"
				@click="setLocale(locale.code)"
				:key="locale.name"
				plain
				type="primary"
				style="width: 70px; border: 2px solid #409eff; border-radius: 5px"
			>
				{{ locale.name }}
			</el-button>
		</div>

		<div class="flex pt-5 pb-5 sm:pt-16 sm:pb-24">
			<div class="w-full sm:w-1/2">
				<h1 class="mb-6 text-[32px] leading-[40px] font-bold sm:text-[36px]">
					{{ $t("header") }}
				</h1>
				<ul class="list-image-none">
					<li class="my-text">
						{{ $t("advantages.advantage_1") }}
					</li>
					<li class="my-text">
						{{ $t("advantages.advantage_2") }}
					</li>
					<li class="my-text">
						{{ $t("advantages.advantage_3") }}
					</li>
				</ul>
			</div>
			<div class="w-1/2 hidden justify-center sm:flex">
				<img
					class="h-[220px]"
					src="../assets/img/image.png.png"
					alt="picture"
				/>
			</div>
		</div>
	</div>
</template>
