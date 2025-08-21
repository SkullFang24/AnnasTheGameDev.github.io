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

// ======= TIMELINE ANIMATION =======
const timelineContainers = document.querySelectorAll(".timeline .container");

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.3 });

// Add staggered delay
timelineContainers.forEach((container, index) => {
    container.style.transitionDelay = `${index * 0.2}s`;
    timelineObserver.observe(container);
});

document.querySelectorAll(".skill-heading").forEach(heading => {
  heading.addEventListener("mouseenter", () => {
    const target = heading.getAttribute("data-skill");

    // Hide all
    document.querySelectorAll(".skill-content").forEach(content => {
      content.classList.remove("active");
    });

    // Show hovered one
    document.getElementById(target).classList.add("active");
  });
});

