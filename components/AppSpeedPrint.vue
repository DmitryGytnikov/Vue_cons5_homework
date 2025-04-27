<script setup>
// const fact = ref("")
// fetchedText
const fetchedText = ref("")
const fetchedTextАrray = ref([])

const text = ref("")

const typedText = ref("")

// state?: 'initial' | 'correct' | 'wrong'
const fallbackText = [
	{
		letter: "H",
		state: "correct",
	},
	{
		letter: "E",
		state: "correct",
	},
	{
		letter: "L",
		state: "correct",
	},
	{
		letter: "L",
		state: "correct",
	},
	{
		letter: "O",
		state: "correct",
	},
	{
		letter: " ",
		state: "initial",
	},
	{
		letter: "W",
		state: "wrong",
	},
	{
		letter: "O",
		state: "wrong",
	},
	{
		letter: "R",
		state: "wrong",
	},
	{
		letter: "L",
		state: "wrong",
	},
	{
		letter: "D",
		state: "wrong",
	},
	{
		letter: " ",
		state: "initial",
	},
	{
		letter: "Y",
		state: "initial",
	},
	{
		letter: "e",
		state: "initial",
	},
	{
		letter: "s",
		state: "initial",
	},
]

const fetchData = () => {
	fetch("https://api.api-ninjas.com/v1/quotes", {
		method: "GET",
		headers: {
			"X-Api-Key": "MaJRZbQ2E6XJoWM9vfJa0g==iwIoVBVzxFPkB5c2",
		},
	})
		.then(response => {
			response.json().then(data => {
				const resultMidterm1 = [...data[0].quote] // ['h', 'e', 'l', 'l', 'o'];
				// console.log(resultMidterm1)

				const resultMidterm2 = resultMidterm1.map(function (elem) {
					return {
						letter: elem,
						state: "initial",
					}
				}) // преобразование в массив обьектов
				// console.log(resultMidterm2)

				fetchedTextАrray.value = resultMidterm2
				fetchedText.value = data[0].quote
			})
		})
		.catch(err => {
			console.error(err)
		})
}

const getText = () => {
	if (!fetchedText.value) {
		fetchedTextАrray.value = fallbackText

		const resultMidterm3 = fallbackText.map(function (elem) {
			return elem.letter
		}) // ['h', 'e', 'l', 'l', 'o'];
		// console.log(resultMidterm3)

		const resultMidterm4 = resultMidterm3.join("") // преоразование в строку
		// console.log(resultMidterm4)

		fetchedText.value = resultMidterm4
	}
}

getText()
</script>

<template>
	<h1>Рандомная цитата</h1>
	<button @click="fetchData">Click Me!</button>
	<p>{{ fetchedText }}</p>
	<p>{{ fetchedTextАrray }}</p>

	<div>
		<div class="container">
			<h1>SpeedPrint - помощник вашей скорости печати</h1>
			<ul>
				<li>Улучшите скорость печати текста</li>
				<li>Уменьшите количество ошибок</li>
				<li>Испытайте свои навыки</li>
			</ul>

			<div class="fetched">
				<span
					v-for="(symbol, index) in fetchedTextАrray"
					:key="index"
					class="fetched-text--initial"
					:class="{
						'fetched-text--correct': symbol.state === 'correct',
						'fetched-text--wrong': symbol.state === 'wrong',
					}"
				>
					{{ symbol.letter }}
				</span>
			</div>
			<p>Переменная typedText {{ typedText }}</p>
			<div class="text-wr">
				<div class="typed">
					<textarea
						:placeholder="fetchedText"
						v-model="typedText"
						name="typedText"
					/>
				</div>

				<div class="info">
					<p class="info__speed">
						Скорость печати:
						<span> 10</span>
						знаков/сек
					</p>
					<p class="info__time">
						Оставшееся время:
						<span> 0</span>
						c
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.container {
	/* background-color: blue; */
}

/* textarea {
	background-color: transparent;
} */

textarea::placeholder {
	font-style: normal;
	font-weight: 400;
	color: black;
}
</style>
