// TODO: Implement Observer Design Pattern Architecture
// Subject (Department): Maintains list of subscribers
// Observer (User): Subscribes to departments for notifications
// When department creates event/announcement, all observers are notified

let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let allDepartments = [];
let userSubscriptions = [];
let currentDepartmentDetail = null;

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
    await loadDepartments();
    await loadUserSubscriptions();
    displayUserSubscriptions();
    displayAllDepartments();
});

// TODO: Create DepartmentService class to handle observer pattern
// class DepartmentService {
//     constructor() {
//         this.departments = [];
//         this.observers = []; // Users subscribing to departments
//     }
//
//     subscribe(userId, departmentId) {
//         // TODO: Add user to department's observers list
//     }
//
//     unsubscribe(userId, departmentId) {
//         // TODO: Remove user from department's observers list
//     }
//
//     notifyObservers(departmentId, event) {
//         // TODO: Notify all subscribed users when department creates event
//     }
// }

// TODO: Create User/Observer class
// class UserObserver {
//     constructor(userId) {
//         this.userId = userId;
//         this.subscribedDepartments = [];
//     }
//
//     update(departmentId, notification) {
//         // TODO: Handle notification from subscribed department
//     }
// }

// Load all departments from API
async function loadDepartments() {
    try {
        const response = await fetch('/api/departments');
        const departments = await response.json();
        allDepartments = departments;
    } catch (error) {
        console.error('Error loading departments:', error);
    }
}

// TODO: Implement loadUserSubscriptions from backend
// This should fetch user's subscribed departments from database
async function loadUserSubscriptions() {
    if (!currentUser) {
        userSubscriptions = [];
        return;
    }

    try {
        // TODO: Create endpoint /api/departments/user/{userId}
        // const response = await fetch(`/api/departments/user/${currentUser.id}`);
        // const subscriptions = await response.json();
        // userSubscriptions = subscriptions;

        // For now, using localStorage
        const stored = localStorage.getItem(`userSubscriptions_${currentUser.id}`);
        userSubscriptions = stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error loading user subscriptions:', error);
    }
}

// Display user's current subscriptions in sidebar
function displayUserSubscriptions() {
    const container = document.getElementById('userSubscriptions');

    if (!currentUser) {
        container.innerHTML = '<p class="no-subscriptions">Please log in to manage subscriptions.</p>';
        return;
    }

    if (userSubscriptions.length === 0) {
        container.innerHTML = '<p class="no-subscriptions">You haven\'t subscribed to any departments yet.</p>';
        return;
    }

    container.innerHTML = '';

    userSubscriptions.forEach(deptId => {
        const dept = allDepartments.find(d => d.id === deptId);
        if (dept) {
            const item = document.createElement('div');
            item.className = 'subscription-item';
            item.innerHTML = `
                <span class="subscription-item-name">${dept.name}</span>
                <button class="subscription-remove-btn" onclick="unsubscribeFromDepartment('${deptId}')">×</button>
            `;
            container.appendChild(item);
        }
    });
}

// Display all departments in grid
function displayAllDepartments() {
    const container = document.getElementById('departmentsList');
    container.innerHTML = '';

    if (allDepartments.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999;">No departments available.</p>';
        return;
    }

    allDepartments.forEach(dept => {
        const isSubscribed = currentUser && userSubscriptions.includes(dept.id);
        const card = createDepartmentCard(dept, isSubscribed);
        container.appendChild(card);
    });
}

// Create department card element
function createDepartmentCard(dept, isSubscribed) {
    const card = document.createElement('div');
    card.className = 'department-card';

    const statusClass = dept.status === 'Active' ? '' : 'inactive';

    card.innerHTML = `
        <div class="department-card-header">
            <div class="department-card-title">
                <h3>${dept.name}</h3>
            </div>
            <span class="department-status-badge ${statusClass}">
                ${dept.status}
            </span>
        </div>

        <div class="department-card-info">
            <!-- TODO: Display more department information from backend -->
            <p><strong>Manager:</strong> ${dept.managerID || 'N/A'}</p>
        </div>

        <div class="department-card-actions">
            <button class="btn-view-details" onclick="openDepartmentModal('${dept.id}')">
                View Details
            </button>
            ${isSubscribed 
                ? `<button class="btn-unsubscribe-card" onclick="unsubscribeFromDepartment('${dept.id}')">Unsubscribe</button>`
                : `<button class="btn-subscribe-card" onclick="subscribeToDepartment('${dept.id}')">Subscribe</button>`
            }
        </div>
    `;

    return card;
}

