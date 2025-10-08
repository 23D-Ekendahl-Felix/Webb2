var Name = document.querySelector(".Name");
var Emailaddress = document.querySelector(".Emailaddress");
var Message = document.querySelector(".Message");
var SubmitText = document.querySelector(".SubmitText");
var ul = document.querySelector(".listconteiner");

var Nummer = document.querySelectorAll(".Nummer");
var Spin = document.querySelector(".Spin");
var card = document.querySelectorAll(".card");
var Spinul = document.querySelector(".SpinListconteiner");


SubmitText.addEventListener("click", function () {
    if (Name.value == "" && Emailaddress.value == "" && Message.value == "") {
        alert("Please fill in all fields");
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

Spin.addEventListener("click", function () {
    for (let i = 0; i < Nummer.length; i++){
    Nummer[i].textContent = Math.floor(Math.random() * 5) + 1;

    if (Nummer[i].textContent == 5) {
        card[i].style.backgroundColor = "yellow";
    }
    else {
        card[i].style.backgroundColor = "white";
    }
}
if (Nummer[0].textContent == 5 && Nummer[1].textContent == 5 && Nummer[2].textContent == 5) {
    alert("You win!");
}
var li = document.createElement("li");
li.textContent = "Nummer 1: " + Nummer[0].textContent + "  ||    Nummer 2: " + Nummer[1].textContent + "  ||    Nummer 3: " + Nummer[2].textContent;
Spinul.appendChild(li);

});