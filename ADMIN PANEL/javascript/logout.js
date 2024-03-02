const logoutButton = document.getElementById("logout");

logoutButton.addEventListener('click', function () {
    if (confirm("Are you sure you want to logout")) {
        localStorage.removeItem("token");
        window.location.href = '../../index.html';
    }
});
