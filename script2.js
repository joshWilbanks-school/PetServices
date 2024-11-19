let selectedPetType = ""; // To store the user's pet type selection
let catWalkingSlideIndex = 1; // Initialize the slide index for Cat Walking
let dogWalkingSlideIndex = 1; // Initialize the slide index for Dog Walking

// Function to select the pet type
function selectPetType(type) {
    selectedPetType = type; // Store the selected pet type
    alert(`You selected ${type === "cat" ? "Cat Services" : "Dog Services"}.`);
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

    // Handle looping: reset to the first slide if n exceeds the total slides
    if (n > slides.length) {
        catWalkingSlideIndex = 1;
    }

    // Handle looping: reset to the last slide if n is less than 1
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

// Function to reset and show the first slide in Dog Walking section
function resetDogWalkingSlideshow() {
    dogWalkingSlideIndex = 1; // Reset to the first slide
    showDogWalkingSlides(dogWalkingSlideIndex); // Display the first slide
}

// Function to navigate slides in Dog Walking section
function changeDogWalkingSlide(n) {
    showDogWalkingSlides(dogWalkingSlideIndex += n);
}

// Function to navigate to a specific slide in Dog Walking section
function currentDogWalkingSlide(n) {
    showDogWalkingSlides(dogWalkingSlideIndex = n);
}

// Function to display the current slide in Dog Walking section
function showDogWalkingSlides(n) {
    let slides = document.getElementsByClassName("dog-walking-slide");
    let dots = document.getElementsByClassName("dog-walking-dot");

    // Handle looping: reset to the first slide if n exceeds the total slides
    if (n > slides.length) {
        dogWalkingSlideIndex = 1;
    }

    // Handle looping: reset to the last slide if n is less than 1
    if (n < 1) {
        dogWalkingSlideIndex = slides.length;
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
    slides[dogWalkingSlideIndex - 1].style.display = "block";
    if (dots.length > 0) {
        dots[dogWalkingSlideIndex - 1].className += " active";
    }
}

// Function to show the appropriate section based on navbar selection
function showSection(sectionId) {
    // Hide all content sections first
    const sections = document.getElementsByClassName("content-section");
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }

    // Special handling for walking section
    if (sectionId === "walking") {
        if (selectedPetType === "dog") {
            resetDogWalkingSlideshow(); // Reset and display the Dog Walking slideshow
            document.getElementById("dog-walking-section").style.display = "block";
        } else if (selectedPetType === "cat") {
            resetCatWalkingSlideshow(); // Reset and display the Cat Walking slideshow
            document.getElementById("cat-walking-section").style.display = "block";
        } else {
            alert("Please select a pet type first!");
            return;
        }
    } else if (sectionId === "grooming") {
        if (selectedPetType === "") {
            alert("Please select a pet type first!");
            return;
        }

        if (selectedPetType === 'cat') {
            document.getElementById("cat-grooming-section").style.display = "block";
        } else if (selectedPetType === 'dog') {
            document.getElementById("dog-grooming-section").style.display = "block";
        }
    } else {
        // Show the specified section normally
        const sectionToShow = document.getElementById(sectionId);
        if (sectionToShow) {
            sectionToShow.style.display = "block";
        }
    }
}
