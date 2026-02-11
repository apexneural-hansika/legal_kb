// Custom Cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Scroll Reveal
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Initialize cards for reveal
document.querySelectorAll('.card, .stat, .hero-header, .hero-footer, .pillar-label').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)";
    observer.observe(el);
});

// Parallax Prism & Pillars
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.015;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.015;
    
    const prism = document.querySelector('.prism-img');
    const container = document.querySelector('.prism-container');
    
    if (prism) {
        prism.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${moveY * 0.5}deg) rotateY(${-moveX * 0.5}deg)`;
    }

    // Individual pillar parallax
    document.querySelectorAll('.pillar-label').forEach((label, index) => {
        const factor = (index + 1) * 0.02;
        label.style.transform = `translate(${moveX * factor * 50}px, ${moveY * factor * 50}px) scale(1)`;
    });
});

// Button Hover Effects
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2.5)';
    });
    btn.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
    });
});
