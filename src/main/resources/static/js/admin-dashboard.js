// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

// Modal functions for Create Event
function openCreateEventModal() {
    const modal = document.getElementById("createEventModal");
    if (modal) {
        modal.classList.add("is-open");
    }
}

function closeCreateEventModal() {
    const modal = document.getElementById("createEventModal");
    if (modal) {
        modal.classList.remove("is-open");
        document.getElementById("createEventForm").reset();
    }
}

function closeEventModalOnBackdrop(event) {
    if (event.target.id === "createEventModal") {
        closeCreateEventModal();
    }
}

// Modal functions for Create Announcement
function openCreateAnnouncementModal() {
    const modal = document.getElementById("createAnnouncementModal");
    if (modal) {
        modal.classList.add("is-open");
    }
}

function closeCreateAnnouncementModal() {
    const modal = document.getElementById("createAnnouncementModal");
    if (modal) {
        modal.classList.remove("is-open");
        document.getElementById("createAnnouncementForm").reset();
    }
}

function closeAnnouncementModalOnBackdrop(event) {
    if (event.target.id === "createAnnouncementModal") {
        closeCreateAnnouncementModal();
    }
}

// Modal functions for Edit Event
let currentEditEvent = null;

function openEditEventModal(event) {
    currentEditEvent = event;
    document.getElementById("editEventTitle").value = event.title;
    document.getElementById("editEventType").value = event.eventType;
    document.getElementById("editEventLocation").value = event.location;
    document.getElementById("editEventDate").value = event.eventDate;
    document.getElementById("editEventFree").value = event.free ? "true" : "false";

    const modal = document.getElementById("editEventModal");
    if (modal) {
        modal.classList.add("is-open");
    }
}

function closeEditEventModal() {
    const modal = document.getElementById("editEventModal");
    if (modal) {
        modal.classList.remove("is-open");
    }
    currentEditEvent = null;
}

function closeEditEventModalOnBackdrop(event) {
    if (event.target.id === "editEventModal") {
        closeEditEventModal();
    }
}

// Modal functions for Edit Announcement
let currentEditAnnouncement = null;

function openEditAnnouncementModal(announcement) {
    currentEditAnnouncement = announcement;
    document.getElementById("editAnnouncementType").value = announcement.type;
    const editDepartmentSelect = document.getElementById("editAnnouncementDepartment");
    ensureDepartmentOption(editDepartmentSelect, announcement.department);
    editDepartmentSelect.value = announcement.department;
    document.getElementById("editAnnouncementTitle").value = announcement.title;
    document.getElementById("editAnnouncementDescription").value = announcement.description;

    const modal = document.getElementById("editAnnouncementModal");
    if (modal) {
        modal.classList.add("is-open");
    }
}

function closeEditAnnouncementModal() {
    const modal = document.getElementById("editAnnouncementModal");
    if (modal) {
        modal.classList.remove("is-open");
    }
    currentEditAnnouncement = null;
}

function closeEditAnnouncementModalOnBackdrop(event) {
    if (event.target.id === "editAnnouncementModal") {
        closeEditAnnouncementModal();
    }
}
let currentDeleteType = null;
let allEvents = [];
let allAnnouncements = [];
let allDepartments = [];

async function loadDepartmentsForAnnouncementForms() {
    try {
        const response = await fetch("/api/departments");
        if (!response.ok) {
            console.error(`Failed to load departments: ${response.status}`);
            return;
        }

        allDepartments = await response.json();
        populateAnnouncementDepartmentSelects();
    } catch (error) {
        console.error("Error loading departments:", error);
    }
}

function populateAnnouncementDepartmentSelects() {
    const createSelect = document.getElementById("announcementDepartment");
    const editSelect = document.getElementById("editAnnouncementDepartment");

    [createSelect, editSelect].forEach((selectElement) => {
        if (!selectElement) return;

        selectElement.innerHTML = '<option value="">Select a department</option>';
        allDepartments.forEach((department) => {
            const option = document.createElement("option");
            option.value = department.name;
            option.textContent = department.name;
            selectElement.appendChild(option);
        });
    });
}

function ensureDepartmentOption(selectElement, departmentName) {
    if (!selectElement || !departmentName) return;

    const optionExists = Array.from(selectElement.options).some((option) => option.value === departmentName);
    if (!optionExists) {
        const option = document.createElement("option");
        option.value = departmentName;
        option.textContent = departmentName;
        selectElement.appendChild(option);
    }
}

function openDeleteEventModal() {
    currentDeleteType = "event";
    openDeleteSelectModal(allEvents, "Events");
}

function openDeleteAnnouncementModal() {
    currentDeleteType = "announcement";
    openDeleteSelectModal(allAnnouncements, "Announcements");
}

