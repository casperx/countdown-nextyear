const rand = (mn, mx) => mn + Math.random() * (mx - mn)

const g = 0.07
const l = 0.01

const Sparkle = (sw, sh, cx, cy, c) => {
  const s = rand(0.5, 2.5)

  const v = rand(0, 6)
  const d = rand(-Math.PI, Math.PI)

  let x = cx
  let y = cy

  let vx = Math.cos(d) * v
  let vy = Math.sin(d) * v

  let a = rand(0.5, 1)

  const draw = (ctx) => {
    ctx.beginPath()
    ctx.arc(x, y, s, -Math.PI, Math.PI)
    ctx.closePath()

    ctx.globalAlpha = a
    ctx.fillStyle = c
    ctx.fill()
  }

  const alive = () => {
    vy += g

    x += vx
    y += vy

    a -= l

    return !(x < 0 || x > sw || y > sh || a < 0)
  }

  return {
    alive,
    draw
  }
}

const Firework = (cv) => {
  const ctx = cv.getContext('2d')

  const cv2 = document.createElement('canvas')
  const ctx2 = cv2.getContext('2d')

  let sparkles = []

  const resize = (w, h) => {
    cv2.width = w
    cv2.height = h
  }

  const spawn = () => {
    const {width, height} = cv

    const cx = rand(100, width - 100)
    const cy = rand(100, height - 100)

    const cor = rand(55, 255)
    const cog = rand(55, 255)
    const cob = rand(55, 255)

    const c = `rgb(${cor},${cog},${cob})`

    for (let n = rand(70, 130); n > 0; n -= 1) {
      const p = Sparkle(width, height, cx, cy, c)
      sparkles.push(p)
    }
  }

  const paint = () => {
    ctx2.globalCompositeOperation = 'copy'
    ctx2.globalAlpha = 0.87
    ctx2.drawImage(cv, 0, 0)

    ctx2.globalCompositeOperation = 'screen'

    sparkles = sparkles.filter(
      (particle) => particle.alive()
    )

    sparkles.forEach(
      (particle) => particle.draw(ctx2)
    )

    ctx.globalCompositeOperation = 'copy'
    ctx.drawImage(cv2, 0, 0)
  }

  return {
    spawn,
    paint,
    resize
  }
}

export default Firework
