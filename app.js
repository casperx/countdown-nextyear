import fireworkFactory from './firework.js';

const result = document.querySelector('#result')
const percent = document.querySelector('#percent')

const fireworkDisp = document.querySelector('#firework')

const firework = fireworkFactory(fireworkDisp)

let sizeSync = () => {
  firework.resize(
    fireworkDisp.offsetWidth,
    fireworkDisp.offsetHeight
  )
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
    const remainDate = new Date(remainDuration + timezoneOffset)

    result.textContent =
      remainDate.getMonth() + ' month ' +
      (remainDate.getDate() - 1) + ' day ' +
      remainDate.getHours() + ' hour ' +
      remainDate.getMinutes() + ' minute ' +
      remainDate.getSeconds() + ' second'

    percent.textContent = 'That is, ' + currentYearDate.getFullYear() + ' is ' + ratioComplete.toFixed(6) + '% complete'
  }

  if (duration < 3e5 && Math.random() < 0.08)
    firework.spawn()
  firework.paint()

  requestAnimationFrame(refresh)
}

update()
refresh()