function openDeleteSelectModal(items, itemType) {
    if (items.length === 0) {
        alert(`No ${itemType.toLowerCase()} to delete.`);
        return;
    }

    const modal = document.getElementById("deleteSelectModal");
    const title = document.getElementById("deleteSelectTitle");
    const itemsList = document.getElementById("deleteItemsList");

    if (modal && title && itemsList) {
        title.textContent = `Select ${itemType} to Delete`;
        itemsList.innerHTML = "";

        items.forEach((item) => {
            const label = document.createElement("label");
            label.className = "delete-item-label";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = item.id;
            checkbox.className = "delete-item-checkbox";

            const itemName = document.createElement("span");
            itemName.textContent = item.title;

            label.appendChild(checkbox);
            label.appendChild(itemName);
            itemsList.appendChild(label);
        });

        modal.classList.add("is-open");
    }
}

function closeDeleteSelectModal() {
    const modal = document.getElementById("deleteSelectModal");
    if (modal) {
        modal.classList.remove("is-open");
    }
    currentDeleteType = null;
}

function closeDeleteSelectModalOnBackdrop(event) {
    if (event.target.id === "deleteSelectModal") {
        closeDeleteSelectModal();
    }
}

async function confirmDeleteSelected() {
    const checkboxes = document.querySelectorAll(".delete-item-checkbox:checked");
    const selectedIds = Array.from(checkboxes).map((cb) => cb.value);

    if (selectedIds.length === 0) {
        alert("Please select at least one item to delete.");
        return;
    }

    const confirmed = confirm(`Delete ${selectedIds.length} item(s)? This action cannot be undone.`);
    if (!confirmed) return;

    let deletedCount = 0;
    for (const id of selectedIds) {
        const endpoint = currentDeleteType === "event" ? `/api/admin/events/${id}` : `/api/admin/announcements/${id}`;
        try {
            const response = await fetch(endpoint, { method: "DELETE" });
            if (response.ok) {
                deletedCount++;
            }
        } catch (error) {
            console.error(`Error deleting ${currentDeleteType}:`, error);
        }
    }

    closeDeleteSelectModal();
    if (deletedCount > 0) {
        alert(`Successfully deleted ${deletedCount} item(s).`);
        currentDeleteType === "event" ? loadEventsForAdmin() : loadAnnouncementsForAdmin();
    }
}

// Check if user is logged in and is an admin
function checkAdminAccess() {
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
        alert("You must be logged in to access the admin dashboard.");
        window.location.href = "/";
        return false;
    }

    try {
        const user = JSON.parse(currentUser);
        const roles = user.roles || "";

        if (!roles.includes("CITY_ADMINISTRATOR")) {
            alert("You do not have permission to access the admin dashboard.");
            window.location.href = "/";
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error checking admin access:", error);
        window.location.href = "/";
        return false;
    }
}

// Load events and announcements on page load
async function loadAdminData() {
    await loadEventsForAdmin();
    await loadAnnouncementsForAdmin();
}

// Load all events
async function loadEventsForAdmin() {
    try {
        const response = await fetch("/api/events");
        const events = await response.json();

        allEvents = events;
        const eventsList = document.getElementById("eventsList");
        eventsList.innerHTML = "";

        if (events.length === 0) {
            eventsList.innerHTML = "<p class='no-items'>No events yet. Create one to get started!</p>";
            return;
        }

        events.forEach((event) => {
            const eventItem = createEventListItem(event);
            eventsList.appendChild(eventItem);
        });
    } catch (error) {
        console.error("Error loading events:", error);
    }
}

// Create event list item
function createEventListItem(event) {
    const div = document.createElement("div");
    div.className = "admin-item";
    
    const dateObj = new Date(event.eventDate);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    div.innerHTML = `
        <div class="item-details">
            <h4>${event.title}</h4>
            <p><strong>Category:</strong> ${event.eventType}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Cost:</strong> ${event.free ? "Free" : "Paid"}</p>
        </div>
        <div class="item-actions">
            <button class="btn-edit" onclick="openEditEventModal(${JSON.stringify(event).replace(/"/g, '&quot;')})">Edit</button>
        </div>
    `;

    return div;
}

// Load all announcements
async function loadAnnouncementsForAdmin() {
    try {
        const response = await fetch("/api/announcements");
        const announcements = await response.json();

        allAnnouncements = announcements;
        const announcementsList = document.getElementById("announcementsList");
        announcementsList.innerHTML = "";

        if (announcements.length === 0) {
            announcementsList.innerHTML = "<p class='no-items'>No announcements yet. Create one to get started!</p>";
            return;
        }

        announcements.forEach((announcement) => {
            const announcementItem = createAnnouncementListItem(announcement);
            announcementsList.appendChild(announcementItem);
        });
    } catch (error) {
        console.error("Error loading announcements:", error);
    }
}

