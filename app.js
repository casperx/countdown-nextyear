const result = document.querySelector('#result');
const percent = document.querySelector('#percent');
const now = new Date();
const offset = now.getTimezoneOffset() * 6e4;
const curYear = now.getFullYear();
const next = new Date(curYear + 1, 0, 1, 0, 0, 0);
const prev = new Date(curYear, 0, 1, 0, 0, 0);
const yearDuration = next - prev;
const update = (dt) => {
    const now = new Date();
    const duration = next - now + offset;
    const progress = (1 - duration / yearDuration) * 100;
    const datetime = new Date(duration);
    result.textContent = 
        datetime.getMonth() + ' month ' + 
        (datetime.getDate() - 1) + ' day ' + 
        datetime.getHours() + ' hour ' + 
        datetime.getMinutes() + ' minute ' + 
        datetime.getSeconds() + ' second';
    percent.textContent = 'That is, ' + curYear + ' is ' + progress.toFixed(6) + '% complete';
    requestAnimationFrame(update);
};
update();
