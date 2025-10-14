var Name = document.querySelector(".Name");
var Emailaddress = document.querySelector(".Emailaddress");
var Message = document.querySelector(".Message");
var SubmitText = document.querySelector(".SubmitText");
var ul = document.querySelector(".listconteiner");

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