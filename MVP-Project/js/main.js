// Man Health - Main JavaScript

// Scroll Header Shadow
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

// Active Link on Click
const navLinks = document.querySelectorAll('.nav__link');

function activeLink() {
    navLinks.forEach(link => link.classList.remove('active-link'));
    this.classList.add('active-link');
}

navLinks.forEach(link => link.addEventListener('click', activeLink));

// Simple Chart Drawing for Activity Section
function drawActivityChart() {
    const canvas = document.getElementById('activityChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    
    canvas.width = width;
    canvas.height = height;
    
    // Sample data points
    const dataPoints = [30, 45, 60, 50, 75, 85, 80, 90, 95];
    const maxValue = Math.max(...dataPoints);
    const pointSpacing = width / (dataPoints.length - 1);
    
    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(42, 255, 113, 0.3)');
    gradient.addColorStop(1, 'rgba(42, 255, 113, 0.05)');
    
    // Draw line path
    ctx.beginPath();
    ctx.moveTo(0, height);
    
    dataPoints.forEach((point, index) => {
        const x = index * pointSpacing;
        const y = height - (point / maxValue) * height * 0.8;
        
        if (index === 0) {
            ctx.lineTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw line
    ctx.beginPath();
    dataPoints.forEach((point, index) => {
        const x = index * pointSpacing;
        const y = height - (point / maxValue) * height * 0.8;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.strokeStyle = '#2AFF71';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw points
    dataPoints.forEach((point, index) => {
        const x = index * pointSpacing;
        const y = height - (point / maxValue) * height * 0.8;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#2AFF71';
        ctx.fill();
    });
}

// Initialize chart when page loads
window.addEventListener('load', () => {
    drawActivityChart();
});

// Redraw chart on window resize
window.addEventListener('resize', () => {
    drawActivityChart();
});

// Animate progress circles
function animateProgressCircles() {
    const circles = document.querySelectorAll('.metric-circle');
    
    circles.forEach(circle => {
        const progress = circle.getAttribute('data-progress');
        const progressCircle = circle.querySelector('.progress');
        
        if (progressCircle) {
            const circumference = 283; // 2 * PI * radius (45)
            const offset = circumference - (circumference * progress) / 100;
            progressCircle.style.strokeDashoffset = offset;
        }
    });
}

// Run animation on page load
window.addEventListener('load', animateProgressCircles);

// Form validation for login and register
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        const inputs = form.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff3b30';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    });
});

// Add meal button interaction
const addMealBtn = document.querySelector('.btn-add-meal');
if (addMealBtn) {
    addMealBtn.addEventListener('click', () => {
        alert('Funcionalidade de adicionar refeição em desenvolvimento!');
    });
}

// Meal card interaction
const mealCards = document.querySelectorAll('.meal-card');
mealCards.forEach(card => {
    card.addEventListener('click', () => {
        const mealName = card.querySelector('.meal-name').textContent;
        alert(`Você selecionou: ${mealName}`);
    });
});

console.log('Man Health App initialized successfully!');