// TODO: Implement subscribeToDepartment with observer notification
async function subscribeToDepartment(departmentId) {
    if (!currentUser) {
        alert('Please log in to subscribe to departments.');
        return;
    }

    try {
        // TODO: Call backend endpoint POST /api/departments/subscribe
        // const response = await fetch('/api/departments/subscribe', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         userId: currentUser.id,
        //         departmentId: departmentId
        //     })
        // });

        // For now, using localStorage
        if (!userSubscriptions.includes(departmentId)) {
            userSubscriptions.push(departmentId);
            localStorage.setItem(`userSubscriptions_${currentUser.id}`, JSON.stringify(userSubscriptions));

            displayUserSubscriptions();
            displayAllDepartments();

            // TODO: Trigger notification to user about successful subscription
            alert('Successfully subscribed to department');
        }
    } catch (error) {
        console.error('Error subscribing to department:', error);
        alert('Failed to subscribe to department');
    }
}

// TODO: Implement unsubscribeFromDepartment with observer removal
async function unsubscribeFromDepartment(departmentId) {
    if (!currentUser) {
        alert('Please log in.');
        return;
    }

    try {
        // TODO: Call backend endpoint POST /api/departments/unsubscribe
        // const response = await fetch('/api/departments/unsubscribe', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         userId: currentUser.id,
        //         departmentId: departmentId
        //     })
        // });

        // For now, using localStorage
        userSubscriptions = userSubscriptions.filter(id => id !== departmentId);
        localStorage.setItem(`userSubscriptions_${currentUser.id}`, JSON.stringify(userSubscriptions));

        displayUserSubscriptions();
        displayAllDepartments();

        // TODO: Trigger notification to user about successful unsubscription
        alert('Successfully unsubscribed from department');
    } catch (error) {
        console.error('Error unsubscribing from department:', error);
        alert('Failed to unsubscribe from department');
    }
}

// Open department detail modal
function openDepartmentModal(departmentId) {
    const dept = allDepartments.find(d => d.id === departmentId);
    if (!dept) return;

    currentDepartmentDetail = dept;

    // TODO: Populate more detailed information
    document.getElementById('modalDepartmentName').textContent = dept.name;
    document.getElementById('modalDepartmentType').textContent = dept.managerID || 'N/A';
    document.getElementById('modalManagerId').textContent = dept.managerID || 'N/A';
    document.getElementById('modalStatus').textContent = dept.status;

    // Update button state
    const isSubscribed = currentUser && userSubscriptions.includes(departmentId);
    const button = document.getElementById('subscribeButton');
    button.textContent = isSubscribed ? 'Unsubscribe' : 'Subscribe';
    button.className = isSubscribed ? 'btn-unsubscribe' : 'btn-subscribe';

    const modal = document.getElementById('departmentModal');
    modal.classList.add('is-open');
}

// Close department modal
function closeDepartmentModal() {
    const modal = document.getElementById('departmentModal');
    modal.classList.remove('is-open');
    currentDepartmentDetail = null;
}

// Close modal on backdrop click
function closeDepartmentModalOnBackdrop(event) {
    if (event.target.id === 'departmentModal') {
        closeDepartmentModal();
    }
}

// Handle subscribe/unsubscribe from modal
function handleSubscriptionToggle() {
    if (!currentDepartmentDetail) return;

    const isSubscribed = currentUser && userSubscriptions.includes(currentDepartmentDetail.id);

    if (isSubscribed) {
        unsubscribeFromDepartment(currentDepartmentDetail.id);
    } else {
        subscribeToDepartment(currentDepartmentDetail.id);
    }

    closeDepartmentModal();
}

// TODO: Implement search/filter functionality
function filterDepartments() {
    const searchTerm = document.getElementById('departmentSearch').value.toLowerCase();

    // TODO: Filter departments based on search term
    // Update UI to show filtered results
}

// Listen for auth state changes
window.addEventListener('storage', (event) => {
    if (event.key === 'currentUser') {
        currentUser = JSON.parse(event.newValue);
        location.reload();
    }
});

// TODO: Implement real-time notifications
// When subscribed department creates event, notify user
// This would use WebSocket or Server-Sent Events (SSE)
// function subscribeToNotifications() {
//     const eventSource = new EventSource(`/api/notifications?userId=${currentUser.id}`);
//     eventSource.onmessage = (event) => {
//         const notification = JSON.parse(event.data);
//         // TODO: Display notification to user
//     };
// }

