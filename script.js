let selectedPetType = '';
const users = {}; // To store users' information

// Show the login/signup modal on page load
window.onload = function () {
    document.getElementById('auth-modal').style.display = 'block';
}
// Function to select the pet type
function selectPetType(type) {
    selectedPetType = type; // Save the selected pet type
    alert(`You selected ${type === "cat" ? "Cat Services" : "Dog Services"}.`);
}


// Function to show a specific section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.getElementsByClassName("content-section");
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }

    // Check if a pet type is required for the section
    if (['grooming', 'walking', 'sitting'].includes(sectionId)) {
        if (!selectedPetType) {
            alert("Please select a pet type first!");
            showSection("pet-type-section"); // Keep the user on the pet type selection page
            return;
        }
    }

    // Display the appropriate section based on pet type for Grooming, Walking, or Sitting
    if (sectionId === "grooming") {
        if (selectedPetType === "cat") {
            document.getElementById("cat-grooming-section").style.display = "block";
        } else if (selectedPetType === "dog") {
            document.getElementById("dog-grooming-section").style.display = "block";
        }
    } else if (sectionId === "walking") {
        if (selectedPetType === "cat") {
            document.getElementById("cat-walking-section").style.display = "block";
        } else if (selectedPetType === "dog") {
            document.getElementById("dog-walking-section").style.display = "block";
        }
    } else if (sectionId === "sitting") {
        if (selectedPetType === "cat") {
            document.getElementById("cat-sitting-section").style.display = "block";
        } else if (selectedPetType === "dog") {
            document.getElementById("dog-sitting-section").style.display = "block";
        }
    } else {
        // Show the specified section if no pet type is required
        const sectionToShow = document.getElementById(sectionId);
        if (sectionToShow) {
            sectionToShow.style.display = "block";
        }
    }
}

// Function to initialize the first slide for each section
document.addEventListener("DOMContentLoaded", function () {
    showCatSlides(catSlideIndex); // Cat Grooming
    showDogSlides(dogSlideIndex, true); // Dog Grooming
    showCatWalkingSlides(catWalkingSlideIndex); // Cat Walking
    showDogWalkingSlides(dogWalkingSlideIndex); // Dog Walking
    showCatSittingSlides(catSittingSlideIndex); // Cat Sitting
    showDogSittingSlides(dogSittingSlideIndex); // Dog Sitting
});

let catSlideIndex = 1;
showCatSlides(catSlideIndex);

// Function to change slides using arrows
function changeCatSlide(n) {
    showCatSlides(catSlideIndex += n);
}

// Function to go to the specific slide
function currentCatSlide(n) {
    showCatSlides(catSlideIndex = n);
}
let catWalkingSlideIndex = 1; // Initialize the slide index

// Function to reset and show the first slide when entering the cat-walking-section
function resetCatWalkingSlideshow() {
    catWalkingSlideIndex = 1; // Reset the index to the first slide
    showCatWalkingSlides(catWalkingSlideIndex); // Display the first slide
}

// Function to navigate slides using the arrows
function changeCatWalkingSlide(n) {
    showCatWalkingSlides(catWalkingSlideIndex += n); // Increment or decrement the slide index
}

// Function to navigate to a specific slide using dots
function currentCatWalkingSlide(n) {
    showCatWalkingSlides(catWalkingSlideIndex = n); // Set the slide index to the selected slide
}

// Function to display the current slide
function showCatWalkingSlides(n) {
    let i;
    let slides = document.getElementsByClassName("cat-walking-slide"); // Get all slides
    let dots = document.getElementsByClassName("cat-walking-dot"); // Get all dots

    // Loop the slideshow: if n > total slides, reset to the first slide
    if (n > slides.length) {
        catWalkingSlideIndex = 1;
    }
    // Loop the slideshow: if n < 1, reset to the last slide
    if (n < 1) {
        catWalkingSlideIndex = slides.length;
    }

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove the "active" class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show the first slide immediately and set the active dot
    slides[catWalkingSlideIndex - 1].style.display = "block";
    if (dots.length > 0) {
        dots[catWalkingSlideIndex - 1].className += " active";
    }
}


// Function to display the current slide
function showCatSlides(n) {
    let i;
    let slides = document.getElementsByClassName("cat-slide");
    let dots = document.getElementsByClassName("cat-dot");
    if (n > slides.length) {
        catSlideIndex = 1; // Loop back to the first slide
    }
    if (n < 1) {
        catSlideIndex = slides.length; // Loop back to the last slide
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; // Hide all slides
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", ""); // Remove active class from dots
    }
    slides[catSlideIndex - 1].style.display = "block"; // Show the current slide
    dots[catSlideIndex - 1].className += " active"; // Add active class to the current dot
}
let dogSlideIndex = 1;

