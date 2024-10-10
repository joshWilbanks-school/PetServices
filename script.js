let selectedPetType = '';

// Show the login/signup modal on page load
window.onload = function () {
    document.getElementById('auth-modal').style.display = 'block';
}

// Handle login
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    if (username && password) {
        document.getElementById('auth-modal').style.display = 'none'; // Hide modal
        document.getElementById('navbar').style.display = 'block'; // Show navbar
        alert("Welcome, " + username + "!");
    } else {
        alert("Please enter valid credentials.");
    }
}

// Handle signup
function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    if (username && password) {
        alert("Account created successfully. Please log in.");
        // Clear the signup form after successful signup
        document.getElementById('signup-username').value = '';
        document.getElementById('signup-password').value = '';
    } else {
        alert("Please fill out all fields.");
    }
}

// Show the selected section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';

    // Load reviews based on selected pet type when the reviews section is shown
    if (sectionId === 'reviews') {
        loadReviews();
    }
}

// Handle pet type selection
function selectPetType(type) {
    selectedPetType = type;
    updateServiceDescriptions();
    showSection('grooming');
}

// Update service descriptions based on pet type
function updateServiceDescriptions() {
    if (selectedPetType === 'cat') {
        document.getElementById('grooming-description').innerText = "We offer specialized grooming services for cats including bathing, nail trimming, and fur brushing.";
        document.getElementById('walking-description').innerText = "Our cat walking services include playtime and outdoor exploration.";
        document.getElementById('sitting-description').innerText = "Pet sitting for cats includes feeding, litter box maintenance, and companionship.";
    } else if (selectedPetType === 'dog') {
        document.getElementById('grooming-description').innerText = "We offer dog grooming services including bathing, fur trimming, and nail clipping.";
        document.getElementById('walking-description').innerText = "Our dog walking services provide exercise and companionship for your furry friend.";
        document.getElementById('sitting-description').innerText = "Dog sitting services include feeding, playtime, and companionship.";
    }
}

// Load reviews based on pet type
function loadReviews() {
    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = ''; // Clear existing reviews

    // Sample reviews based on pet type
    const dogReviews = [
        { name: 'Artemisia', rating: 5, review: 'Excellent service! My dog loved the grooming.' },
        { name: 'Balthazar', rating: 4, review: 'Great experience, would recommend!' },
        { name: 'Cressida', rating: 5, review: 'My dog came back looking fabulous!' },
    ];

    const catReviews = [
        { name: 'Dorian', rating: 5, review: 'The cat grooming service was superb!' },
        { name: 'Elysia', rating: 3, review: 'Decent service, but my cat was a bit anxious.' },
        { name: 'Thaddeus', rating: 4, review: 'Great care taken for my kitty, thank you!' },
    ];

    const reviews = selectedPetType === 'dog' ? dogReviews : catReviews;

    reviews.forEach(review => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${review.name}</strong> <span class="star-rating">${'★'.repeat(review.rating)}</span><p>${review.review}</p>`;
        reviewsList.appendChild(li);
    });
}
//  Sidebar that collapses

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('collapsed');
}