// Create announcement list item
function createAnnouncementListItem(announcement) {
    const div = document.createElement("div");
    div.className = "admin-item";
    
    const dateObj = new Date(announcement.datePosted);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    div.innerHTML = `
        <div class="item-details">
            <h4>${announcement.title}</h4>
            <p><strong>Type:</strong> ${announcement.type}</p>
            <p><strong>Department:</strong> ${announcement.department}</p>
            <p><strong>Date Posted:</strong> ${formattedDate}</p>
            <p>${announcement.description}</p>
        </div>
        <div class="item-actions">
            <button class="btn-edit" onclick="openEditAnnouncementModal(${JSON.stringify(announcement).replace(/"/g, '&quot;')})">Edit</button>
        </div>
    `;

    return div;
}

// Handle edit event form submission
async function handleEditEvent(event) {
    event.preventDefault();

    if (!currentEditEvent) return;

    const eventData = {
        title: document.getElementById("editEventTitle").value,
        eventType: document.getElementById("editEventType").value,
        location: document.getElementById("editEventLocation").value,
        eventDate: document.getElementById("editEventDate").value,
        free: document.getElementById("editEventFree").value === "true",
        popularity: currentEditEvent.popularity
    };

    try {
        const response = await fetch(`/api/admin/events/${currentEditEvent.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventData)
        });

        if (response.ok) {
            closeEditEventModal();
            await loadEventsForAdmin();
            alert("Event updated successfully");
        } else {
            alert("Failed to update event");
        }
    } catch (error) {
        console.error("Error updating event:", error);
        alert("Error updating event");
    }
}

// Handle edit announcement form submission
async function handleEditAnnouncement(event) {
    event.preventDefault();

    if (!currentEditAnnouncement) return;

    const announcementData = {
        type: document.getElementById("editAnnouncementType").value,
        department: document.getElementById("editAnnouncementDepartment").value,
        title: document.getElementById("editAnnouncementTitle").value,
        description: document.getElementById("editAnnouncementDescription").value
    };

    try {
        const response = await fetch(`/api/admin/announcements/${currentEditAnnouncement.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(announcementData)
        });

        if (response.ok) {
            closeEditAnnouncementModal();
            await loadAnnouncementsForAdmin();
            alert("Announcement updated successfully");
        } else {
            alert("Failed to update announcement");
        }
    } catch (error) {
        console.error("Error updating announcement:", error);
        alert("Error updating announcement");
    }
}

// Handle create event form submission
document.addEventListener("DOMContentLoaded", () => {
    // Check admin access first
    if (!checkAdminAccess()) return;

    // Create event form
    const createEventForm = document.getElementById("createEventForm");
    if (createEventForm) {
        createEventForm.addEventListener("submit", handleCreateEvent);
    }

    // Edit event form
    const editEventForm = document.getElementById("editEventForm");
    if (editEventForm) {
        editEventForm.addEventListener("submit", handleEditEvent);
    }

    // Create announcement form
    const createAnnouncementForm = document.getElementById("createAnnouncementForm");
    if (createAnnouncementForm) {
        createAnnouncementForm.addEventListener("submit", handleCreateAnnouncement);
    }

    // Edit announcement form
    const editAnnouncementForm = document.getElementById("editAnnouncementForm");
    if (editAnnouncementForm) {
        editAnnouncementForm.addEventListener("submit", handleEditAnnouncement);
    }

    // Load form options and data
    loadDepartmentsForAnnouncementForms();
    loadAdminData();

    // Close modals on Escape key
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeCreateEventModal();
            closeCreateAnnouncementModal();
            closeEditEventModal();
            closeEditAnnouncementModal();
            closeDeleteSelectModal();
        }
    });

    const confirmDeleteSelectedBtn = document.getElementById("confirmDeleteSelectedBtn");
    if (confirmDeleteSelectedBtn) {
        confirmDeleteSelectedBtn.addEventListener("click", confirmDeleteSelected);
    }
});

async function handleCreateEvent(event) {
    event.preventDefault();

    const eventData = {
        title: document.getElementById("eventTitle").value,
        eventType: document.getElementById("eventType").value,
        location: document.getElementById("eventLocation").value,
        eventDate: document.getElementById("eventDate").value,
        free: document.getElementById("eventFree").value === "true",
        popularity: 50
    };

    try {
        const response = await fetch("/api/admin/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventData)
        });

        if (response.ok) {
            closeCreateEventModal();
            await loadEventsForAdmin();
            alert("Event created successfully");
        } else {
            alert("Failed to create event");
        }
    } catch (error) {
        console.error("Error creating event:", error);
        alert("Error creating event");
    }
}

async function handleCreateAnnouncement(event) {
    event.preventDefault();

    const announcementData = {
        type: document.getElementById("announcementType").value,
        department: document.getElementById("announcementDepartment").value,
        title: document.getElementById("announcementTitle").value,
        description: document.getElementById("announcementDescription").value
    };

    try {
        const response = await fetch("/api/admin/announcements", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(announcementData)
        });

        if (response.ok) {
            closeCreateAnnouncementModal();
            await loadAnnouncementsForAdmin();
            alert("Announcement created successfully");
        } else {
            alert("Failed to create announcement");
        }
    } catch (error) {
        console.error("Error creating announcement:", error);
        alert("Error creating announcement");
    }
}


