document.getElementById('email').addEventListener('input', validateForm);
document.getElementById('password').addEventListener('input', validateForm);

function validateForm() {
    // Reset error messages and border colors
    document.getElementById('emailError').innerHTML = '';
    document.getElementById('passwordError').innerHTML = '';

    document.getElementById('email').classList.remove('error-input');
    document.getElementById('password').classList.remove('error-input');
}

function loaders() {
    const loader = document.getElementById("loader");
    loader.style.display = "block";
    const loginKeyWord = document.getElementById("loginKeyword");
    loginKeyWord.style.display = "none";
}

document.getElementById('registrationForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const serverError = document.getElementById('serverError');
    const loginButton = document.getElementById('loginForm');


    loaders();
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
        if (ADMIN === true) {

            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem("ADMIN", ADMIN)
                window.location.href = '../ADMIN PANEL/html/index.html';
            } else {
                throw new Error('Login failed. Token not found in response.');
            }
        } else {
            window.location.href = '../index.html';
        }
    } catch (error) {
        serverError.innerHTML = 'Login Error: ' + error.message;
    } finally {
       
        loaderContainer.style.display = "none";
        loginKeyWord.style.display = "inline";
    }
});