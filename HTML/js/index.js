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

togglePasswordConfirm.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = passwordConfirm.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordConfirm.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('flaticon-visibility');
  });