function login() {
    const userType = document.querySelector('input[name="userType"]:checked').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        document.getElementById('loginSection').style.display = 'none';
        document.querySelector('.superadmin-login-btn').style.display = 'none';
        if (userType === 'admin') {
            document.getElementById('adminDashboard').style.display = 'block';
        } else {
            document.getElementById('userDashboard').style.display = 'block';
            initializeMap();
        }
    } else {
        alert('Please enter both username and password');
    }
}

function logout() {
    document.getElementById('loginSection').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('userDashboard').style.display = 'none';
    document.getElementById('superAdminDashboard').style.display = 'none';
    document.querySelector('.superadmin-login-btn').style.display = 'block';
}

function showPickupRequests() {
    document.getElementById('storageMonitoring').style.display = 'none';
    document.getElementById('pickupTable').style.display = 'block';
}

function showStorageMonitoring() {
    document.getElementById('pickupTable').style.display = 'none';
    document.getElementById('storageMonitoring').style.display = 'block';
}

// Add these constants at the top of your file
const BANGALORE_COORDS = { lat: 12.9716, lng: 77.5946 };
const coldStorages = [
    {
        id: 1,
        name: "Central Cold Storage",
        location: { lat: 12.9716, lng: 77.5946 },
        distance: "0.5",
        temperature: "-18°C",
        availability: "80%",
        compartments: [
            { id: "C1", temperature: -18, maxCapacity: 5000, available: true },
            { id: "C2", temperature: -20, maxCapacity: 3000, available: true }
        ]
    },
    {
        id: 2,
        name: "Metro Cold Storage",
        location: { lat: 12.9815, lng: 77.6074 },
        distance: "2.3",
        temperature: "-20°C",
        availability: "45%",
        compartments: [
            { id: "M1", temperature: -20, maxCapacity: 4000, available: true },
            { id: "M2", temperature: -18, maxCapacity: 3500, available: true }
        ]
    },
    {
        id: 3,
        name: "City Cold Chain",
        location: { lat: 12.9622, lng: 77.5745 },
        distance: "1.8",
        temperature: "-15°C",
        availability: "60%",
        compartments: [
            { id: "CC1", temperature: -15, maxCapacity: 6000, available: true },
            { id: "CC2", temperature: -18, maxCapacity: 4500, available: true }
        ]
    }
];

let map;
let markers = [];

function initializeMap() {
    displayStorageList();
}

function displayStorageList() {
    const storageCards = document.getElementById('storageCards');
    storageCards.innerHTML = coldStorages.map(storage => `
        <div class="storage-card" onclick="showStorageDetails(${storage.id})">
            <h4>${storage.name}</h4>
            <div class="storage-info-item">
                <span>Distance:</span>
                <span>${storage.distance} km</span>
            </div>
            <div class="storage-info-item">
                <span>Temperature:</span>
                <span>${storage.temperature}</span>
            </div>
            <div class="storage-info-item">
                <span>Availability:</span>
                <span>${storage.availability}</span>
            </div>
        </div>
    `).join('');
}

function showStorageDetails(storageId) {
    const storage = coldStorages.find(s => s.id === storageId);
    if (!storage) return;

    // Update active state in storage list
    document.querySelectorAll('.storage-card').forEach(card => {
        card.classList.remove('active');
    });
    
    const selectedCard = document.querySelector(`.storage-card:nth-child(${storageId})`);
    if (selectedCard) {
        selectedCard.classList.add('active');
    }

    // Show storage details
    const storageDetails = document.getElementById('storageDetails');
    storageDetails.style.display = 'block';
    document.getElementById('storageName').textContent = storage.name;
    document.getElementById('storageDistance').textContent = `Distance: ${storage.distance} km`;

    // Update compartment list
    updateCompartmentList(storage);
}

function updateCompartmentList(storage) {
    const compartmentList = document.getElementById('compartmentList');
    compartmentList.innerHTML = '';

    storage.compartments.forEach(comp => {
        if (comp.available) {
            const compartmentCard = document.createElement('div');
            compartmentCard.className = 'compartment-card';
            compartmentCard.innerHTML = `
                <h6>Compartment ${comp.id}</h6>
                <p>Temperature: ${comp.temperature}°C</p>
                <p>Max Capacity: ${comp.maxCapacity} kg</p>
            `;
            compartmentCard.onclick = () => selectCompartment(comp.id);
            compartmentList.appendChild(compartmentCard);
        }
    });
}

