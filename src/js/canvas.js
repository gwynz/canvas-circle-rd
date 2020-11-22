import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
canvas.width = vw
canvas.height = vh

const mouse = {}

const colors = ['#205959', '#F2E74B', '#F2B33D', '#F29544', '#8C7161']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = screen.width
  canvas.height = screen.height

  init()
})
const maxRadius = 35
// Objects
function Circle(xCoordinate, yCoordinate, radius) {
  const randomNumber = Math.floor(Math.random() * 4)
  const randomTrueOrFalse = Math.floor(Math.random() * 2)

  this.xCoordinate = xCoordinate
  this.yCoordinate = yCoordinate
  this.radius = radius

  this.color = colors[randomNumber]

  if (randomTrueOrFalse == 1) {
    this.xVelocity = -Math.random() * 1
  } else {
    this.xVelocity = Math.random() * 1
  }

  if (randomTrueOrFalse == 1) {
    this.yVelocity = -Math.random() * 1
  } else {
    this.yVelocity = Math.random() * 1
  }

  // As distance gets closer to 0, increase radius

  this.update = function () {
    const xDistance = mouse.x - this.xCoordinate
    const yDistance = mouse.y - this.yCoordinate
    const originalRadius = radius
    this.xCoordinate += this.xVelocity
    this.yCoordinate += this.yVelocity

    // Movement Functions
    if (
      this.xCoordinate + this.radius > canvas.width ||
      this.xCoordinate - this.radius < 0
    ) {
      this.xVelocity = -this.xVelocity
    }
    if (
      this.yCoordinate + this.radius > canvas.height ||
      this.yCoordinate - this.radius < 0
    ) {
      this.yVelocity = -this.yVelocity
    }

    // Radius Decrease Functions
    // When distance between circle center and mouse on horizontal axis is less than 50, increase radius until it is equal to 35
    if (
      xDistance < 50 &&
      xDistance > -50 &&
      this.radius < maxRadius &&
      yDistance < 50 &&
      yDistance > -50
    ) {
      this.radius += 2
    } else if (
      (xDistance >= 50 && originalRadius < this.radius) ||
      (xDistance <= -50 && originalRadius < this.radius) ||
      (yDistance >= 50 && originalRadius < this.radius) ||
      (yDistance <= -50 && originalRadius < this.radius)
    ) {
      this.radius -= 2
    }

    this.draw()
  }

  this.draw = function () {
    c.beginPath()
    c.arc(
      this.xCoordinate,
      this.yCoordinate,
      Math.abs(this.radius),
      0,
      Math.PI * 2
    )
      c.fillStyle = this.color
    c.fill()
  }
}

// Implementation
let circleArray = []
function init() {
  for (let i = 0; i < 800; i++) {
    const randomXCoordinate = Math.random() * canvas.width
    const randomYCoordinate = Math.random() * canvas.height
    const randomRadius = Math.random() * 7
    circleArray.push(
      new Circle(randomXCoordinate, randomYCoordinate, randomRadius)
    )
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  c.fillStyle = "#D9D9D9"
  c.fillRect(0, 0, canvas.width, canvas.height)
  circleArray.forEach(object => {
    object.update()
  })
}

init()
animate()
