const rand = (mn: number, mx: number) => mn + Math.random() * (mx - mn)

const fallRate = 0.07
const disappearRate = 0.01

const Sparkle = (sw: number, sh: number, cx: number, cy: number, c: string) => {
  const s = rand(0.5, 3)

  const v = rand(0, 6)
  const d = rand(-Math.PI, Math.PI)

  let x = cx
  let y = cy

  const vx = Math.cos(d) * v
  let vy = Math.sin(d) * v

  let a = rand(0.5, 1)

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.arc(x, y, s, -Math.PI, Math.PI)
    ctx.closePath()

    ctx.globalAlpha = a
    ctx.fillStyle = c
    ctx.fill()
  }

  const alive = () => {
    vy += fallRate

    x += vx
    y += vy

    a -= disappearRate

    return !(x < 0 || x > sw || y > sh || a < 0.01)
  }

  return {
    alive,
    draw
  }
}

type SparkleObject = ReturnType<typeof Sparkle>

const Firework = (cv: HTMLCanvasElement) => {
  const ctx = cv.getContext('2d')!

  const frontCv = document.createElement('canvas')
  const frontCtx = frontCv.getContext('2d')!

  const backCv = document.createElement('canvas')
  const backCtx = backCv.getContext('2d')!

  let sparkles: Array<SparkleObject> = []

  const resize = (w: number, h: number) => {
    frontCv.width = w
    frontCv.height = h

    backCv.width = w
    backCv.height = h

    frontCtx.globalCompositeOperation = 'copy'
  }

  const spawn = () => {
    const {width, height} = frontCv

    const cx = rand(100, width - 100)
    const cy = rand(100, height - 100)

    const cor = rand(55, 255)
    const cog = rand(55, 255)
    const cob = rand(55, 255)

    const c = `rgb(${cor}, ${cog}, ${cob})`

    for (let n = rand(70, 130); n > 0; n -= 1) {
      const p = Sparkle(width, height, cx, cy, c)
      sparkles.push(p)
    }
  }

  const paint = () => {
    sparkles = sparkles.filter(
      (particle) => particle.alive()
    )

    backCtx.globalAlpha = 0.85
    backCtx.globalCompositeOperation = 'copy'

    backCtx.drawImage(frontCv, 0, 0)

    backCtx.globalCompositeOperation = 'screen'

    sparkles.forEach(
      (particle) => particle.draw(backCtx)
    )

    frontCtx.drawImage(backCv, 0, 0)

    ctx.drawImage(frontCv, 0, 0)
  }

  return {
    spawn,
    paint,
    resize
  }
}

export default Firework
