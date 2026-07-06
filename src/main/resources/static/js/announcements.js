let allAnnouncements = [];
let subscribedAnnouncements = [];
let currentAnnouncementView = "all";

async function loadAnnouncements() {
    try {
        const response = await fetch("/api/announcements");
        allAnnouncements = await response.json();
        const currentUser = getCurrentUser();

        let visibleAnnouncements = allAnnouncements;

        if (currentUser && currentUser.id) {
            subscribedAnnouncements = await filterAnnouncementsForUser(allAnnouncements, currentUser.id);
            currentAnnouncementView = "subscribed";
            visibleAnnouncements = subscribedAnnouncements;
        } else {
            subscribedAnnouncements = [];
            currentAnnouncementView = "all";
        }

        ensureAnnouncementFilterControls();
        updateAnnouncementFilterControls(currentUser);

        renderAnnouncements(visibleAnnouncements, currentUser);
    } catch (error) {
        console.error("Error loading announcements:", error);
        const alertsList = document.querySelector(".alerts-list");
        alertsList.innerHTML = "<p>Error loading announcements. Please try again later.</p>";
    }
}

function ensureAnnouncementFilterControls() {
    const sectionHeading = document.querySelector(".alerts-section .section-heading");

    if (!sectionHeading || sectionHeading.querySelector(".announcement-filter-controls")) {
        return;
    }

    const controls = document.createElement("div");
    controls.className = "announcement-filter-controls";
    controls.innerHTML = `
        <button id="subscribedAnnouncementsBtn" class="announcement-filter-btn" type="button">Subscribed Announcements</button>
        <button id="allAnnouncementsBtn" class="announcement-filter-btn" type="button">All Announcements</button>
    `;

    const headingLink = sectionHeading.querySelector("a");
    if (headingLink) {
        sectionHeading.insertBefore(controls, headingLink);
    } else {
        sectionHeading.appendChild(controls);
    }

    const subscribedButton = document.getElementById("subscribedAnnouncementsBtn");
    const allButton = document.getElementById("allAnnouncementsBtn");

    subscribedButton.addEventListener("click", () => {
        const currentUser = getCurrentUser();
        if (!currentUser || !currentUser.id) {
            if (typeof openAuthModal === "function") {
                openAuthModal("login");
            }
            return;
        }

        currentAnnouncementView = "subscribed";
        updateAnnouncementFilterControls(currentUser);
        renderAnnouncements(subscribedAnnouncements, currentUser);
    });

    allButton.addEventListener("click", () => {
        const currentUser = getCurrentUser();
        currentAnnouncementView = "all";
        updateAnnouncementFilterControls(currentUser);
        renderAnnouncements(allAnnouncements, currentUser);
    });
}

function updateAnnouncementFilterControls(currentUser) {
    const subscribedButton = document.getElementById("subscribedAnnouncementsBtn");
    const allButton = document.getElementById("allAnnouncementsBtn");

    if (!subscribedButton || !allButton) {
        return;
    }

    const isLoggedIn = !!(currentUser && currentUser.id);
    subscribedButton.disabled = false;
    subscribedButton.title = isLoggedIn ? "" : "Log in to view subscribed announcements";
    subscribedButton.classList.toggle("login-required", !isLoggedIn);

    subscribedButton.classList.toggle("active", currentAnnouncementView === "subscribed" && isLoggedIn);
    allButton.classList.toggle("active", currentAnnouncementView === "all" || !isLoggedIn);
}

function renderAnnouncements(visibleAnnouncements, currentUser) {
    const alertsList = document.querySelector(".alerts-list");
    alertsList.innerHTML = "";

    if (visibleAnnouncements.length === 0) {
        alertsList.innerHTML = currentAnnouncementView === "subscribed" && currentUser
            ? "<p>No announcements available from your subscribed departments.</p>"
            : "<p>No announcements available right now.</p>";
        return;
    }

    visibleAnnouncements.forEach((announcement) => {
        const alertItem = createAlertItem(announcement);
        alertsList.appendChild(alertItem);
    });
}

function getCurrentUser() {
    const currentUserRaw = localStorage.getItem("currentUser");

    if (!currentUserRaw) {
        return null;
    }

    try {
        return JSON.parse(currentUserRaw);
    } catch (error) {
        console.error("Failed to parse current user:", error);
        return null;
    }
}

async function filterAnnouncementsForUser(announcements, userId) {
    const [subscriptionsResponse, departmentsResponse] = await Promise.all([
        fetch("/api/department-subscriptions"),
        fetch("/api/departments")
    ]);

    if (!subscriptionsResponse.ok || !departmentsResponse.ok) {
        console.error("Failed to load subscriptions/departments for announcement filtering");
        return [];
    }

    const subscriptions = await subscriptionsResponse.json();
    const departments = await departmentsResponse.json();

    const subscribedDepartmentIds = new Set(
        subscriptions
            .filter((subscription) => subscription.userId === userId)
            .map((subscription) => subscription.departmentId)
    );

    if (subscribedDepartmentIds.size === 0) {
        return [];
    }

    const subscribedDepartmentNames = new Set(
        departments
            .filter((department) => subscribedDepartmentIds.has(department.id))
            .map((department) => normalizeDepartmentValue(department.name))
    );

    return announcements.filter((announcement) => {
        const announcementDepartment = normalizeDepartmentValue(announcement.department);
        return subscribedDepartmentIds.has(announcement.department) || subscribedDepartmentNames.has(announcementDepartment);
    });
}

function normalizeDepartmentValue(value) {
    return (value || "").toString().trim().toLowerCase();
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


