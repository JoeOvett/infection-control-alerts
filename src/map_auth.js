// map_auth.js

// Function to check if user is authenticated
async function checkAuthentication() {
    try {
        const response = await fetch('https://jo435.brighton.domains/ci601/check_auth.php', {
            credentials: 'include'
        });

        const data = await response.json();

        // If user is not authenticated, redirect to login page
        if (!data.isAuthenticated) {
            window.location.href = '/login.html';
        }
    } catch (error) {
        console.error('Error checking authentication:', error);
        window.location.href = '/login.html';
    }
}

// Call the authentication check on page load
checkAuthentication();
