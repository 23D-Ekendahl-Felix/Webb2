let knapp = document.querySelector('button');

let minHtml = document.documentElement;

let rubrik = document.querySelector('h1')


knapp.addEventListener('click', function() {
    console.log("du klickade");

    if (minHtml.dataset.theme == "dark"){
        minHtml.dataset.theme = "light";
        rubrik.style.color = "darkgay";
        rubrik.style.fontSize = "30px"
    }
    else{
        minHtml.dataset.theme = "dark";
        rubrik.style.color = "darkgay";
         rubrik.style.fontSize = "30px"
    }
})