function selectCompartment(compartmentId) {
    document.querySelectorAll('.compartment-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    document.getElementById('selectedCompartment').value = compartmentId;
    document.getElementById('requestForm').style.display = 'block';
}

function submitRequest(event) {
    event.preventDefault();
    const compartment = document.getElementById('selectedCompartment').value;
    const capacity = document.getElementById('requestCapacity').value;
    const duration = document.getElementById('storageDuration').value;

    // Here you would typically send this data to your backend
    alert(`Request submitted for:\nCompartment: ${compartment}\nCapacity: ${capacity}kg\nDuration: ${duration} days`);
}

// Add these new functions
function showRegistration() {
    const userType = document.querySelector('input[name="userType"]:checked').value;
    document.getElementById('loginSection').style.display = 'none';
    document.querySelector('.superadmin-login-btn').style.display = 'none';
    if (userType === 'admin') {
        document.getElementById('adminRegistration').style.display = 'flex';
    } else {
        document.getElementById('customerRegistration').style.display = 'flex';
    }
}

function showLogin() {
    document.getElementById('adminRegistration').style.display = 'none';
    document.getElementById('customerRegistration').style.display = 'none';
    document.getElementById('loginSection').style.display = 'flex';
    document.querySelector('.superadmin-login-btn').style.display = 'block';
}

function submitAdminRegistration(event) {
    event.preventDefault();
    const form = event.target;
    
    // Collect form data
    const formData = {
        firstName: form.querySelector('[name="firstName"]').value,
        lastName: form.querySelector('[name="lastName"]').value,
        email: form.querySelector('[name="email"]').value,
        companyName: form.querySelector('[name="companyName"]').value,
        licenseNumber: form.querySelector('[name="licenseNumber"]').value
    };
    
    // Here you would typically send this data to your backend
    // For now, we'll simulate adding it to the superadmin dashboard
    const requestCard = createRequestCard(formData);
    document.getElementById('coldStorageRequests').appendChild(requestCard);
    
    alert('Your registration has been submitted for verification. You will receive login credentials via email once approved.');
    showLogin();
}

// Helper function to create request card
function createRequestCard(data) {
    const card = document.createElement('div');
    card.className = 'request-card';
    card.dataset.license = data.licenseNumber;
    
    card.innerHTML = `
        <div class="request-header">
            <h4>${data.companyName}</h4>
            <span class="request-date">${new Date().toISOString().split('T')[0]}</span>
        </div>
        <div class="request-details">
            <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>License No:</strong> ${data.licenseNumber}</p>
            <p data-email="${data.email}"><strong>Email:</strong> ${data.email}</p>
        </div>
        <div class="request-actions">
            <button class="approve-btn" onclick="handleRequest('approve', '${data.licenseNumber}')">Approve</button>
            <button class="reject-btn" onclick="handleRequest('reject', '${data.licenseNumber}')">Reject</button>
        </div>
    `;
    
    return card;
}

// Add this to handle file upload display
document.getElementById('licensePhoto')?.addEventListener('change', function(e) {
    const fileName = e.target.files[0]?.name || 'No file chosen';
    e.target.nextElementSibling.querySelector('.upload-text').textContent = fileName;
});

// Add these functions at the end of your script.js file

function showSuperAdminLogin() {
    document.getElementById('superAdminLoginModal').style.display = 'block';
}

function closeSuperAdminLogin() {
    document.getElementById('superAdminLoginModal').style.display = 'none';
}

function loginSuperAdmin() {
    const username = document.getElementById('superAdminUsername').value;
    const password = document.getElementById('superAdminPassword').value;

    if (username === '12345678' && password === '12345678') {
        document.getElementById('superAdminLoginModal').style.display = 'none';
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('superAdminDashboard').style.display = 'block';
        document.querySelector('.superadmin-login-btn').style.display = 'none';
    } else {
        alert('Invalid credentials');
    }
}

function handleRequest(action, licenseNo) {
    if (action === 'approve') {
        // Get the request details from the card
        const requestCard = document.querySelector(`[data-license="${licenseNo}"]`);
        const email = requestCard.querySelector('[data-email]').dataset.email;
        
        // Generate credentials
        const credentials = generateCredentials();
        
        // Simulate sending email
        console.log(`Sending credentials to ${email}:`, credentials);
        
        alert(`Cold Storage approved and added to the platform.
        Username: ${credentials.username}
        Password: ${credentials.password}
        An email has been sent to ${email} with these credentials.`);
        
        // Here you would typically make an API call to:
        // 1. Save the credentials in your database
        // 2. Send the email
        // 3. Update the request status
    } else {
        alert(`Cold Storage registration rejected (License: ${licenseNo})`);
    }
    
    // Remove the request card from the dashboard
    const requestCard = document.querySelector(`[data-license="${licenseNo}"]`);
    requestCard.remove();
}

function toggleStorageStatus(licenseNo) {
    const btn = event.target;
    const currentStatus = btn.textContent;
    const newStatus = currentStatus === 'Suspend' ? 'Activate' : 'Suspend';
    btn.textContent = newStatus;
    
    const statusCell = btn.closest('tr').querySelector('.status-badge');
    statusCell.textContent = currentStatus === 'Suspend' ? 'Suspended' : 'Active';
    statusCell.className = `status-badge ${currentStatus === 'Suspend' ? 'suspended' : 'active'}`;
    
    // Here you would typically make an API call to update the status
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('superAdminLoginModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Add these variables at the top of your file
let otpTimer;
const OTP_TIMEOUT = 30;
let registrationData = null;

// Update the customer registration function
function submitCustomerRegistration(event) {
    event.preventDefault();
    const form = event.target;
    
    // Store the registration data
    registrationData = {
        firstName: form.querySelector('input[type="text"]').value,
        lastName: form.querySelectorAll('input[type="text"]')[1].value,
        email: form.querySelector('input[type="email"]').value,
        username: form.querySelectorAll('input[type="text"]')[2].value,
        password: form.querySelector('input[type="password"]').value
    };

    // Show OTP modal and start timer
    document.getElementById('otpModal').style.display = 'block';
    startOtpTimer();
    
    // Simulate sending OTP (replace with actual API call)
    console.log('Sending OTP to:', registrationData.email);
}

function startOtpTimer() {
    let timeLeft = OTP_TIMEOUT;
    const timerDisplay = document.getElementById('timerCount');
    const resendButton = document.getElementById('resendOtpBtn');
    
    resendButton.disabled = true;
    document.getElementById('otpTimer').style.display = 'block';
    
    clearInterval(otpTimer);
    otpTimer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(otpTimer);
            document.getElementById('otpTimer').style.display = 'none';
            resendButton.disabled = false;
        }
    }, 1000);
}

