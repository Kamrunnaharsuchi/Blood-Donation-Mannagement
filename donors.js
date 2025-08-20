// লগইন চেক
if (!localStorage.getItem('loggedInUser')) {
    window.location.href = "index.html"; // Login page redirect
}

// লগআউট ফাংশন
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = "index.html";
}

let donors = [];

// লোকাল স্টোরেজ থেকে ডেটা লোড
if (localStorage.getItem('donors')) {
    donors = JSON.parse(localStorage.getItem('donors'));
    displayDonors();
} else {
    fetch('donors.json')
        .then(res => res.json())
        .then(data => {
            donors = data;
            saveToLocalStorage();
            displayDonors();
        });
}

// Donor লিস্ট দেখানোর ফাংশন
function displayDonors() {
    let output = '';
    donors.forEach(donor => {
        output += `
            <div class="col-sm-6 col-md-4 col-lg-3 mb-3">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title text-danger">${donor.name}</h5>
                        <p class="card-text">Blood Group: <strong>${donor.bloodGroup}</strong></p>
                        <p class="card-text">Contact: ${donor.contact}</p>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById('donor-list').innerHTML = output;
}

// লোকাল স্টোরেজে সেভ করার ফাংশন
function saveToLocalStorage() {
    localStorage.setItem('donors', JSON.stringify(donors));
}

// Donor ফর্ম সাবমিট ইভেন্ট
document.getElementById('donorForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const bloodGroup = document.getElementById('bloodGroup').value.trim();
    const contact = document.getElementById('contact').value.trim();

    if (name && bloodGroup && contact) {
        const newDonor = { name, bloodGroup, contact };

        // আগের donors.json এর ডাটার মতোই লিস্টে যোগ
        donors.push(newDonor);

        // LocalStorage এ আপডেট
        saveToLocalStorage();

        // UI আপডেট
        displayDonors();

        // ফর্ম রিসেট
        document.getElementById('donorForm').reset();

        // Success alert
        alert("Donor added successfully!");
    } else {
        alert("Please fill all fields!");
    }
});
