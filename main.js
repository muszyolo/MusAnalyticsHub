document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const nameInput = document.getElementById('user-name-input');
    const startBtn = document.getElementById('start-btn');

    // Check for stored name
    const storedName = localStorage.getItem('musHub_userName');

    const updateGreeting = (name) => {
        const hours = new Date().getHours();
        let greetingBase = 'Elevate Your Growth';
        if (hours < 12) greetingBase = 'Good Morning';
        else if (hours < 18) greetingBase = 'Good Afternoon';
        else greetingBase = 'Good Evening';
        
        heroTitle.textContent = `${greetingBase}, ${name || 'Mus'}`;
    };

    if (storedName) {
        updateGreeting(storedName);
        welcomeOverlay.classList.add('hidden');
    } else {
        welcomeOverlay.classList.remove('hidden');
    }

    // Handle name submission
    const handleStart = () => {
        const name = nameInput.value.trim();
        if (name) {
            localStorage.setItem('musHub_userName', name);
            updateGreeting(name);
            welcomeOverlay.classList.add('hidden');
        } else {
            // Shake effect or simple alert
            nameInput.style.borderColor = '#ff4444';
            setTimeout(() => nameInput.style.borderColor = '', 1000);
        }
    };

    startBtn.addEventListener('click', handleStart);
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleStart();
    });

    // Entrance Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(card);
    });

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
