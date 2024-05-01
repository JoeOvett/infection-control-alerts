document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    const restrictedContent = document.getElementById('restricted-content');

    // Function to check if the user is logged in
    function isLoggedIn() {
        return !!localStorage.getItem('isLoggedIn');  // Simple check for login state
    }

    // Set the display style of the restricted content if it exists and the user is logged in
    if (isLoggedIn() && restrictedContent) {
        restrictedContent.style.display = 'flex';
    }

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
                    // Optionally set the restricted content to display if login is processed on the same page
                    if (restrictedContent) {
                        restrictedContent.style.display = 'flex';
                    }
                    window.location.href = 'https://infection-control-alerts.vercel.app'; // Redirect
                } else {
                    console.error('Login failed', data.message);
                    document.querySelector('.error-message').textContent = data.message;
                    document.querySelector('.error-message').style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.querySelector('.error-message').textContent = 'Login failed due to a network error.';
                document.querySelector('.error-message').style.display = 'block';
            });
        });
    }
});
