document.getElementById('registrationForm').addEventListener('submit', async function (event) {
    event.preventDefault();

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
        const isAdmin = data.data.isAdmin;

        if (isAdmin) {
            localStorage.setItem('token', token);
            localStorage.setItem("isAdmin", isAdmin);
            window.location.href = '../ADMIN PANEL/html/index.html';
        } else {
            localStorage.setItem('token', token);
            window.location.href = '../index.html';
        }
    } catch (error) {
        serverError.innerHTML = 'Login Error: ' + error.message;
    } finally {
        loginButton.disabled = false;
    }
});
