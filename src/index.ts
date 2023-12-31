import fireworkFactory from './firework.js'
import snowFactory from './snow.js'

const result = document.querySelector<HTMLDivElement>('#result')!
const percent = document.querySelector<HTMLDivElement>('#percent')!

const overlayCanvas = document.querySelector<HTMLCanvasElement>('#overlay')!
const overlayCanvasContext = overlayCanvas.getContext('2d')!

const firework = fireworkFactory(overlayCanvas)
const snow = snowFactory(overlayCanvas)

const sizeSync = () => {
  overlayCanvas.width = overlayCanvas.offsetWidth
  overlayCanvas.height = overlayCanvas.offsetHeight

  firework.resize(overlayCanvas.offsetWidth, overlayCanvas.offsetHeight)
}

window.addEventListener('resize', sizeSync)

sizeSync()

let timezoneOffset: number
let leapYearOffset: number

let currentYearDate: Date
let nextYearDate: Date

let yearDuration: number

const isLeapYear = (year: number) => (year & 3) == 0 && (year % 25 != 0 || (year & 15) == 0)

const update = () => {
  const nowDate = new Date

  const nowYear = nowDate.getFullYear()
  timezoneOffset = nowDate.getTimezoneOffset() * 6e4
  leapYearOffset = isLeapYear(nowYear) ? 63072000000 : 0

  currentYearDate = new Date(nowYear, 0, 1, 0, 0, 0)
  nextYearDate = new Date(nowYear + 1, 0, 1, 0, 0, 0)

  yearDuration = nextYearDate.valueOf() - currentYearDate.valueOf()
}

const refresh = () => {
  const nowDate = new Date

  const duration = nowDate.valueOf() - currentYearDate.valueOf()
  const remainDuration = nextYearDate.valueOf() - nowDate.valueOf()

  if (remainDuration < 0 || duration < 0)
    update()

  else {
    const remainDateObject = new Date(remainDuration + leapYearOffset + timezoneOffset)

    const remainMonth = remainDateObject.getMonth()
    const remainDate = remainDateObject.getDate() - 1
    const remainHours = remainDateObject.getHours()
    const remainMinutes = remainDateObject.getMinutes()
    const remainSeconds = remainDateObject.getSeconds()

    const ratioComplete = duration / yearDuration
    const percentComplete = ratioComplete * 100

    const currentFullYear = currentYearDate.getFullYear()
    const currentRatio = percentComplete.toFixed(6)

    result.textContent = `${remainMonth} month ${remainDate} day ${remainHours} hour ${remainMinutes} minute ${remainSeconds} second`
    percent.textContent = `That is, ${currentFullYear} is ${currentRatio}% complete`
  }

  overlayCanvasContext.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)

  if (nowDate.getMonth() === 11) {
    if (Math.random() < 0.8)
      snow.spawn()
    snow.paint()
  }

  if (duration < 3e5 && Math.random() < 0.08)
    firework.spawn()
  if (duration < 4e5)
    firework.paint()

  requestAnimationFrame(refresh)
}

update()
refresh()
