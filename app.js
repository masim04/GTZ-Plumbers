/*
========================================================================
   GTZ PLUMBING SERVICE - INTERACTIVE SCRIPTS
========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------------------
     1. Sticky Header Navigation on Scroll
     --------------------------------------------------------------------- */
  const header = document.querySelector('.header');
  const stickyOffset = 80;

  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > stickyOffset) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger initially in case of refresh down-page

  /* ---------------------------------------------------------------------
     2. Mobile Hamburger Toggle Menu
     --------------------------------------------------------------------- */
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMobileMenu = () => {
    menuToggle.classList.toggle('open');
    mainNav.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  };

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }

  /* ---------------------------------------------------------------------
     3. Active Navbar Link Highlighting for Multi-Page
     --------------------------------------------------------------------- */
  const currentPath = window.location.pathname;
  const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1);

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    
    // Highlight home page
    if ((pageName === '' || pageName === 'index.html') && href === 'index.html') {
      link.classList.add('active');
    } else if (pageName === href) {
      link.classList.add('active');
    }
  });

  /* ---------------------------------------------------------------------
     4. Scroll Animation Elements (Intersection Observer)
     --------------------------------------------------------------------- */
  const animElements = document.querySelectorAll('.scroll-anim');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target); // Trigger once
        }
      });
    }, observerOptions);

    animElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    // Fallback if browser doesn't support Observer
    animElements.forEach(element => {
      element.classList.add('animate-in');
    });
  }

  /* ---------------------------------------------------------------------
     5. Testimonials Slider (Carousel) - Homepage
     --------------------------------------------------------------------- */
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentSlide = 0;
  let autoRotateInterval;

  const showSlide = (index) => {
    if (slides.length === 0) return;
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  };

  const nextSlide = () => {
    if (slides.length === 0) return;
    let index = (currentSlide + 1) % slides.length;
    showSlide(index);
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    let index = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(index);
  };

  if (slides.length > 0) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetRotationTimer();
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetRotationTimer();
    });

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const slideIndex = parseInt(e.target.getAttribute('data-slide'));
        showSlide(slideIndex);
        resetRotationTimer();
      });
    });

    const startRotationTimer = () => {
      autoRotateInterval = setInterval(nextSlide, 8000);
    };

    const resetRotationTimer = () => {
      clearInterval(autoRotateInterval);
      startRotationTimer();
    };

    startRotationTimer();
  }

  /* ---------------------------------------------------------------------
     6. FAQ Accordion Toggles (Services Page)
     --------------------------------------------------------------------- */
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const parentItem = question.parentNode;
      
      // Close other opened FAQs
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== parentItem && item.classList.contains('active')) {
          item.classList.remove('active');
        }
      });

      // Toggle current FAQ
      parentItem.classList.toggle('active');
    });
  });

  /* ---------------------------------------------------------------------
     7. Gallery Filter Logic (Gallery Page)
     --------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  if (filterBtns.length > 0 && galleryCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Toggle active button highlight
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterVal = btn.getAttribute('data-filter');

        // Toggle card visibility
        galleryCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterVal === 'all' || category === filterVal) {
            card.style.display = 'block';
            // Slight opacity entrance transition
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.opacity = '1';
              card.classList.add('animate-in');
            }, 50);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---------------------------------------------------------------------
     8. Form Validation & Feedbacks
     --------------------------------------------------------------------- */

  // A. Hero Section Estimate Form (Home Page - If form is present in contact page redirection handles it, but in case form is used anywhere)
  const heroForm = document.getElementById('hero-estimate-form');
  const heroFormMessage = document.getElementById('hero-form-message');
  const heroSubmitBtn = document.getElementById('hero-submit-btn');

  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();

      heroSubmitBtn.disabled = true;
      heroSubmitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
      heroFormMessage.className = 'form-status';
      heroFormMessage.style.display = 'none';

      const name = document.getElementById('hero-name').value.trim();
      const phone = document.getElementById('hero-phone').value.trim();
      const email = document.getElementById('hero-email').value.trim();
      const service = document.getElementById('hero-service').value;

      if (!name || !phone || !email || !service) {
        showStatus(heroFormMessage, heroSubmitBtn, '<i class="fa-solid fa-calculator"></i> Get Free Estimate', 'All fields are required.', 'error');
        return;
      }

      setTimeout(() => {
        showStatus(
          heroFormMessage, 
          heroSubmitBtn, 
          '<i class="fa-solid fa-calculator"></i> Get Free Estimate', 
          `Estimate requested! Thank you, ${name}. A GTZ plumbing specialist will call you at ${phone} to discuss details.`, 
          'success'
        );
        heroForm.reset();
      }, 1500);
    });
  }

  // B. Main Standalone Contact Form (Contact Page / Locations page)
  const contactForm = document.getElementById('contact-form');
  const contactFormMessage = document.getElementById('form-message');
  const contactSubmitBtn = document.getElementById('form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      contactSubmitBtn.disabled = true;
      contactSubmitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
      contactFormMessage.className = 'form-status';
      contactFormMessage.style.display = 'none';

      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email') ? document.getElementById('email').value.trim() : 'no-email@example.com';
      const message = document.getElementById('message').value.trim();

      if (!name || !phone || !message) {
        showStatus(contactFormMessage, contactSubmitBtn, '<i class="fa-solid fa-paper-plane"></i> Submit Request', 'Please fill in all mandatory fields.', 'error');
        return;
      }

      setTimeout(() => {
        showStatus(
          contactFormMessage, 
          contactSubmitBtn, 
          '<i class="fa-solid fa-paper-plane"></i> Submit Request', 
          `Thank you, ${name}! Your callback request has been received. A GTZ representative will contact you shortly.`, 
          'success'
        );
        contactForm.reset();
      }, 1500);
    });
  }

  // General Status Presentation Helper
  const showStatus = (messageContainer, buttonElement, buttonOriginalHTML, text, type) => {
    buttonElement.disabled = false;
    buttonElement.innerHTML = buttonOriginalHTML;
    messageContainer.textContent = text;
    messageContainer.className = `form-status ${type}`;
    messageContainer.style.display = 'block';

    messageContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

});
