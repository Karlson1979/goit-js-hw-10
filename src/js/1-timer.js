import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timerId = null;

btnEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({ title: 'Error', message: 'Please choose a date in the future' });
      btnEl.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      btnEl.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

btnEl.addEventListener('click', () => {
  if (timerId) {
    clearInterval(timerId);
  }

  timerId = setInterval(() => {
    const now = new Date();
    const msLeft = userSelectedDate - now;

    if (msLeft <= 0) {
      clearInterval(timerId);
      updateTimer(0, 0, 0, 0);
      inputEl.disabled = false;
      btnEl.disabled = true;
      return;
    }

    const time = convertMs(msLeft);
    updateTimer(time.days, time.hours, time.minutes, time.seconds);
  }, 1000);

  inputEl.disabled = true;
  btnEl.disabled = true;
});

function updateTimer(days, hours, minutes, seconds) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}