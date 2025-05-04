<script setup>
import "./assets/css/index.css"

const { locales, setLocale } = useI18n()

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

// const isModalActive = ref(false)

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
		}) // ['h', 'e', 'l', 'l', 'o']; преобразование в массив посимвольно
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
	countDownInSecond.value = 3
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
			// isModalActive.value = true
			centerDialogVisible.value = true
			// document.getElementById("demo").innerHTML = "EXPIRED"
		}
	}, 1000)

	// countdown clock ^^^
}

const restartCountdownClock = () => {
	// isModalActive.value = false
	centerDialogVisible.value = false

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

const centerDialogVisible = ref(false)
</script>

<template>
	<h1>Рандомная цитата</h1>
	<button @click="fetchData">Получить цитату</button>
	<p>{{ fetchedText }}</p>
	<p>{{ fetchedTextАrray }}</p>

	<div>
		<div class="container">
			<div class="intern">
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

				<!-- <button
			v-for="locale in locales"
			@click="setLocale(locale.code)"
			:key="locale.name"
		>
			{{ locale.name }}
		</button> -->

				<!-- <div>{{ $t("header") }}</div>
		<div>{{ $t("advantages.advantage_1") }}</div>
		<div>{{ $t("advantages.advantage_2") }}</div>
		<div>{{ $t("advantages.advantage_3") }}</div>
		<div>{{ $t("speed.text_1") }}</div>
		<div>{{ $t("speed.text_2") }}</div>
		<div>{{ $t("time.text_1") }}</div>
		<div>{{ $t("time.text_2") }}</div>
		<div>{{ $t("results.header") }}</div>
		<div>{{ $t("results.time_1") }}</div>
		<div>{{ $t("results.time_2") }}</div>
		<div>{{ $t("results.mistakes") }}</div>
		<div>{{ $t("results.speed_1") }}</div>
		<div>{{ $t("results.speed_2") }}</div>
		<div>{{ $t("results.button") }}</div>-->
			</div>

			<div class="header-wr">
				<div class="header__text">
					<h1>{{ $t("header") }}</h1>
					<ul>
						<li>{{ $t("advantages.advantage_1") }}</li>
						<li>{{ $t("advantages.advantage_2") }}</li>
						<li>{{ $t("advantages.advantage_3") }}</li>
					</ul>
				</div>
				<div class="header__img">
					<img src="../assets/img/image.png.png" alt="picture" />
				</div>
			</div>

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
						{{ $t("speed.text_1") }}
						<span>
							<!-- {{ correctLetterByInput / countDownInSecond }} -->
							Не готово
						</span>
						{{ $t("speed.text_2") }}
					</p>
					<p class="info__time">
						{{ $t("time.text_1") }}
						<span>
							{{ inSecondsDisplay }}
						</span>
						{{ $t("time.text_2") }}
					</p>
				</div>
			</div>

			<!-- <div
				class="modal-wr"
				:class="{
					'modal-wr--visible': isModalActive,
				}"
			>
				<div class="modal">
					<h2>{{ $t("results.header") }}</h2>
					<p class="modal__time">
						{{ $t("results.time_1") }}
						<span> {{ countDownInSecond }} </span>
						{{ $t("results.time_2") }}
					</p>
					<p class="modal__mistake">
						{{ $t("results.mistakes") }}
						<span>
							{{ mistakesByInput }}  
							Не готово
						</span>
					</p>
					<p class="modal__speed">
						{{ $t("results.speed_1") }}
						<span>
							 {{ correctLetterByInput }}  
							Не готово
						</span>
						{{ $t("results.speed_2") }}
					</p>
					<button @click="restartCountdownClock">
						{{ $t("results.button") }}
					</button>
				</div>
			</div> -->
		</div>

		<!-- <el-button plain @click="centerDialogVisible = true">
			Click to open the Dialog
		</el-button> -->

		<el-dialog
			v-model="centerDialogVisible"
			title="Результаты"
			width="70%"
			align-center
		>
			<template #header="{ titleClass }">
				<div class="my-header">
					<h2 class="modal__header" :class="titleClass">
						{{ $t("results.header") }}
					</h2>
				</div>
			</template>

			<!-- <h2>{{ $t("results.header") }}</h2> -->
			<p class="modal__time">
				{{ $t("results.time_1") }}
				<span> {{ countDownInSecond }} </span>
				{{ $t("results.time_2") }}
			</p>
			<p class="modal__mistake">
				{{ $t("results.mistakes") }}
				<span>
					<!-- {{ mistakesByInput }}  -->
					Не готово
				</span>
			</p>
			<p class="modal__speed">
				{{ $t("results.speed_1") }}
				<span>
					<!-- {{ correctLetterByInput }}  -->
					Не готово
				</span>
				{{ $t("results.speed_2") }}
			</p>
			<template #footer>
				<div class="dialog-footer">
					<!-- <el-button type="primary" @click="centerDialogVisible = false"> -->
					<el-button type="primary" @click="restartCountdownClock">
						{{ $t("results.button") }}
					</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped>
