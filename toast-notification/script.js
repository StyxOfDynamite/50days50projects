const button = document.getElementById('button');
const toasts = document.getElementById('toasts');

const messages = [
    'Message One',
    'Message Two',
    'Message Three',
    'Message Four',
    'Message Five'
];

const types = ['error', 'info', 'success'];

button.addEventListener('click', () => createNotification());

function createNotification(message = null, type = null) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.classList.add(type ? type : getRandom(types));
    toast.innerHTML = message ? message : getRandom(messages);
    toasts.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 1500);
}

function getRandom(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}
