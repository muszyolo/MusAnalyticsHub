console.log("Language Hub Admin Logic v10 Loaded");
let currentLanguage = localStorage.getItem('currentLanguage') || null;
let appLanguage = localStorage.getItem('appLanguage') || 'EN';
let progress = JSON.parse(localStorage.getItem('langProgress')) || {
    english: [], korean: [], chinese: [], philippine: [], malay: [], indonesian: [], japanese: []
};

// Notes storage per language
let languageNotes = JSON.parse(localStorage.getItem('langNotes')) || {
    english: "", korean: "", chinese: "", philippine: "", malay: "", indonesian: "", japanese: ""
};

// Default Thesis Deadline (6 months from now)
const THESIS_DEADLINE = "2026-11-30";

const translations = {
    'EN': {
        myCourses: "MY COURSES",
        addNewCourse: "Add a new course",
        daysLeft: "DAYS LEFT",
        roadmapDesc: "Your 12-week roadmap to fluency.",
        searchPlaceholder: "Search YouTube for lessons...",
        resourcesTitle: "Free Online Resources",
        notesTitle: "Daily Study Notes",
        notesPlaceholder: "Write your thoughts, vocabulary, or research ideas here...",
        chooseSubject: "Choose your Learning Subject",
        welcome: "Welcome to Language Mastery Plan for Yourself",
        noSubject: "No Subject Selected",
        pleaseClick: "Please click the 'Choose your Learning Subject' button above to view your roadmap and resources.",
        toggleBtn: '<img src="https://flagcdn.com/w40/gb.png" width="18" style="vertical-align: middle; margin-right: 4px;"> EN | BM <img src="https://flagcdn.com/w40/my.png" width="18" style="vertical-align: middle; margin-left: 4px;">'
    },
    'MY': {
        myCourses: "KURSUS SAYA",
        addNewCourse: "Tambah kursus baru",
        daysLeft: "HARI TINGGAL",
        roadmapDesc: "Pelan hala tuju 12 minggu anda untuk fasih.",
        searchPlaceholder: "Cari pelajaran di YouTube...",
        resourcesTitle: "Sumber Dalam Talian Percuma",
        notesTitle: "Nota Kajian Harian",
        notesPlaceholder: "Tulis pemikiran, kosa kata, atau idea kajian anda di sini...",
        chooseSubject: "Pilih Subjek Pembelajaran Anda",
        welcome: "Selamat Datang ke Pelan Penguasaan Bahasa Untuk Diri Anda",
        noSubject: "Tiada Subjek Dipilih",
        pleaseClick: "Sila klik butang 'Pilih Subjek Pembelajaran Anda' di atas untuk melihat pelan hala tuju dan sumber anda.",
        toggleBtn: '<img src="https://flagcdn.com/w40/my.png" width="18" style="vertical-align: middle; margin-right: 4px;"> BM | EN <img src="https://flagcdn.com/w40/gb.png" width="18" style="vertical-align: middle; margin-left: 4px;">'
    }
};

function toggleAppLanguage() {
    appLanguage = appLanguage === 'EN' ? 'MY' : 'EN';
    localStorage.setItem('appLanguage', appLanguage);
    applyTranslations();
}

function applyTranslations() {
    const t = translations[appLanguage];
    if (document.getElementById('ui-my-courses')) document.getElementById('ui-my-courses').innerText = t.myCourses;
    if (document.getElementById('ui-add-course')) document.getElementById('ui-add-course').innerText = t.addNewCourse;
    if (document.getElementById('ui-days-left')) document.getElementById('ui-days-left').innerText = t.daysLeft;
    if (document.getElementById('ui-roadmap-desc')) document.getElementById('ui-roadmap-desc').innerText = t.roadmapDesc;
    if (document.getElementById('youtube-search')) document.getElementById('youtube-search').placeholder = t.searchPlaceholder;
    if (document.getElementById('ui-resources-title')) document.getElementById('ui-resources-title').innerText = t.resourcesTitle;
    if (document.getElementById('ui-notes-title')) document.getElementById('ui-notes-title').innerText = t.notesTitle;
    if (document.getElementById('lang-toggle-btn')) document.getElementById('lang-toggle-btn').innerHTML = t.toggleBtn;
    
    if (!currentLanguage) {
        showDefaultState();
    } else {
        document.getElementById('daily-notes').placeholder = t.notesPlaceholder;
        renderLanguage(currentLanguage); // Re-render to update the translated title
    }
}

