document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  
  let currentSlide = 0;
  const slideCount = slides.length;
  
  // Function to update slide position
  function updateSlide() {
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      // Update dots
      dots.forEach(dot => dot.classList.remove('active'));
      dots[currentSlide].classList.add('active');
  }
  
  // Next slide
  function nextSlide() {
      currentSlide = (currentSlide + 1) % slideCount;
      updateSlide();
  }
  
  // Previous slide
  function prevSlide() {
      currentSlide = (currentSlide - 1 + slideCount) % slideCount;
      updateSlide();
  }
  
  // Event listeners for buttons
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // Event listeners for dots
  dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          currentSlide = index;
          updateSlide();
      });
  });
  
  // Auto-slide every 5 seconds
  setInterval(nextSlide, 5000);
});
