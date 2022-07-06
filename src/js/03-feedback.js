// Импорт
import localStorageFn from './json-convertation';
import throttle from 'lodash.throttle';

// Конвертирование в JSON-формат и сохранение/загрузка в/из Local Sorage
const save = throttle(localStorageFn.save, 500);
const load = localStorageFn.load;

// Ссылка и слушатель на форму
const formRef = document.querySelector('.feedback-form');
formRef.addEventListener('input', getEmailAndMassage);

// Ссылки на инпуты формы
let email = document.querySelector('input[name="email"]');
let message = document.querySelector('textarea[name="message"]');

// Функция получениея значений формы и их запись в локальное хранилище
function getEmailAndMassage(event) {
  const email = event.currentTarget.querySelector('input[name="email"]').value;
  const message = event.currentTarget.querySelector(
    'textarea[name="message"]'
  ).value;

  save('feedback-form-state', {
    message: message,
    email: email,
  });
}

// Объявление и вызов функции возврата значений в форму
returningEnteredValues();
function returningEnteredValues() {
  const emailValue = JSON.parse(
    localStorage.getItem('feedback-form-state')
  ).email;
  const messageValue = JSON.parse(
    localStorage.getItem('feedback-form-state')
  ).message;

  if (localStorage.getItem('feedback-form-state') === null) {
    email.value = '';
    message.value = '';
  } else {
    email.value = emailValue;
    message.value = messageValue;
  }
}