function init() {
    applyTranslations();
    
    if (currentLanguage) {
        renderLanguage(currentLanguage);
    } else {
        showDefaultState();
    }
    // Apply View Mode preference
    const savedView = localStorage.getItem('viewMode');
    if (savedView === 'desktop') {
        document.body.classList.add('desktop-mode');
    }
    updateViewIcon();
    
    initWelcomeModal();
    
    // Auto-save notes
    const notesArea = document.getElementById('daily-notes');
    notesArea.addEventListener('input', (e) => {
        if (!currentLanguage) return;
        languageNotes[currentLanguage] = e.target.value;
        localStorage.setItem('langNotes', JSON.stringify(languageNotes));
    });

    // Translation toggle
    const toggleBtn = document.getElementById('lang-toggle-btn');
    if (toggleBtn) {
        toggleBtn.onclick = null; // Clear inline handler
        toggleBtn.addEventListener('click', toggleAppLanguage);
    }

    // Form handling is now native HTML for better mobile support
}

function showDefaultState() {
    const t = translations[appLanguage];
    const userName = localStorage.getItem('userName');
    const welcomeMsg = userName ? `${appLanguage === 'EN' ? 'Welcome Admin,' : 'Selamat Datang Admin,'} ${userName}!` : t.welcome;
    
    document.getElementById('current-lang-name').innerText = t.chooseSubject;
    document.getElementById('current-lang-flag').style.display = 'none';
    
    document.getElementById('lang-title').innerHTML = welcomeMsg;
    document.documentElement.style.setProperty('--accent', '#3b82f6');
    
    // Set default generic study wallpaper
    document.body.style.backgroundImage = `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundPosition = 'center';
    
    document.getElementById('daily-notes').value = "";
    document.getElementById('daily-notes').placeholder = appLanguage === 'EN' ? "Select a subject first to start taking notes..." : "Pilih subjek dahulu untuk mula mengambil nota...";
    
    document.getElementById('roadmap-grid').innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 3rem; background: var(--glass); border-radius: 16px; border: 1px dashed var(--border);">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom: 1rem; opacity: 0.5;">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
            <h3 style="font-size: 1.5rem; color: var(--text-primary); margin-bottom: 0.5rem;">${t.noSubject}</h3>
            <p>${t.pleaseClick}</p>
        </div>
    `;
    
    // Hide distracting sections when no subject is selected
    document.querySelector('.resources-section').style.display = 'none';
    document.querySelector('.notes-section').style.display = 'none';
    
    document.getElementById('progress-bar').style.width = `0%`;
}

function toggleViewMode() {
    const isDesktop = document.body.classList.toggle('desktop-mode');
    localStorage.setItem('viewMode', isDesktop ? 'desktop' : 'mobile');
    updateViewIcon();
}

function updateViewIcon() {
    const isDesktop = document.body.classList.contains('desktop-mode');
    const icon = document.getElementById('view-icon');
    if (icon) {
        if (isDesktop) {
            // Phone icon
            icon.innerHTML = `<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>`;
        } else {
            // Monitor icon
            icon.innerHTML = `<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>`;
        }
    }
}

function initWelcomeModal() {
    const overlay = document.getElementById('welcome-overlay');
    const nameInput = document.getElementById('user-name-input');
    const startBtn = document.getElementById('start-btn');
    const storedName = localStorage.getItem('userName');

    if (!storedName) {
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Translate modal based on app language
        if (appLanguage === 'MY') {
            document.getElementById('modal-title').innerText = "Hub Admin";
            document.getElementById('modal-desc').innerText = "Sila masukkan nama anda untuk akses kawalan admin.";
            nameInput.placeholder = "Nama anda...";
            startBtn.innerText = "Masuk Hub";
        }
    }

    startBtn.onclick = () => {
        const name = nameInput.value.trim();
        if (name) {
            localStorage.setItem('userName', name);
            overlay.classList.add('hidden');
            document.body.style.overflow = 'auto';
            showDefaultState(); // Refresh greeting
        } else {
            nameInput.style.borderColor = '#ef4444';
            setTimeout(() => nameInput.style.borderColor = 'var(--border)', 1000);
        }
    };
}

