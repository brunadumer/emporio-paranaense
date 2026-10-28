/**
 * =====================================================
 * EMPÓRIO PARANAENSE
 * Script Principal
 * =====================================================
 *
 * ÍNDICE:
 * 1. Menu Mobile
 * 2. Scroll Suave
 * 3. Header Scroll Effect
 * 4. Animações de Entrada
 * 5. Link WhatsApp
 *
 * =====================================================
 */

document.addEventListener('DOMContentLoaded', function() {

    /* =====================================================
       1. MENU MOBILE (HAMBÚRGUER)
       ===================================================== */

    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Fecha o menu ao clicar fora dele
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    /* =====================================================
       2. SCROLL SUAVE
       =====================================================
       Compensa a altura do header fixo ao rolar até a seção.
    */

    const header = document.getElementById('header');

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - header.offsetHeight + 1,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* =====================================================
       3. HEADER SCROLL EFFECT
       =====================================================
       O header começa transparente sobre o hero e ganha
       fundo verde quando o usuário rola a página.
    */

    function atualizarHeader() {
        header.classList.toggle('scrolled', window.scrollY > 60);
    }

    window.addEventListener('scroll', atualizarHeader, { passive: true });
    atualizarHeader();

    /* =====================================================
       4. ANIMAÇÕES DE ENTRADA (SCROLL)
       =====================================================
       EDITÁVEL: Adicione ou remova seletores conforme necessário
    */

    const animateElements = document.querySelectorAll(
        '.produto-card, .motivo-card, .proposito-info, .historia-info, .info-item'
    );

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    /* =====================================================
       5. LINK WHATSAPP COM MENSAGEM PADRÃO
       =====================================================
       EDITÁVEL: Altere a mensagem inicial abaixo.
    */

    const defaultMessage = encodeURIComponent('Olá! Vi o site do Empório Paranaense e gostaria de fazer uma encomenda.');

    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        const currentHref = link.getAttribute('href');
        if (!currentHref.includes('text=')) {
            link.setAttribute('href', `${currentHref}?text=${defaultMessage}`);
        }
    });

});
