async function checkAuthentication() {
    try {
        const response = await fetch('https://jo435.brighton.domains/ci601/check_auth.php', {
            credentials: 'include'
        });
        // Due to cookies not being generated/available on login, 
        // This would have redirected to the login page.
        const data = await response.json();

        if (!data.isAuthenticated) {
            console.log('User is not authenticated, would redirect to login.');
            // Handle redirection here if needed
        } else {
            console.log('User is authenticated');
            initMap();
        }
    } catch (error) {
        console.error('Error checking authentication:', error);
    }
}

function initMap() {
    console.log("Loading map...");
}

checkAuthentication();