// Function to reset and display the first slide when entering the dog grooming section
function resetDogSlides() {
    dogSlideIndex = 1; // Reset to the first slide
    showDogSlides(dogSlideIndex, true); // Display the first slide immediately
}


// Function to change slides using arrows
function changeDogSlide(n) {
    showDogSlides(dogSlideIndex += n, false);
}

// Function to go to a specific slide
function currentDogSlide(n) {
    showDogSlides(dogSlideIndex = n, false);
}

// Function to display the current slide
function showDogSlides(n, isReset) {
    let i;
    let slides = document.getElementsByClassName("dog-slide");
    let dots = document.getElementsByClassName("dog-dot");

    // Ensure slide index loops properly
    if (n > slides.length) {
        dogSlideIndex = 1; // Loop back to the first slide
    }
    if (n < 1) {
        dogSlideIndex = slides.length; // Loop back to the last slide
    }

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove active class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show the first slide immediately if resetting
    if (isReset) {
        slides[0].style.display = "block";
        dots[0].className += " active";
    } else {
        // Show the current slide and highlight the corresponding dot
        slides[dogSlideIndex - 1].style.display = "block";
        dots[dogSlideIndex - 1].className += " active";
    }
}

let catSittingSlideIndex = 1; // Initialize the cat sitting slide index
let dogSittingSlideIndex = 1; // Initialize the dog sitting slide index

// Cat Sitting Functions
function changeCatSittingSlide(n) {
    showCatSittingSlides(catSittingSlideIndex += n);
}

function currentCatSittingSlide(n) {
    showCatSittingSlides(catSittingSlideIndex = n);
}
// Ensure the first Cat Sitting slide appears immediately
document.addEventListener("DOMContentLoaded", function () {
    showCatSittingSlides(catSittingSlideIndex); // Display the first slide on page load
});
// Ensure the first Cat Grooming slide appears immediately
document.addEventListener("DOMContentLoaded", function () {
    showCatSlides(catSlideIndex); // Display the first slide on page load
});
// Ensure the first Dog Grooming slide appears immediately
document.addEventListener("DOMContentLoaded", function () {
    showDogSlides(dogSlideIndex, true); // Display the first slide on page load
});
// Ensure the first Cat Walking slide appears immediately
document.addEventListener("DOMContentLoaded", function () {
    showCatWalkingSlides(catWalkingSlideIndex); // Display the first slide on page load
});

// Ensure the first Dog Walking slide appears immediately
document.addEventListener("DOMContentLoaded", function () {
    showDogWalkingSlides(dogWalkingSlideIndex); // Display the first slide on page load
});
// Ensure the first Cat Sitting slide appears immediately
document.addEventListener("DOMContentLoaded", function () {
    showCatSittingSlides(catSittingSlideIndex); // Display the first slide on page load
});
// Ensure the first Dog Sitting slide appears immediately
document.addEventListener("DOMContentLoaded", function () {
    showDogSittingSlides(dogSittingSlideIndex); // Display the first slide on page load
});


function showCatSittingSlides(n) {
    let slides = document.getElementsByClassName("cat-sitting-slide");
    let dots = document.getElementsByClassName("cat-sitting-dot");

    if (n > slides.length) catSittingSlideIndex = 1;
    if (n < 1) catSittingSlideIndex = slides.length;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[catSittingSlideIndex - 1].style.display = "block";
    dots[catSittingSlideIndex - 1].className += " active";
}

// Dog Sitting Functions
function changeDogSittingSlide(n) {
    showDogSittingSlides(dogSittingSlideIndex += n);
}

function currentDogSittingSlide(n) {
    showDogSittingSlides(dogSittingSlideIndex = n);
}

