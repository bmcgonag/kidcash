// This is called to display a temporary message to the user at the bottom of the screen

showSnackbar = function(snackbarText, snackbarColor) {
    var snackbarNotification = document.getElementById("snackbar");
    snackbarNotification.innerHTML = snackbarText;
    snackbarNotification.style.backgroundColor = snackbarColor;
    snackbarNotification.className = "show";
    setTimeout(function() {
        snackbarNotification.className = snackbarNotification.className.replace("show", "");
    }, 4500)
}