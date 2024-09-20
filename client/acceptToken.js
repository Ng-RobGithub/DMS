// Function to show token input popup
function showTokenInput() {
    const tokenModal = document.createElement('div');
    tokenModal.setAttribute('id', 'tokenModal');
    tokenModal.innerHTML = `
        <div class="modal">
            <h2>Enter Your Token</h2>
            <input type="text" id="tokenInput" placeholder="Enter your token" />
            <button id="submitToken">Submit</button>
            <button id="closeModal">Close</button>
        </div>
    `;
    document.body.appendChild(tokenModal);

    // Event listeners
    document.getElementById('submitToken').addEventListener('click', handleTokenSubmit);
    document.getElementById('closeModal').addEventListener('click', () => {
        document.body.removeChild(tokenModal);
    });
}

// Function to handle token submission
async function handleTokenSubmit() {
    const token = document.getElementById('tokenInput').value;

    if (!token) {
        alert('Please enter a token');
        return;
    }

    try {
        const response = await fetch('/api/auth/validate-token', { // Adjust the endpoint as necessary
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.ok) {
            const data = await response.json();
            // Handle successful authentication (e.g., redirect)
            window.location.href = '/dashboard'; // Change to the desired page
        } else {
            alert('Invalid token, please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
}

// Show the token input when needed (e.g., after login)
showTokenInput();