/* .container {
	height: 100%;
	background-color: white;
} */

.container {
	/* background-color: #ebecef; */

	height: 100%;
	background-color: white;

	max-width: 1440px;
	margin: 0 auto;
	padding: 0 20px;

	@media (max-width: 640px) {
		padding: 0 10px;
	}
}

.intern {
	display: flex;
	justify-content: end;
}

.header-wr {
	padding-top: 64px;
	padding-bottom: 96px;

	display: flex;

	@media (max-width: 640px) {
		padding-top: 20px;
		padding-bottom: 20px;
	}
}

.header__text {
	width: 50%;

	@media (max-width: 640px) {
		width: 100%;
	}
}

.header__text h1 {
	margin-bottom: 24px;
	font-size: 36px;
	line-height: 40px;
	font-weight: 700;

	@media (max-width: 640px) {
		font-size: 32px;
	}
}

.header__text ul {
	list-style: none;
}

.header__text li {
	padding-left: 20px;
	margin-bottom: 12px;
	position: relative;
}

.header__text li::before {
	content: "";
	position: absolute;
	width: 8px;
	height: 8px;
	background: #0284c7;
	border-radius: 50%;
	top: 7px;
	left: 6px;
}

.header__img {
	width: 50%;
	text-align: center;

	@media (max-width: 640px) {
		display: none;
	}
}

.header__img img {
	height: 220px;
}

.fetched {
	user-select: none;

	background-color: white;
	/* background-color: greenyellow; */
	padding: 20px;
	/* border-radius: 20px; */
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
	/* border: 1px solid grey; */

	box-shadow: 3px 3px 20px rgba(50, 50, 50, 0.25);

	font-size: 24px;

	@media (max-width: 640px) {
		font-size: 16px;
	}
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

.text-wr {
	background-color: white;
	/* background-color: greenyellow; */
	padding: 20px;
	border-radius: 20px;
	/* border: 1px solid grey; */
	box-shadow: 3px 3px 20px rgba(50, 50, 50, 0.25);

	display: flex;
}

.typed {
	flex-grow: 1;
}

.typed textarea {
	/* background-color: transparent; 
	border: 1px solid black;
	width: 500px;
	height: 50px; */
	resize: none;
	outline: none;
	width: 100%;
	height: 100%;

	font: inherit;
	font-size: 24px;
	padding-right: 20px;

	@media (max-width: 640px) {
		font-size: 16px;
		padding-right: 10px;
	}
}

.typed textarea::placeholder {
	/* font-style: normal;
	font-weight: 400;
	color: black; */
	color: #889cb1;
}

.info {
	padding: 8px;
	border-left: 2px solid #e5e7eb;

	width: 20%;

	@media (max-width: 640px) {
		width: 110px;
	}
}

.info__speed {
	font-size: 16px;
	line-height: 24px;
	text-align: center;
	padding-bottom: 8px;

	border-bottom: 2px solid #e5e7eb;
}

.info__speed span {
}

.info__time {
	font-size: 16px;
	line-height: 24px;
	text-align: center;

	padding-top: 8px;
}

.info__time span {
}

/* .modal-wr {
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
} */

.modal__header {
	/* color: red; */
	/* padding: 20px 20px 10px 20px; */
	font-size: 24px;
	font-weight: 400;
}

.modal__time {
	font-size: 18px;
	line-height: 28px;
}

.modal__mistake {
	font-size: 18px;
	line-height: 28px;
}

.modal__speed {
	font-size: 18px;
	line-height: 28px;
}
</style>
