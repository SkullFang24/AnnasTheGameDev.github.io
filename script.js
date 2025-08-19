document.addEventListener("DOMContentLoaded", () => {
    // --- Header scroll effect ---
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // --- Navigation active link ---
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

    // --- Timeline animation ---
    const timelineContainers = document.querySelectorAll(".timeline .container");
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.3 });

    timelineContainers.forEach(container => timelineObserver.observe(container));
});
