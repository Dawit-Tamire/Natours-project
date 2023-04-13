/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout, signup, forgotPassword, resetPassword } from './login';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { showAlert } from './alerts';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const signupForm = document.querySelector('.form--signup')
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const forgotPasswordForm = document.querySelector('.form-forgot-password')
const resetPasswordForm = document.querySelector('.form-reset-password')
const bookBtn = document.getElementById('book-tour');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (signupForm) {
  signupForm.addEventListener('submit', e => {
      e.preventDefault()
      const name = document.getElementById('name').value
      const email = document.getElementById('email').value
      const password = document.getElementById('password').value
      const passwordConfirm = document.getElementById('passwordConfirm').value
      
      signup({ name, email, password, passwordConfirm })
  })
}

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

  if (updateAvaUser) {
    updateAvaUser.addEventListener('change', e => {
        readImg(updateAvaUser, '.form__user-photo')
    })
}

if (updatePasswordForm) {
  updatePasswordForm.addEventListener('submit', async e => {
      e.preventDefault()
      document.querySelector('.btn--save-password').textContent = 'Updating...'

      const passwordCurrent = document.getElementById('password-current').value
      const password = document.getElementById('password').value
      const passwordConfirm = document.getElementById('password-confirm').value
      await updateData({ passwordCurrent, password, passwordConfirm }, 'password')

      document.querySelector('.btn--save-password').textContent = 'Save password'
      document.getElementById('password-current').value = ''
      document.getElementById('password').value = ''
      document.getElementById('password-confirm').value = ''
  })
}

if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener('submit', async e => {
      e.preventDefault()
      document.querySelector('.btn-forgot-password').textContent = 'Sending...'
      const email = document.getElementById('email').value
      await forgotPassword(email)

      document.querySelector('.btn-forgot-password').textContent = 'Send'
      document.getElementById('email').value = ''
  })
}

if (resetPasswordForm) {
  resetPasswordForm.addEventListener('submit', e => {
      const resetToken = document.querySelector('h3').innerText
      e.preventDefault()
      const password = document.getElementById('password').value
      const passwordConfirm = document.getElementById('passwordConfirm').value
      resetPassword({ password, passwordConfirm }, resetToken)
  })
}


if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);