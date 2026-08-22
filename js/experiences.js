/* =========================================================
   WINSTON ENGAMBA — PORTFOLIO
   EXPERIENCES.JS
   Experience page interactions
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       01. EXPERIENCE DETAILS
    ====================================================== */

    const experienceCards = document.querySelectorAll(".experience-card");
    experienceCards.forEach((card) => {
        const toggle = card.querySelector("[data-experience-toggle]");
        const details = card.querySelector(".experience-details");
        if (!toggle || !details) {
            return;
        }


        toggle.addEventListener("click", () => {
            const isOpen = card.classList.toggle("experience-expanded");
            toggle.setAttribute("aria-expanded", String(isOpen));
            if (isOpen) {details.style.maxHeight = `${details.scrollHeight}px`;
            } else {details.style.maxHeight = "0";}
        });

    });


    /* =====================================================
       02. EXPERIENCE FILTER
    ====================================================== */

    const filters = document.querySelectorAll("[data-experience-filter]");
    const experiences = document.querySelectorAll("[data-experience-category]");
    if (filters.length > 0 && experiences.length > 0
    ) {filters.forEach((filter) => {
            filter.addEventListener("click", () => {
                    const selected = filter.dataset .experienceFilter;
                    filters.forEach((item) => {
                        item.classList.toggle("active", item === filter);
                    });

                    experiences.forEach((experience) => {
                        const category = experience.dataset .experienceCategory;
                        const shouldShow = selected === "all" || category === selected;
                              experience.classList.toggle("filtered-out", !shouldShow);

                        }
                    );

                }
            );

        });

    }


    /* =====================================================
       03. EXPERIENCE TOOL TAGS
    ====================================================== */

    document
        .querySelectorAll(".experience-tools span")
        .forEach((tag) => {tag.addEventListener("click", () => {
                    tag.classList.toggle("selected");
                }
            );

        });


    /* =====================================================
       04. AUTOMATIC EXPERIENCE SUMMARY
    ====================================================== */

    const summaryValues = {
        experiences: document.querySelectorAll(
            ".experience-item[data-experience-category]"
        ).length,
        responsibilities: document.querySelectorAll(
            ".experience-responsibilities li"
        ).length,
        tools: new Set(
            Array.from(document.querySelectorAll(".experience-tools span"))
                .map((tool) => tool.textContent.trim().toLocaleLowerCase())
                .filter(Boolean)
        ).size
    };

    const counters = document.querySelectorAll("[data-summary]");
    if (counters.length === 0) {return;}

    counters.forEach((counter) => {
        const key = counter.dataset.summary;
        counter.dataset.countTarget = String(summaryValues[key] ?? 0);
        counter.textContent = "0";
    });

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const renderCounter = (counter) => {
        const target = Number.parseInt(counter.dataset.countTarget, 10);
        if (Number.isNaN(target)) {return;}

        if (reducedMotion) {
            counter.textContent = String(target);
            return;
        }

        const duration = 900;
        const start = performance.now();
        const animate = (time) => {
            const progress = Math.min((time - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = String(Math.round(target * eased));
            if (progress < 1) {requestAnimationFrame(animate);}
        };
        requestAnimationFrame(animate);
    };

    if (reducedMotion || !("IntersectionObserver" in window)) {
        counters.forEach(renderCounter);
        return;
    }

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {return;}
            renderCounter(entry.target);
            observer.unobserve(entry.target);
        });
    }, {threshold: 0.7});

    counters.forEach((counter) => counterObserver.observe(counter));

});
