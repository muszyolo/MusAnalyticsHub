let currentLanguage = localStorage.getItem('currentLanguage') || null;
let appLanguage = localStorage.getItem('appLanguage') || 'EN';
let progress = JSON.parse(localStorage.getItem('langProgress')) || {
    english: [], korean: [], chinese: [], philippine: [], malay: [], indonesian: []
};

// Notes storage per language
let languageNotes = JSON.parse(localStorage.getItem('langNotes')) || {
    english: "", korean: "", chinese: "", philippine: "", malay: "", indonesian: ""
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
        welcome: "Welcome to Language Mastery",
        noSubject: "No Subject Selected",
        pleaseClick: "Please click the 'Choose your Learning Subject' button above to view your roadmap and resources.",
        toggleBtn: "EN | MY"
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
        welcome: "Selamat Datang ke Penguasaan Bahasa",
        noSubject: "Tiada Subjek Dipilih",
        pleaseClick: "Sila klik butang 'Pilih Subjek Pembelajaran Anda' di atas untuk melihat pelan hala tuju dan sumber anda.",
        toggleBtn: "MY | EN"
    }
};

function toggleAppLanguage() {
    appLanguage = appLanguage === 'EN' ? 'MY' : 'EN';
    localStorage.setItem('appLanguage', appLanguage);
    applyTranslations();
}

function applyTranslations() {
    const t = translations[appLanguage];
    document.getElementById('ui-my-courses').innerText = t.myCourses;
    document.getElementById('ui-add-course').innerText = t.addNewCourse;
    document.getElementById('ui-days-left').innerText = t.daysLeft;
    document.getElementById('ui-roadmap-desc').innerText = t.roadmapDesc;
    document.getElementById('youtube-search').placeholder = t.searchPlaceholder;
    document.getElementById('ui-resources-title').innerText = t.resourcesTitle;
    document.getElementById('ui-notes-title').innerText = t.notesTitle;
    document.getElementById('lang-toggle-btn').innerText = t.toggleBtn;
    
    if (!currentLanguage) {
        showDefaultState();
    } else {
        document.getElementById('daily-notes').placeholder = t.notesPlaceholder;
    }
}

function init() {
    applyTranslations();
    
    if (currentLanguage) {
        renderLanguage(currentLanguage);
    } else {
        showDefaultState();
    }
    updateCountdown();
    
    // Auto-save notes
    const notesArea = document.getElementById('daily-notes');
    notesArea.addEventListener('input', (e) => {
        if (!currentLanguage) return;
        languageNotes[currentLanguage] = e.target.value;
        localStorage.setItem('langNotes', JSON.stringify(languageNotes));
    });

    // YouTube Search logic
    const searchInput = document.getElementById('youtube-search');
    const searchBtn = document.getElementById('search-btn');

    const performSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            const langName = currentLanguage ? languageData[currentLanguage].name : "General";
            const fullQuery = currentLanguage ? `${langName} language learning ${query}` : query;
            const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(fullQuery)}`;
            window.open(url, '_blank');
        }
    };

    searchBtn.onclick = performSearch;
    searchInput.onkeypress = (e) => { if (e.key === 'Enter') performSearch(); };
}

function showDefaultState() {
    const t = translations[appLanguage];
    document.getElementById('current-lang-name').innerText = t.chooseSubject;
    document.getElementById('current-lang-flag').style.display = 'none';
    
    document.getElementById('lang-title').innerHTML = t.welcome;
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

function updateCountdown() {
    const deadline = new Date(THESIS_DEADLINE);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const countEl = document.getElementById('days-count-header');
    if (countEl) countEl.innerText = diffDays > 0 ? diffDays : 0;
}

function renderLanguage(langKey) {
    const data = languageData[langKey];
    currentLanguage = langKey;
    localStorage.setItem('currentLanguage', langKey);
    // Show sections that might have been hidden by the default state
    document.querySelector('.resources-section').style.display = 'block';
    document.querySelector('.notes-section').style.display = 'block';
    
    // Update Header Dropdown UI
    document.getElementById('current-lang-name').innerText = data.name;
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
    const titleText = appLanguage === 'EN' ? `${data.name} Mastery` : `Penguasaan ${data.name}`;
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
    
    data.roadmap.forEach(week => {
        const isCompleted = progress[langKey].includes(week.week);
        const card = document.createElement('div');
        card.className = `week-card ${isCompleted ? 'completed' : ''}`;
        card.innerHTML = `
            <div class="week-num">Week ${week.week}</div>
            <div class="topic-name">${week.topic}</div>
            <div class="concepts">${week.concepts}</div>
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
