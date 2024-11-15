let selectedPetType = '';
const users = {}; // To store users' information

// Show the login/signup modal on page load
window.onload = function () {
    document.getElementById('auth-modal').style.display = 'block';
}

// Sidebar that collapses
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');

    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('collapsed');
    
    // Ensure the toggle button remains visible
    const toggleButton = document.querySelector('.toggle-btn');
    if (sidebar.classList.contains('collapsed')) {
        toggleButton.style.display = 'block';
    } else {
        toggleButton.style.display = 'block'; 
    }
}
function toggleNavbar() {
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('main-content');

    // Toggle the collapsed class on the navbar
    navbar.classList.toggle('collapsed');

    // Ensure the main content adjusts accordingly
    mainContent.classList.toggle('collapsed');
}

// Handle login
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (!users[username]) {
        alert("Username not found. Please try again.");
    } else if (users[username] === password) {
        document.getElementById('auth-modal').style.display = 'none'; // Hide modal
        document.getElementById('navbar').style.display = 'block'; // Show navbar
        document.getElementById('logout-btn').style.display = 'block'; // Show logout button
        alert("Welcome, " + username + "!");
    } else {
        alert("Incorrect password. Please try again.");
    }
}

// Handle signup
function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (username && password) {
        if (users[username]) {
            alert("Username already taken. Please choose a different username.");
        } else {
            users[username] = password; // Store username and password
            alert("Account created successfully. Please log in.");
            document.getElementById('signup-username').value = '';
            document.getElementById('signup-password').value = '';
        }
    } else {
        alert("Please fill out all fields.");
    }
}

// Logout function
function logout() {
    document.getElementById('navbar').style.display = 'none'; // Hide navbar
    document.getElementById('logout-btn').style.display = 'none'; // Hide logout button
    document.getElementById('auth-modal').style.display = 'block'; // Show modal

    // Clear all input fields
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
    document.getElementById('signup-username').value = '';
    document.getElementById('signup-password').value = '';
    document.getElementById('review-name').value = '';
    document.getElementById('review-rating').value = '5';
    document.getElementById('review-message').value = '';

    // Hide all content sections and show the welcome message
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById('welcome-section').style.display = 'block'; // Show the homepage welcome message

    alert("You have logged out successfully.");
}

// Show the selected section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    
    // Hide all sections
    sections.forEach(section => section.style.display = 'none');
    
    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';

    // Ensure the sidebar remains visible
    document.getElementById('navbar').style.display = 'block'; // Keep navbar visible
}

// Handle pet type selection
function selectPetType(type) {
    selectedPetType = type;

    // Highlight the selected pet type
    const petTypeLinks = document.querySelectorAll('#navbar li a');
    petTypeLinks.forEach(link => {
        if (link.textContent.toLowerCase() === type) {
            link.classList.add('active'); // Add active class to the selected link
        } else {
            link.classList.remove('active'); // Remove active class from others
        }
    });

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

let reviews = []; // Store reviews globally

function loadReviews() {
    // Sample data for initial reviews
    reviews = selectedPetType === 'dog' ? [
        { name: 'Artemisia', rating: 5, review: 'Excellent service! My dog loved the grooming.', date: new Date('2024-01-15') },
        { name: 'Balthazar', rating: 4, review: 'Great experience, would recommend!', date: new Date('2024-02-20') },
        { name: 'Cressida', rating: 5, review: 'My dog came back looking fabulous!', date: new Date('2024-03-10') }
    ] : [
        { name: 'Dorian', rating: 5, review: 'The cat grooming service was superb!', date: new Date('2024-04-05') },
        { name: 'Elysia', rating: 3, review: 'Decent service, but my cat was a bit anxious.', date: new Date('2024-05-12') },
        { name: 'Thaddeus', rating: 4, review: 'Great care taken for my kitty, thank you!', date: new Date('2024-06-22') }
    ];

    applyFiltersAndSorting();
}

function displayReviews(filteredReviews) {
    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = ''; // Clear existing reviews

    filteredReviews.forEach(review => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${review.name}</strong> <span class="star-rating">${'★'.repeat(review.rating)}</span>
                        <span>(${review.date.toLocaleDateString()})</span><p>${review.review}</p>`;
        reviewsList.appendChild(li);
    });
}

function sortReviews() {
    applyFiltersAndSorting(); // Reapply filters and sorting
}

function filterReviews() {
    applyFiltersAndSorting(); // Reapply filters and sorting
}

function applyFiltersAndSorting() {
    const sortOption = document.getElementById('sort-options').value;
    const filterRating = document.getElementById('filter-rating').value;

    // Filter reviews based on the selected rating
    let filteredReviews = reviews.filter(review =>
        filterRating === 'all' || review.rating === parseInt(filterRating)
    );

    // Sort filtered reviews
    if (sortOption === 'rating') {
        filteredReviews.sort((a, b) => b.rating - a.rating); // Sort by rating descending
    } else if (sortOption === 'date') {
        filteredReviews.sort((a, b) => b.date - a.date); // Sort by date descending
    }

    displayReviews(filteredReviews);
}

function addReview(event) {
    event.preventDefault(); // Prevent form submission from refreshing the page
    
    const name = document.getElementById('review-name').value;
    const rating = parseInt(document.getElementById('review-rating').value);
    const message = document.getElementById('review-message').value;
    const dateInput = document.getElementById('review-date').value;

    if (name && rating && message && dateInput) {
        // Convert date input to Date object
        const date = new Date(dateInput);

        // Create a new review object
        const newReview = {
            name: name,
            rating: rating,
            review: message,
            date: date
        };

        // Add the new review to the global reviews array
        reviews.push(newReview);

        // Clear the form fields
        document.getElementById('review-name').value = '';
        document.getElementById('review-rating').value = '5';
        document.getElementById('review-message').value = '';
        document.getElementById('review-date').value = '';

        // Reapply sorting and filtering to include the new review
        applyFiltersAndSorting();
    }
}
