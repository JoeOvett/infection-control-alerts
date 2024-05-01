document.addEventListener("DOMContentLoaded", function() {
    const userSession = getCookie("user_session");
    if (!userSession) {
        // Redirect to login if the session is not set or invalid
        window.location.href = "https://jo435.brighton.domains/ci601/login.php";
    } else {
        // Display restricted content or links
        document.getElementById("restricted-content").style.display = 'block';
    }
});

function getCookie(name) {
    let value = `; ${document.cookie}`;
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}
