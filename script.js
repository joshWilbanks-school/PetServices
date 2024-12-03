let selectedPetType = '';

<<<<<<< HEAD
// Show the login/signup modal on page load
window.onload = function () {
    document.getElementById('auth-modal').style.display = 'block';
}
=======
>>>>>>> cab7b64b92abd1d4157972e429912e9b7a2a35dd
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

<<<<<<< HEAD
=======
// Handle login
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (!users[username]) {
        alert("Username not found. Please try again.");
    } else if (users[username] === password) {
        document.getElementById('auth-modal').style.display = 'none'; // Hide modal
        document.getElementById('navbar').style.display = 'block'; // Show navbar
<<<<<<< HEAD
        document.getElementById('logout-btn').style.display = 'block'; // Show logout button
=======
>>>>>>> cab7b64b92abd1d4157972e429912e9b7a2a35dd
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
>>>>>>> 66bd825a135da09417682bc6d8be6f7648161531
// Logout function
function logout() {
    document.getElementById('navbar').style.display = 'none'; // Hide navbar
<<<<<<< HEAD
    document.getElementById('logout-btn').style.display = 'none'; // Hide logout button
=======
>>>>>>> cab7b64b92abd1d4157972e429912e9b7a2a35dd
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


// Function to select the pet type
function selectPetType(type) {
    selectedPetType = type; // Store the selected pet type
    alert(`You selected ${type === "cat" ? "Cat Services" : "Dog Services"}.`);
}

sectionId = ""
bookingSection = ""
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


<<<<<<< HEAD
=======
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
<<<<<<< HEAD
=======
>>>>>>> 66bd825a135da09417682bc6d8be6f7648161531

function showBookingForm() {
    // Hide all sections
    const sections = document.getElementsByClassName("content-section");
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }

    // Show a booking form or section
    const bookingSection = document.createElement("div");
    bookingSection.id = "booking-section";
    bookingSection.className = "content-section";
    bookingSection.innerHTML = `
        <h2>Book a Service</h2>
        <form id="booking-form">
            <label for="service-type">Select Service:</label>
            <select id="service-type" required>
                <option value="grooming">Grooming</option>
                <option value="walking">Walking</option>
                <option value="sitting">Sitting</option>
            </select>
            <label for="booking-date">Select Date:</label>
            <input type="date" id="booking-date" required>
            <label for="booking-time">Select Time:</label>
            <input type="time" id="booking-time" required>
            <button type="submit">Confirm Booking</button>
        </form>
    `;
    document.getElementById("main-content").appendChild(bookingSection);

    document.getElementById("booking-form").onsubmit = function (event) {
        event.preventDefault();
        alert("Service booked successfully!");
        document.getElementById("booking-section").remove();
        document.getElementById("welcome-section").style.display = "block";
    };
}

bookingSection.innerHTML = `
    <h2>Book a Service</h2>
    <form id="booking-form">
        <label for="service-type">Select Service:</label>
        <select id="service-type" required>
            <option value="grooming">Grooming</option>
            <option value="walking">Walking</option>
            <option value="sitting">Sitting</option>
        </select>
        <label for="booking-date">Select Date:</label>
        <input type="date" id="booking-date" required>
        <label for="booking-time">Select Time:</label>
        <input type="time" id="booking-time" required>
        <button type="button" onclick="addToCart()">Add to Cart</button>
    </form>
`;


let cart = [];

function addToCart() {
    const serviceType = document.getElementById("service-type").value;
    const bookingDate = document.getElementById("booking-date").value;
    const bookingTime = document.getElementById("booking-time").value;

    if (serviceType && bookingDate && bookingTime) {
        const booking = {
            serviceType,
            bookingDate,
            bookingTime,
        };
        cart.push(booking);
        updateCartUI();
        alert("Service added to cart!");
    } else {
        alert("Please fill out all booking details.");
    }
}

function updateCartUI() {
    const cartSection = document.getElementById("cart-section");
    const cartItems = document.getElementById("cart-items");

    cartItems.innerHTML = ""; // Clear existing items

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.serviceType} on ${item.bookingDate} at ${item.bookingTime}
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(li);
    });

    cartSection.style.display = cart.length ? "block" : "none"; // Show/hide cart
}

function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from cart
    updateCartUI();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    alert("Checkout successful! Thank you for booking.");
    cart = []; // Clear cart
    updateCartUI(); // Refresh cart UI
}
>>>>>>> cab7b64b92abd1d4157972e429912e9b7a2a35dd
