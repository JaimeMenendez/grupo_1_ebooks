const subcategoryPython = ['Django', 'Flask', 'Pandas', 'Machine learning', 'Deep learning', '', '', '', '', '']
const subcategoryElectronica = ['Electrónica de potencia', 'Análisis de circuitos CC', 'Análisis de circuitos CA', 'Electrónica digital', 'Semiconductores', 'Electrónica Industrial', 'Control', '', '', '']
const subcategoryIntArtificial = ['Redes neuronales', 'Machine learning', 'Deep learning', 'Máquinas vectoriales', 'Análisis de PCA', 'Aprendizaje supervizado', 'Aprendizaje no supervizado', 'Clusttering', '', '']
const subcategoryRedes = ['PAN', 'LAN', 'CAN', 'WLAN', 'WAN', 'MAN', 'SAN', 'GAN', '', '']
const subcategoryMecanica = ['Propiedades mecánicas', 'Dinámica', 'Estática', 'Fluidos', 'Aire acondicionado', 'Máquinas eléctricas', 'Mecánica de materiales', 'Termodinámica', 'Mecánica automotriz', '']
const subcategoryMedicina = ['Diabetes', 'Cardiología', 'Neurología', 'Epidemiología', 'Farmacología', 'Anestesiología', 'Oncología', 'Pediatría', 'Bacteriología', 'Microbiología']
const subcategoryQuimica = ['Química orgánica', 'Química inorgánica', 'Polímeros', 'Estequiometría', 'Nuclear', 'Estado sólido', 'Organometálica', 'Forense', 'Ambiental', '']
const subcategoryBiotecnologia1 = ['Bio1', 'Bio2', 'Bio3', 'Bio4', 'Bio5', 'Bio6', 'Bio7', 'Bio8', 'Bio9', 'Bio10']
const subcategoryBiotecnologia2 = ['Mis', 'ojos', 'son', 'más', 'hermosos', 'cuando', 'lees', 'através', 'de', 'ellos']
const subcategoryBiotecnologia3 = ['InsideBooks', 'es', 'un', 'e-commerce', 'de', 'venta', 'de', 'libros', 'universitarios', '']

function myFunction (button_id) {
  const prueba = document.querySelectorAll('#subcategory')
  switch (button_id) {
    case 'programacion':
      document.getElementById('title-subcategory').innerHTML = 'Programación'
      for (let i = 0; i <= prueba.length; i++) {
        prueba[i].textContent = subcategoryPython[i]
      }
      break
    case 'electronica':
      document.getElementById('title-subcategory').innerHTML = 'Electrónica'
      for (let i = 0; i <= prueba.length; i++) {
        prueba[i].textContent = subcategoryElectronica[i]
      }
      break
    case 'intArtificial':
      document.getElementById('title-subcategory').innerHTML = 'Inteligencia Artificial'
      for (let i = 0; i <= prueba.length; i++) {
        prueba[i].textContent = subcategoryIntArtificial[i]
      }
      break
    case 'redes':
      document.getElementById('title-subcategory').innerHTML = 'Redes'
      for (let i = 0; i <= prueba.length; i++) {
        prueba[i].textContent = subcategoryRedes[i]
      }
      break
    case 'mecanica':
      document.getElementById('title-subcategory').innerHTML = 'Mecánica'
      for (let i = 0; i <= prueba.length; i++) {
        prueba[i].textContent = subcategoryMecanica[i]
      }
      break
    case 'medicina':
      document.getElementById('title-subcategory').innerHTML = 'Medicina'
      for (let i = 0; i <= prueba.length; i++) {
        prueba[i].textContent = subcategoryMedicina[i]
      }
      break
    case 'quimica':
      document.getElementById('title-subcategory').innerHTML = 'Química'
      for (let i = 0; i <= prueba.length; i++) {
        prueba[i].textContent = subcategoryQuimica[i]
      }
      break
    case 'biotecnologia1':
      document.getElementById('title-subcategory').innerHTML = 'Biotecnologia1'
      for (let i = 0; i <= prueba.length; i++) {
        prueba[i].textContent = subcategoryBiotecnologia1[i]
      }
      break
    case 'biotecnologia2':
      document.getElementById('title-subcategory').innerHTML = 'Biotecnologia2'
      for (let i = 0; i <= prueba.length; i++) {
        prueba[i].textContent = subcategoryBiotecnologia2[i]
      }
      break
    case 'biotecnologia3':
      document.getElementById('title-subcategory').innerHTML = 'Biotecnologia3'
      for (let i = 0; i <= prueba.length; i++) {
        prueba[i].textContent = subcategoryBiotecnologia3[i]
      }
      break
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
