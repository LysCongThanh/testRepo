

var email = document.querySelector(".email");
var email2 = document.querySelector(".email2");

email2.onkeyup = function () {
  const messageError = document.querySelector(".message__error");
  if(email.value != email2.value) {
    messageError.innerText = "Error !";
  } else {
    messageError.innerText = "Successful !";
  }
}

