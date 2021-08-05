const bloqueRojo = document.querySelector(".main-container .bloqueRojo");
const bloqueAzul = document.querySelector(".main-container .bloqueAzul");
const bloqueVerde = document.querySelector(".main-container .bloqueVerde");
const bloqueNaranja = document.querySelector(".main-container .bloqueNaranja");

const root = document.documentElement;

bloqueRojo.addEventListener('click',e =>{
    root.style.setProperty('--buttonColor', '#EA4533');
    root.style.setProperty('--buttonColorHover', '#c0392b');
    console.log(e);
})

bloqueAzul.addEventListener('click',e =>{
    root.style.setProperty('--buttonColor', '#585DBA');
    root.style.setProperty('--buttonColorHover', '#3f438b');
    console.log(e);
})

bloqueVerde.addEventListener('click',e =>{
    root.style.setProperty('--buttonColor', '#44979c');
    root.style.setProperty('--buttonColorHover', '#306b6e');
    console.log(e);
})


bloqueNaranja.addEventListener('click',e =>{
    root.style.setProperty('--buttonColor', '#F4AE62');
    root.style.setProperty('--buttonColorHover', '#c78c4d');
    console.log(e);
})


