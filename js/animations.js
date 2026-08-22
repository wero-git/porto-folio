/* =========================================================
   WINSTON ENGAMBA — PORTFOLIO
   ANIMATIONS.JS
   Global visual animations
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const reducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* =====================================================
       01. SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if (reducedMotion || revealElements.length === 0) {
        revealElements.forEach((element) => {
           element.classList.add("visible");
        });

    } else {

        const revealObserver = new IntersectionObserver( (entries, observer) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) {return;}
                            entry.target.classList.add("visible");
                            observer.unobserve(entry.target);
                    });
                },
                {threshold: 0.12, rootMargin: "0px 0px -50px 0px"}
            );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    }


    /* =====================================================
       02. STAGGERED ANIMATIONS
    ====================================================== */

    const staggerGroups = [".skill-bubble", ".interest-card", ".experience-card",
        ".project-card", ".category-bubble"
    ];

         staggerGroups.forEach((selector) => {

        document
            .querySelectorAll(selector)
            .forEach((element, index) => {
                element.style.setProperty("--animation-delay", `${index * 80}ms`);
            });

    });


    /* =====================================================
       03. HERO PARALLAX
    ====================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");

    if (
        heroVisual &&
        !reducedMotion
    ) {

        let ticking = false;

        const updateParallax = () => {
            const movement = Math.min(window.scrollY * 0.05, 30);
            heroVisual.style.transform = `translateY(${movement}px)`;
            ticking = false;

        };


        window.addEventListener("scroll", () => {
                if (ticking) return;
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            },
            { passive: true }
        );

    }


    /* =====================================================
       04. LANGUAGE PROGRESS BARS
    ====================================================== */

    const languageBars =
        document.querySelectorAll(".language-progress");


    if (languageBars.length > 0) {
        const languageObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const bar = entry.target;

                        const level = parseInt(bar.dataset.level, 10);

                        if (Number.isNaN(level)
                        ) {return;}

                        const safeLevel = Math.min(Math.max(level, 0), 100);

                        bar.style.width =`${safeLevel}%`;
                        observer.unobserve(bar);

                    });

                },
                {threshold: 0.5}
            );

        languageBars.forEach((bar) => {
            languageObserver.observe(bar);
        });

    }


    /* =====================================================
       05. SOFT HOVER TILT
    ====================================================== */

    if (!reducedMotion) {

        const interactiveCards =
            document.querySelectorAll(
                ".project-card[data-tilt]"
            );


        interactiveCards.forEach((card) => {

            card.addEventListener("mousemove", (event) => {
                    const rect = card.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;
                    const rotateY = ((x / rect.width) - 0.5) * 4;
                    const rotateX = ((y / rect.height) - 0.5) * -4;
                    card.style.transform = `perspective(800px) rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-4px)`;
                }
            );

            card.addEventListener("mouseleave", () => {
                    card.style.transform = "";

                }
            );

        });

    }

});
