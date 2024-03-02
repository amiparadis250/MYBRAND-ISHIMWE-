function validateForm() {
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    var role = document.getElementById('role').value;

    // Reset error messages
    document.getElementById('nameError').innerHTML = '';
    document.getElementById('passwordError').innerHTML = '';
    document.getElementById('emailError').innerHTML = '';
    document.getElementById('roleError').innerHTML = '';

    // Validate Name
    if (name === '') {
        document.getElementById('nameError').innerHTML = '*Name is required';
        return false;
    } else if (/[\d]/.test(name)) {
        document.getElementById('nameError').innerHTML = '*Name must not contain numbers';
        return false;
    } else if (name.length <= 10) {
        document.getElementById('nameError').innerHTML = '*Name must be greater than 10 characters';
        return false;
    }
    else if (/[^a-zA-Z0-9]/.test(name)) {
document.getElementById('nameError').innerHTML = '*Name must not contain special characters';
return false;
}
    // Validate Password
    if (password === '') {
        document.getElementById('passwordError').innerHTML = '*Password is required';
        return false;
    } else if (password.length < 12) {
        document.getElementById('passwordError').innerHTML = '*Password must be at least 12 characters';
        return false;
    } else if (!/(?=.*[0-9])(?=.*[\W_])/.test(password)) {
        document.getElementById('passwordError').innerHTML = '*Password must contain a number and a special character';
        return false;
    }

    // Validate Email
    if (email === '') {
        document.getElementById('emailError').innerHTML = '*Email is required';
        return false;
    } else if (email.length < 4) {
        document.getElementById('emailError').innerHTML = '*Email must be at least 4 characters';
        return false;
    }

    // Validate Role
    if (role === '') {
        document.getElementById('roleError').innerHTML = '*Role is required';
        return false;
    }

    return true;
}