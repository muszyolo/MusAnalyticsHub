document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const nameInput = document.getElementById('user-name-input');
    const startBtn = document.getElementById('start-btn');
    const clockWidget = document.getElementById('clock-widget');
    const weatherWidget = document.getElementById('weather-widget');
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    const viewModeBtn = document.getElementById('view-mode-btn');
    const viewIcon = document.getElementById('view-icon');
    const hubNotes = document.getElementById('hub-notes');

    // State
    let appLanguage = localStorage.getItem('musHub_lang') || 'EN';
    let viewMode = localStorage.getItem('musHub_view') || 'mobile';
    const storedName = localStorage.getItem('musHub_userName');

    const translations = {
        'EN': {
            home: "Home",
            modules: "Modules",
            about: "About Me",
            heroTitle: "Elevate Your Growth",
            heroDesc: "Streamlining research, language mastery, and personal health through data-driven insights.",
            activeModules: "Active Modules",
            langHubTitle: "Language Mastery Hub",
            langHubDesc: "Master multiple languages with structured 12-week roadmaps and AI-powered resources.",
            exploreHub: "Explore Hub",
            resTrackerTitle: "Research Plan Tracker",
            resTrackerDesc: "Track your academic journey, literature reviews, and thesis milestones in real-time.",
            viewResearch: "View Research",
            healthTitle: "Health & Nutrition",
            healthDesc: "Optimize your physical well-being with nutrition tracking and personalized exercise routines.",
            trackHealth: "Track Health",
            quickNotes: "Quick Notes",
            notesPlaceholder: "Write any general thoughts or reminders here...",
            modalTitle: "Welcome to the Hub",
            modalDesc: "Please enter your name to personalize your experience.",
            startBtn: "Get Started",
            placeholder: "Your name...",
            greetings: ["Good Morning", "Good Afternoon", "Good Evening"]
        },
        'BM': {
            home: "Utama",
            modules: "Modul",
            about: "Tentang Saya",
            heroTitle: "Tingkatkan Pertumbuhan Anda",
            heroDesc: "Memudahkan penyelidikan, penguasaan bahasa, dan kesihatan peribadi melalui wawasan data.",
            activeModules: "Modul Aktif",
            langHubTitle: "Hab Penguasaan Bahasa",
            langHubDesc: "Kuasai pelbagai bahasa dengan pelan hala tuju 12 minggu dan sumber berkuasa AI.",
            exploreHub: "Teroka Hab",
            resTrackerTitle: "Penjejak Pelan Penyelidikan",
            resTrackerDesc: "Jejak perjalanan akademik, ulasan literatur, dan pencapaian tesis anda secara masa nyata.",
            viewResearch: "Lihat Penyelidikan",
            healthTitle: "Kesihatan & Nutrisi",
            healthDesc: "Optimumkan kesejahteraan fizikal anda dengan penjejakan nutrisi dan rutin senaman peribadi.",
            trackHealth: "Jejak Kesihatan",
            quickNotes: "Nota Pantas",
            notesPlaceholder: "Tulis sebarang fikiran atau peringatan am di sini...",
            modalTitle: "Selamat Datang ke Hab",
            modalDesc: "Sila masukkan nama anda untuk memperibadikan pengalaman anda.",
            startBtn: "Mula Sekarang",
            placeholder: "Nama anda...",
            greetings: ["Selamat Pagi", "Selamat Tengah Hari", "Selamat Malam"]
        }
    };

    const applyTranslations = () => {
        const t = translations[appLanguage];
        document.querySelectorAll('[data-tr]').forEach(el => {
            const key = el.getAttribute('data-tr');
            if (t[key]) el.textContent = t[key];
        });
        nameInput.placeholder = t.placeholder;
        hubNotes.placeholder = t.notesPlaceholder;
        langToggleBtn.textContent = appLanguage === 'EN' ? 'EN | BM' : 'BM | EN';
        updateGreeting(localStorage.getItem('musHub_userName'));
    };

    const updateGreeting = (name) => {
        const hours = new Date().getHours();
        const t = translations[appLanguage];
        let greetingBase = t.greetings[0];
        if (hours >= 12 && hours < 18) greetingBase = t.greetings[1];
        else if (hours >= 18 || hours < 5) greetingBase = t.greetings[2];
        
        heroTitle.textContent = `${greetingBase}, ${name || 'Mus'}`;
    };

    const toggleAppLanguage = () => {
        appLanguage = appLanguage === 'EN' ? 'BM' : 'EN';
        localStorage.setItem('musHub_lang', appLanguage);
        applyTranslations();
    };

    const toggleViewMode = () => {
        const isDesktop = document.body.classList.toggle('desktop-mode');
        localStorage.setItem('musHub_view', isDesktop ? 'desktop' : 'mobile');
        updateViewIcon();
    };

    const updateViewIcon = () => {
        const isDesktop = document.body.classList.contains('desktop-mode');
        if (isDesktop) {
            viewIcon.innerHTML = `<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>`;
        } else {
            viewIcon.innerHTML = `<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>`;
        }
    };

    const updateWeatherBackground = (code) => {
        document.body.classList.remove('weather-clear', 'weather-cloudy', 'weather-rain', 'weather-storm');
        if (code === 0) document.body.classList.add('weather-clear');
        else if (code >= 1 && code <= 3) document.body.classList.add('weather-cloudy');
        else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) document.body.classList.add('weather-rain');
        else if (code >= 95) document.body.classList.add('weather-storm');
        else document.body.classList.add('weather-cloudy');
    };

    // Initialize
    if (storedName) {
        updateGreeting(storedName);
        welcomeOverlay.classList.add('hidden');
    } else {
        welcomeOverlay.classList.remove('hidden');
    }

    if (localStorage.getItem('musHub_view') === 'desktop') {
        document.body.classList.add('desktop-mode');
    }
    
    // Notes Persistence
    hubNotes.value = localStorage.getItem('musHub_generalNotes') || "";
    hubNotes.addEventListener('input', (e) => {
        localStorage.setItem('musHub_generalNotes', e.target.value);
    });

    updateViewIcon();
    applyTranslations();

    // Event Listeners
    langToggleBtn.addEventListener('click', toggleAppLanguage);
    viewModeBtn.addEventListener('click', toggleViewMode);

    startBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (name) {
            localStorage.setItem('musHub_userName', name);
            localStorage.setItem('userName', name); // Sync for sub-modules
            updateGreeting(name);
            welcomeOverlay.classList.add('hidden');
        } else {
            nameInput.style.borderColor = '#ff4444';
            setTimeout(() => nameInput.style.borderColor = '', 1000);
        }
    });

    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') startBtn.click();
    });

    // Clock Widget
    const updateClock = () => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString(appLanguage === 'EN' ? 'en-US' : 'ms-MY', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        clockWidget.innerHTML = `<span>🕒</span> ${timeStr}`;
    };
    setInterval(updateClock, 1000);
    updateClock();

    // Weather Widget
    const fetchWeather = async (lat, lon) => {
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
            const data = await response.json();
            const temp = Math.round(data.current_weather.temperature);
            const code = data.current_weather.weathercode;
            updateWeatherBackground(code);
            let icon = '☀️';
            if (code > 0) icon = '☁️';
            if (code > 50) icon = '🌧️';
            weatherWidget.innerHTML = `<span>${icon}</span> ${temp}°C`;
        } catch (error) {
            weatherWidget.innerHTML = `<span>☁️</span> 28°C`;
            document.body.classList.add('weather-clear');
        }
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
            () => fetchWeather(3.139, 101.686)
        );
    } else {
        fetchWeather(3.139, 101.686);
    }

    // Entrance Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

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
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