function resendOTP() {
    // Simulate resending OTP
    console.log('Resending OTP to:', registrationData.email);
    startOtpTimer();
}

function verifyOTP() {
    const otpInputs = document.querySelectorAll('.otp-digit');
    const otp = Array.from(otpInputs).map(input => input.value).join('');
    
    if (otp.length === 6) {
        // Simulate OTP verification (replace with actual API call)
        console.log('Verifying OTP:', otp);
        
        // Clear timer and close modal
        clearInterval(otpTimer);
        document.getElementById('otpModal').style.display = 'none';
        
        // Clear registration data
        registrationData = null;
        
        // Show success message and redirect to login
        alert('Registration successful! You can now login with your credentials.');
        showLogin();
    } else {
        alert('Please enter a valid 6-digit OTP');
    }
}

// Add OTP input handling
document.addEventListener('DOMContentLoaded', function() {
    const otpInputs = document.querySelectorAll('.otp-digit');
    
    otpInputs.forEach((input, index) => {
        // Handle input
        input.addEventListener('input', (e) => {
            if (e.target.value) {
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            }
        });
        
        // Handle backspace
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
        
        // Handle paste
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const paste = e.clipboardData.getData('text');
            const digits = paste.match(/\d/g);
            
            if (digits) {
                otpInputs.forEach((input, i) => {
                    if (digits[i]) {
                        input.value = digits[i];
                        if (i < otpInputs.length - 1) {
                            otpInputs[i + 1].focus();
                        }
                    }
                });
            }
        });
    });
});

// Add this function to generate random credentials
function generateCredentials() {
    const username = 'admin_' + Math.random().toString(36).substr(2, 8);
    const password = Math.random().toString(36).substr(2, 12);
    return { username, password };
} 