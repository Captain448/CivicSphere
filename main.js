// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const header = document.getElementById('header');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const a11yToggle = document.getElementById('a11yToggle');
const a11yPanel = document.getElementById('a11yPanel');
const a11yClose = document.getElementById('a11yClose');
const reportForm = document.getElementById('reportForm');
const photoInput = document.getElementById('photoInput');
const photoPreview = document.getElementById('photoPreview');
const filterButtons = document.querySelectorAll('.filter-btn');
const resourceCards = document.querySelectorAll('.resource-card');
const statNumbers = document.querySelectorAll('.stat-number');

// Loading screen
window.addEventListener('load', () => {
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    animateStats();
  }, 1000);
});

// Header scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
  mobileMenuToggle.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
});

// Accessibility panel toggle
a11yToggle.addEventListener('click', () => {
  a11yPanel.classList.toggle('active');
});

a11yClose.addEventListener('click', () => {
  a11yPanel.classList.remove('active');
});

// Font size adjustment
const increaseFont = document.querySelector('[data-action="increase-font"]');
const decreaseFont = document.querySelector('[data-action="decrease-font"]');
const resetFont = document.querySelector('[data-action="reset-font"]');

let currentFontSize = 100;

increaseFont.addEventListener('click', () => {
  if (currentFontSize < 150) {
    currentFontSize += 10;
    document.documentElement.style.fontSize = `${currentFontSize}%`;
  }
});

decreaseFont.addEventListener('click', () => {
  if (currentFontSize > 70) {
    currentFontSize -= 10;
    document.documentElement.style.fontSize = `${currentFontSize}%`;
  }
});

resetFont.addEventListener('click', () => {
  currentFontSize = 100;
  document.documentElement.style.fontSize = '100%';
});

// High contrast mode
const contrastMode = document.getElementById('contrastMode');

contrastMode.addEventListener('change', () => {
  document.body.classList.toggle('high-contrast', contrastMode.checked);
});

// Reduce motion
const reduceMotion = document.getElementById('reduceMotion');

reduceMotion.addEventListener('change', () => {
  document.body.classList.toggle('reduce-motion', reduceMotion.checked);
});

// Photo upload preview
if (photoInput) {
  photoInput.addEventListener('change', () => {
    photoPreview.innerHTML = '';
    
    if (photoInput.files && photoInput.files.length > 0) {
      for (let i = 0; i < photoInput.files.length; i++) {
        if (i >= 4) break; // Limit to 4 previews
        
        const file = photoInput.files[i];
        const reader = new FileReader();
        
        reader.onload = (e) => {
          const previewItem = document.createElement('div');
          previewItem.className = 'preview-item';
          
          const img = document.createElement('img');
          img.src = e.target.result;
          img.alt = 'Preview';
          
          previewItem.appendChild(img);
          photoPreview.appendChild(previewItem);
        };
        
        reader.readAsDataURL(file);
      }
    }
  });
}

// Resource filtering
if (filterButtons.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      const filter = button.getAttribute('data-filter');
      
      resourceCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Animate statistics numbers
function animateStats() {
  statNumbers.forEach(stat => {
    const targetValue = parseInt(stat.getAttribute('data-count'), 10);
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;
    
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentValue = Math.round(progress * targetValue);
      
      stat.textContent = currentValue.toLocaleString();
      
      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
  });
}

// Form submission (prevent default for demo)
if (reportForm) {
  reportForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(reportForm);
    const issueData = {};
    
    for (const [key, value] of formData.entries()) {
      issueData[key] = value;
    }
    
    // Show success message (for demo)
    alert('Thank you for your report! It has been submitted successfully.');
    reportForm.reset();
    photoPreview.innerHTML = '';
  });
}

// Get current location button
const getCurrentLocation = document.getElementById('getCurrentLocation');
const issueLocation = document.getElementById('issueLocation');

if (getCurrentLocation && issueLocation) {
  getCurrentLocation.addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          issueLocation.value = `Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`;
        },
        () => {
          alert('Unable to retrieve your location. Please enter it manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser. Please enter your location manually.');
    }
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Calendar navigation (for demo)
const prevMonthBtn = document.querySelector('.calendar-nav-prev');
const nextMonthBtn = document.querySelector('.calendar-nav-next');
const calendarMonth = document.querySelector('.calendar-month');

if (prevMonthBtn && nextMonthBtn && calendarMonth) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  let currentMonthIndex = 8; // September
  let currentYear = 2025;
  
  function updateCalendarMonth() {
    calendarMonth.textContent = `${months[currentMonthIndex]} ${currentYear}`;
  }
  
  prevMonthBtn.addEventListener('click', () => {
    currentMonthIndex--;
    if (currentMonthIndex < 0) {
      currentMonthIndex = 11;
      currentYear--;
    }
    updateCalendarMonth();
  });
  
  nextMonthBtn.addEventListener('click', () => {
    currentMonthIndex++;
    if (currentMonthIndex > 11) {
      currentMonthIndex = 0;
      currentYear++;
    }
    updateCalendarMonth();
  });
}

// Add intersection observer for animations
const animateElements = document.querySelectorAll('.feature-card, .resource-card, .event-card, .achievement');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 100);
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animateElements.forEach(element => {
  element.style.opacity = '0';
  observer.observe(element);
});

// Initialize the impact chart animation
const impactCircle = document.querySelector('.impact-circle');

if (impactCircle) {
  setTimeout(() => {
    // Animate from 0 to 75%
    let currentPercentage = 0;
    const targetPercentage = 75;
    const duration = 1500;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;
    
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      currentPercentage = Math.round(progress * targetPercentage);
      
      impactCircle.setAttribute('stroke-dasharray', `${currentPercentage}, 100`);
      
      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
  }, 1000);
}