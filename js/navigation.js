function back() {
    window.history.back();
}
function backMobile() {
    if (window.innerWidth <= 1000) {
        window.location.href = "contacts.html";
    }
}