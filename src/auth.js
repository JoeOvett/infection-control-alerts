document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    const restrictedContent = document.getElementById('restricted-content');
    // Frontend code for the login form and restricted content visibility
    // Function to check if the user is logged in
    // Line 51 for changing production and development redirect
    function isLoggedIn() {
        return !!localStorage.getItem('isLoggedIn'); // Simple check for login state
    }

// Set the initial state of the restricted content based on login status
function updateRestrictedContentVisibility() {
    if (restrictedContent) {
        if (isLoggedIn()) {
            restrictedContent.classList.add('active'); // Add the active class to show the restricted content
            document.getElementById('login-message').style.display = 'none'; // Hide the login message
        } else {
            restrictedContent.classList.remove('active'); // Remove the active class to hide the restricted content
            document.getElementById('login-message').style.display = 'block'; // Show the login message
        }
    }
}

    updateRestrictedContentVisibility(); // Call the function to set initial visibility

    // Handle the login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            const formData = new FormData(loginForm);
            const email = formData.get('email');
            const password = formData.get('password');
            
            fetch('https://jo435.brighton.domains/ci601/login.php', {
                method: 'POST',
                credentials: 'include', // Necessary for cookies to be sent and received
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Login successful');
                    localStorage.setItem('isLoggedIn', true); // Set login state
                    // Set the restricted content to visible and accessible if login is successful
                    if (restrictedContent) {
                        restrictedContent.classList.add('active');
                    }
                    window.location.href = 'https://infection-control-alerts.vercel.app'; // Production redirect
                   // window.location.href = 'http://localhost:5173'; // Development redirect

                } else {
                    console.error('Login failed', data.message);
                    document.querySelector('.error-message').textContent = data.message;
                    document.querySelector('.error-message').style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                if (error instanceof SyntaxError) {
                    // Handle unexpected non-JSON response
                    console.error('Unexpected non-JSON response from the server');
                    document.querySelector('.error-message').textContent = 'Login failed due to a server error.';
                } else {
                    // Handle network error or other exceptions
                    console.error('Login failed due to a network error or other exception:', error);
                    document.querySelector('.error-message').textContent = 'Login failed due to a network error or other exception.';
                }
                document.querySelector('.error-message').style.display = 'block';
            });
        });
    }
});
