var buzzer = document.getElementById("buzzer");

document.addEventListener("keydown", event => {
    if (event.isComposing || event.keyCode === 32) {
        buzzer.classList.add("clicked");
        buzzer.click();
    }
    return;
});

document.addEventListener("keyup", event => {
    if (event.isComposing || event.keyCode === 32) {
        buzzer.classList.remove("clicked");
    }
    return;
});