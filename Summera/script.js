var pris = document.querySelectorAll(".pris");
var plus = document.querySelectorAll(".plus");
var minus = document.querySelectorAll(".minus");
var antalText = document.querySelectorAll(".antal");
var summa = document.querySelectorAll(".summa");
var total = document.querySelector(".total");
//sätter antal till 0
var antal = [0, 0, 0, 0];
//skriver ut antal direkt 0
for (var i = 0; i < antalText.length; i++) {
    antalText[i].value = antal[i];
}
//skriver ut summan direkt 0
for (var i = 0; i < summa.length; i++) {
    var prisPerStyck = parseInt(pris[i].textContent);
    summa[i].textContent = prisPerStyck * antal[i] + "kr";
}
for (var i = 0; i < pris.length; i++) {
    var prisText = pris[i].textContent;
    var prisNummer = parseInt(prisText);
    console.log(prisNummer);
}
for (let i = 0; i < plus.length; i++) {
    plus[i].addEventListener("click", function () {
        antal[i]++;
        antalText[i].value = antal[i];
        var prisPerStyck = parseInt(pris[i].textContent);
        summa[i].textContent = prisPerStyck * antal[i] + "kr";
    });
}

for (let i = 0; i < minus.length; i++) {
    minus[i].addEventListener("click", function () {
        if (antal[i] > 0) {
            antal[i]--;
            antalText[i].value = antal[i];
            var prisPerStyck = parseInt(pris[i].textContent);
            summa[i].textContent = prisPerStyck * antal[i] + "kr";
        }
    });
}
