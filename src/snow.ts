import {rand} from './util.js'

const Flake = (h: number, x: number, c: string) => {
  let y = 0

  const vx = rand(0, 0.5) - 0.25
  const vy = rand(1, 3)

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.arc(x, y, vy, -Math.PI, Math.PI)
    ctx.closePath()

    ctx.fillStyle = c
    ctx.fill()
  }

  const alive = () => {
    x += vx
    y += vy

    return y < h
  }

  return {
    draw,
    alive
  }
}

type FlakeObject = ReturnType<typeof Flake>

const Snow = (cv: HTMLCanvasElement) => {
  const ctx = cv.getContext('2d')!

  let flakes: Array<FlakeObject> = []

  const spawn = () => {
    const {width, height} = cv

    const cos = rand(55, 255)
    const cov = rand(0.6, 1)

    const c = `rgba(${cos}, ${cos}, ${cos}, ${cov})`

    const x = rand(0, width)
    const f = Flake(height, x, c)

    flakes.push(f)
  }

  const paint = () => {
    flakes = flakes.filter(
      (particle) => particle.alive()
    )

    flakes.forEach(
      (particle) => particle.draw(ctx)
    )
  }

  return {
    spawn,
    paint
  }
}

export default Snow
