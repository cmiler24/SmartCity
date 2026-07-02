async function loadAnnouncements() {
    try {
        const response = await fetch("/api/announcements");
        const announcements = await response.json();

        const alertsList = document.querySelector(".alerts-list");
        alertsList.innerHTML = "";

        announcements.forEach((announcement) => {
            const alertItem = createAlertItem(announcement);
            alertsList.appendChild(alertItem);
        });
    } catch (error) {
        console.error("Error loading announcements:", error);
        const alertsList = document.querySelector(".alerts-list");
        alertsList.innerHTML = "<p>Error loading announcements. Please try again later.</p>";
    }
}

function createAlertItem(announcement) {
    const article = document.createElement("article");
    article.className = "alert-item";

    if (announcement.type === "Emergency Alert") {
        article.classList.add("emergency-alert");
    }

    const dateObj = new Date(announcement.datePosted);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    const typeClass = announcement.type === "Emergency Alert" ? "emergency" : "announcement";

    article.innerHTML = `
        <div class="alert-header-row">
            <span class="alert-tag ${typeClass}">${announcement.type}</span>
            <span class="alert-department">${announcement.department}</span>
        </div>

        <h3>${announcement.title}</h3>
        <p>
            ${announcement.description}
        </p>

        <span class="alert-date">Posted: ${formattedDate}</span>
    `;

    return article;
}

// Load announcements when page loads
loadAnnouncements();


