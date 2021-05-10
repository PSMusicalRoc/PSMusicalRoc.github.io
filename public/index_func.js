var roomCodeInput = document.getElementById("room-id");
var nameInput = document.getElementById("nameInput");
var submitButton = document.getElementById("submit");

function checkNameInputLength() {
    if (roomCodeInput.value.length < 5) {
        submitButton.disabled = true;
    } else {
        if (nameInput.value.length != 0) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }
}

checkNameInputLength();