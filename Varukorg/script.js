var pris = document.querySelector(".pris");
var plus = document.querySelector(".plus");
var minus = document.querySelector(".minus");
var antalText = document.querySelector(".antal");
var summa = document.querySelector(".summa");

//hämtar priset och gör om det till en siffra
var prisPerStyck = parseInt(pris.textContent);
//sätter antal till 0
var antal = 0;
antalText.value = antal;

//skriver ut summan direkt 0
summa.textContent = prisPerStyck * antal + "kr";

plus.addEventListener("click", function () {
    antal++;
    antalText.value = antal;
    summa.textContent = prisPerStyck * antal + "kr";
});
minus.addEventListener("click", function () {
    if (antal > 0 ) {
        antal--;
        antalText.value = antal;
        summa.textContent = prisPerStyck * antal + "kr";
    }
});