var Name = document.querySelector(".Name");
var Emailaddress = document.querySelector(".Emailaddress");
var Message = document.querySelector(".Message");
var SubmitText = document.querySelector(".SubmitText");
var ul = document.querySelector(".listconteiner");

var Nummer = document.querySelectorAll(".Nummer");
var Spin = document.querySelector(".Spin");
var card = document.querySelectorAll(".card");
var Spinul = document.querySelector(".SpinListconteiner");

var SpinLog = document.querySelector(".SpinLog");
var SpinLogModal = document.querySelector(".modal");
var closeSpinLog = document.querySelector(".SpinLogclose");
var NoSpinText = document.querySelector(".Feltext");
var clearLog = document.querySelector(".clearLog");

var pengar = 1000;
var Pengar = document.querySelector(".Pengar");
Pengar.textContent = pengar + " $";

//Submit form
SubmitText.addEventListener("click", function () {
    if (Name.value == "" && Emailaddress.value == "" && Message.value == "") {
    }
    else {
        var li = document.createElement("li");
        li.textContent = "Name: " + Name.value + "  ||    Email: " + Emailaddress.value + "  ||    Message: " + Message.value;
        ul.appendChild(li);
        Name.value = "";
        Emailaddress.value = "";
        Message.value = "";
    }
});

//Slot machine
Spin.addEventListener("click", function () {
    for (let i = 0; i < Nummer.length; i++) {
        var bet = 10;
        if (pengar - bet < 0 || pengar <= 0) {

            return;
        }
        pengar -= bet;
        Pengar.textContent = pengar + " $";
        Nummer[i].textContent = Math.floor(Math.random() * 5) + 1;

        if (Nummer[i].textContent == 1) {
            card[i].style.backgroundColor = "yellow";
        }
        if (Nummer[i].textContent == 2) {
            card[i].style.backgroundColor = "green";
        }
        if (Nummer[i].textContent == 3) {
            card[i].style.backgroundColor = "red";
        }
        if (Nummer[i].textContent == 4) {
            card[i].style.backgroundColor = "blue";
        }
        if (Nummer[i].textContent == 5) {
            card[i].style.backgroundColor = "purple";
        }
    }
    if (Nummer[0].textContent == 5 && Nummer[1].textContent == 5 && Nummer[2].textContent == 5) {
        pengar += bet * 10;
        Pengar.textContent = pengar + " $";
    }
    var li = document.createElement("li");
    li.textContent = "Nummer 1: " + Nummer[0].textContent + "  ||    Nummer 2: " + Nummer[1].textContent + "  ||    Nummer 3: " + Nummer[2].textContent;
    Spinul.appendChild(li);

});

//Spin log modal
SpinLog.addEventListener("click", function () {
    SpinLogModal.style.display = "block";
    if (Spinul.children.length == 0) {
        SpinLogModal.style.display = "none";
        NoSpinText.textContent = "You have not spun yet!";
    }
    else {
        NoSpinText.textContent = "";
    }

});
closeSpinLog.addEventListener("click", function () {
    SpinLogModal.style.display = "none";
});
//Clear log
clearLog.addEventListener("click", function () {
    if (Spinul.children.length == 0) {
        NoSpinText.textContent = "You have not spun yet!";
    }
    else {
        Spinul.innerHTML = "";
        NoSpinText.textContent = "Log cleared!";
        SpinLogModal.style.display = "none";
    }
});


var InfoButton = document.querySelector(".btn-info");
var InfoModal = document.querySelector(".modalinfo");
var closeInfo = document.querySelector(".Info-close");

InfoButton.addEventListener("click", function () {
    InfoModal.style.display = "block";
});
closeInfo.addEventListener("click", function () {
    InfoModal.style.display = "none";
});





