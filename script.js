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


// ==================== PRODUCTS MEGA MENU ====================

// Category item hover effect for switching categories in dropdown
const categoryItems = document.querySelectorAll('.category-item');
const categoryProductSections = document.querySelectorAll('.category-products');

if (categoryItems.length > 0) {
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Remove active from all category items
            categoryItems.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding product section
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


// ==================== COUNTDOWN TIMER ====================

// Set countdown end time (6 hours from now for demo)
function initCountdown() {
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    // If elements don't exist, skip
    if (!hoursEl || !minutesEl || !secondsEl) return;
    
    // Set end time - 6 hours from page load
    let endTime = new Date();
    endTime.setHours(endTime.getHours() + 6);
    
    function updateCountdown() {
        const now = new Date();
        const diff = endTime - now;
        
        if (diff <= 0) {
            // Reset timer when it reaches 0
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
    
    // Update every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Initialize countdown when DOM is loaded
initCountdown();


// ==================== FIRECRACKERS CAROUSEL ====================

function initFirecrackersCarousel() {
    const container = document.getElementById('firecrackers-container');
    const track = document.getElementById('firecrackers-track');
    const leftBtn = document.getElementById('firecracker-left');
    const rightBtn = document.getElementById('firecracker-right');
    
    // If elements don't exist, skip
    if (!container || !track || !leftBtn || !rightBtn) return;
    
    const cards = Array.from(track.querySelectorAll('.firecracker-card'));
    const totalCards = cards.length;
    
    // Clone all cards and append/prepend for seamless infinite scroll
    // Clone to end
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
    // Clone to beginning
    for (let i = totalCards - 1; i >= 0; i--) {
        const clone = cards[i].cloneNode(true);
        track.insertBefore(clone, track.firstChild);
    }
    
    // Get card width including gap after cloning
    const cardStyle = window.getComputedStyle(track.querySelector('.firecracker-card'));
    const cardWidth = track.querySelector('.firecracker-card').offsetWidth + 25; // 25 is gap
    
    // Set initial position to show original cards (skip the prepended clones)
    let currentPosition = totalCards * cardWidth;
    track.style.transform = `translateX(-${currentPosition}px)`;
    
    let isAnimating = false;
    
    function handleTransitionEnd() {
        track.style.transition = 'none';
        
        // If scrolled too far right, jump back to original set
        if (currentPosition >= (totalCards * 2) * cardWidth) {
            currentPosition = totalCards * cardWidth;
            track.style.transform = `translateX(-${currentPosition}px)`;
        }
        // If scrolled too far left, jump forward to original set
        if (currentPosition <= 0) {
            currentPosition = totalCards * cardWidth;
            track.style.transform = `translateX(-${currentPosition}px)`;
        }
        
        isAnimating = false;
    }
    
    track.addEventListener('transitionend', handleTransitionEnd);
    
    // Scroll right - continuous forward
    rightBtn.addEventListener('click', function() {
        if (isAnimating) return;
        isAnimating = true;
        
        track.style.transition = 'transform 0.5s ease';
        currentPosition += cardWidth;
        track.style.transform = `translateX(-${currentPosition}px)`;
    });
    
    // Scroll left - continuous backward
    leftBtn.addEventListener('click', function() {
        if (isAnimating) return;
        isAnimating = true;
        
        track.style.transition = 'transform 0.5s ease';
        currentPosition -= cardWidth;
        track.style.transform = `translateX(-${currentPosition}px)`;
    });
}

// Initialize firecrackers carousel
initFirecrackersCarousel();


// ==================== BACK TO TOP BUTTON ====================

const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// ==================== SCROLL REVEAL ANIMATION ====================

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.small-box1, .youtubeBox, .influencersBox, .bestsellersBox');
    
    const revealOnScroll = () => {
        revealElements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Check if element is in viewport
            if (rect.top < windowHeight - 100 && rect.bottom > 0) {
                // Add staggered delay based on position in row
                const delay = (index % 8) * 100; // Stagger by 100ms per item
                setTimeout(() => {
                    el.classList.add('reveal');
                }, delay);
            } else {
                // Remove reveal class when out of viewport
                el.classList.remove('reveal');
            }
        });
    };
    
    // Run on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Run once on load
    revealOnScroll();
}

initScrollReveal();


// ==================== PARTNER LOGOS STAGGERED REVEAL ====================

function initPartnerReveal() {
    const partnerLogos = document.querySelectorAll('.partner-logo');
    const partnerSection = document.querySelector('.partner');
    
    if (!partnerSection || partnerLogos.length === 0) return;
    
    const revealPartners = () => {
        const rect = partnerSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if partner section is in viewport
        if (rect.top < windowHeight - 100 && rect.bottom > 0) {
            partnerLogos.forEach((logo, index) => {
                setTimeout(() => {
                    logo.classList.add('reveal');
                }, index * 150); // 150ms delay between each logo
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


// ==================== MOBILE SIDEBAR MENU ====================

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger-menu');
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('mobile-overlay');
    const closeBtn = document.getElementById('mobile-close');
    const menuHeaders = document.querySelectorAll('.mobile-menu-header');
    const mobileNavCategories = document.getElementById('mobile-nav-categories');
    
    // If elements don't exist, skip
    if (!sidebar || !overlay || !closeBtn) return;
    
    // Open sidebar from hamburger menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            openSidebar();
        });
    }
    
    // Open sidebar from bottom nav Categories button
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
    
    // Close sidebar - Close button
    closeBtn.addEventListener('click', closeSidebar);
    
    // Close sidebar - Overlay click
    overlay.addEventListener('click', closeSidebar);
    
    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore body scroll
    }
    
    // Accordion toggle for menu items
    menuHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const submenu = document.getElementById(targetId);
            
            if (!submenu) return;
            
            // Toggle current item
            const isActive = this.classList.contains('active');
            
            // Close all other submenus
            menuHeaders.forEach(h => {
                h.classList.remove('active');
                const subId = h.getAttribute('data-target');
                const sub = document.getElementById(subId);
                if (sub) sub.classList.remove('active');
            });
            
            // Open current if it wasn't active
            if (!isActive) {
                this.classList.add('active');
                submenu.classList.add('active');
            }
        });
    });
    
    // Close sidebar on window resize if desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            closeSidebar();
        }
    });
    
    // Close sidebar with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
}

initMobileMenu();

// Footer Accordion Functionality
function initFooterAccordion() {
    const footerAccordionHeaders = document.querySelectorAll('.footer-accordion-header');
    
    footerAccordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Only activate on mobile (587px and below)
            if (window.innerWidth > 587) return;
            
            const targetId = this.getAttribute('data-footer-target');
            const content = document.getElementById(targetId);
            
            if (!content) return;
            
            const isActive = this.classList.contains('active');
            
            // Close all other accordions
            footerAccordionHeaders.forEach(h => {
                h.classList.remove('active');
                const contentId = h.getAttribute('data-footer-target');
                const c = document.getElementById(contentId);
                if (c) c.classList.remove('active');
            });
            
            // Open current if it wasn't active
            if (!isActive) {
                this.classList.add('active');
                content.classList.add('active');
            }
        });
    });
    
    // Reset accordions on resize to desktop
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