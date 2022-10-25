import fireworkFactory from './firework.js'
import snowFactory from './snow.js'

const result = document.querySelector('#result')
const percent = document.querySelector('#percent')

const overlayCanvas = document.querySelector('#overlay')

const firework = fireworkFactory(overlayCanvas)
const snow = snowFactory(overlayCanvas)

let sizeSync = () => {
  overlayCanvas.width = overlayCanvas.offsetWidth
  overlayCanvas.height = overlayCanvas.offsetHeight

  firework.resize(overlayCanvas.offsetWidth, overlayCanvas.offsetHeight)
}

window.addEventListener('resize', sizeSync)

sizeSync()

let timezoneOffset, currentYearDate, nextYearDate, yearDuration

const update = () => {
  const nowDate = new Date()

  timezoneOffset = nowDate.getTimezoneOffset() * 6e4

  currentYearDate = new Date(nowDate.getFullYear(), 0, 1, 0, 0, 0)
  nextYearDate = new Date(nowDate.getFullYear() + 1, 0, 1, 0, 0, 0)

  yearDuration = nextYearDate - currentYearDate
}

const refresh = () => {
  const nowDate = new Date()

  const duration = nowDate - currentYearDate
  const remainDuration = nextYearDate - nowDate

  if (remainDuration < 0 || duration < 0) {
    update()
  }
  else {
    const ratioComplete = (duration / yearDuration) * 100
    const remainDateObject = new Date(remainDuration + timezoneOffset)

    const remainMonth = remainDateObject.getMonth()
    const remainDate = remainDateObject.getDate() - 1
    const remainHours = remainDateObject.getHours()
    const remainMinutes = remainDateObject.getMinutes()
    const remainSeconds = remainDateObject.getSeconds()

    const currentFullYear = currentYearDate.getFullYear()
    const currentRatio = ratioComplete.toFixed(6)

    result.textContent = `${remainMonth} month ${remainDate} day ${remainHours} hour ${remainMinutes} minute ${remainSeconds} second`

    percent.textContent = `That is, ${currentFullYear} is ${currentRatio}% complete`
  }

  if (nowDate.getMonth() === 9) {
    if (Math.random() < 0.5)
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
