// Initialize all sliders
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded - initializing sliders");
  
  // Function to initialize a sharp slider (rectangular images)
  function initSharpSlider(sliderId, prevBtnClass, nextBtnClass, dotContainerId = null) {
    const slider = document.getElementById(sliderId);
    
    if (!slider) {
      console.log(`❌ Slider not found: ${sliderId}`);
      return null;
    }
    
    const slides = slider.querySelectorAll('.sharp-slide');
    console.log(`✅ Found slider: ${sliderId} with ${slides.length} slides`);
    
    if (slides.length === 0) {
      console.log(`⚠️ No slides found in ${sliderId}`);
      return null;
    }
    
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
      console.log(`Showing slide ${index} in ${sliderId}`);
      slides.forEach((slide, i) => {
        if (i === index) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
      
      // Update dots if they exist
      if (dotContainerId) {
        const dots = document.querySelectorAll(`#${dotContainerId} .sharp-dot`);
        dots.forEach((dot, i) => {
          if (i === index) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
      
      currentSlide = index;
    }
    
    function nextSlide() {
      let newIndex = currentSlide + 1;
      if (newIndex >= slides.length) newIndex = 0;
      showSlide(newIndex);
    }
    
    function prevSlide() {
      let newIndex = currentSlide - 1;
      if (newIndex < 0) newIndex = slides.length - 1;
      showSlide(newIndex);
    }
    
    function startAutoSlide() {
      if (slideInterval) clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 4000);
      console.log(`Auto-slide started for ${sliderId}`);
    }
    
    function stopAutoSlide() {
      clearInterval(slideInterval);
    }
    
    const prevBtn = document.querySelector(prevBtnClass);
    const nextBtn = document.querySelector(nextBtnClass);
    
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        console.log(`Prev button clicked for ${sliderId}`);
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
      });
      
      nextBtn.addEventListener('click', () => {
        console.log(`Next button clicked for ${sliderId}`);
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
      });
    } else {
      console.log(`⚠️ Buttons not found for ${sliderId}: ${prevBtnClass}, ${nextBtnClass}`);
    }
    
    if (dotContainerId) {
      const dots = document.querySelectorAll(`#${dotContainerId} .sharp-dot`);
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          console.log(`Dot ${index} clicked for ${sliderId}`);
          showSlide(index);
          stopAutoSlide();
          startAutoSlide();
        });
      });
    }
    
    // Start auto-sliding
    startAutoSlide();
    return { stopAutoSlide, startAutoSlide };
  }
  
  // Initialize all sharp sliders
  console.log("Initializing hero slider...");
  initSharpSlider('heroSlider', '.sharp-prev', '.sharp-next', 'heroDots');
  
  // Note: aboutSlider, projectsSlider, contactSlider are commented out since 
  // those pages don't have sliders according to your request
  // initSharpSlider('aboutSlider', '.about-sharp-prev', '.about-sharp-next');
  // initSharpSlider('projectsSlider', '.projects-sharp-prev', '.projects-sharp-next');
  // initSharpSlider('contactSlider', '.contact-sharp-prev', '.contact-sharp-next');
  
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('show');
    });
  }
  
  // Contact Form Handling (if form exists on page)
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('formName')?.value || '';
      const email = document.getElementById('formEmail')?.value || '';
      const subject = document.getElementById('formSubject')?.value || '';
      const message = document.getElementById('formMessage')?.value || '';
      
      if (name && email && message) {
        formStatus.innerHTML = '<span style="color: #00ff88;">✨ Message sent successfully! I\'ll get back to you soon.</span>';
        contactForm.reset();
        
        setTimeout(() => {
          formStatus.innerHTML = '';
        }, 5000);
      } else {
        formStatus.innerHTML = '<span style="color: #ff6666;">⚠️ Please fill in all required fields.</span>';
        
        setTimeout(() => {
          formStatus.innerHTML = '';
        }, 3000);
      }
    });
  }
  
  // Scroll animations for glass panels
  const glassPanels = document.querySelectorAll('.glass-panel');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  glassPanels.forEach(panel => {
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(20px)';
    panel.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(panel);
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});