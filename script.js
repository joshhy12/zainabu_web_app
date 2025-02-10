// Navigation
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Image Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelector('.dots');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;

    // Create dots
    if (dots && slides.length > 0) {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dots.appendChild(dot);
        });
    }

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentSlide) {
                slide.classList.add('active');
            }
        });

        // Update dots
        const dotElements = document.querySelectorAll('.dot');
        dotElements.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
    }

    // Add event listeners for slider controls
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    // Auto advance slides
    setInterval(nextSlide, 5000);

    // Registration Form Validation
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        const regions = {
            'Arusha': ['Arusha City', 'Meru', 'Karatu'],
            'Dar es Salaam': ['Ilala', 'Kinondoni', 'Temeke'],
            'Dodoma': ['Dodoma City', 'Kondoa', 'Mpwapwa'],
            // Add more regions and districts as needed
        };

        const regionSelect = document.getElementById('region');
        const districtSelect = document.getElementById('district');

        // Populate regions
        Object.keys(regions).forEach(region => {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            regionSelect.appendChild(option);
        });

        // Update districts when region changes
        regionSelect.addEventListener('change', function() {
            const selectedRegion = this.value;
            districtSelect.innerHTML = '<option value="">Select District</option>';

            if (selectedRegion && regions[selectedRegion]) {
                regions[selectedRegion].forEach(district => {
                    const option = document.createElement('option');
                    option.value = district;
                    option.textContent = district;
                    districtSelect.appendChild(option);
                });
            }
        });

        registrationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            let isValid = true;
            const errors = {
                nameError: '',
                regError: '',
                emailError: '',
                passwordError: '',
                confirmPasswordError: '',
                submitError: ''
            };

            // Validate Full Name
            const fullName = document.getElementById('fullName').value;
            if (fullName.length < 3) {
                errors.nameError = 'Name must be at least 3 characters long';
                isValid = false;
            }

            // Validate Registration Number
            const regNumber = document.getElementById('regNumber').value;
            const regPattern = /^BCS-\d{2}-\d{4}-\d{4}$/;
            if (!regPattern.test(regNumber)) {
                errors.regError = 'Invalid registration number format';
                isValid = false;
            }

            // Validate Email
            const email = document.getElementById('email').value;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                errors.emailError = 'Invalid email address';
                isValid = false;
            }

            // Validate Password
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password.length < 8) {
                errors.passwordError = 'Password must be at least 8 characters long';
                isValid = false;
            }

            if (password !== confirmPassword) {
                errors.confirmPasswordError = 'Passwords do not match';
                isValid = false;
            }

            // Display validation errors
            Object.keys(errors).forEach(errorId => {
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.textContent = errors[errorId];
                }
            });

            if (isValid) {
                try {
                    const formData = new FormData(registrationForm);
                    const response = await fetch('register.php', {
                        method: 'POST',
                        body: formData
                    });

                    const result = await response.json();

                    if (result.status === 'success') {
                        // Show success modal
                        const modal = document.getElementById('successModal');
                        modal.classList.add('show');
                        
                        // Store user name in session storage for welcome message
                        sessionStorage.setItem('newUser', fullName);
                        
                        registrationForm.reset();
                        // Clear any previous error messages
                        Object.keys(errors).forEach(errorId => {
                            const errorElement = document.getElementById(errorId);
                            if (errorElement) {
                                errorElement.textContent = '';
                            }
                        });
                    } else {
                        document.getElementById('submitError').textContent = result.message || 'Registration failed. Please try again.';
                    }
                } catch (error) {
                    document.getElementById('submitError').textContent = 'An error occurred. Please try again later.';
                    console.error('Error:', error);
                }
            }
        });
    }
});

// Function to redirect to home page
function redirectToHome() {
    window.location.href = 'home.html';
}