document.querySelector('form').addEventListener('submit', function (event) {
    // Reset error messages
    document.getElementById('nameError').innerHTML = '';
    document.getElementById('emailError').innerHTML = '';

    // Validate Name
    const name = document.getElementById('name').value.trim();
    if (name === '') {
        document.getElementById('nameError').innerHTML = 'Name is required';
        event.preventDefault();
        return false;
    } else if (/[\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(name)) {
        document.getElementById('nameError').innerHTML = 'Name cannot contain numbers or special characters';
        event.preventDefault();
        return false;
    }

    // Validate Email
    const email = document.getElementById('email').value.trim();
    if (email === '') {
        document.getElementById('emailError').innerHTML = 'Email is required';
        event.preventDefault();
        return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('emailError').innerHTML = 'Enter a valid email address';
        event.preventDefault();
        return false;
    }

    // Disable the button during fetch
    let sendButton = document.getElementById('sendButton');
    sendButton.disabled = true;

    // Fetch API
    const guestName = name;
    const guestQuery = document.getElementById('message').value;
    const userEmail = email;
    
 try{
    fetch('https://mybrand-ishimwe-be-halx.onrender.com/api/queries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            guestName: guestName,
            guestQuery: guestQuery,
            email: userEmail,
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
         alert("Messages successfully Received");
            
            sendButton.disabled = false;
        })
    }
    catch{
            console.error('There was a problem with the fetch operation:', error);
            alert('Error: Unable to send query. Please try again later.'); 
            sendButton.disabled = false;
        }
        finally{


        }

    event.preventDefault(); 
});