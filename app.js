const result = document.querySelector('#result');
const now = new Date();
const offset = now.getTimezoneOffset() * 60000;
let next = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0);
const update = () => {
    const now = new Date();
    const datetime = new Date(next - now + offset);
    result.textContent = 
        datetime.getMonth() + ' month ' + 
        (datetime.getDate() - 1) + ' day ' + 
        datetime.getHours() + ' hour ' + 
        datetime.getMinutes() + ' minute ' + 
        datetime.getSeconds() + ' second';
    setTimeout(update, 500);
};
update();
