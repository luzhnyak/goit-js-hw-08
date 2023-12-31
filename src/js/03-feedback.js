import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

let data = {};

loadForm();

// ===== Submit form
function onFormSubmit(event) {
  event.preventDefault();

  const {
    elements: { email, message },
  } = event.currentTarget;

  if (email.value === '' || message.value === '') {
    return alert('Please fill in all the fields!');
  }

  data = { email: email.value, message: message.value };

  console.log(data);

  localStorage.removeItem('feedback-form-state');
  data = {};
  event.currentTarget.reset();
}

// ===== Save form
function onFormInput(event) {
  data[event.target.name] = event.target.value;

  localStorage.setItem('feedback-form-state', JSON.stringify(data));
}

// ===== Load form
function loadForm() {
  const dataSave = localStorage.getItem('feedback-form-state');

  if (!dataSave) return;

  data = JSON.parse(dataSave);

  if (data.email) form.elements.email.value = data.email;
  if (data.message) form.elements.message.value = data.message;
}
