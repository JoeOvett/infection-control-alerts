document.addEventListener("DOMContentLoaded", function() {
    const token = getCookie("token");
    console.log("JWT from cookie: ", token); // Log the token

    if (!token) {
        console.log("No token found, redirecting to login.");
        window.location.href = "https://jo435.brighton.domains/ci601/login.php";
    } else {
        // Attempt to access a protected route to verify token
        fetch('https://jo435.brighton.domains/protected', {
            method: 'GET',
            credentials: 'include' // to send cookies that contain the JWT
        })
        .then(response => {
            console.log("Response status: ", response.status);
            if (response.ok) {
                console.log("Token is valid, showing restricted content.");
                document.getElementById("restricted-content").style.display = 'block';
            } else {
                throw new Error('Not authorized');
            }
        })
        .catch(error => {
            console.error('Authentication error:', error);
            window.location.href = "https://jo435.brighton.domains/ci601/login.php";
        });
    }
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(";").shift() : null;
}
