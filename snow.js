const rand = (mn, mx) => mn + Math.random() * (mx - mn)

const Flake = (h, x) => {
  let y = 0

  const vx = rand(0, 0.5) - 0.25
  const vy = rand(0.5, 2)

  const draw = (ctx) => {
    ctx.beginPath()
    ctx.arc(x, y, vy, 0, Math.PI * 2)
    ctx.closePath()

    ctx.fillStyle = '#fff'
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

const Snow = (cv) => {
  const ctx = cv.getContext('2d')

  let flakes = []

  const spawn = () => {
    const {width, height} = cv

    const x = rand(0, width)
    const p = Flake(height, x)

    flakes.push(p)
  }

  const paint = () => {
    const {width, height} = cv

    ctx.clearRect(0, 0, width, height)

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
