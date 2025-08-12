function displayMessage(message, isSuccess) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = isSuccess ? 'success' : 'error';
}
 
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
 
    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('login-section').style.display = 'none';
                document.getElementById('signup-section').style.display = 'none';
                document.getElementById('booking-section').style.display = 'block';
                displayMessage('Logged in successfully', true);
            } else {
                displayMessage(data.message, false);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            displayMessage('Internal Server Error', false);
        });
});
 
document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const phone = document.getElementById('signup-phone').value;
 
    fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, phone })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayMessage('Account created successfully. Please login.', true);
            } else {
                displayMessage(data.message, false);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            displayMessage('Internal Server Error', false);
        });
});
 
document.getElementById('booking-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const date = document.getElementById('date').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
 
    fetch('/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, date, startTime, endTime })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayMessage('Appointment booked successfully', true);
            } else {
                displayMessage(data.message, false);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            displayMessage('Internal Server Error', false);
        });
});
 
document.getElementById('cancel-appointment').addEventListener('click', function () {
    const username = document.getElementById('login-username').value;
    const date = document.getElementById('date').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
 
    fetch('/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, date, startTime, endTime })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayMessage('Appointment canceled successfully', true);
            } else {
                displayMessage(data.message, false);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            displayMessage('Internal Server Error', false);
        });
});