function showDogSittingSlides(n) {
    let slides = document.getElementsByClassName("dog-sitting-slide");
    let dots = document.getElementsByClassName("dog-sitting-dot");

    if (n > slides.length) dogSittingSlideIndex = 1;
    if (n < 1) dogSittingSlideIndex = slides.length;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[dogSittingSlideIndex - 1].style.display = "block";
    dots[dogSittingSlideIndex - 1].className += " active";
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
    const sideBar = document.getElementById('sidebar');

    // Toggle the collapsed class on the navbar
    navbar.classList.toggle('collapsed');

    // Ensure the main content adjusts accordingly
    mainContent.classList.toggle('collapsed');

    //toggle the side bar to closed
    sideBar.classList.toggle('collapsed');

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

// Function to reset and immediately show the first slide
function resetCatWalkingSlideshow() {
    catWalkingSlideIndex = 1; // Set the index to the first slide
    showCatWalkingSlides(catWalkingSlideIndex); // Explicitly show the first slide
}

// Function to navigate slides using the arrows
function changeCatWalkingSlide(n) {
    showCatWalkingSlides(catWalkingSlideIndex += n); // Increment or decrement the slide index
}

// Function to navigate to a specific slide using dots
function currentCatWalkingSlide(n) {
    showCatWalkingSlides(catWalkingSlideIndex = n); // Set the slide index to the selected slide
}

// Function to display the current slide
function showCatWalkingSlides(n) {
    let slides = document.getElementsByClassName("cat-walking-slide"); // Get all slides
    let dots = document.getElementsByClassName("cat-walking-dot"); // Get all dots

    // Handle looping: reset to first slide if index exceeds the total slides
    if (n > slides.length) {
        catWalkingSlideIndex = 1;
    }

    // Handle looping: reset to last slide if index goes below 1
    if (n < 1) {
        catWalkingSlideIndex = slides.length;
    }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove the "active" class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show the current slide and set the corresponding dot as active
    slides[catWalkingSlideIndex - 1].style.display = "block";
    if (dots.length > 0) {
        dots[catWalkingSlideIndex - 1].className += " active";
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
// Reset walking section when the user navigates to it
function resetWalkingSection() {
    if (selectedPetType === "cat") {
        showWalkingSection("cat");
    } else if (selectedPetType === "dog") {
        showWalkingSection("dog");
    } else {
        alert("Please select a pet type first!");
    }
}

// Function to show the walking section for the selected pet type
function showWalkingSection(type) {
    // Hide all sections first
    const sections = document.getElementsByClassName("content-section");
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }

    // Show the appropriate walking section
    if (type === "cat") {
        document.getElementById("cat-walking-section").style.display = "block";
    } else if (type === "dog") {
        document.getElementById("dog-walking-section").style.display = "block";
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
// Function to reset and show the first slide in Cat Walking section
function resetCatWalkingSlideshow() {
    catWalkingSlideIndex = 1; // Reset to the first slide
    showCatWalkingSlides(catWalkingSlideIndex); // Display the first slide
}

// Function to navigate slides in Cat Walking section
function changeCatWalkingSlide(n) {
    showCatWalkingSlides(catWalkingSlideIndex += n);
}

// Function to navigate to a specific slide in Cat Walking section
function currentCatWalkingSlide(n) {
    showCatWalkingSlides(catWalkingSlideIndex = n);
}

// Function to display the current slide in Cat Walking section
function showCatWalkingSlides(n) {
    let slides = document.getElementsByClassName("cat-walking-slide");
    let dots = document.getElementsByClassName("cat-walking-dot");

    if (n > slides.length) {
        catWalkingSlideIndex = 1; // Loop back to the first slide
    }
    if (n < 1) {
        catWalkingSlideIndex = slides.length; // Loop back to the last slide
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; // Hide all slides
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", ""); // Remove active class from all dots
    }

    slides[catWalkingSlideIndex - 1].style.display = "block"; // Show the current slide
    if (dots.length > 0) {
        dots[catWalkingSlideIndex - 1].className += " active"; // Highlight the active dot
    }
}

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function changeSlide(n) {
    slideIndex += n;

    // Loop back if going beyond available slides
    if (slideIndex > 3) {
        slideIndex = 1;
    } else if (slideIndex < 1) {
        slideIndex = 3;
    }

    showSlides(slideIndex);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function showSection(sectionId) {
    // Hide all content sections first
    const sections = document.getElementsByClassName("content-section");
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }

    // Special handling for grooming section
    if (sectionId === "grooming") {
        if (selectedPetType === "") {
            alert("Please select a pet type first!");
            return;
        }

        if (selectedPetType === 'cat') {
            document.getElementById("cat-grooming-section").style.display = "block";
        } else if (selectedPetType === 'dog') {
            document.getElementById("dog-grooming-section").style.display = "block";
        }
    }

    // Special handling for walking section
    if (sectionId === "walking") {
        if (selectedPetType === "dog") {
            resetDogWalkingSlideshow(); // Reset and display the first slide of the Dog Walking section
            document.getElementById("dog-walking-section").style.display = "block";
        } else if (selectedPetType === "cat") {
            resetCatWalkingSlideshow(); // Reset and display the first slide of the Cat Walking section
            document.getElementById("cat-walking-section").style.display = "block";
        } else {
            alert("Please select a pet type first!");
            return;
        }
    } else {
        // Show the specified section normally
        const sectionToShow = document.getElementById(sectionId);
        if (sectionToShow) {
            sectionToShow.style.display = "block";
        }
    }
}


// Show the selected section
let dogWalkingSlideIndex = 1; // Initialize the slide index

// Function to reset and show the first slide when entering the dog-walking-section
function resetDogWalkingSlideshow() {
    dogWalkingSlideIndex = 1; // Reset the index to the first slide
    showDogWalkingSlides(dogWalkingSlideIndex); // Display the first slide
}

// Function to navigate slides using the arrows
function changeDogWalkingSlide(n) {
    showDogWalkingSlides(dogWalkingSlideIndex += n); // Increment or decrement the slide index
}

// Function to navigate to a specific slide using dots
function currentDogWalkingSlide(n) {
    showDogWalkingSlides(dogWalkingSlideIndex = n); // Set the slide index to the selected slide
}

// Function to display the current slide
function showDogWalkingSlides(n) {
    let i;
    let slides = document.getElementsByClassName("dog-walking-slide"); // Get all slides
    let dots = document.getElementsByClassName("dog-walking-dot"); // Get all dots

    // Loop the slideshow: if n > total slides, reset to the first slide
    if (n > slides.length) {
        dogWalkingSlideIndex = 1;
    }
    // Loop the slideshow: if n < 1, reset to the last slide
    if (n < 1) {
        dogWalkingSlideIndex = slides.length;
    }

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove the "active" class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show the current slide and set the corresponding dot as active
    slides[dogWalkingSlideIndex - 1].style.display = "block";
    dots[dogWalkingSlideIndex - 1].className += " active";
}

// Function to select the pet type
function selectPetType(type) {
    selectedPetType = type; // Store the selected pet type
    alert(`You selected ${type === "cat" ? "Cat Services" : "Dog Services"}.`);
}
if (sectionId === "walking") {
    if (selectedPetType === "dog") {
        resetDogWalkingSlideshow(); // Reset the slideshow to show the first slide
        document.getElementById("dog-walking-section").style.display = "block";
    } else if (selectedPetType === "cat") {
        document.getElementById("cat-walking-section").style.display = "block";
    }
}

// Function to show the appropriate section based on the navbar and pet type
function showSection(sectionId) {
    // Hide all sections first
    const sections = document.getElementsByClassName("content-section");
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }

    // Check if the section requires a pet type
    if (sectionId === "grooming" || sectionId === "walking" || sectionId === "sitting") {
        if (!selectedPetType) {
            alert("Please select a pet type first!");
            showSection("pet-type-section"); // Redirect to the pet type selection section
            return;
        }

        // Navigate to the appropriate section based on the pet type
        if (sectionId === "grooming") {
            if (selectedPetType === "cat") {
                document.getElementById("cat-grooming-section").style.display = "block";
            } else if (selectedPetType === "dog") {
                document.getElementById("dog-grooming-section").style.display = "block";
            }
        } else if (sectionId === "walking") {
            if (selectedPetType === "cat") {
                document.getElementById("cat-walking-section").style.display = "block";
            } else if (selectedPetType === "dog") {
                document.getElementById("dog-walking-section").style.display = "block";
            }
        } else if (sectionId === "sitting") {
            if (selectedPetType === "cat") {
                document.getElementById("cat-sitting-section").style.display = "block";
            } else if (selectedPetType === "dog") {
                document.getElementById("dog-sitting-section").style.display = "block";
            }
        }
    } else {
        // Show non-pet-specific sections (if added later)
        const sectionToShow = document.getElementById(sectionId);
        if (sectionToShow) {
            sectionToShow.style.display = "block";
        }
    }
}

function selectPetType(type) {
    selectedPetType = type;

    // Highlight the selected pet type
    const petTypeLinks = document.querySelectorAll('#navbar li a');
    petTypeLinks.forEach(link => {
        if (link.textContent.toLowerCase().includes(type)) {
            link.classList.add('active'); // Add active class to the selected link
        } else {
            link.classList.remove('active'); // Remove active class from others
        }
    });

    // Update the service descriptions to show the relevant grooming section
    updateServiceDescriptions();
} 
function updateServiceDescriptions() {
    if (selectedPetType === "") {
        alert("Please select a pet type first!");
        return;
    }

    // Hide all other content sections first
    const sections = document.getElementsByClassName("content-section");
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }

    // Show the appropriate grooming section based on the selected pet type
    if (selectedPetType === 'cat') {
        document.getElementById("cat-grooming-section").style.display = "block";
    } else if (selectedPetType === 'dog') {
        document.getElementById("dog-grooming-section").style.display = "block";
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
