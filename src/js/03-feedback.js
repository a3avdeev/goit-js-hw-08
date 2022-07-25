import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');

localStorageInfo();

// запись в хранилище
form.addEventListener('input', throttle(inputValue, 500));

function inputValue(event) {
  let savedInfo = localStorage.getItem(LOCALSTORAGE_KEY)
    ? JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
    : {};
  savedInfo[event.target.name] = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(savedInfo));
}
// вызов из хранилища
function localStorageInfo() {
  let savedInfo = localStorage.getItem(LOCALSTORAGE_KEY);
  if (savedInfo) {
    savedInfo = JSON.parse(savedInfo);
    Object.entries(savedInfo).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}
// отправка и очистка формы
form.addEventListener('submit', sendForm);

function sendForm(event) {
  event.preventDefault();

  const email = event.target.elements.email.value;
  const message = event.target.elements.message.value;

  localStorage.removeItem('feedback-form-state');
  console.log({ email, message });

  event.currentTarget.reset();
}
