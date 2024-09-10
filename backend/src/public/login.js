const BASE_URL = 'http://localhost:3000';

function registerUser() {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const username = document.getElementById('username').value;

    if (password !== confirmPassword) {
        displayFlashMessage('Passwords do not match', 'danger');
        return;
    }

    const user = {
        'email':email,
        'password':password,
        'username':username
    };

    fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                if (response.status === 409) {
                    displayFlashMessage('User already exists', 'danger');
                    return;
                } else if (response.status === 201) {
                    displayFlashMessage('User created successfully', 'success');
                    return;
                }
            }
        })
        .catch(error => {
            displayFlashMessage(error.message,'danger');
        });
}

document.getElementById('loginForm').addEventListener('submit', loginUser);

        async function loginUser(event) {
            event.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data);
                localStorage.setItem('authToken', data.token);
                window.location.href = '/';
                // Redirect or perform further actions
            } else {
                console.error('Login failed:', data);
                // Handle login failure
            }
        }

        async function fetchWithAuth(url, options = {}) {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.error('No auth token found');
                return;
            }

            const headers = {
                'Content-Type': 'application/json',
                ...options.headers,
                'Authorization': `Bearer ${token}`
            };

            const response = await fetch(url, {
                ...options,
                headers: headers
            });

            if (!response.ok) {
                console.error('Request failed:', await response.json());
            } else {
                const data = await response.json();
                console.log('Request successful:', data);
                return data;
            }
        }

function displayFlashMessage(message, type) {
    let flashMessage = document.createElement('div');
    flashMessage.classList.add('alert', 'alert-' + type);
    flashMessage.textContent = message;

    // Add fixed positioning to the flash message container
    let flashContainer = document.getElementById('flashMessages');
    flashContainer.style.position = 'fixed';
    flashContainer.style.top = '0';
    flashContainer.style.width = '100%';
    flashContainer.style.zIndex = '9999';

    flashContainer.appendChild(flashMessage);
    console.log(flashMessage);

    // Set a timeout to remove the flash message after 3 seconds
    setTimeout(function() {
        flashMessage.remove();
    }, 3000);
}