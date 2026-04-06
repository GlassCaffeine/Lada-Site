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

// ===== МОДАЛЬНОЕ ОКНО СОГЛАСИЯ НА ОБРАБОТКУ ДАННЫХ =====
document.addEventListener('DOMContentLoaded', function() {
    const consentModal = document.getElementById('consent-modal');
    const consentCheck = document.getElementById('consent-check');
    const consentAccept = document.getElementById('consent-accept');
    const consentCancel = document.getElementById('consent-cancel');
    let pendingUrl = null;

    // Находим все кнопки мессенджеров (CTA кнопки + кнопки в футере)
    const messengerButtons = document.querySelectorAll('a[href*="wa.me"], a[href*="t.me"], a[href*="max.ru"]');

    messengerButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const url = this.getAttribute('href');
            
            // Проверяем, давал ли пользователь согласие ранее
            if (localStorage.getItem('consentGiven') === 'true') {
                window.open(url, '_blank');
            } else {
                pendingUrl = url;
                consentModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Активация кнопки "Продолжить" при установке галочки
    consentCheck.addEventListener('change', function() {
        consentAccept.disabled = !this.checked;
    });

    // Кнопка "Продолжить"
    consentAccept.addEventListener('click', function() {
        if (consentCheck.checked && pendingUrl) {
            // Сохраняем согласие в localStorage
            localStorage.setItem('consentGiven', 'true');
            localStorage.setItem('consentDate', new Date().toISOString());
            
            // Закрываем модальное окно
            closeModal();
            
            // Переходим по ссылке
            window.open(pendingUrl, '_blank');
            pendingUrl = null;
        }
    });

    // Кнопка "Отмена"
    consentCancel.addEventListener('click', function() {
        closeModal();
    });

    // Закрытие при клике на оверлей
    consentModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && consentModal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        consentModal.classList.remove('active');
        document.body.style.overflow = '';
        consentCheck.checked = false;
        consentAccept.disabled = true;
    }
});

// Обработка кликов по кнопкам CTA для отслеживания (можно добавить аналитику)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Здесь можно добавить код для отслеживания конверсий
            // Например, Google Analytics или Яндекс.Метрика
            console.log('CTA clicked:', this.textContent.trim());
        });
    });
});
