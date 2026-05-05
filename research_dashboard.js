// Chart Configuration for Research Journey (April 2026 - April 2027)
const ctx = document.getElementById('researchChart').getContext('2d');

const months = [
    'Apr 26', 'May 26', 'Jun 26', 'Jul 26', 'Aug 26', 'Sep 26', 
    'Oct 26', 'Nov 26', 'Dec 26', 'Jan 27', 'Feb 27', 'Mar 27', 'Apr 27'
];

// Projected Completion Percentage
const projectedProgress = [0, 8, 15, 25, 35, 45, 55, 65, 75, 85, 92, 98, 100];

new Chart(ctx, {
    type: 'line',
    data: {
        labels: months,
        datasets: [{
            label: 'Completion Progress (%)',
            data: projectedProgress,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 4,
            fill: true,
            tension: 0.3,
            pointRadius: 6,
            pointBackgroundColor: '#10b981',
            pointBorderColor: '#020617',
            pointBorderWidth: 2,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: '#f59e0b',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: '#0f172a',
                titleColor: '#10b981',
                bodyColor: '#f8fafc',
                padding: 12,
                cornerRadius: 12,
                displayColors: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                grid: {
                    color: 'rgba(255, 255, 255, 0.03)'
                },
                ticks: {
                    color: '#94a3b8',
                    callback: function(value) { return value + '%'; }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#94a3b8',
                    font: {
                        size: 11
                    }
                }
            }
        }
    }
});

// --- Habit Tracking Logic (Day-by-Day) ---
let currentViewDate = new Date();

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function displayDate(date) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    document.getElementById('habit-date').innerText = date.toLocaleDateString('en-US', options);
}

function changeDate(days) {
    currentViewDate.setDate(currentViewDate.getDate() + days);
    updateUIForDate();
}

function toggleCheck(element, index) {
    element.classList.toggle('checked');
    saveProgressForDate();
    calculateStreak();
}

function saveProgressForDate() {
    const dateKey = formatDate(currentViewDate);
    const checks = [];
    document.querySelectorAll('#habit-list .checklist-item').forEach((item) => {
        checks.push(item.classList.contains('checked'));
    });
    
    let history = JSON.parse(localStorage.getItem('researchHistory') || '{}');
    history[dateKey] = checks;
    localStorage.setItem('researchHistory', JSON.stringify(history));
}

function updateUIForDate() {
    const dateKey = formatDate(currentViewDate);
    displayDate(currentViewDate);
    
    let history = JSON.parse(localStorage.getItem('researchHistory') || '{}');
    const checks = history[dateKey] || [false, false, false, false, false];
    
    document.querySelectorAll('#habit-list .checklist-item').forEach((item, index) => {
        if (checks[index]) {
            item.classList.add('checked');
        } else {
            item.classList.remove('checked');
        }
    });
}

function calculateStreak() {
    let history = JSON.parse(localStorage.getItem('researchHistory') || '{}');
    let streak = 0;
    let checkDate = new Date(); // Start from today
    
    while (true) {
        const dateKey = formatDate(checkDate);
        const dayData = history[dateKey];
        
        // If all 5 habits were completed
        if (dayData && dayData.every(c => c === true)) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }
    document.getElementById('streak-count').innerText = streak;
}

// --- Google Calendar Sync Logic (iCal Generation) ---
const researchMilestones = [
    { date: "20260401", summary: "Research Phase 1: Foundation", desc: "Setting up Autism Research Matrix & Methodology" },
    { date: "20260501", summary: "Literature Synthesis & Gap Analysis", desc: "Identifying gaps in Malaysia caregiver literature" },
    { date: "20260601", summary: "Methodology Refinement", desc: "Finalizing Cluster Analysis statistical design" },
    { date: "20260701", summary: "Ethics Approval Submission", desc: "Submitting papers for University Ethics Committee" },
    { date: "20260801", summary: "Data Collection: Malaysia Region", desc: "Field work and caregiver survey distribution" },
    { date: "20260901", summary: "Data Cleaning & Preliminary Clustering", desc: "Starting the statistical segmentation" },
    { date: "20261001", summary: "NLP Feedback Processing", desc: "Analyzing qualitative caregiver responses" },
    { date: "20261101", summary: "Statistical Results Verification", desc: "Validating cluster reliability" },
    { date: "20261201", summary: "Drafting: Methodology Chapter", desc: "Writing up the core research process" },
    { date: "20270101", summary: "Drafting: Results & Discussion", desc: "Interpreting the cluster analysis findings" },
    { date: "20270201", summary: "Supervisor Review & Revisions", desc: "Applying final feedback from supervisor" },
    { date: "20270301", summary: "Final Citation & Formatting Audit", desc: "Preparing document for submission" },
    { date: "20270401", summary: "FINAL THESIS SUBMISSION", desc: "Completion of Master by Research 🎓" }
];

function exportToCalendar() {
    let icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Research Tracker//EN",
        "CALSCALE:GREGORIAN"
    ];

    researchMilestones.forEach(m => {
        icsContent.push("BEGIN:VEVENT");
        icsContent.push(`DTSTART;VALUE=DATE:${m.date}`);
        icsContent.push(`DTEND;VALUE=DATE:${m.date}`);
        icsContent.push(`SUMMARY:${m.summary}`);
        icsContent.push(`DESCRIPTION:${m.desc}`);
        icsContent.push("END:VEVENT");
    });

    icsContent.push("END:VCALENDAR");
    
    const blob = new Blob([icsContent.join("\r\n")], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'research_roadmap.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert("Roadmap exported! You can now import 'research_roadmap.ics' into your Google Calendar.");
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateUIForDate();
    calculateStreak();
});
