/* =========================================================
   WINSTON ENGAMBA — PORTFOLIO
   PROJECTS.JS
   Projects & categories interactions
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    /* =====================================================
       01. CATEGORY SELECTION
    ====================================================== */

    const categories = document.querySelectorAll("[data-project-category]");
    const projects = document.querySelectorAll("[data-project-type]");
    if (categories.length === 0 || projects.length === 0) {return;}
    categories.forEach((category) => {
        category.addEventListener("click", () => {
                const selectedCategory = category.dataset .projectCategory;

              /* ---------- Active category ---------- */
                categories.forEach((item) => {
                    item.classList.toggle("active", item === category);});


                /* ---------- Filter projects ---------- */
                projects.forEach((project) => {
                    const projectType = project.dataset .projectType;
                    const show =
                        selectedCategory === "all" || projectType === selectedCategory;
                    project.classList.toggle("project-hidden", !show);
                });


                /* ---------- Scroll to projects ---------- */

                const projectsArea = document.querySelector("#project-list");
                if (projectsArea) {
                    projectsArea.scrollIntoView({behavior: "smooth", block: "start"});
                }

            }
        );

    });


    /* =====================================================
       02. RESET PROJECT FILTER
    ====================================================== */

    const resetButton = document.querySelector("[data-project-reset]");
    if (resetButton) {resetButton.addEventListener("click", () => {
          categories.forEach((category) => {category.classList.remove("active");});
          projects.forEach((project) => {project.classList.remove("project-hidden");});

            }
        );

    }


    /* =====================================================
       03. PROJECT DETAILS
    ====================================================== */

    const projectButtons = document.querySelectorAll("[data-project-toggle]");
    projectButtons.forEach((button) => {
        button.addEventListener("click", () => {
                const project = button.closest(".project-card");
                if (!project) {return;}
                const isExpanded = project.classList.toggle("project-expanded");
                button.setAttribute("aria-expanded", String(isExpanded));
                const details = project.querySelector(".project-details");
                if (!details) {return;}
                if (isExpanded) {
                    details.style.maxHeight = `${details.scrollHeight}px`;
                } else {details.style.maxHeight = "0";}

            }
        );

    });


    /* =====================================================
       04. PROJECT LINKS
    ====================================================== */

    document
        .querySelectorAll(".project-link")
        .forEach((link) => {
            link.addEventListener("click", (event) => {
                    const href = link.getAttribute("href");
                    /*
                     * Prevent accidental navigation
                     * while the link is still a placeholder.
                     */
                    if (!href || href === "#") {event.preventDefault();}

                }
            );

        });


    /* =====================================================
       05. PROJECT TECHNOLOGY TAGS
    ====================================================== */

    document .querySelectorAll(".project-tags span")
        .forEach((tag) => {tag.addEventListener("click", () => {
                    tag.classList.toggle("selected");
                }
            );

        });


    /* =====================================================
       06. CATEGORY HOVER STATE
    ====================================================== */

    categories.forEach((category) => {

        category.addEventListener("mouseenter", () => {
                const selected = category.dataset .projectCategory;
                projects.forEach((project) => {
                    const type = project.dataset .projectType;
                    if (selected !== "all" && type !== selected) 
                    {project.classList.add("project-dimmed");}
                });
            }
        );

        category.addEventListener("mouseleave", () => {
                projects.forEach((project) => {
                    project.classList.remove("project-dimmed");

                });

            }
        );

    });

});
