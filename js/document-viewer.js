document.addEventListener("DOMContentLoaded", () => {
    const resources = {
        overview: {
            title: "Detailed problem description",
            type: "pdf",
            path: "assets/documents/process-overview.pdf"
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
        "sql-result": {
            title: "SQL table result",
            type: "image",
            path: "assets/documents/sql-table-result.png"
        }
    };

    const resourceKey = new URLSearchParams(window.location.search).get("doc");
    const resource = resources[resourceKey];
    const frame = document.querySelector("[data-viewer-frame]");
    const title = document.querySelector("[data-viewer-title]");
    const closeButton = document.querySelector("[data-close-viewer]");

    closeButton?.addEventListener("click", () => {
        window.close();
        window.setTimeout(() => {
            window.location.href = "claims-case-study.html#deliverables";
        }, 120);
    });

    if (!resource || !frame || !title) {
        if (title) {title.textContent = "Resource unavailable";}
        if (frame) {
            frame.innerHTML = '<div class="viewer-error"><h2>Preview not found</h2><p>The requested resource is not part of this case study.</p></div>';
        }
        return;
    }

    title.textContent = resource.title;
    document.title = `${resource.title} | Winston Engamba`;

    if (resource.type === "image") {
        const image = document.createElement("img");
        image.src = resource.path;
        image.alt = resource.title;
        image.draggable = false;
        frame.appendChild(image);
    } else {
        const iframe = document.createElement("iframe");
        iframe.title = resource.title;
        iframe.referrerPolicy = "no-referrer";

        if (resource.type === "drawio") {
            const sourceUrl = new URL(resource.path, window.location.href).href;
            iframe.src = `https://viewer.diagrams.net/?highlight=65C9A6&edit=_blank&layers=1&nav=1&title=${encodeURIComponent(resource.title)}#U${encodeURIComponent(sourceUrl)}`;
            iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-popups");
        } else if (resource.type === "pdf") {
            iframe.src = `${resource.path}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`;
        } else {
            iframe.src = resource.path;
            iframe.setAttribute("sandbox", "allow-same-origin");
        }

        frame.appendChild(iframe);
    }

    document.addEventListener("contextmenu", (event) => event.preventDefault());
    document.addEventListener("dragstart", (event) => event.preventDefault());
    document.addEventListener("keydown", (event) => {
        const blockedKey = ["s", "p", "u"].includes(event.key.toLowerCase());
        if ((event.ctrlKey || event.metaKey) && blockedKey) {
            event.preventDefault();
        }
        if (event.key === "F12" || event.key === "PrintScreen") {
            event.preventDefault();
        }
    });

    document.addEventListener("visibilitychange", () => {
        document.body.classList.toggle("is-obscured", document.hidden);
    });
    window.addEventListener("blur", () => document.body.classList.add("is-obscured"));
    window.addEventListener("focus", () => document.body.classList.remove("is-obscured"));
});
