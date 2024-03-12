const fullNameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const commentInput = document.getElementById('comment');
const sendButton = document.getElementById('send');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const commentError = document.getElementById('commentError');

fullNameInput.addEventListener('input', validateInput.bind(null, fullNameInput, nameError, validateName));
emailInput.addEventListener('input', validateInput.bind(null, emailInput, emailError, validateEmail));
commentInput.addEventListener('input', validateInput.bind(null, commentInput, commentError, validateComment));

sendButton.addEventListener('click', function (event) {
    event.preventDefault(); 
    if (isValid()) {
       
        console.log('Form is valid');
       
    }
});

function isValid() {
    clearErrors();

    return validateInput(fullNameInput, nameError, validateName) &&
        validateInput(emailInput, emailError, validateEmail) &&
        validateInput(commentInput, commentError, validateComment);
}

function validateInput(input, errorElement, validationFunction) {
    clearError(errorElement);

    const value = input.value;

    validationFunction(value, errorElement, input);

    return !errorElement.innerHTML; // Return true if there are no errors
}

function validateName(fullName, errorElement, inputElement) {
    if (fullName.trim() === '') {
        displayError(errorElement, 'Name is required');
    } else if (fullName.length < 5) {
        displayError(errorElement, 'Invalid name');
    } else if (/^\s/.test(fullName)) {
        displayError(errorElement, 'Name must not start with whitespace');
    } else if (/[^a-zA-Z\s]/.test(fullName)) {
        displayError(errorElement, 'Name must contain only letters and spaces');
    } else {
        clearError(errorElement);
        inputElement.style.border = ''; // Remove border when valid
    }
}

function validateEmail(email, errorElement, inputElement) {
    if (email.trim() === '') {
        displayError(errorElement, 'Email is required');
    } else if (!isValidEmail(email)) {
        displayError(errorElement, 'Invalid email format');
    } else {
        clearError(errorElement);
        inputElement.style.border = ''; // Remove border when valid
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateComment(comment, errorElement, inputElement) {
    if (comment === '') {
        displayError(errorElement, 'Comment is required');
    } else if (comment.length <= 2) {
        displayError(errorElement, 'Comment must be more than 4 characters');
    } else {
        clearError(errorElement);
        inputElement.style.border = '';
    }
}

function clearError(errorElement) {
    errorElement.innerHTML = '';
}

function displayError(errorElement, errorMessage) {
    errorElement.innerHTML = errorMessage;
    errorElement.style.color = 'red';
}

function clearErrors() {
    clearError(nameError);
    clearError(emailError);
    clearError(commentError);
}

//liking system
