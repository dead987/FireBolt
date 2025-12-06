const track =  document.querySelector('#carouselTrack');
const next = document.querySelector('#right');
const prev = document.querySelector('#left');
const slides = document.querySelectorAll('.carouselSlide');
const dots = document.querySelectorAll('.carousel-dot');

let currentIndex = 0;
const totalSlides = slides.length;

next.addEventListener('click',nextSlide);
prev.addEventListener('click',prevSlide);

// Add click event to dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

function updateCarousel(){
    // Update slides
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentIndex].classList.add('active');
    
    // Update dots - sliding pill effect
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

function nextSlide(){
    currentIndex = (currentIndex + 1) % totalSlides; 
    updateCarousel();
}

function prevSlide(){
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

updateCarousel();

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);


const categoryItems = document.querySelectorAll('.category-item');
const categoryProductSections = document.querySelectorAll('.category-products');

if (categoryItems.length > 0) {
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            categoryItems.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
    
            const categoryName = this.getAttribute('data-category');
            categoryProductSections.forEach(section => {
                section.classList.remove('active');
                if (section.getAttribute('data-category') === categoryName) {
                    section.classList.add('active');
                }
            });
        });
    });
}

function initCountdown() {
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!hoursEl || !minutesEl || !secondsEl) return;
    
    let endTime = new Date();
    endTime.setHours(endTime.getHours() + 6);
    
    function updateCountdown() {
        const now = new Date();
        const diff = endTime - now;
        
        if (diff <= 0) {
            endTime = new Date();
            endTime.setHours(endTime.getHours() + 6);
            return;
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        hoursEl.textContent = hours;
        minutesEl.textContent = minutes;
        secondsEl.textContent = seconds;
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

initCountdown();


function initFirecrackersCarousel() {
    const container = document.getElementById('firecrackers-container');
    const track = document.getElementById('firecrackers-track');
    const leftBtn = document.getElementById('firecracker-left');
    const rightBtn = document.getElementById('firecracker-right');
    
    if (!container || !track || !leftBtn || !rightBtn) return;
    
    const cards = Array.from(track.querySelectorAll('.firecracker-card'));
    const totalCards = cards.length;
    
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
    for (let i = totalCards - 1; i >= 0; i--) {
        const clone = cards[i].cloneNode(true);
        track.insertBefore(clone, track.firstChild);
    }
    const cardStyle = window.getComputedStyle(track.querySelector('.firecracker-card'));
    const cardWidth = track.querySelector('.firecracker-card').offsetWidth + 25;
    
    let currentPosition = totalCards * cardWidth;
    track.style.transform = `translateX(-${currentPosition}px)`;
    
    let isAnimating = false;
    
    function handleTransitionEnd() {
        track.style.transition = 'none';
    
        if (currentPosition >= (totalCards * 2) * cardWidth) {
            currentPosition = totalCards * cardWidth;
            track.style.transform = `translateX(-${currentPosition}px)`;
        }
        if (currentPosition <= 0) {
            currentPosition = totalCards * cardWidth;
            track.style.transform = `translateX(-${currentPosition}px)`;
        }
        
        isAnimating = false;
    }
    
    track.addEventListener('transitionend', handleTransitionEnd);

    rightBtn.addEventListener('click', function() {
        if (isAnimating) return;
        isAnimating = true;
        
        track.style.transition = 'transform 0.5s ease';
        currentPosition += cardWidth;
        track.style.transform = `translateX(-${currentPosition}px)`;
    });

    leftBtn.addEventListener('click', function() {
        if (isAnimating) return;
        isAnimating = true;
        
        track.style.transition = 'transform 0.5s ease';
        currentPosition -= cardWidth;
        track.style.transform = `translateX(-${currentPosition}px)`;
    });
}

initFirecrackersCarousel();


const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.small-box1, .youtubeBox, .influencersBox, .bestsellersBox');
    
    const revealOnScroll = () => {
        revealElements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight - 100 && rect.bottom > 0) {
                const delay = (index % 8) * 100;
                setTimeout(() => {
                    el.classList.add('reveal');
                }, delay);
            } else {
                el.classList.remove('reveal');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}

initScrollReveal();

function initPartnerReveal() {
    const partnerLogos = document.querySelectorAll('.partner-logo');
    const partnerSection = document.querySelector('.partner');
    
    if (!partnerSection || partnerLogos.length === 0) return;
    
    const revealPartners = () => {
        const rect = partnerSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
    
        if (rect.top < windowHeight - 100 && rect.bottom > 0) {
            partnerLogos.forEach((logo, index) => {
                setTimeout(() => {
                    logo.classList.add('reveal');
                }, index * 150);
            });
        } else {
            partnerLogos.forEach(logo => {
                logo.classList.remove('reveal');
            });
        }
    };
    
    window.addEventListener('scroll', revealPartners);
    revealPartners();
}

initPartnerReveal();

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger-menu');
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('mobile-overlay');
    const closeBtn = document.getElementById('mobile-close');
    const menuHeaders = document.querySelectorAll('.mobile-menu-header');
    const mobileNavCategories = document.getElementById('mobile-nav-categories');
    
    if (!sidebar || !overlay || !closeBtn) return;
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            openSidebar();
        });
    }
    
    if (mobileNavCategories) {
        mobileNavCategories.addEventListener('click', function(e) {
            e.preventDefault();
            openSidebar();
        });
    }
    
    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent body scroll
    }
    
    closeBtn.addEventListener('click', closeSidebar);

    overlay.addEventListener('click', closeSidebar);
    
    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    menuHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const submenu = document.getElementById(targetId);
            
            if (!submenu) return;
        
            const isActive = this.classList.contains('active');
            
            menuHeaders.forEach(h => {
                h.classList.remove('active');
                const subId = h.getAttribute('data-target');
                const sub = document.getElementById(subId);
                if (sub) sub.classList.remove('active');
            });
            
            if (!isActive) {
                this.classList.add('active');
                submenu.classList.add('active');
            }
        });
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            closeSidebar();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
}

initMobileMenu();

function initFooterAccordion() {
    const footerAccordionHeaders = document.querySelectorAll('.footer-accordion-header');
    
    footerAccordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
    
            if (window.innerWidth > 587) return;
            
            const targetId = this.getAttribute('data-footer-target');
            const content = document.getElementById(targetId);
            
            if (!content) return;
            
            const isActive = this.classList.contains('active');
            
            footerAccordionHeaders.forEach(h => {
                h.classList.remove('active');
                const contentId = h.getAttribute('data-footer-target');
                const c = document.getElementById(contentId);
                if (c) c.classList.remove('active');
            });
            
            if (!isActive) {
                this.classList.add('active');
                content.classList.add('active');
            }
        });
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 587) {
            footerAccordionHeaders.forEach(h => {
                h.classList.remove('active');
                const contentId = h.getAttribute('data-footer-target');
                const c = document.getElementById(contentId);
                if (c) c.classList.remove('active');
            });
        }
    });
}

initFooterAccordion();