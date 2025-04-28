<script setup>
import "./assets/css/index.css"

const fetchedText = ref("")
const fetchedTextАrray = ref([])

const typedText = ref("")

// state?: 'initial' | 'correct' | 'wrong'
const fallbackTextАrray = [
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

const isModalActive = ref(false)

const fetchData = () => {
	fetch("https://api.api-ninjas.com/v1/quotes", {
		method: "GET",
		headers: {
			"X-Api-Key": "MaJRZbQ2E6XJoWM9vfJa0g==iwIoVBVzxFPkB5c2",
		},
	})
		.then(response => {
			response.json().then(data => {
				const resultMidterm1 = [...data[0].quote] // ['h', 'e', 'l', 'l', 'o'] преобразование в массив посимвольно
				// console.log(resultMidterm1)

				const resultMidterm2 = resultMidterm1.map(function (elem) {
					return {
						letter: elem,
						state: "initial",
					}
				}) // преобразование в массив обьектов посимвольно
				// console.log(resultMidterm2)

				fetchedTextАrray.value = resultMidterm2
				fetchedText.value = data[0].quote
				typedText.value = ""
			})
		})
		.catch(err => {
			console.error(err)
		})
}

const getText = () => {
	if (!fetchedText.value) {
		fetchedTextАrray.value = fallbackTextАrray

		const resultMidterm3 = fallbackTextАrray.map(function (elem) {
			return elem.letter
		}) // ['h', 'e', 'l', 'l', 'o'];
		// console.log(resultMidterm3)

		const resultMidterm4 = resultMidterm3.join("") // преоразование в строку
		// console.log(resultMidterm4)

		fetchedText.value = resultMidterm4
	}
}

getText()

let inSecondsDisplay = ref(0)
let countDownInSecond = ref(0)

const runCountdownClock = () => {
	typedText.value = ""
	mistakesByInput.value = 0
	correctLetterByInput.value = 0

	// countdown clock VVV

	// Set the date we're counting down to
	countDownInSecond.value = 10
	const countDownDate = new Date(
		Date.parse(new Date()) + countDownInSecond.value * 1000
	)

	// Update the count down every 1 second
	const x = setInterval(function () {
		// Get today's date and time
		const now = new Date().getTime()

		// Find the distance between now and the count down date
		const distance = countDownDate - now

		// Time calculations for days, hours, minutes and seconds
		// const days = Math.floor(distance / (1000 * 60 * 60 * 24))
		// const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
		// const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
		const seconds = Math.floor((distance % (1000 * 60)) / 1000)
		// console.log(seconds)

		// Output the result in an element
		inSecondsDisplay.value = seconds

		// with id="demo"
		// document.getElementById("demo").innerHTML =
		// 	days + "d " + hours + "h " + minutes + "m " + seconds + "s "

		// If the count down is over, write some text
		if (distance < 0) {
			clearInterval(x)
			inSecondsDisplay.value = 0
			isModalActive.value = true
			// document.getElementById("demo").innerHTML = "EXPIRED"
		}
	}, 1000)

	// countdown clock ^^^
}

const restartCountdownClock = () => {
	isModalActive.value = false
	fetchData()
	typedText.value = ""
	mistakesByInput.value = 0
	correctLetterByInput.value = 0
}

const mistakesByInput = ref(0)
const correctLetterByInput = ref(0)

const comparisonInputedText = () => {
	for (let i = 0; i < typedText.value.length; i++) {
		if (fetchedText.value[i] === typedText.value[i]) {
			fetchedTextАrray.value[i].state = "correct"
			console.log("добавлено correct")
			console.log(i)

			// correctLetterByInput.value += 1
			// console.log("Корректно введено " + correctLetterByInput.value)
		} else {
			fetchedTextАrray.value[i].state = "wrong"
			console.log("добавлено wrong")
			console.log(i)

			// mistakesByInput.value += 1
			// console.log("Ошибок " + mistakesByInput.value)
		}
	}
}
</script>

<template>
	<!-- <h1>Рандомная цитата</h1>
	<button @click="fetchData">Получить цитату</button>
	<p>{{ fetchedText }}</p>
	<p>{{ fetchedTextАrray }}</p> -->

	<div>
		<div class="wrapper">
			<div class="container">
				<h1>SpeedPrint - помощник вашей скорости печати</h1>
				<ul>
					<li>Улучшите скорость печати текста</li>
					<li>Уменьшите количество ошибок</li>
					<li>Испытайте свои навыки</li>
				</ul>

				<button @click="fetchData()">Обновить текст</button>
				<br />
				<button @click="runCountdownClock()">Начать</button>

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
				<!-- <p>Переменная typedText {{ typedText }}</p> -->
				<div class="text-wr">
					<div class="typed">
						<textarea
							:placeholder="fetchedText"
							v-model="typedText"
							name="typedText"
							@keyup="comparisonInputedText()"
						/>
					</div>

					<div class="info">
						<p class="info__speed">
							Скорость печати:
							<span>
								<!-- {{ correctLetterByInput / countDownInSecond }} -->
								Не готово
							</span>
							знаков/сек
						</p>
						<p class="info__time">
							Оставшееся время:
							<span>
								{{ inSecondsDisplay }}
							</span>
							c
						</p>
					</div>
				</div>
			</div>

			<div
				class="modal-wr"
				:class="{
					'modal-wr--visible': isModalActive,
				}"
			>
				<div class="modal">
					<h2>Результаты</h2>
					<p class="modal__time">
						Времени потрачено:
						<span> {{ countDownInSecond }} </span>
						cek
					</p>
					<p class="modal__mistake">
						Совершено ошибок:
						<span>
							<!-- {{ mistakesByInput }}  -->
							Не готово
						</span>
					</p>
					<p class="modal__speed">
						Скорость печати:
						<span>
							<!-- {{ correctLetterByInput }}  -->
							Не готово
						</span>
						знаков/сек
					</p>
					<button @click="restartCountdownClock">Попробовать снова</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
/* .container { */
/* background-color: blue; */
/* } */

textarea {
	/* background-color: transparent; */
	border: 1px solid black;
	width: 500px;
	height: 50px;
}

textarea::placeholder {
	font-style: normal;
	font-weight: 400;
	color: black;
}

.wrapper {
	position: relative;
}

.modal-wr {
	display: none;

	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;

	justify-content: center;
	align-items: center;
	background: grey;
}

.modal-wr--visible {
	display: flex;
}

.fetched-text--initial {
	color: black;
}

.fetched-text--correct {
	color: #29a04b;
}

.fetched-text--wrong {
	color: red;
	text-decoration: underline;
}

/* Удалить стили ниже VVV */

ul {
	margin-bottom: 20px;
}

.fetched {
	margin-top: 20px;
	margin-bottom: 50px;
}

.container button {
	cursor: pointer;
	padding: 10px;
	border: 1px solid black;
	border-radius: 5px;
}

.text-wr {
	display: flex;
	gap: 20px;
}

.wrapper {
	padding: 30px;
}
</style>
