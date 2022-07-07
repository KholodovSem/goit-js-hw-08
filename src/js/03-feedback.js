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
let submit = document.querySelector('button');

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
  if (load('feedback-form-state') === undefined) {
    email.value = '';
    message.value = '';
    return;
  } else {
    const emailValue = load('feedback-form-state').email;
    const messageValue = load('feedback-form-state').message;
    email.value = emailValue;
    message.value = messageValue;
  }
}

// Сабмит -- слушатель
submit.addEventListener('click', refreshForm);
function refreshForm(event) {
  event.preventDefault();
  if (load('feedback-form-state') !== undefined) {
    localStorage.removeItem('feedback-form-state');
  }

  email.value = '';
  message.value = '';
}
