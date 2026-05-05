// Chart Configuration
const ctx = document.getElementById('weightChart').getContext('2d');

const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
const projectedWeight = [118, 115, 112, 109, 106, 103, 100, 97, 95, 93, 91, 90];

new Chart(ctx, {
    type: 'line',
    data: {
        labels: months,
        datasets: [{
            label: 'Weight Goal (kg)',
            data: projectedWeight,
            borderColor: '#4ade80',
            backgroundColor: 'rgba(74, 222, 128, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: '#4ade80',
            pointBorderColor: '#0f172a',
            pointBorderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                min: 80,
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)'
                },
                ticks: {
                    color: '#94a3b8'
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#94a3b8'
                }
            }
        }
    }
});

// Checklist Logic
function toggleCheck(element) {
    element.classList.toggle('checked');
    
    // Play a subtle haptic-like effect or sound if desired
    // For now, we just save to local storage
    saveProgress();
}

function saveProgress() {
    const checks = [];
    document.querySelectorAll('.checklist-item').forEach((item, index) => {
        checks.push(item.classList.contains('checked'));
    });
    localStorage.setItem('healthProgress', JSON.stringify(checks));
}

function loadProgress() {
    const saved = localStorage.getItem('healthProgress');
    if (saved) {
        const checks = JSON.parse(saved);
        document.querySelectorAll('.checklist-item').forEach((item, index) => {
            if (checks[index]) item.classList.add('checked');
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', loadProgress);
