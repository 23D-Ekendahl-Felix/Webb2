let flagContainer = document.querySelector('#flag-container');
let knapp1 = document.querySelector('#btn-one');
let knapp2 = document.querySelector('#btn-many');
let knapp3 = document.querySelector('#btn-clear');


knapp1.addEventListener('click', function() {
    fetch('http://10.151.168.5:8081/flags/random')
    .then(svar => {
        return svar.json();
    })
    .then(data => {
        console.log(data.name, data.svgUrl);
 let urlbilden = 'http://10.151.168.5:8081' + data.svgUrl;
 flagContainer.insertAdjacentHTML('afterbegin', '<img src="' + urlbilden + '" alt="' + data.name + '" width="200">');
    });
});
knapp2.addEventListener('click', function() {
for (let i = 0; i < 18; i++) {
    fetch('http://10.151.168.5:8081/flags/random')
});
knapp3.addEventListener('click', function() {
  flagContainer.innerHTML = '';
});