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
            if (user.roles.includes(USER_ROLES.CITY_ADMINISTRATOR)) {
                adminPortalCard.style.display = 'block';
            }

            // Show Manager Portal only if user is a city manager
            if (user.roles.includes(USER_ROLES.CITY_MANAGER)) {
                managerPortalCard.style.display = 'block';
            }

            // Show Assigned Tasks card only if user is a department worker
            if (user.roles.includes(USER_ROLES.DEPARTMENT_WORKER)) {
                assignedTasksCard.style.display = 'block';
            }
        } catch (error) {
            console.error("Error checking user permissions:", error);
        }
    }
}

// Run permission check when DOM is loaded
document.addEventListener('DOMContentLoaded', checkUserPermissions);

document.getElementById('assignedTasksCard').addEventListener('click', () => {
    // Check if user is logged in and is a department worker
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert("Please log in to access your tasks.");
        // window.location.href = '/';
        return;
    }
    const user = JSON.parse(currentUser);
    if (user.roles.includes(USER_ROLES.DEPARTMENT_WORKER)) {
        window.location.href = '/worker-dashboard.html';
    }
});

