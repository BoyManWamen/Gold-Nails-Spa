document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a[href^='#']");
  const sections = document.querySelectorAll("section");
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobile-nav");
  const headerOffset = 100;

  // Mobile navigation toggle
  hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
    hamburger.setAttribute('aria-expanded', mobileNav.classList.contains('open'));
    hamburger.innerHTML = mobileNav.classList.contains('open') ? '✕' : '☰';
    
    // Prevent body scroll when mobile nav is open
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav when clicking on a link
  mobileNav.addEventListener("click", (e) => {
    if (e.target.tagName === "A" && e.target.getAttribute("href").startsWith("#")) {
      mobileNav.classList.remove("open");
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.innerHTML = '☰';
      document.body.style.overflow = '';
    }
  });

  // Close mobile nav when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove("open");
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.innerHTML = '☰';
      document.body.style.overflow = '';
      hamburger.focus(); // Return focus to hamburger button
    }
  });

  // Smooth scroll with offset
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const section = document.getElementById(targetId);
      if (section) {
        const offsetTop = section.offsetTop - headerOffset;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Highlight active nav link on scroll
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerOffset - 1;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Form submission handling
  const contactForm = document.querySelector('.contact-form');
  contactForm.addEventListener('submit', function(e) {
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // Re-enable button after 3 seconds (formspree will handle the actual submission)
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 3000);
  });

  // Dynamic wait time updates
  const waitTimes = ['10-15 min', '15-20 min', '20-25 min', '25-30 min', '5-10 min'];
  const waitTimeDisplay = document.getElementById('wait-time-display');
  
  function updateWaitTime() {
    const randomTime = waitTimes[Math.floor(Math.random() * waitTimes.length)];
    if (waitTimeDisplay) {
      waitTimeDisplay.textContent = randomTime;
    }
  }
  
  // Update wait time every 5 minutes
  setInterval(updateWaitTime, 300000);

  // Add scroll effect to book button
  let lastScrollTop = 0;
  const bookBtn = document.querySelector('.book-btn');
  
  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      // Scrolling down - hide book button
      bookBtn.style.transform = 'translateY(100px)';
      bookBtn.style.opacity = '0';
    } else {
      // Scrolling up - show book button
      bookBtn.style.transform = 'translateY(0)';
      bookBtn.style.opacity = '1';
    }
    lastScrollTop = scrollTop;
  });

  // Add loading animation for sections
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

  // Observe various elements for animation
  const animatedElements = [
    '.testimonial',
    '.service',
    '.menu-category',
    '.policy-card',
    '.staff-member',
    '.gallery-item'
  ];

  animatedElements.forEach(selector => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(element);
    });
  });

  // Gallery item interaction
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      // In a real implementation, this would open a lightbox or modal
      alert('Photo gallery feature - would open larger image view');
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  // Staff member interaction
  document.querySelectorAll('.staff-member').forEach(member => {
    member.addEventListener('mouseenter', () => {
      member.style.transform = 'translateY(-10px) scale(1.02)';
    });

    member.addEventListener('mouseleave', () => {
      member.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Service duration highlight on hover
  document.querySelectorAll('.service').forEach(service => {
    const duration = service.querySelector('.service-duration');
    
    service.addEventListener('mouseenter', () => {
      if (duration) {
        duration.style.background = 'rgba(255, 77, 109, 0.2)';
        duration.style.transform = 'scale(1.05)';
      }
    });

    service.addEventListener('mouseleave', () => {
      if (duration) {
        duration.style.background = 'rgba(209, 75, 110, 0.1)';
        duration.style.transform = 'scale(1)';
      }
    });
  });

  // Enhanced keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Quick booking shortcut (Ctrl/Cmd + B)
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      bookBtn.click();
    }

    // Quick call shortcut (Ctrl/Cmd + C)
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && e.shiftKey) {
      e.preventDefault();
      window.location.href = 'tel:+17608813001';
    }
  });

  // Add focus indicators for better accessibility
  const focusableElements = document.querySelectorAll('a, button, input, textarea, [tabindex]');
  focusableElements.forEach(element => {
    element.addEventListener('focus', () => {
      element.style.boxShadow = '0 0 0 3px rgba(255, 77, 109, 0.5)';
    });

    element.addEventListener('blur', () => {
      element.style.boxShadow = '';
    });
  });

  // Social media feed simulation (placeholder)
  const socialUpdates = [
    "New nail art designs just posted! 💅✨",
    "Check out this amazing pedicure transformation! 🦶💖",
    "Thank you for the 5-star review! 🌟",
    "Special offer this week - call for details! 📞"
  ];

  // Loyalty program simulation
  let loyaltyPoints = localStorage.getItem('loyaltyPoints') || 0;
  
  function updateLoyaltyDisplay() {
    // This would connect to a real backend in production
    console.log(`Loyalty Points: ${loyaltyPoints}`);
  }

  // Form validation enhancements
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (input.required && !input.value.trim()) {
        input.style.borderColor = '#ff6b6b';
        input.setAttribute('aria-invalid', 'true');
      } else {
        input.style.borderColor = '#e0e0e0';
        input.setAttribute('aria-invalid', 'false');
      }
    });

    input.addEventListener('input', () => {
      if (input.style.borderColor === 'rgb(255, 107, 107)') {
        input.style.borderColor = '#e0e0e0';
        input.setAttribute('aria-invalid', 'false');
      }
    });
  });

  // Initialize page
  updateWaitTime();
  updateLoyaltyDisplay();

  // Add loading complete class
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);

  // Announce page load to screen readers
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = 'Gold Nails & Spa website loaded successfully. Use tab to navigate or press Ctrl+B to book an appointment.';
  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 3000);
});
