document.getElementById('email').addEventListener('input', validateForm);
document.getElementById('password').addEventListener('input', validateForm);

function validateForm() {
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');

    // Reset error messages and border colors
    document.getElementById('emailError').innerHTML = '';
    document.getElementById('passwordError').innerHTML = '';

    emailInput.classList.remove('error-input');
    passwordInput.classList.remove('error-input');

    var email = emailInput.value;
    var password = passwordInput.value;

    // Validate Email
    if (email === '') {
        document.getElementById('emailError').innerHTML = 'Email is required';
        emailInput.classList.add('error-input');
        return false;
    } else if (!validateEmail(email)) {
        document.getElementById('emailError').innerHTML = 'Invalid email format';
        emailInput.classList.add('error-input');
        return false;
    } else {
        document.getElementById('emailError').innerHTML = '';
        emailInput.classList.remove('error-input');
    }

    // Validate Password
    if (password === '') {
        document.getElementById('passwordError').innerHTML = 'Password is required';
        passwordInput.classList.add('error-input');
        return false;
    } else if (password.length < 12) {
        document.getElementById('passwordError').innerHTML = 'Password must be at least 12 characters';
        passwordInput.classList.add('error-input');
        return false;
    } else if (!/[a-zA-Z].*[a-zA-Z]/.test(password)) {
        document.getElementById('passwordError').innerHTML = 'Password must contain at least 2 letters';
        passwordInput.classList.add('error-input');
        return false;
    } else if (!/[\W_]/.test(password)) {
        document.getElementById('passwordError').innerHTML = 'Password must contain at least 1 special character';
        passwordInput.classList.add('error-input');
        return false;
    } else if (/\d$/.test(email)) {
        document.getElementById('emailError').innerHTML = '*Email must not end with a number';
        emailInput.classList.add('error-input');
        return false;
    } else {
        document.getElementById('passwordError').innerHTML = '';
        passwordInput.classList.remove('error-input');
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return false;
        }

        if (/^\s/.test(email) || /[^a-zA-Z0-9@\.\-_]/.test(email)) {
            return false;
        }

        return true;
    }

    return true;
}
document.getElementById('registrationForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    if (validateForm()) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const serverError = document.getElementById('serverError');
        const loginButton = document.getElementById('loginForm');

        loginButton.disabled = true;
        try {
            const response = await fetch('https://mybrand-ishimwe-be-halx.onrender.com/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();

            const token = data.data.token;
            const ADMIN = data.data.isAdmin;
            if(ADMIN===true) {

            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem("ADMIN",ADMIN)
                window.location.href = '../ADMIN PANEL/html/index.html';
            } else {
                throw new Error('Login failed. Token not found in response.');
            }
        } 
        else {
                    window.location.href = '../index.html';
                }
    }
        catch (error) {
            serverError.innerHTML = 'Login Error: ' + error.message;
        } finally {
            loginButton.disabled = false;
        }
    }
});
