document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const nameInput = document.getElementById('user-name-input');
    const startBtn = document.getElementById('start-btn');
    const clockWidget = document.getElementById('clock-widget');
    const weatherWidget = document.getElementById('weather-widget');

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
            nameInput.style.borderColor = '#ff4444';
            setTimeout(() => nameInput.style.borderColor = '', 1000);
        }
    };

    startBtn.addEventListener('click', handleStart);
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleStart();
    });

    // Clock Widget
    const updateClock = () => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        clockWidget.innerHTML = `<span>🕒</span> ${timeStr}`;
    };
    setInterval(updateClock, 1000);
    updateClock();

    // Weather Widget (Open-Meteo)
    const fetchWeather = async (lat, lon) => {
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
            const data = await response.json();
            const temp = Math.round(data.current_weather.temperature);
            const code = data.current_weather.weathercode;
            
            let icon = '☀️';
            if (code > 0) icon = '☁️';
            if (code > 50) icon = '🌧️';
            
            weatherWidget.innerHTML = `<span>${icon}</span> ${temp}°C`;
        } catch (error) {
            weatherWidget.innerHTML = `<span>☁️</span> 28°C`; // Fallback
        }
    };

    // Try Geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
            () => fetchWeather(3.139, 101.686) // Default to KL
        );
    } else {
        fetchWeather(3.139, 101.686);
    }

    // Entrance Animations
    const observerOptions = { threshold: 0.1 };
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

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
