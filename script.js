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

// ===== МОДАЛЬНОЕ ОКНО СОГЛАСИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    const consentModal = document.getElementById('consent-modal');
    const legalDetails = document.getElementById('legal-details');
    const toggleDetails = document.getElementById('toggle-details');
    const consentCheckMini = document.getElementById('consent-check-mini');
    let pendingUrl = null;

    const messengerButtons = document.querySelectorAll('a[href*="wa.me"], a[href*="t.me"], a[href*="max.ru"]');

    messengerButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const url = this.getAttribute('href');
            
            if (localStorage.getItem('consentGiven') === 'true') {
                window.open(url, '_blank');
            } else {
                pendingUrl = url;
                consentModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    toggleDetails.addEventListener('click', function() {
        if (legalDetails.style.display === 'none') {
            legalDetails.style.display = 'block';
            this.classList.add('expanded');
            this.querySelector('.toggle-text').textContent = 'Свернуть';
        } else {
            legalDetails.style.display = 'none';
            this.classList.remove('expanded');
            this.querySelector('.toggle-text').textContent = 'Подробнее';
        }
    });

    consentCheckMini.addEventListener('change', function() {
        if (this.checked && pendingUrl) {
            localStorage.setItem('consentGiven', 'true');
            localStorage.setItem('consentDate', new Date().toISOString());
            closeModal();
            window.open(pendingUrl, '_blank');
            pendingUrl = null;
        }
    });

    consentModal.addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && consentModal.classList.contains('active')) closeModal();
    });

    function closeModal() {
        consentModal.classList.remove('active');
        legalDetails.style.display = 'none';
        document.body.style.overflow = '';
        consentCheckMini.checked = false;
        toggleDetails.classList.remove('expanded');
        toggleDetails.querySelector('.toggle-text').textContent = 'Подробнее';
    }
});

// Обработка кликов по кнопкам CTA для отслеживания
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        console.log('CTA clicked:', this.textContent.trim());
    });
});
