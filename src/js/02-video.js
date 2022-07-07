// Импорты
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import localStorageFn from './json-convertation';

// Конвертирование в JSON-формат и сохранение/загрузка в/из Local Sorage
const save = localStorageFn.save;
const load = localStorageFn.load;

// Инициализация Vimeo Player
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

// Функция, которая забирает время в плеере
const timeUpdate = function ({ seconds }) {
  save('videoplayer-current-time', seconds);
};

// Метод on (Забирает тайм-код, где юзер закончил смотреть видео),
// метод setCurrentTime(Возвращает юзера на тоже время, где он закончилы
player.on('timeupdate', throttle(timeUpdate, 1000));

const currentPlayerTime = load('videoplayer-current-time');
if (currentPlayerTime !== null && currentPlayerTime !== undefined) {
  player.setCurrentTime(currentPlayerTime);
}
