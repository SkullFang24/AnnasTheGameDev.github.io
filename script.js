// ======= HEADER =======
const header = document.querySelector("header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Fade header up/down based on scroll direction
    if (currentScroll > lastScroll && currentScroll > 50) {
        // Scrolling down
        header.classList.add("hide");
        header.classList.remove("show");
    } else {
        // Scrolling up
        header.classList.add("show");
        header.classList.remove("hide");
    }

    // Shadow background when scrolled
    if (currentScroll > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
});

// ======= NAVIGATION HIGHLIGHT =======
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href").substring(1) === entry.target.id) {
                    link.classList.add("active");
                }
            });
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));

// ======= ENHANCED TIMELINE ANIMATION =======
const timelineContainers = document.querySelectorAll(".timeline .container");
const timeline = document.querySelector(".timeline");

// Add initial styles for animation
timelineContainers.forEach((container) => {
    const content = container.querySelector('.content');
    const year = container.querySelector('.year');
    
    // Set initial states for animation
    container.style.opacity = "0";
    container.style.transform = "translateY(40px)";
    container.style.transition = "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    
    if (content) {
        content.style.transform = "scale(0.95)";
        content.style.opacity = "0";
        content.style.transition = "all 0.6s ease 0.3s";
    }
    
    if (year) {
        year.style.opacity = "0";
        year.style.transform = "translateX(20px)";
        year.style.transition = "all 0.6s ease 0.4s";
    }
    
    // Add hover effects
    if (content) {
        content.addEventListener('mouseenter', () => {
            content.style.transform = "translateY(-5px) scale(1.02)";
            content.style.boxShadow = "0 15px 35px rgba(183, 75, 75, 0.25), 0 5px 15px rgba(0, 0, 0, 0.5)";
        });
        
        content.addEventListener('mouseleave', () => {
            content.style.transform = "translateY(0) scale(1)";
            content.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5), 0 5px 15px rgba(183, 75, 75, 0.3)";
        });
    }
});

// Enhanced timeline observer with progress animation
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(timelineContainers).indexOf(entry.target);
            
            // Staggered animation with easing
            setTimeout(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                
                // Animate the content with a slight delay
                setTimeout(() => {
                    const content = entry.target.querySelector('.content');
                    const year = entry.target.querySelector('.year');
                    
                    if (content) {
                        content.style.opacity = "1";
                        content.style.transform = "scale(1)";
                    }
                    
                    if (year) {
                        year.style.opacity = "1";
                        year.style.transform = "translateX(0)";
                    }
                    
                    // Animate timeline progress
                    animateTimelineProgress();
                    
                }, 200);
                
            }, index * 200); // Stagger delay
        }
    });
}, { 
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px"
});

// Observe each container
timelineContainers.forEach((container) => {
    timelineObserver.observe(container);
});

// Animate timeline progress line
function animateTimelineProgress() {
    const timelineLine = document.querySelector('.timeline::after');
    const visibleContainers = Array.from(timelineContainers).filter(container => {
        const rect = container.getBoundingClientRect();
        return rect.top < window.innerHeight * 0.8;
    });
    
    const progress = (visibleContainers.length / timelineContainers.length) * 100;
    
    if (timeline) {
        timeline.style.setProperty('--progress', `${progress}%`);
    }
}

// Update progress on scroll
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(animateTimelineProgress, 100);
});

// Initialize progress
animateTimelineProgress();

// Add connection line animation between points
function animateConnectionLines() {
    timelineContainers.forEach((container, index) => {
        if (index < timelineContainers.length - 1 && container.classList.contains('show')) {
            const nextContainer = timelineContainers[index + 1];
            if (nextContainer.classList.contains('show')) {
                // Create connection effect (visual only)
                container.style.setProperty('--connection-opacity', '1');
            }
        }
    });
}

// Re-apply animations when window is resized
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        timelineContainers.forEach(container => {
            if (container.classList.contains('show')) {
                container.style.opacity = "1";
                container.style.transform = "translateY(0)";
                
                const content = container.querySelector('.content');
                const year = container.querySelector('.year');
                
                if (content) {
                    content.style.opacity = "1";
                    content.style.transform = "scale(1)";
                }
                
                if (year) {
                    year.style.opacity = "1";
                    year.style.transform = "translateX(0)";
                }
            }
        });
    }, 250);
});

// Skills cards animation on scroll
const skillCards = document.querySelectorAll('.skill-card');

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add delay based on index for staggered animation
            setTimeout(() => {
                entry.target.classList.add('in-view');
            }, index * 150);
        }
    });
}, { threshold: 0.3 });

// Observe each skill card
skillCards.forEach(card => {
    skillsObserver.observe(card);
});

// Optional: Add click event for mobile devices to flip cards
if (window.innerWidth <= 768) {
    skillCards.forEach(card => {
        card.addEventListener('click', function() {
            const inner = this.querySelector('.card-inner');
            if (inner.style.transform === 'rotateY(180deg)') {
                inner.style.transform = 'rotateY(0deg)';
            } else {
                inner.style.transform = 'rotateY(180deg)';
            }
        });
    });
}


