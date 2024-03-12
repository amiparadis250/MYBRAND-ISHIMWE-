document.getElementById('myForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value;

    // Reset error messages
    document.getElementById('nameError').innerHTML = '';
    document.getElementById('emailError').innerHTML = '';

    // Validate Name
    if (name === '') {
        document.getElementById('nameError').innerHTML = 'Name is required';
        event.preventDefault();
        return;
    } else if (/[\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(name)) {
        document.getElementById('nameError').innerHTML = 'Name cannot contain numbers or special characters';
        event.preventDefault();
        return;
    }

    // Validate Email
    if (email === '') {
        document.getElementById('emailError').innerHTML = 'Email is required';
        event.preventDefault();
        return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('emailError').innerHTML = 'Enter a valid email address';
        event.preventDefault();
        return;
    }

    // Disable the button during fetch
    const sendButton = document.getElementById('sendButton');
    
    sendButton.disabled = true;
    
    const successMessage = document.getElementById('successMessage');
    
    
    successMessage.style.display = 'none';
    

    try {
        const response = await fetch('https://mybrand-ishimwe-be-halx.onrender.com/api/queries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                guestName: name,
                guestQuery: message,
                email: email,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Show success message and reset form
        successMessage.style.display = 'inline';
        sendButton.disabled = false;
        document.getElementById('myForm').reset();

        // Hide success message after 30 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 10000);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert(`Error: Unable to send query. ${error.message}`);
        sendButton.disabled = false;
    } 
        

    event.preventDefault();
});