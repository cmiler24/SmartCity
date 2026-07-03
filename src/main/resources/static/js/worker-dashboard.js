let allTasks = [];

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

async function loadTasks() {
    try {
        // TODO: Replace with actual API call to fetch user's assigned tasks
        // const response = await fetch('/api/tasks/assigned');
        // const tasks = await response.json();

        // For now, load from localStorage or mock data
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            showNoTasksMessage();
            return;
        }

        const user = JSON.parse(currentUser);

        // TODO: Fetch tasks from backend API
        allTasks = [
            // Mock data structure - replace with actual API data
            // {
            //     id: 1,
            //     title: "Repair Pothole on Main Street",
            //     description: "Fill and patch pothole at intersection",
            //     location: "123 Main Street",
            //     status: "In Progress",
            //     priority: 3,
            //     assignedBy: "John Manager",
            //     dueDate: "2026-07-10",
            //     createdAt: "2026-07-01"
            // }
        ];

        displayTasks(allTasks);
    } catch (error) {
        console.error("Error loading tasks:", error);
        showNoTasksMessage();
    }
}

function displayTasks(tasks) {
    const tasksOverview = document.getElementById('tasksOverview');
    const noTasksMessage = document.getElementById('noTasksMessage');

    if (!tasks || tasks.length === 0) {
        tasksOverview.innerHTML = '';
        noTasksMessage.style.display = 'block';
        return;
    }

    noTasksMessage.style.display = 'none';
    tasksOverview.innerHTML = tasks.map(task => createTaskCard(task)).join('');
}

function createTaskCard(task) {
    const statusClass = task.status.toLowerCase().replace(' ', '-');
    const priorityLabels = {
        1: 'Low',
        2: 'Medium-Low',
        3: 'Medium',
        4: 'Medium-High',
        5: 'High'
    };

    return `
        <div class="task-card">
            <div class="task-header">
                <h3>${escapeHtml(task.title)}</h3>
                <span class="task-status ${statusClass}">${task.status}</span>
            </div>
            <div class="task-body">
                <p><strong>Description:</strong> ${escapeHtml(task.description)}</p>
                <p><strong>Location:</strong> ${escapeHtml(task.location)}</p>
                <p><strong>Priority:</strong> 
                    <span class="priority-badge priority-${task.priority}">
                        ${priorityLabels[task.priority] || 'N/A'}
                    </span>
                </p>
                <p><strong>Assigned By:</strong> ${escapeHtml(task.assignedBy)}</p>
                <p><strong>Due Date:</strong> ${formatDate(task.dueDate)}</p>
            </div>
            <div class="task-actions">
                <select class="status-dropdown" onchange="updateTaskStatus(${task.id}, this.value)">
                    <option value="Pending" ${task.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
                </select>
            </div>
        </div>
    `;
}

function filterTasks() {
    const statusFilter = document.getElementById('statusFilter').value;

    let filtered = allTasks;
    if (statusFilter) {
        filtered = allTasks.filter(task => task.status === statusFilter);
    }

    displayTasks(filtered);
}

function updateTaskStatus(taskId, newStatus) {
    // TODO: Send update to backend API
    // const response = await fetch(`/api/tasks/${taskId}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ status: newStatus })
    // });

    const task = allTasks.find(t => t.id === taskId);
    if (task) {
        task.status = newStatus;
        filterTasks();
        alert(`Task status updated to: ${newStatus}`);
    }
}

function showNoTasksMessage() {
    const tasksOverview = document.getElementById('tasksOverview');
    const noTasksMessage = document.getElementById('noTasksMessage');
    tasksOverview.innerHTML = '';
    noTasksMessage.style.display = 'block';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load tasks when page is ready
document.addEventListener('DOMContentLoaded', function() {
    document.body.backgroundColor = '#eee';  // Set background color for the body
    // Check if user is logged in and is a department worker
    const currentUser = localStorage.getItem('currentUser');

    try {
        const user = JSON.parse(currentUser);
        if (!user.roles.includes(USER_ROLES.DEPARTMENT_WORKER)) {
            alert("You do not have permission to access this page.");
            window.location.href = '/';
            return;
        }
    } catch (error) {
        console.error("Error checking user role:", error);
        window.location.href = '/';
    }

    loadTasks();

});

