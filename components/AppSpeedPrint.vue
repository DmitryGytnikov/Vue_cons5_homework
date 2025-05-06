<!--<script setup lang="ts">-->
<script setup>
import "./assets/css/index.css"

const { locales, setLocale } = useI18n()

const fetchedText = ref("")
const fetchedTextАrray = ref([])

// type Letter = {
// 	letter: string
// 	state: "initial" | "correct" | "wrong"
// }

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

let x = () => {}

const runCountdownClock = () => {
	// countdown clock VVV

	// Set the date we're counting down to
	countDownInSecond.value = 60
	const countDownDate = new Date(
		Date.parse(new Date()) + countDownInSecond.value * 1000
	)

	// Update the count down every 1 second
	// const x = setInterval(function () {
	x = setInterval(function () {
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
			centerDialogVisible.value = true
			// document.getElementById("demo").innerHTML = "EXPIRED"
		}
	}, 1000)

	// countdown clock ^^^
}

const restartCountdownClock = () => {
	typedText.value = ""
	mistakesByInput.value = 0
	correctLetterByInput.value = 0
	inSecondsDisplay.value = 0

	fetchData()

	centerDialogVisible.value = false
}

const mistakesByInput = ref(0)
const correctLetterByInput = ref(0)

const comparisonInputedText = () => {
	for (let i = 0; i < typedText.value.length; i++) {
		if (fetchedText.value[i] === typedText.value[i]) {
			fetchedTextАrray.value[i].state = "correct"
			// console.log("добавлено correct")
			// console.log(i)
		} else {
			fetchedTextАrray.value[i].state = "wrong"
			// console.log("добавлено wrong")
			// console.log(i)
		}
	}

	for (let i = typedText.value.length; i < fetchedText.value.length; i++) {
		fetchedTextАrray.value[i].state = "initial"
	}

	correctLetterByInput.value = fetchedTextАrray.value.filter(
		item => item.state === "correct"
	).length

	mistakesByInput.value = fetchedTextАrray.value.filter(
		item => item.state === "wrong"
	).length

	if (typedText.value.length >= fetchedText.value.length) {
		console.log("привет")
		clearInterval(x)

		centerDialogVisible.value = true
	}
}

const centerDialogVisible = ref(false)
</script>

<template>
	<!-- <button @click="fetchData">Получить цитату</button>
	<p>{{ fetchedText }}</p>
	<p>{{ fetchedTextАrray }}</p>  -->

	<!-- <h1 class="text-3xl font-bold underline bg-red-300">Hello world!</h1> -->

	<div>
		<div class="h-full bg-white max-w-360 mx-auto my-0 px-2.5 sm:px-5">
			<div class="flex justify-end">
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
				<!-- text-center -->
				<div class="w-1/2 hidden justify-center sm:flex">
					<img
						class="h-[220px]"
						src="../assets/img/image.png.png"
						alt="picture"
					/>
				</div>
			</div>

			<!-- <button @click="fetchData()">Обновить текст</button>
			<br />
			<button @click="runCountdownClock()">Начать</button> -->

			<div
				class="select-none bg-white p-5 rounded-bl-[20px] rounded-br-[20px] shadow-[3px_3px_20px_rgba(50,50,50,0.25)] text-[16px] sm:text-[24px]"
			>
				<span
					v-for="(symbol, index) in fetchedTextАrray"
					:key="index"
					class="text-black"
					:class="{
						'fetched-text--correct': symbol.state === 'correct',
						'fetched-text--wrong': symbol.state === 'wrong',
					}"
				>
					{{ symbol.letter }}
				</span>
			</div>

			<!-- <p>Переменная typedText {{ typedText }}</p>
			<p>Переменная correctLetterByInput {{ correctLetterByInput }}</p>
			<p>Переменная mistakesByInput {{ mistakesByInput }}</p> -->

			<div
				class="bg-white p-5 rounded-[20px] shadow-[3px_3px_20px_rgba(50,50,50,0.25)] flex"
			>
				<div class="grow">
					<textarea
						class="resize-none outline-none w-full h-full text-[16px] pr-2.5 sm:text-[24px] sm:pr-5 placeholder:text-[#889cb1]"
						:placeholder="fetchedText"
						v-model="typedText"
						name="typedText"
						@keyup="comparisonInputedText()"
						@click="runCountdownClock()"
					/>
				</div>

				<div
					class="p-2 border-l-2 border-l-solid border-l-[#e5e7eb] w-[110px] sm:w-1/5"
				>
					<p
						class="text-[16px] leading-[24px] text-center pb-2 border-b-2 border-b-solid border-b-[#e5e7eb]"
					>
						{{ $t("speed.text_1") }}
						<span
							v-if="
								correctLetterByInput / (countDownInSecond - inSecondsDisplay)
							"
						>
							{{
								(
									correctLetterByInput /
									(countDownInSecond - inSecondsDisplay)
								).toFixed(2)
							}}
						</span>
						{{ $t("speed.text_2") }}
					</p>
					<p class="text-[16px] leading-[24px] text-center pt-2">
						{{ $t("time.text_1") }}
						<span>
							{{ inSecondsDisplay }}
						</span>
						{{ $t("time.text_2") }}
					</p>
				</div>
			</div>
		</div>

		<el-dialog
			v-model="centerDialogVisible"
			title="Результаты"
			width="70%"
			align-center
		>
			<template #header="{ titleClass }">
				<div class="my-header">
					<h2 class="modal__header text-[24px] font-bold" :class="titleClass">
						{{ $t("results.header") }}
					</h2>
				</div>
			</template>

			<p class="text-[18px] leading-[28px]">
				{{ $t("results.time_1") }}
				<span> {{ countDownInSecond - inSecondsDisplay }} </span>
				{{ $t("results.time_2") }}
			</p>
			<p class="text-[18px] leading-[28px]">
				{{ $t("results.mistakes") }}
				<span>
					{{ mistakesByInput }}
				</span>
			</p>
			<p class="text-[18px] leading-[28px]">
				{{ $t("results.speed_1") }}
				<span>
					{{
						(
							correctLetterByInput /
							(countDownInSecond - inSecondsDisplay)
						).toFixed(2)
					}}
				</span>
				{{ $t("results.speed_2") }}
			</p>
			<template #footer>
				<div class="dialog-footer">
					<el-button type="primary" @click="restartCountdownClock">
						{{ $t("results.button") }}
					</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped>
.fetched-text--correct {
	color: #29a04b;
}

.fetched-text--wrong {
	color: red;
	text-decoration: underline;
}

.modal__header {
	font-size: 24px;
	font-weight: 400;
}
</style>
