/* =========================================================
   WINSTON ENGAMBA — PORTFOLIO
   MAIN.JS
   Global interactions
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. MOBILE NAVIGATION
    ====================================================== */

    const header = document.querySelector(".site-header");
    const navigation = document.querySelector(".main-navigation");

    if (header && navigation) {

        const menuButton = document.createElement("button");

        menuButton.className = "mobile-menu-button";
        menuButton.setAttribute("aria-label", "Open navigation menu");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.innerHTML = `<span></span> <span></span> <span></span>`;
        header.appendChild(menuButton);
        menuButton.addEventListener("click", () => {

            const isOpen = navigation.classList.toggle("mobile-navigation-open");
            menuButton.classList.toggle("menu-open",isOpen);
            menuButton.setAttribute("aria-expanded", String(isOpen));
            document.body.classList.toggle("menu-is-open",isOpen);
        });


        navigation
            .querySelectorAll("a")
            .forEach((link) => {link.addEventListener("click", () => {
                    navigation.classList.remove("mobile-navigation-open");
                    menuButton.classList.remove("menu-open");
                    menuButton.setAttribute("aria-expanded", "false");
                    document.body.classList.remove("menu-is-open");
                });

            });

    }


    /* =====================================================
       02. HEADER ON SCROLL
    ====================================================== */

    const siteHeader =
        document.querySelector(".site-header");

    if (siteHeader) {

        const updateHeader = () => {
            siteHeader.classList.toggle("header-scrolled", window.scrollY > 30);

        };
        updateHeader();

        window.addEventListener("scroll", updateHeader, { passive: true });
    }


    /* =====================================================
       03. ACTIVE NAVIGATION
    ====================================================== */

    const currentPage = document.body.dataset.navigationParent ||
        window.location.pathname.split("/").pop() || "index.html";
    document
        .querySelectorAll(".main-navigation a")
        .forEach((link) => {

            const href =
                link.getAttribute("href");

            if (!href) return;

            const linkPage =
                href
                    .split("/")
                    .pop()
                    .split("#")[0];

            link.classList.toggle("active", linkPage === currentPage);

        });


    /* =====================================================
       04. CURRENT YEAR
    ====================================================== */

    document
        .querySelectorAll("[data-current-year]")
        .forEach((element) => {element.textContent = new Date().getFullYear(); });


    /* =====================================================
       05. INTERNAL ANCHOR LINKS
    ====================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener("click", (event) => {
                const targetId = link.getAttribute("href");
                if (!targetId || targetId === "#") {
                    return;}
                const target =
                    document.querySelector(targetId);

                if (!target) return;
                event.preventDefault();
                target.scrollIntoView({behavior: "smooth",block: "start"});
            });

        });


    /* =====================================================
       06. CV DOWNLOAD
    ====================================================== */

    document
        .querySelectorAll("[data-cv-download]")
        .forEach((link) => {
            link.addEventListener("click", () => {
                link.classList.add("cv-download-active");
            });

        });


    /* =====================================================
       07. EXTERNAL LINKS
    ====================================================== */

    document
        .querySelectorAll("[data-external]")
        .forEach((link) => {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");

        });

});
