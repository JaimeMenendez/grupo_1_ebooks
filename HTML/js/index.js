const togglePassword = document.querySelector('#passwordEye');
const password = document.querySelector('#PasswordInput');

const togglePasswordConfirm = document.querySelector('#confirmPasswordEye');
const passwordConfirm = document.querySelector('#confirmPasswordInput');

togglePassword.addEventListener('click', function (e) {
  // toggle the type attribute
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  // toggle the eye slash icon
  this.classList.toggle('flaticon-visibility');
});

  const bloqueRojo = document.querySelector(".logo .bloqueRojo");
  const bloqueAzul = document.querySelector(".logo .bloqueAzul");
  const bloqueVerde = document.querySelector(".logo .bloqueVerde");
  const bloqueNaranja = document.querySelector(".logo .bloqueNaranja");
  
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

if(togglePasswordConfirm){
togglePasswordConfirm.addEventListener('click', function (e) {
  // toggle the type attribute
  const type = passwordConfirm.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordConfirm.setAttribute('type', type);
  // toggle the eye slash icon
  this.classList.toggle('flaticon-visibility');
})}
