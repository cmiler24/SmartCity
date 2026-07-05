// TODO: Implement full manager dashboard functionality
// - Check if user is a department manager
// - Load workers from the manager's department
// - Implement service assignment
// - Implement service status updates
// - Implement service deletion

let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let allServices = [];
let currentEditService = null;
let departmentId = null; // Will be set by loadManagerDepartment()
let availableServices = []; // All uncompleted services for selection
let selectedServiceForAssignment = null; // Currently selected service in assign modal
let currentServiceTab = 'create'; // Track which tab is active (create or select)

// Load services when page loads
document.addEventListener('DOMContentLoaded', async () => {
    checkManagerAccess();
    await loadManagerDepartment();
    await loadServices();
    await loadAvailableServices();
    populateWorkerSelect();
});

// TODO: Implement checkManagerAccess to verify user is a department manager
function checkManagerAccess() {
    if (!currentUser) {
        alert("You must be logged in to access the manager dashboard.");
        window.location.href = "/";
        return false;
    }

    try {
        const roles = currentUser.roles || [];

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

// Fetch the manager's department based on currentUser.id
async function loadManagerDepartment() {
    try {
        const response = await fetch(`/api/departments/${currentUser.id}`);
        if (response.ok) {
            const department = await response.json();
            console.log(department)

            if (department && department.managerID === currentUser.id) {
                departmentId = department.id;
            } else {
                console.error("No department found for this manager");
                alert("Error: No department assigned to this manager.");
                window.location.href = "/";
            }
        } else {
            console.error("Failed to fetch department");
            alert("Error fetching department information.");
        }
    } catch (error) {
        console.error("Error loading manager's department:", error);
        alert("Error loading department.");
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
        if (!departmentId) {
            console.error("Department ID not set");
            return;
        }

        const response = await fetch(`/api/depmanager/get-services/${departmentId}`);
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

// Load all uncompleted services available for selection
async function loadAvailableServices() {
    try {
        const response = await fetch('/api/depmanager/services');
        if (!response.ok) {
            throw new Error(`Failed to fetch available services: ${response.status}`);
        }

        const services = await response.json();

        // Show all uncompleted services regardless of assignment status
        availableServices = services.filter(service =>
            service.status !== "Completed"
        );

        populateAvailableServiceSelect();
        console.log(`Loaded ${availableServices.length} available services`);
    } catch (error) {
        console.error("Error loading available services:", error);
    }
}

// Populate the available services dropdown
function populateAvailableServiceSelect() {
    const select = document.getElementById('availableServiceSelect');
    if (!select) return;

    select.innerHTML = '<option value="">Choose a service...</option>';

    if (availableServices.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No available services';
        option.disabled = true;
        select.appendChild(option);
        return;
    }

    availableServices.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        const status = service.departmentId ? ` [${service.status}]` : ' [Unassigned]';
        option.textContent = `${service.title} - ${service.issueType || 'Task'}${status} (${service.location || 'N/A'})`;
        select.appendChild(option);
    });
}

// Switch between Create and Select tabs
function switchServiceTab(tab) {
    currentServiceTab = tab;
    const createPanel = document.getElementById('createServicePanel');
    const selectPanel = document.getElementById('selectServicePanel');
    const createTabBtn = document.getElementById('createTabBtn');
    const selectTabBtn = document.getElementById('selectTabBtn');

    if (tab === 'create') {
        createPanel.style.display = 'block';
        selectPanel.style.display = 'none';
        createTabBtn.style.color = '#d97706';
        createTabBtn.style.borderBottom = '3px solid #d97706';
        selectTabBtn.style.color = '#999';
        selectTabBtn.style.borderBottom = 'none';
    } else {
        createPanel.style.display = 'none';
        selectPanel.style.display = 'block';
        createTabBtn.style.color = '#999';
        createTabBtn.style.borderBottom = 'none';
        selectTabBtn.style.color = '#d97706';
        selectTabBtn.style.borderBottom = '3px solid #d97706';
    }
}

// Populate service details when a service is selected
function populateServiceDetails() {
    const serviceId = document.getElementById('availableServiceSelect').value;
    const detailsContainer = document.getElementById('serviceDetailsContainer');
    const assignButton = document.getElementById('assignButton');

    if (!serviceId) {
        detailsContainer.style.display = 'none';
        assignButton.disabled = true;
        selectedServiceForAssignment = null;
        return;
    }

    selectedServiceForAssignment = availableServices.find(s => s.id === serviceId);

    if (selectedServiceForAssignment) {
        document.getElementById('selectedServiceTitle').value = selectedServiceForAssignment.title;
        document.getElementById('selectedServiceDescription').value = selectedServiceForAssignment.description;
        document.getElementById('selectedServiceIssueType').value = selectedServiceForAssignment.issueType || 'Manager Task';
        document.getElementById('selectedServiceLocation').value = selectedServiceForAssignment.location || '';
        document.getElementById('selectedServiceStatus').value = selectedServiceForAssignment.status;

        detailsContainer.style.display = 'block';
        assignButton.disabled = false;
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
        // Reset both forms
        const createForm = document.getElementById("createServiceForm");
        if (createForm) {
            createForm.reset();
        }
        const selectForm = document.getElementById("selectServiceForm");
        if (selectForm) {
            selectForm.reset();
        }
        // Hide details and disable button
        const detailsContainer = document.getElementById("serviceDetailsContainer");
        if (detailsContainer) {
            detailsContainer.style.display = 'none';
        }
        const assignButton = document.getElementById("assignButton");
        if (assignButton) {
            assignButton.disabled = true;
        }
        // Reset to create tab
        switchServiceTab('create');
        selectedServiceForAssignment = null;
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
// Handle form submissions
document.addEventListener("DOMContentLoaded", () => {
    const createServiceForm = document.getElementById("createServiceForm");
    if (createServiceForm) {
        createServiceForm.addEventListener("submit", handleCreateService);
    }

    const selectServiceForm = document.getElementById("selectServiceForm");
    if (selectServiceForm) {
        selectServiceForm.addEventListener("submit", handleSelectService);
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
        departmentId: departmentId,
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
            await loadAvailableServices();
            alert("Service created and assigned successfully");
        } else {
            alert("Failed to create and assign service");
        }
    } catch (error) {
        console.error("Error creating and assigning service:", error);
        alert("Error creating service");
    }
}

async function handleSelectService(event) {
    event.preventDefault();

    if (!selectedServiceForAssignment) {
        alert("Please select a service to assign");
        return;
    }

    const assignedWorker = document.getElementById("selectServiceWorker").value;
    if (!assignedWorker) {
        alert("Please select a worker");
        return;
    }

    const serviceData = {
        title: selectedServiceForAssignment.title,
        description: selectedServiceForAssignment.description,
        location: selectedServiceForAssignment.location,
        status: selectedServiceForAssignment.status,
        dueDate: document.getElementById("selectServiceDueDate").value,
        priority: parseInt(document.getElementById("selectServicePriority").value),
        departmentId: departmentId,
        assignedWorker: assignedWorker
    };

    try {
        const response = await fetch(`/api/depmanager/services/${selectedServiceForAssignment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(serviceData)
        });

        if (response.ok) {
            closeCreateServiceModal();
            await loadServices();
            await loadAvailableServices();
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

