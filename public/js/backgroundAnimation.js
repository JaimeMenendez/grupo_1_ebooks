const figures = ['triangle', 'circle', 'rectangle']
const colors = ['#EA4533', '#44979c', '#585DBA', '#F4AE62']
const list = document.querySelectorAll('li')

list.forEach(e => {
  const random = Math.floor(Math.random() * figures.length)
  e.classList.add(figures[random])

  if (window.matchMedia('(max-width: 400px)').matches) {
    e.style.setProperty('--ancho', `${randomInteger(5, 20)}px`)
    e.style.setProperty('--largo', `${randomInteger(5, 20)}px`)
  } else {
    e.style.setProperty('--ancho', `${randomInteger(30, 50)}px`)
    e.style.setProperty('--largo', `${randomInteger(30, 50)}px`)
  }
  e.style.opacity = `${randomInteger(10, 20)}%`
  e.style.left = `${randomInteger(0, 100)}vw`
  e.style.transform = `rotate(${randomInteger(0, 360)}deg`

  const color = Math.floor(Math.random() * colors.length)
  e.style.setProperty('--color', colors[color])

  e.style.animationDuration = `${randomInteger(25, 35)}s`
  e.style.animationDelay = `${randomInteger(0, 40)}s`
})

function randomInteger (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
