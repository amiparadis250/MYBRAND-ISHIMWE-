document.getElementById('name').addEventListener('input', validateForm);
document.getElementById('email').addEventListener('input', validateForm);
document.getElementById('password').addEventListener('input', validateForm);

function validateForm() {
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');

    // Reset error messages and border colors
    document.getElementById('nameError').innerHTML = '';
    document.getElementById('emailError').innerHTML = '';
    document.getElementById('passwordError').innerHTML = '';

    nameInput.classList.remove('error-input');
    emailInput.classList.remove('error-input');
    passwordInput.classList.remove('error-input');

    var name = nameInput.value;
    var email = emailInput.value;
    var password = passwordInput.value;

    // Validate Name
    if (name === '') {
        document.getElementById('nameError').innerHTML = 'Name is required';
        nameInput.classList.add('error-input');
        return false;
    } else if (/[\d]/.test(name)) {
        document.getElementById('nameError').innerHTML = 'Name must not contain numbers';
        nameInput.classList.add('error-input');
        return false;
    } else if (name.length <= 10) {
        document.getElementById('nameError').innerHTML = 'Name must be greater than 10 characters';
        nameInput.classList.add('error-input');
        return false;
    } else if (/^\s/.test(name)) {
        document.getElementById('nameError').innerHTML = 'Name must not start with whitespace';
        nameInput.classList.add('error-input');
        return false;
    } else if (/[^a-zA-Z\s]/.test(name)) {
        document.getElementById('nameError').innerHTML = 'Name must contain only letters and spaces';
        nameInput.classList.add('error-input');
        return false;
    } else {
        document.getElementById('nameError').innerHTML = '';
        nameInput.classList.remove('error-input');
    }

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
    return true;
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

//fetching login APIs 

function loaders() {
    const loader = document.getElementById("loader");
    loader.style.display = "block";
    const registerWord = document.getElementById("registerWord");
    registerWord.style.display = "none";
}
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registrationForm");
    const registerButton = document.getElementById("registerButton");
    const serverError = document.getElementById("serverError");

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const fullName = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        serverError.innerHTML = "";
        loaders();

        try {
            const result = await fetch("https://mybrand-ishimwe-be-halx.onrender.com/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullName: fullName,
                    email: email,
                    password: password
                })
            });

            if (!result.ok) {
                const errorResponse = await result.json();
        
                serverError.innerHTML = "User already exists: " + errorResponse.message;
            } else {
                serverError.innerHTML = "Registration successful!";
                window.location.href = "../index.html"; 
            }
        } catch (error) {
            console.error(error);
            serverError.innerHTML = "User Already Exisist";
        }
        finally{
            loaderContainer.style.display = "none";
            registerWord.style.display="inline";
        }
    });
});


