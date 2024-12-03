let selectedPetType = '';

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

// Logout function
function logout() {
    document.getElementById('navbar').style.display = 'none'; // Hide navbar
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