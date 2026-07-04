// TODO: Implement full manager dashboard functionality
// - Check if user is a department manager
// - Load workers from the manager's department
// - Implement service assignment
// - Implement service status updates
// - Implement service deletion

let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let allServices = [];
let currentEditService = null;
let currentDepartmentId = "dept-001"; // TODO: Get from user's department assignment

// Load services when page loads
document.addEventListener('DOMContentLoaded', async () => {
    checkManagerAccess();
    await loadServices();
    populateWorkerSelect();
});

// TODO: Implement checkManagerAccess to verify user is a department manager
function checkManagerAccess() {
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
        alert("You must be logged in to access the manager dashboard.");
        window.location.href = "/";
        return false;
    }

    try {
        const user = JSON.parse(currentUser);
        const roles = user.roles || [];

        if (!roles.includes(USER_ROLES.DEPARTMENT_MANAGER)) {
            alert("You do not have permission to access the manager dashboard.");
            window.location.href = "/";
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error checking manager access:", error);
        window.location.href = "/";
        return false;
    }
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

// Load services for the manager's department
async function loadServices() {
    try {
        const response = await fetch(`/api/depmanager/services/${currentDepartmentId}`);
        const services = await response.json();

        allServices = services;
        const servicesList = document.getElementById("servicesList");
        servicesList.innerHTML = "";

        // Filter out completed services
        const uncompletedServices = services.filter(service => service.status !== "Completed");

        if (uncompletedServices.length === 0) {
            servicesList.innerHTML = "<p class='no-items'>No uncompleted services assigned. Create one to get started!</p>";
            return;
        }

        uncompletedServices.forEach((service) => {
            const serviceItem = createServiceListItem(service);
            servicesList.appendChild(serviceItem);
        });

        updateServicesOverview();
    } catch (error) {
        console.error("Error loading services:", error);
    }
}

// Create service list item
function createServiceListItem(service) {
    const div = document.createElement("div");
    div.className = "admin-item";

    const dueDate = new Date(service.dueDate);
    const formattedDate = dueDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    const statusClass = service.status.toLowerCase().replace(/\s+/g, "-");

    div.innerHTML = `
        <div class="item-details">
            <h4>${service.title}</h4>
            <p><strong>Assigned To (User ID):</strong> ${service.assignedWorker}</p>
            <p>${service.description}</p>
            <p><strong>Location:</strong> ${service.location}</p>
            <p><strong>Due Date:</strong> ${formattedDate}</p>
            <p><strong>Status:</strong> <span class="service-status-badge status-${statusClass}">${service.status}</span></p>
            <p><strong>Priority:</strong> <span class="priority-badge priority-${service.priority}">Level ${service.priority}</span></p>
        </div>
        <div class="item-actions">
            <button class="btn-edit" onclick="openEditServiceModal(${JSON.stringify(service).replace(/"/g, '&quot;')})">Edit</button>
        </div>
    `;

    return div;
}

// TODO: Populate worker select with actual department workers
function populateWorkerSelect() {
    const select = document.getElementById('serviceWorker');

    // Temporary: Add demo workers
    const demoWorkers = [
        { id: 'user-005', name: 'Will Worker' },
        // TODO: Load actual workers from department
    ];

    demoWorkers.forEach(worker => {
        const option = document.createElement('option');
        option.value = worker.id;
        option.textContent = worker.name;
        select.appendChild(option);
    });
}

// Update services overview with statistics
function updateServicesOverview() {
    const overview = document.getElementById('servicesOverview');
    overview.innerHTML = '';

    const statusFilter = document.getElementById('statusFilter').value;

    let filteredServices = allServices;
    if (statusFilter) {
        filteredServices = allServices.filter(service => service.status === statusFilter);
    }

    if (filteredServices.length === 0) {
        overview.innerHTML = "<p class='no-items'>No services match the selected filter.</p>";
        return;
    }

    filteredServices.forEach(service => {
        const serviceDiv = createServiceOverviewItem(service);
        overview.appendChild(serviceDiv);
    });
}

// Create service overview item
function createServiceOverviewItem(service) {
    const div = document.createElement('div');
    div.className = 'service-item';

    if (service.priority >= 4) {
        div.classList.add('high-priority');
    }

    if (service.status === 'Completed') {
        div.classList.add('completed');
    }

    const dueDate = new Date(service.dueDate);
    const formattedDate = dueDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    const statusClass = service.status.toLowerCase().replace(/\s+/g, "-");

    div.innerHTML = `
        <div class="service-header">
            <div class="service-title-section">
                <h4>${service.title}</h4>
                <p>${service.description}</p>
            </div>
            <span class="service-status-badge status-${statusClass}">${service.status}</span>
        </div>
        <div class="service-details">
            <p><strong>Worker (ID):</strong> ${service.assignedWorker}</p>
            <p><strong>Location:</strong> ${service.location}</p>
            <p><strong>Due Date:</strong> ${formattedDate}</p>
            <p><strong>Priority:</strong> <span class="priority-badge priority-${service.priority}">Level ${service.priority}</span></p>
        </div>
    `;

    return div;
}

// Modal functions for Create/Assign Service
function openCreateServiceModal() {
    const modal = document.getElementById("createServiceModal");
    if (modal) {
        modal.classList.add("is-open");
    }
}

function closeCreateServiceModal() {
    const modal = document.getElementById("createServiceModal");
    if (modal) {
        modal.classList.remove("is-open");
        document.getElementById("createServiceForm").reset();
    }
}

function closeServiceModalOnBackdrop(event) {
    if (event.target.id === "createServiceModal") {
        closeCreateServiceModal();
    }
}

// Modal functions for Edit Service
function openEditServiceModal(service) {
    currentEditService = service;
    document.getElementById("editServiceTitle").value = service.title;
    document.getElementById("editServiceDescription").value = service.description;
    document.getElementById("editServiceLocation").value = service.location || '';
    document.getElementById("editServiceStatus").value = service.status;
    document.getElementById("editServiceDueDate").value = service.dueDate;
    document.getElementById("editServicePriority").value = service.priority;

    const modal = document.getElementById("editServiceModal");
    if (modal) {
        modal.classList.add("is-open");
    }
}

function closeEditServiceModal() {
    const modal = document.getElementById("editServiceModal");
    if (modal) {
        modal.classList.remove("is-open");
    }
    currentEditService = null;
}

function closeEditServiceModalOnBackdrop(event) {
    if (event.target.id === "editServiceModal") {
        closeEditServiceModal();
    }
}

// TODO: Implement full service assignment and management
// Handle create service form submission
document.addEventListener("DOMContentLoaded", () => {
    const createServiceForm = document.getElementById("createServiceForm");
    if (createServiceForm) {
        createServiceForm.addEventListener("submit", handleCreateService);
    }

    const editServiceForm = document.getElementById("editServiceForm");
    if (editServiceForm) {
        editServiceForm.addEventListener("submit", handleEditService);
    }

    // Close modals on Escape key
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeCreateServiceModal();
            closeEditServiceModal();
        }
    });
});

