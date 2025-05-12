<script setup>
const { locales, setLocale } = useI18n()

// type Letter = {
// 	letter: string
// 	state: "initial" | "correct" | "wrong"
// }

// state?: 'initial' | 'correct' | 'wrong'
const fallbackTextАrray = [
	{
		letter: "H",
		state: "initial",
	},
	{
		letter: "E",
		state: "initial",
	},
	{
		letter: "L",
		state: "initial",
	},
	{
		letter: "L",
		state: "initial",
	},
	{
		letter: "O",
		state: "initial",
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

const fetchedTextАrray = ref([...fallbackTextАrray])
const fetchedText = ref("")

const typedText = ref("")

const getTextWhenInit = () => {
	if (!fetchedText.value) {
		const resultMidterm3 = fetchedTextАrray.value.map(function (elem) {
			return elem.letter
		}) // ['h', 'e', 'l', 'l', 'o']; преобразование в массив посимвольно
		// console.log(resultMidterm3)

		const resultMidterm4 = resultMidterm3.join("") // преоразование в строку
		// console.log(resultMidterm4)

		fetchedText.value = resultMidterm4
	}
}
getTextWhenInit()

const asyncFetchData = async () => {
	try {
		const options = {
			method: "GET",
			headers: {
				"X-Api-Key": "MaJRZbQ2E6XJoWM9vfJa0g==iwIoVBVzxFPkB5c2",
			},
		}

		// throw new Error("ПРОИЗОШЛА ОШИБКА В КОДЕ ПРИ ПОЛУЧЕНИИ ТЕКСТА С БЭКА")

		const rawData = await fetch("https://api.api-ninjas.com/v1/quotes", options)

		const data = await rawData.json()
		// console.log("data", data)

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
	} catch (e) {
		console.log(e)
	} finally {
		// console.log("Я выполнюсь всегда!")
	}
}

let inSecondsDisplay = ref(0)
let countDownInSecond = ref(0)

let timerId = () => {}

let runCountdownClock = () => {}

const secInMin = 60

runCountdownClock = () => {
	if (inSecondsDisplay.value < 1) {
		comparisonInputedText()

		// Set the date we're counting down to
		countDownInSecond.value = 60
		const milisecInSec = 1000

		const countDownDate = new Date(
			Date.parse(new Date()) + countDownInSecond.value * milisecInSec
		)

		// Update the count down every 1 second
		timerId = setInterval(function () {
			// Get today's date and time
			const now = new Date().getTime()

			// Find the distance between now and the count down date
			const distance = countDownDate - now

			// Time calculations for days, hours, minutes and seconds
			// const days = Math.floor(distance / (1000 * 60 * 60 * 24))
			// const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
			// const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
			const seconds = Math.floor(
				(distance % (milisecInSec * secInMin)) / milisecInSec
			)

			// Output the result in an element
			inSecondsDisplay.value = seconds

			// If the count down is over, write some text
			if (distance < 0) {
				clearInterval(timerId)
				inSecondsDisplay.value = 0
				centerDialogVisible.value = true
			}
		}, milisecInSec)
	}
}

const restartCountdownClock = () => {
	typedText.value = ""
	inSecondsDisplay.value = 0

	asyncFetchData()

	centerDialogVisible.value = false
}

const mistakesByInput = computed(() => {
	return fetchedTextАrray.value.reduce((accumulator, letter) => {
		if (letter.state === "wrong") {
			return (accumulator += 1)
		}

		return accumulator
	}, 0)
})

const correctLetterByInput = computed(() => {
	return fetchedTextАrray.value.reduce((accumulator, letter) => {
		if (letter.state === "correct") {
			return (accumulator += 1)
		}

		return accumulator
	}, 0)
})

const comparisonInputedText = () => {
	for (let i = 0; i < typedText.value.length; i++) {
		if (fetchedText.value[i] === typedText.value[i]) {
			fetchedTextАrray.value[i].state = "correct"
		} else {
			fetchedTextАrray.value[i].state = "wrong"
		}
	}

	for (let i = typedText.value.length; i < fetchedText.value.length; i++) {
		fetchedTextАrray.value[i].state = "initial"
	}

	if (typedText.value.length >= fetchedText.value.length) {
		clearInterval(timerId)

		centerDialogVisible.value = true
	}
}

const centerDialogVisible = ref(false)

const fetchedTextLength = computed(() => fetchedText.value.length)

const typedTextLength = computed(() => typedText.value.length)

const timeElapsed = computed(
	() => countDownInSecond.value - inSecondsDisplay.value
)

const charsPerMinute = computed(() =>
	((secInMin * typedTextLength.value) / timeElapsed.value).toFixed(0)
)
</script>

<template>
	<div class="basis-2/3 flex flex-col justify-evenly h-full">
		<div
			class="basis-1/4 select-none bg-white p-5 rounded-bl-[20px] rounded-br-[20px] shadow-[3px_3px_20px_rgba(50,50,50,0.25)] text-[16px] sm:text-[24px]"
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

		<div
			class="basis-1/2 bg-white p-5 rounded-[20px] shadow-[3px_3px_20px_rgba(50,50,50,0.25)] flex"
		>
			<div class="grow">
				<textarea
					class="resize-none outline-none w-full h-full text-[16px] pr-2.5 sm:text-[24px] sm:pr-5 placeholder:text-[#889cb1]"
					:placeholder="fetchedText"
					:maxlength="fetchedTextLength"
					v-model="typedText"
					name="typedText"
					@input="comparisonInputedText()"
					@click="runCountdownClock()"
				/>
			</div>

			<div
				class="flex flex-col p-2 border-l-2 border-l-solid border-l-[#e5e7eb] w-[110px] sm:w-1/5"
			>
				<div
					class="basis-1/2 flex justify-center items-center text-[16px] leading-[24px] border-b-2 border-b-solid border-b-[#e5e7eb] pb-2"
				>
					<div class="text-center">
						{{ $t("speed.speedPrint") }}
						<span v-if="typedTextLength">
							{{ charsPerMinute }}
						</span>
						{{ $t("speed.signsMin") }}
					</div>
				</div>
				<div
					class="basis-1/2 flex justify-center items-center text-[16px] leading-[24px] pt-2"
				>
					<div text-center>
						{{ $t("time.remainingTime") }}
						<span>
							{{ inSecondsDisplay }}
						</span>
						{{ $t("time.sec") }}
					</div>
				</div>
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
					{{ $t("results.results") }}
				</h2>
			</div>
		</template>

		<p class="text-[18px] leading-[28px]">
			{{ $t("results.timeSpent") }}
			<span> {{ timeElapsed }} </span>
			{{ $t("results.sec") }}
		</p>
		<p class="text-[18px] leading-[28px]">
			{{ $t("results.mistakes") }}
			<span>
				{{ mistakesByInput }}
			</span>
		</p>
		<p class="text-[18px] leading-[28px]">
			{{ $t("results.speedPrint") }}
			<span>
				{{ charsPerMinute }}
			</span>
			{{ $t("results.signsMin") }}
		</p>
		<template #footer>
			<div class="dialog-footer">
				<el-button type="primary" @click="restartCountdownClock">
					{{ $t("results.tryAgain") }}
				</el-button>
			</div>
		</template>
	</el-dialog>
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
