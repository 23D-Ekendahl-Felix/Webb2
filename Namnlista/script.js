var Namn = document.querySelector("Input");
var Knapp = document.querySelector("Button");
var Lista = document.querySelector("ul");
var Fel = document.querySelector("p");

Knapp.addEventListener("click", function() { 
    if (Namn.value === "") {
        Fel.textContent = "Du måste skriva ett namn!";
    }
    else {
    var NyttNamn = document.createElement("li");
    NyttNamn.textContent = Namn.value;
    Lista.appendChild(NyttNamn);
    Fel.textContent = "";
    Namn.value = "";
    }
});

// var Namn = document.querySelector("Input");
// var Knapp = document.querySelector("Button");
// var Lista = document.querySelector("ul");

// knapp.addEventListener("click", function() {
//     var naman = Namn.value;
//     var html = "<li>" + naman + "</li>";
//     Lista.insertAdjacentHTML("beforeend", html);
// });
