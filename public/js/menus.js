
// function myFunction (buttonId) {
//   const elementList = document.querySelectorAll('#subcategory')
//   const buttonPressed = categoriasLibros.find(categoria => categoria.idClass === buttonId)

//   document.getElementById('title-subcategory').innerHTML = buttonPressed.categoria

//   for (let i = 0; i < elementList.length; i++) {
//     elementList[i].textContent = ''
//   }

//   for (let i = 0; i < buttonPressed.subcategorias.length; i++) {
//     elementList[i].textContent = buttonPressed.subcategorias[i]
//   }
// }

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
