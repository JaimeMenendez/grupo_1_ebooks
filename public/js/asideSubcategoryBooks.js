const categoriasLibros = [
  {
    categoria: 'Programación',
    subcategorias: ['Django', 'Flask', 'Pandas', 'Machine learning', 'Deep learning'],
    icono: 'fas fa-laptop-code',
    idClass: 'programacion'
  },

  {
    categoria: 'Electrónica',
    subcategorias: ['Electrónica de potencia', 'Análisis de circuitos CC', 'Análisis de circuitos CA', 'Electrónica digital', 'Semiconductores', 'Electrónica Industrial', 'Control'],
    icono: 'fas fa-car-battery',
    idClass: 'electronica'
  },

  {
    categoria: 'Int Artificial',
    subcategorias: ['Redes neuronales', 'Machine learning', 'Deep learning', 'Máquinas vectoriales', 'Análisis de PCA', 'Aprendizaje supervizado', 'Aprendizaje no supervizado', 'Clusttering'],
    icono: 'fas fa-brain',
    idClass: 'intArtificial'
  },

  {
    categoria: 'Redes',
    subcategorias: ['Internet de las cosas', 'Redes neuronales', 'Ciberseguridad', 'Redes informáticas y seguridad', 'Redes infromáticas y hacking', 'Marketing', 'Marketing en redes sociales', 'Redes de computadoras'],
    icono: 'fas fa-network-wired',
    idClass: 'redes'
  },

  {
    categoria: 'Mecánica',
    subcategorias: ['Mecánica de materiales', 'Mecánica automotriz', 'Estática', 'Dinámica', 'Resistencia de materiales', 'Mecánica de fluidos', 'Mecanismos', 'Aire acondicionado', 'Estructuras de concreto', 'Termodinámica'],
    icono: 'fas fa-cogs',
    idClass: 'mecanica'
  },

  {
    categoria: 'Medicina',
    subcategorias: ['Diabetes', 'Cardiología', 'Neurología', 'Farmacología', 'Epidemiología', 'Anestesiología', 'Oncología', 'Pediatría', 'Bacteriología', 'Ginecología', 'Microbiología', 'Neurología'],
    icono: 'fas fa-stethoscope',
    idClass: 'medicina'
  },

  {
    categoria: 'Química',
    subcategorias: ['Química orgánica', 'Fotoquímica', 'Química inorgánica', 'Polímeros', 'Estequiometría', 'Catálisis', 'Química nuclear', 'Química forense', 'Fenómenos de transporte', 'Balance de masa y energía'],
    icono: 'fas fa-atom',
    idClass: 'quimica'
  },

  {
    categoria: 'Biotecnología',
    subcategorias: ['Ingeniería genética', 'Clonación', 'Enzimas de restricción', 'Productos biotecnológicos', 'Bioinformática', 'Bioníca', 'Biorremediación', 'Células madres', 'Órganos artificiales'],
    icono: 'fas fa-leaf',
    idClass: 'biotecnologia'
  },

  {
    categoria: 'Estadística',
    subcategorias: ['Estadística descriptica', 'Estadística inferencial', 'Análisis de datos', 'Estadística analítica', 'Medidas de biodiversidad', 'Estadística aplicada', 'Asociaciones de estadística', 'Leyes estadísticas'],
    icono: 'fas fa-chart-pie',
    idClass: 'estadistica'
  },

  {
    categoria: 'Economía',
    subcategorias: ['Ciencia económica', 'Contabilidad', 'Derecho económico', 'Econometría', 'Economía y medio ambiente', 'Monedas circulantes', 'Negocios', 'Inversiones en la bolsa', 'Unidades de cuenta', 'Macroeconomía', 'Microeconomía', 'Microeconomía'],
    icono: 'fas fa-chart-line',
    idClass: 'economia'
  }
]

function myFunction (buttonId) {
  const elementList = document.querySelectorAll('#subcategory')
  const buttonPressed = categoriasLibros.find(categoria => categoria.idClass === buttonId)

  document.getElementById('title-subcategory').innerHTML = buttonPressed.categoria

  for (let i = 0; i < elementList.length; i++) {
    elementList[i].textContent = ''
  }

  for (let i = 0; i < buttonPressed.subcategorias.length; i++) {
    elementList[i].textContent = buttonPressed.subcategorias[i]
  }
}

function openBarVer () {
  document.getElementById('sideBarVer').style.display = 'inline'
}

function closeBarVer () {
  document.getElementById('sideBarVer').style.display = 'none'
}

function openNav () {
  document.getElementById('sideNav').style.width = '250px'
}

function closeNav () {
  document.getElementById('sideNav').style.width = '0'
}
