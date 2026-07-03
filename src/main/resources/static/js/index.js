// Check user role and hide cards based on permissions
function checkUserPermissions() {
    const adminPortalCard = document.getElementById('adminPortalCard');
    const managerPortalCard = document.getElementById('managerPortalCard');
    const assignedTasksCard = document.getElementById('assignedTasksCard');
    const currentUser = localStorage.getItem('currentUser');

    // Hide Admin, Manager, and Assigned Tasks cards by default
    if (adminPortalCard) {
        adminPortalCard.style.display = 'none';
    }
    if (managerPortalCard) {
        managerPortalCard.style.display = 'none';
    }
    if (assignedTasksCard) {
        assignedTasksCard.style.display = 'none';
    }

    // If user is logged in, check their role
    if (currentUser) {
        try {
            const user = JSON.parse(currentUser);

            // Show Admin Portal only if user is a city administrator
            if (adminPortalCard && user.roles === USER_ROLES.CITY_ADMINISTRATOR) {
                adminPortalCard.style.display = '';
            }

            // Show Manager Portal only if user is a city manager
            if (managerPortalCard && user.role === USER_ROLES.CITY_MANAGER) {
                managerPortalCard.style.display = '';
            }

            // Show Assigned Tasks card only if user is a department worker
            if (assignedTasksCard && user.role === USER_ROLES.DEPARTMENT_WORKER) {
                assignedTasksCard.style.display = '';
            }
        } catch (error) {
            console.error("Error checking user permissions:", error);
        }
    }
}

// Run permission check when DOM is loaded
document.addEventListener('DOMContentLoaded', checkUserPermissions);

// TODO: Implement full assigned tasks viewer
// - Display all tasks assigned to current user
// - Filter by status
// - Update task status

function viewAssignedTasks() {
    const currentUser = localStorage.getItem('currentUser');

    if (!currentUser) {
        alert("Please log in to view your assigned tasks.");
        return;
    }

    try {
        const user = JSON.parse(currentUser);
        // TODO: Create a dedicated page for viewing assigned tasks
        // For now, show an alert with a message
        alert("Assigned Tasks feature coming soon! You can view your tasks assigned by department managers.");

        // In the future, redirect to a dedicated page
        // window.location.href = `/worker-tasks.html?userId=${user.id}`;
    } catch (error) {
        console.error("Error viewing assigned tasks:", error);
        alert("Error loading assigned tasks");
    }
}

