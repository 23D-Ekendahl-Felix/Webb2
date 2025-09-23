let knapp = document.querySelector('button');

let minHtml = document.documentElement;

let kontainer = document.querySelector('.container');

let rubrik = document.querySelector('h1');

knapp.addEventListener('click', function () {
    console.log("Du klickade på knappen!");

    if (minHtml.dataset.theme == "light") {
        minHtml.dataset.theme = "dark";
        kontainer.style.backgroundColor = "darkblue";
        rubrik.style.color = "red";
        rubrik.style.fontSize = "50px";
        rubrik.style.fontFamily = "sans-serif";
    } else {
        minHtml.dataset.theme = "light";
        kontainer.style.backgroundColor = "blue";
        rubrik.style.color = "red";
        rubrik.style.fontSize = "30px";
        rubrik.style.fontFamily = "serif";
    }
});

let fknapp = document.querySelector('input[type="submit"]');


let fnamn = document.querySelector('input');
let femail = document.querySelector('input[type="email"]');
let fmeddelande = document.querySelector('textarea');
var modal = document.querySelector('dialog');
var modalOK = document.querySelector('dialog button');

fknapp.addEventListener("click", function (e) {

    e.preventDefault();

    let ftext = fnamn.value + "<br>" + femail.value + "<br>" + fmeddelande.value;


    modalText.innerHTML = "Du skrev:<br>" + ftext;

    
    modal.showModal();
});

modalOK.addEventListener('click', function () {
    modal.close();
});