async function handleCreateService(event) {
    event.preventDefault();

    // TODO: Implement full service creation logic with validation
    const serviceData = {
        title: document.getElementById("serviceTitle").value,
        description: document.getElementById("serviceDescription").value,
        location: document.getElementById("serviceLocation").value,
        departmentId: currentDepartmentId,
        assignedWorker: document.getElementById("serviceWorker").value,
        dueDate: document.getElementById("serviceDueDate").value,
        priority: parseInt(document.getElementById("servicePriority").value)
    };

    try {
        const response = await fetch("/api/depmanager/services", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(serviceData)
        });

        if (response.ok) {
            closeCreateServiceModal();
            await loadServices();
            alert("Service assigned successfully");
        } else {
            alert("Failed to assign service");
        }
    } catch (error) {
        console.error("Error assigning service:", error);
        alert("Error assigning service");
    }
}

async function handleEditService(event) {
    event.preventDefault();

    if (!currentEditService) return;

    // TODO: Implement full service update logic with validation
    const serviceData = {
        title: document.getElementById("editServiceTitle").value,
        description: document.getElementById("editServiceDescription").value,
        location: document.getElementById("editServiceLocation").value,
        status: document.getElementById("editServiceStatus").value,
        dueDate: document.getElementById("editServiceDueDate").value,
        priority: parseInt(document.getElementById("editServicePriority").value)
    };

    try {
        const response = await fetch(`/api/depmanager/services/${currentEditService.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(serviceData)
        });

        if (response.ok) {
            closeEditServiceModal();
            await loadServices();
            alert("Service updated successfully");
        } else {
            alert("Failed to update service");
        }
    } catch (error) {
        console.error("Error updating service:", error);
        alert("Error updating service");
    }
}

// Filter services by status
function filterServices() {
    updateServicesOverview();
}

// Listen for storage changes to update when user logs in/out from another tab
window.addEventListener('storage', (event) => {
    if (event.key === 'currentUser') {
        currentUser = JSON.parse(event.newValue);
        checkManagerAccess();
        loadServices();
    }
});