function renderLanguage(langKey) {
    const data = languageData[langKey];
    currentLanguage = langKey;
    localStorage.setItem('currentLanguage', langKey);
    
    // Safety check for new languages not in local storage yet
    if (!progress[langKey]) progress[langKey] = [];
    if (!languageNotes[langKey]) languageNotes[langKey] = "";
    
    // Show sections that might have been hidden by the default state
    document.querySelector('.resources-section').style.display = 'block';
    document.querySelector('.notes-section').style.display = 'block';
    
    // Update Header Dropdown UI
    let displayName = data.name;
    if (langKey === 'english' && appLanguage === 'MY') {
        displayName = "Bahasa Inggeris";
    }
    document.getElementById('current-lang-name').innerText = displayName;
    const flagImg = document.getElementById('current-lang-flag');
    flagImg.src = data.flag;
    flagImg.style.display = 'block';
    
    // Update active state in dropdown
    document.querySelectorAll('.course-item').forEach(item => {
        item.classList.remove('active');
        if (item.innerText.trim().toLowerCase() === data.name.toLowerCase()) {
            item.classList.add('active');
        }
    });

    // Update Header Title
    const titleText = appLanguage === 'EN' 
        ? `${displayName} Mastery Plan for Yourself` 
        : `Pelan Penguasaan ${displayName} Untuk Diri Anda`;
    document.getElementById('lang-title').innerHTML = `<img src="${data.flag}" style="width: 48px; border-radius: 4px; border: 1px solid var(--border);"> ${titleText}`;
    document.documentElement.style.setProperty('--accent', data.color);

    // Apply the unique language wallpaper with a dark overlay
    document.body.style.backgroundImage = `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url('${data.wallpaper}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundPosition = 'center';

    // Update Notes
    document.getElementById('daily-notes').value = languageNotes[langKey] || "";

    // Render Roadmap
    const grid = document.getElementById('roadmap-grid');
    grid.innerHTML = '';
    
    data.roadmap.forEach((week, index) => {
        const isCompleted = progress[langKey].includes(week.week);
        const card = document.createElement('div');
        card.className = `week-card ${isCompleted ? 'completed' : ''}`;
        
        // Apply unique theme based on language + content alignment
        const bgKeyword = `${data.name} ${week.bgQuery || ''}`.trim();
        const bgUrl = `https://loremflickr.com/400/300/${bgKeyword.replace(/\s+/g, ',')}`;
        card.style.backgroundImage = `linear-gradient(rgba(30, 41, 59, 0.85), rgba(30, 41, 59, 0.98)), url('${bgUrl}')`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';
        
        const cardAccent = week.accent || data.color;

        const weekDisplay = data.weekPrefix ? `${data.weekPrefix} ${week.week}${data.weekSuffix || ''}` : `${data.weekTerm || 'Week'} ${week.week}`;
        const topic = (appLanguage === 'MY' && week.topic_my) ? week.topic_my : week.topic;
        const concepts = (appLanguage === 'MY' && week.concepts_my) ? week.concepts_my : week.concepts;
        
        card.innerHTML = `
            <div class="week-num" style="background: ${cardAccent}; color: white; display: inline-block; padding: 2px 10px; border-radius: 4px; font-weight: 800; margin-bottom: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">${weekDisplay}</div>
            <div class="topic-name">${topic}</div>
            <div class="concepts">${concepts}</div>
        `;
        card.onclick = () => toggleWeek(langKey, week.week);
        grid.appendChild(card);
    });

    // Render Resources
    const resourceList = document.getElementById('resource-list');
    resourceList.innerHTML = '';
    data.resources.forEach(res => {
        const link = document.createElement('a');
        link.href = res.url;
        link.className = 'resource-link';
        link.target = '_blank';
        link.title = `Visit ${res.name}`;
        link.innerHTML = `
            <svg class="res-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M14 3h7v7h-2V6.41l-9.29 9.29-1.42-1.42L17.59 5H14V3zM5 5h5V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5h-2v5H5V5z"/></svg>
            ${res.name}
        `;
        resourceList.appendChild(link);
    });

    updateProgressBar(langKey);
}

function toggleWeek(langKey, weekNum) {
    const index = progress[langKey].indexOf(weekNum);
    if (index > -1) {
        progress[langKey].splice(index, 1);
    } else {
        progress[langKey].push(weekNum);
    }
    
    localStorage.setItem('langProgress', JSON.stringify(progress));
    renderLanguage(langKey);
}

function updateProgressBar(langKey) {
    const completed = progress[langKey].length;
    const total = 12;
    const percentage = (completed / total) * 100;
    document.getElementById('progress-bar').style.width = `${percentage}%`;
}

document.addEventListener('DOMContentLoaded', init);
