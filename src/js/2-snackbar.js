import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



const formEl = document.querySelector('.form');

formEl.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(formEl);
  const delay = parseInt(formData.get('delay'), 10);
  const state = formData.get('state');
  const status = state === 'fulfilled';

  createPromise(delay, status)
    .then((delay) => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});

function createPromise(delay, status) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (status) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
