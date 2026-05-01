// ========================================
// ANIMATED BACKGROUND CANVAS EFFECTS
// ========================================

// Full-Page Background Animation
function initPageBackgroundCanvas() {
    const canvas = document.getElementById('pageBackgroundCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size to window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    // Create particles
    const particles = [];
    const particleCount = 60;

    class BackgroundParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.3 + 0.1;
            this.color = Math.random() > 0.5 ? 'rgba(74, 144, 226' : 'rgba(168, 85, 247';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around screen
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.fillStyle = `${this.color}, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new BackgroundParticle());
    }

    // Draw connecting lines
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    const opacity = 0.05 * (1 - distance / 200);
                    ctx.strokeStyle = `rgba(74, 144, 226, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, 'rgba(74, 144, 226, 0.02)');
        gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.02)');
        gradient.addColorStop(1, 'rgba(74, 144, 226, 0.02)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connecting lines
        drawConnections();

        requestAnimationFrame(animate);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
}

// Hero Section Canvas Animation
function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Particle array
    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 1;
            this.speedY = (Math.random() - 0.5) * 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce off walls
            if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
                this.speedX = -this.speedX;
            }
            if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
                this.speedY = -this.speedY;
            }

            // Keep in bounds
            this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
            this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
        }

        draw() {
            ctx.fillStyle = `rgba(74, 144, 226, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Connect nearby particles
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = `rgba(74, 144, 226, ${0.1 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Connect particles
        connectParticles();

        requestAnimationFrame(animate);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
}

// Skills Section Canvas Animation (Different pattern)
function initSkillsCanvas() {
    const canvas = document.getElementById('skillsCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let animationTime = 0;

    function drawWave(offsetX, offsetY, amplitude, frequency, speed) {
        ctx.strokeStyle = `rgba(74, 144, 226, 0.3)`;
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let x = 0; x < canvas.width; x += 5) {
            const y = offsetY + Math.sin((x + animationTime * speed) * frequency) * amplitude;
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        animationTime += 1;

        // Draw multiple waves
        drawWave(0, canvas.height * 0.3, 30, 0.01, 1);
        drawWave(0, canvas.height * 0.5, 40, 0.008, 0.8);
        drawWave(0, canvas.height * 0.7, 25, 0.012, 1.2);

        requestAnimationFrame(animate);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
}

// Initialize animations on page load
window.addEventListener('load', () => {
    initPageBackgroundCanvas();
    initHeroCanvas();
    initSkillsCanvas();
});

// ========================================
// ORIGINAL SCRIPT CODE CONTINUED
// ========================================

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }
}

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Active Navigation Link Highlight
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll Animation - Fade in elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.skill-card, .project-card, .service-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Progress Bar Animation
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

window.addEventListener('scroll', () => {
    const skillsSection = document.getElementById('skills');
    if (skillsSection && window.scrollY > skillsSection.offsetTop - 400) {
        if (!skillsSection.classList.contains('animated')) {
            animateProgressBars();
            skillsSection.classList.add('animated');
        }
    }
});

// Tooltip Functionality
const createTooltip = (element, text) => {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = text;

    element.addEventListener('mouseenter', () => {
        element.appendChild(tooltip);
        tooltip.classList.add('show');
    });

    element.addEventListener('mouseleave', () => {
        if (tooltip.parentElement) {
            tooltip.classList.remove('show');
            setTimeout(() => {
                if (tooltip.parentElement) {
                    tooltip.remove();
                }
            }, 300);
        }
    });
};

// Add tooltips to floating social icons
const floatingSocialIcons = document.querySelectorAll('.floating-social-bar a');
const tooltips = {
    0: 'LinkedIn',
    1: 'GitHub',
    2: 'Twitter',
    3: 'Gmail'
};

floatingSocialIcons.forEach((link, index) => {
    if (tooltips[index]) {
        createTooltip(link, tooltips[index]);
    }
});

// Auto-animate icons on page load
window.addEventListener('load', () => {
    const socialIcons = document.querySelectorAll('.floating-social-bar a');
    socialIcons.forEach((icon, index) => {
        icon.style.animation = `floatIn 0.6s ease-out ${index * 0.1}s both`;
    });

    // Animate hero elements
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.style.animation = 'slideInLeft 0.8s ease-out';
    }

    const heroSubtitle = document.querySelector('.hero h2');
    if (heroSubtitle) {
        heroSubtitle.style.animation = 'slideInRight 0.8s ease-out 0.2s both';
    }

    // Glow animation for skill icons
    const skillIcons = document.querySelectorAll('.skill-icon');
    skillIcons.forEach((icon, index) => {
        icon.style.animation = `iconPulse 2s ease-in-out ${index * 0.2}s infinite`;
    });
});

// Contact Form Handling with EmailJS
(function () {
    // Replace these with your actual EmailJS credentials from https://www.emailjs.com/
    // 1. Sign up at EmailJS
    // 2. Create an email service (Gmail, Outlook, etc.)
    // 3. Create an email template
    // 4. Get your Service ID, Template ID, and Public Key

    const serviceID = 'your_service_id';  // Replace with your EmailJS Service ID
    const templateID = 'your_template_id'; // Replace with your EmailJS Template ID
    const publicKey = 'your_public_key';   // Replace with your EmailJS Public Key

    // Initialize EmailJS
    emailjs.init(publicKey);

    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Get form data
            const formData = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                to_name: 'Aqsa' // Replace with your name
            };

            // Send email
            emailjs.send(serviceID, templateID, formData)
                .then(function (response) {
                    alert('Message sent successfully! Thank you for reaching out.');
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, function (error) {
                    alert('Failed to send message. Please try again or contact me directly.');
                    console.error('EmailJS error:', error);
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
})();

// Mobile Menu Toggle (if needed in future)
const menuToggle = () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
};

console.log('✨ Welcome to Aqsa Dev Portfolio! ✨');
