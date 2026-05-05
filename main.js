document.addEventListener('DOMContentLoaded', () => {
    // --- Shared Component Injection (Weather, Solat, Clock & Controls) ---
    const injectSharedComponents = () => {
        // 1. Weather Overlay
        if (!document.querySelector('.weather-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'weather-overlay';
            overlay.innerHTML = `
                <div id="rain-container" class="rain-overlay"></div>
                <div id="lightning-flash" class="lightning-overlay"></div>
                <div class="cloud" style="top: 10%; width: 300px; height: 150px; animation-duration: 40s;"></div>
                <div class="cloud" style="top: 40%; width: 450px; height: 200px; animation-duration: 65s; animation-delay: -10s;"></div>
            `;
            document.body.prepend(overlay);
        }

        // 2. Weather Details Card
        if (!document.getElementById('weather-details')) {
            const card = document.createElement('div');
            card.id = 'weather-details';
            card.className = 'weather-details-card';
            card.innerHTML = `
                <div class="weather-main-info">
                    <div class="weather-city" id="weather-city">Kuala Lumpur</div>
                    <div class="weather-temp-large" id="temp-large">--°C</div>
                    <div class="weather-condition" id="weather-condition">Loading...</div>
                </div>
                <div class="weather-stats-grid">
                    <div class="stat-item"><span class="stat-label">Humidity</span><span class="stat-value" id="val-humidity">--%</span></div>
                    <div class="stat-item"><span class="stat-label">Wind</span><span class="stat-value" id="val-wind">-- km/h</span></div>
                    <div class="stat-item"><span class="stat-label">Feels Like</span><span class="stat-value" id="val-feels">--°C</span></div>
                </div>
                <div class="forecast-strip" id="forecast-strip"></div>
            `;
            document.body.appendChild(card);
        }

        // 3. Header Controls (View, Lang, Solat)
        const headerControls = document.querySelector('.header-controls');
        if (headerControls) {
            if (!document.getElementById('solat-widget')) {
                const solat = document.createElement('div');
                solat.id = 'solat-widget';
                solat.className = 'solat-widget';
                solat.innerHTML = `<span>🕌</span> <div class="solat-info"><span class="solat-label">Solat</span><span id="next-prayer">--:--</span></div>`;
                headerControls.appendChild(solat); 
            }
        }

        // 4. Hero Widgets (Time and Temperature) - ABOVE Greeting
        const hero = document.querySelector('.hero');
        const heroTitle = document.getElementById('hero-title');
        if (hero && heroTitle) {
            // Find or create the standard container
            let widgetCont = document.getElementById('hero-widget-container');
            if (!widgetCont) {
                widgetCont = document.createElement('div');
                widgetCont.id = 'hero-widget-container';
                widgetCont.className = 'widget-container hero-widgets-top';
                heroTitle.before(widgetCont);
            }

            // Move or Create Clock
            let clock = document.getElementById('clock-widget');
            if (!clock) {
                clock = document.createElement('div');
                clock.id = 'clock-widget';
                clock.className = 'widget hero-clock';
                clock.innerHTML = '🕒 --:--:--';
            } else {
                clock.className = 'widget hero-clock'; // Force correct class
            }
            widgetCont.appendChild(clock);

            // Move or Create Weather Widget (Temp)
            let weather = document.getElementById('weather-widget');
            if (!weather) {
                weather = document.createElement('div');
                weather.id = 'weather-widget';
                weather.className = 'widget hero-weather';
                weather.innerHTML = '<span>☀️</span> --°C';
            } else {
                weather.className = 'widget hero-weather'; // Force correct class
            }
            widgetCont.appendChild(weather);
            
            // Clean up any remaining empty old containers
            document.querySelectorAll('.hero .widget-container').forEach(c => {
                if (c.id !== 'hero-widget-container') c.remove();
            });
        }
    };
    injectSharedComponents();

    // Elements
    const heroTitle = document.getElementById('hero-title');
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
    const storedName = localStorage.getItem('musHub_userName');

    const translations = {
        'EN': {
            home: "Home", modules: "Modules", about: "About Me",
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
            home: "Utama", modules: "Modul", about: "Tentang Saya",
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
            quickNotes: "Nota Paling Penting",
            notesPlaceholder: "Tulis sebarang fikiran atau peringatan am di sini...",
            aboutHeroDesc: "Penyelidik, Saintis Data, dan Pelajar Sepanjang Hayat.",
            myVision: "Visi Saya",
            visionContent: "Untuk merapatkan jurang antara analisis data yang kompleks dan impak sosial yang berpusatkan manusia, khususnya dalam bidang sokongan penjaga dan neurodiverisiti.",
            researchFocus: "Fokus Penyelidikan",
            researchContent: "Kini sedang mengikuti Master secara Penyelidikan dengan fokus pada Sokongan Penjaga Autism melalui analisis kelompok dan pemodelan statistik.",
            languagesTitle: "Bahasa",
            languagesContent: "Aktif menguasai pelbagai bahasa termasuk Korea, Mandarin, dan Jepun untuk meluaskan ufuk akademik dan budaya.",
            connectTitle: "Hubungi Saya",
            modalTitle: "Welcome to the Hub",
            modalDesc: "Please enter your name to personalize your experience.",
            startBtn: "Get Started",
            placeholder: "Your name...",
            greetings: ["Selamat Pagi", "Selamat Tengah Hari", "Selamat Malam"]
        }
    };

    const applyTranslations = () => {
        const t = translations[appLanguage];
        document.querySelectorAll('[data-tr]').forEach(el => {
            const key = el.getAttribute('data-tr');
            if (t[key]) el.textContent = t[key];
        });
        if (nameInput) nameInput.placeholder = t.placeholder;
        if (hubNotes) hubNotes.placeholder = t.notesPlaceholder;
        if (langToggleBtn) langToggleBtn.textContent = appLanguage === 'EN' ? 'EN | BM' : 'BM | EN';
        updateGreeting(localStorage.getItem('musHub_userName'));
    };

    const updateGreeting = (name) => {
        const hours = new Date().getHours();
        const t = translations[appLanguage];
        let greetingBase = t.greetings[0];
        if (hours >= 12 && hours < 18) greetingBase = t.greetings[1];
        else if (hours >= 18 || hours < 5) greetingBase = t.greetings[2];
        
        if (heroTitle) {
            const isAboutPage = window.location.pathname.includes('about.html');
            heroTitle.textContent = isAboutPage ? t.about : `${greetingBase}, ${name || 'Mus'}`;
        }
    };

    // --- Weather & Solat Engine ---
    const initRain = () => {
        const rainCont = document.getElementById('rain-container');
        if (!rainCont) return;
        rainCont.innerHTML = '';
        for (let i = 0; i < 100; i++) {
            const drop = document.createElement('div');
            drop.className = 'rain-drop';
            drop.style.left = Math.random() * 100 + '%';
            drop.style.animationDelay = Math.random() * 2 + 's';
            drop.style.animationDuration = 0.5 + Math.random() * 0.5 + 's';
            rainCont.appendChild(drop);
        }
    };

    const triggerLightning = () => {
        const flash = document.getElementById('lightning-flash');
        if (flash && document.body.classList.contains('weather-storm') && Math.random() > 0.95) {
            flash.classList.add('lightning-flash');
            setTimeout(() => flash.classList.remove('lightning-flash'), 200);
        }
    };
    setInterval(triggerLightning, 3000);

    const updateWeatherUI = (data) => {
        const current = data.current_weather;
        const code = current.weathercode;
        const temp = Math.round(current.temperature);
        
        document.body.classList.remove('weather-clear', 'weather-cloudy', 'weather-rain', 'weather-storm', 'is-night');
        if (new Date().getHours() >= 19 || new Date().getHours() < 6) document.body.classList.add('is-night');

        let statusText = "Clear Sky";
        if (code === 0) document.body.classList.add('weather-clear');
        else if (code >= 1 && code <= 3) { document.body.classList.add('weather-cloudy'); statusText = "Partly Cloudy"; }
        else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) { document.body.classList.add('weather-rain'); statusText = "Rainy"; }
        else if (code >= 95) { document.body.classList.add('weather-storm'); statusText = "Thunderstorm"; }
        else { document.body.classList.add('weather-cloudy'); statusText = "Overcast"; }

        const weatherWidgetBtn = document.getElementById('weather-widget');
        if (weatherWidgetBtn) {
            let icon = '☀️';
            if (document.body.classList.contains('weather-cloudy')) icon = '☁️';
            if (document.body.classList.contains('weather-rain')) icon = '🌧️';
            if (document.body.classList.contains('weather-storm')) icon = '⚡';
            weatherWidgetBtn.innerHTML = `<span>${icon}</span> ${temp}°C`;
        }
        
        const tempLargeEl = document.getElementById('temp-large');
        if (tempLargeEl) tempLargeEl.textContent = `${temp}°C`;
        if (document.getElementById('weather-condition')) document.getElementById('weather-condition').textContent = statusText;
        if (document.getElementById('val-humidity')) document.getElementById('val-humidity').textContent = `${data.hourly.relativehumidity_2m[0]}%`;
        if (document.getElementById('val-wind')) document.getElementById('val-wind').textContent = `${current.windspeed} km/h`;
        if (document.getElementById('val-feels')) document.getElementById('val-feels').textContent = `${Math.round(current.temperature + 2)}°C`;

        const forecastStrip = document.getElementById('forecast-strip');
        if (forecastStrip) {
            forecastStrip.innerHTML = '';
            for (let i = 1; i < 6; i++) {
                const dayTemp = Math.round(data.hourly.temperature_2m[i * 24]);
                const dayItem = document.createElement('div');
                dayItem.className = 'forecast-item';
                dayItem.innerHTML = `<span class="forecast-day">Day ${i}</span><span class="forecast-temp">${dayTemp}°C</span>`;
                forecastStrip.appendChild(dayItem);
            }
        }
    };

    const fetchSolatTimes = async (lat, lon) => {
        try {
            const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=11`);
            const data = await response.json();
            const timings = data.data.timings;
            const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
            const currentTime = new Date().getHours() * 60 + new Date().getMinutes();
            let nextP = prayers[0], nextT = timings[nextP];
            for (let p of prayers) {
                const [h, m] = timings[p].split(':').map(Number);
                if (h * 60 + m > currentTime) { nextP = p; nextT = timings[p]; break; }
            }
            const nextPrayerEl = document.getElementById('next-prayer');
            if (nextPrayerEl) nextPrayerEl.textContent = `${nextP} ${nextT}`;
        } catch (e) { console.error("Solat fetch failed", e); }
    };

    const fetchData = async (lat, lon) => {
        try {
            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m`);
            const weatherData = await weatherRes.json();
            updateWeatherUI(weatherData);
            fetchSolatTimes(lat, lon);
        } catch (e) { console.error("Data fetch failed", e); }
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => fetchData(pos.coords.latitude, pos.coords.longitude),
            () => fetchData(3.139, 101.686)
        );
    } else fetchData(3.139, 101.686);

    initRain();

    // Hover/Click logic for weather details
    document.addEventListener('mouseover', (e) => {
        const weatherDetails = document.getElementById('weather-details');
        const weatherBtn = document.getElementById('weather-widget');
        if (weatherDetails && weatherBtn) {
            if (weatherBtn.contains(e.target) || weatherDetails.contains(e.target)) {
                weatherDetails.classList.add('visible');
            } else {
                weatherDetails.classList.remove('visible');
            }
        }
    });

    document.addEventListener('click', (e) => {
        const weatherBtn = document.getElementById('weather-widget');
        const weatherDetails = document.getElementById('weather-details');
        if (weatherBtn && weatherBtn.contains(e.target)) {
            weatherDetails.classList.toggle('visible');
        } else if (weatherDetails && !weatherDetails.contains(e.target)) {
            weatherDetails.classList.remove('visible');
        }
    });

    // --- Final Init ---
    if (storedName) {
        updateGreeting(storedName);
        if (welcomeOverlay) welcomeOverlay.classList.add('hidden');
    }
    if (hubNotes) {
        hubNotes.value = localStorage.getItem('musHub_generalNotes') || "";
        hubNotes.addEventListener('input', (e) => localStorage.setItem('musHub_generalNotes', e.target.value));
    }
    applyTranslations();

    if (langToggleBtn) langToggleBtn.addEventListener('click', () => {
        appLanguage = appLanguage === 'EN' ? 'BM' : 'EN';
        localStorage.setItem('musHub_lang', appLanguage);
        applyTranslations();
    });

    if (viewModeBtn) viewModeBtn.addEventListener('click', () => {
        const isDesktop = document.body.classList.toggle('desktop-mode');
        localStorage.setItem('musHub_view', isDesktop ? 'desktop' : 'mobile');
        if (viewIcon) {
            if (isDesktop) viewIcon.innerHTML = `<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>`;
            else viewIcon.innerHTML = `<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>`;
        }
    });

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            const name = nameInput.value.trim();
            if (name) {
                localStorage.setItem('musHub_userName', name);
                updateGreeting(name);
                if (welcomeOverlay) welcomeOverlay.classList.add('hidden');
            }
        });
    }

    setInterval(() => {
        const clock = document.getElementById('clock-widget');
        if (!clock) return;
        const now = new Date();
        const timeStr = now.toLocaleTimeString(appLanguage === 'EN' ? 'en-US' : 'ms-MY', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        clock.innerHTML = `🕒 ${timeStr}`;
    }, 1000);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card').forEach((card, index) => {
        card.style.opacity = '0'; card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(card);
    });
});
