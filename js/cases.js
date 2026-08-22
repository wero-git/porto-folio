document.addEventListener("DOMContentLoaded", () => {
    const values = {
        challenges: document.querySelectorAll("[data-case-challenge]").length,
        solutions: document.querySelectorAll("[data-case-solution]").length,
        deliverables: document.querySelectorAll("[data-case-deliverable]").length
    };

    const counters = document.querySelectorAll("[data-case-summary]");
    if (counters.length === 0) {return;}

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animate = (element) => {
        const target = values[element.dataset.caseSummary] ?? 0;
        if (reducedMotion) {
            element.textContent = String(target);
            return;
        }

        const start = performance.now();
        const duration = 750;
        const tick = (time) => {
            const progress = Math.min((time - start) / duration, 1);
            element.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3))));
            if (progress < 1) {requestAnimationFrame(tick);}
        };
        requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window) || reducedMotion) {
        counters.forEach(animate);
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {return;}
            animate(entry.target);
            currentObserver.unobserve(entry.target);
        });
    }, {threshold: 0.65});

    counters.forEach((counter) => observer.observe(counter));
});
