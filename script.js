// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применяем анимацию ко всем карточкам и элементам
document.querySelectorAll('.result-card, .for-whom-item, .process-step, .approach-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Обработка кликов по кнопкам CTA для отслеживания (можно добавить аналитику)
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Здесь можно добавить код для отслеживания конверсий
        // Например, Google Analytics или Яндекс.Метрика
        console.log('CTA clicked:', this.textContent.trim());
    });
});
