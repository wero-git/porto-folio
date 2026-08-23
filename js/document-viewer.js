document.addEventListener("DOMContentLoaded", () => {
    /* =====================================================
       AVAILABLE RESOURCES
    ====================================================== */

    const resources = {
        overview: {
            title: "Detailed problem description",
            type: "pdf",
            path: "assets/documents/process-overview.pdf"
        },
        report: {
    title: "End-to-end claim case - Full project report",
    type: "pdf",
    path: "assets/documents/end-to-end-claim-case-report.pdf"
},       
        "initial-process": {
            title: "Initial process model",
            type: "drawio",
            path: "assets/documents/process initial.drawio"
        },

        "optimized-process": {
            title: "Optimized process model",
            type: "drawio",
            path: "assets/documents/optimized process.drawio"
        },

        excel: {
            title: "Claims data visualization",
            type: "html",
            path: "assets/previews/excel-visualisation.html"
        },

        "sql-code": {
            title: "Claims database SQL code",
            type: "code",
            path: "assets/documents/script.sql"
        },

        "sql-result": {
            title: "SQL table result",
            type: "image",
            path: "assets/documents/sql-table-result.png"
        }
    };


    /* =====================================================
       PAGE ELEMENTS
    ====================================================== */

    const resourceKey =
        new URLSearchParams(window.location.search).get("doc");

    const resource = resources[resourceKey];

    const frame =
        document.querySelector("[data-viewer-frame]");

    const title =
        document.querySelector("[data-viewer-title]");

    const closeButton =
        document.querySelector("[data-close-viewer]");


    /* =====================================================
       CLOSE BUTTON
    ====================================================== */

    closeButton?.addEventListener("click", () => {
        window.close();

        window.setTimeout(() => {
            if (!window.closed) {
                window.location.href =
                    "claims-case-study.html#deliverables";
            }
        }, 120);
    });


    /* =====================================================
       ERROR DISPLAY
    ====================================================== */

    const showError = (message) => {
        if (!frame) {
            return;
        }

        frame.classList.remove("viewer-code");

        frame.innerHTML = `
            <div class="viewer-error">
                <h2>Preview unavailable</h2>
                <p>${message}</p>
            </div>
        `;
    };


    /* =====================================================
       RESOURCE VALIDATION
    ====================================================== */

    if (!resource || !frame || !title) {
        if (title) {
            title.textContent = "Resource unavailable";
        }

        showError(
            "The requested resource is not part of this case study."
        );

        return;
    }


    title.textContent = resource.title;

    document.title =
        `${resource.title} | Winston Engamba`;


    /* =====================================================
       SQL CODE
    ====================================================== */

    if (resource.type === "code") {
        frame.classList.add("viewer-code");

        const pre = document.createElement("pre");
        const code = document.createElement("code");

        code.textContent = "Loading SQL code…";

        pre.appendChild(code);
        frame.appendChild(pre);

        fetch(resource.path)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `File unavailable: ${response.status}`
                    );
                }

                return response.text();
            })
            .then((content) => {
                code.textContent = content;
            })
            .catch((error) => {
                console.error(error);

                showError(
                    "The SQL file could not be displayed."
                );
            });
    }


    /* =====================================================
       IMAGE
    ====================================================== */

    else if (resource.type === "image") {
        const image = document.createElement("img");

        image.src = resource.path;
        image.alt = resource.title;
        image.draggable = false;

        image.addEventListener("error", () => {
            showError(
                "The image could not be found. Check its filename and path."
            );
        });

        frame.appendChild(image);
    }


    /* =====================================================
       PDF
    ====================================================== */

    else if (resource.type === "pdf") {
        const iframe = document.createElement("iframe");

        iframe.title = resource.title;

        iframe.src =
            `${resource.path}` +
            "#toolbar=0&navpanes=0&scrollbar=1&view=FitH";

        frame.appendChild(iframe);
    }


    /* =====================================================
       DRAW.IO
    ====================================================== */

    else if (resource.type === "drawio") {
        const iframe = document.createElement("iframe");

        const sourceUrl = new URL(
            resource.path,
            window.location.href
        ).href;

        const viewerUrl =
            "https://viewer.diagrams.net/" +
            "?highlight=65C9A6" +
            "&edit=_blank" +
            "&layers=1" +
            "&nav=1" +
            `&title=${encodeURIComponent(resource.title)}` +
            `#U${encodeURIComponent(sourceUrl)}`;

        iframe.title = resource.title;
        iframe.src = viewerUrl;

        iframe.setAttribute(
            "sandbox",
            "allow-scripts allow-same-origin allow-popups"
        );

        frame.appendChild(iframe);
    }


    /* =====================================================
       HTML / EXCEL PREVIEW
    ====================================================== */

    else if (resource.type === "html") {
        const iframe = document.createElement("iframe");

        iframe.title = resource.title;
        iframe.src = resource.path;

        iframe.setAttribute(
            "sandbox",
            "allow-same-origin"
        );

        frame.appendChild(iframe);
    }


    /* =====================================================
       UNKNOWN FORMAT
    ====================================================== */

    else {
        showError(
            "This resource format is not supported."
        );
    }


    /* =====================================================
       BASIC PROTECTION
    ====================================================== */

    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });

    document.addEventListener("dragstart", (event) => {
        event.preventDefault();
    });

    document.addEventListener("keydown", (event) => {
        const blockedKey = ["s", "p", "u"]
            .includes(event.key.toLowerCase());

        if (
            (event.ctrlKey || event.metaKey) &&
            blockedKey
        ) {
            event.preventDefault();
        }

        if (
            event.key === "F12" ||
            event.key === "PrintScreen"
        ) {
            event.preventDefault();
        }
    });


    /* =====================================================
       HIDE ONLY WHEN THE TAB IS INACTIVE
    ====================================================== */

    document.addEventListener("visibilitychange", () => {
        document.body.classList.toggle(
            "is-obscured",
            document.visibilityState !== "visible"
        );
    });
});
