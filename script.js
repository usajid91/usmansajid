// Mobile Menu Toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking a link
            document.querySelector('.nav-menu').classList.remove('active');
        }
    });
});

// Project Category Filtering
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        const projects = document.querySelectorAll('.project-card');
        
        projects.forEach(project => {
            if (category === 'all' || project.getAttribute('data-category') === category) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    });
});

// Contact Form with Formspree
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(this);
    
    // Send to Formspree
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        } else {
            alert('There was a problem sending your message. Please email me directly at usajid91@gmail.com');
        }
    })
    .catch(error => {
        alert('There was a problem sending your message. Please email me directly at usajid91@gmail.com');
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if(window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'var(--white)';
        navbar.style.backdropFilter = 'none';
    }
});