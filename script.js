function login() {
    const userType = document.querySelector('input[name="userType"]:checked').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        if (userType === 'admin') {
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('adminDashboard').style.display = 'block';
        } else {
            document.getElementById('loginSection').style.display = 'none';
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
    document.getElementById('pickupTable').style.display = 'none';
    document.getElementById('storageDetails').style.display = 'none';
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
}

function submitAdminRegistration(event) {
    event.preventDefault();
    // Here you would typically send the data to your backend
    alert('Your registration has been submitted for verification. You will receive login credentials via email once approved.');
    showLogin();
}

function submitCustomerRegistration(event) {
    event.preventDefault();
    // Here you would typically send the data to your backend
    alert('Registration successful! You can now login with your credentials.');
    showLogin();
}

// Add this to handle file upload display
document.getElementById('licensePhoto')?.addEventListener('change', function(e) {
    const fileName = e.target.files[0]?.name || 'No file chosen';
    e.target.nextElementSibling.querySelector('.upload-text').textContent = fileName;
}); 