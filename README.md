# Smart City Hub App
This app was built as the class project for CSE 460 to provide a centralized platform for managing various city services and faciliates announcements of important city notifications to citizens.

### Stack
This application was built using the HTML, CSS, and JS on the frontend and the Spring Boot framework with Java on the backend. 

### Application Structure
The application is structured as a multi-module Maven project, allowing for modular development and easy integration of new features.

<img width="1841" height="950" alt="image" src="https://github.com/user-attachments/assets/d804edec-a094-4c1a-b4f2-9d95f10bb76e" />

### Demo User Accounts

The application comes with pre-loaded demo users for testing various roles and features. Use the following credentials to log in:

| Username | Email | Password | Roles |
|----------|-------|----------|-------|
| **Test User (All Roles)** | test@smartcityhub.test | test123 | GUEST, CITIZEN, CITY_ADMINISTRATOR, DEPARTMENT_MANAGER, DEPARTMENT_WORKER |
| **Alex Citizen** | citizen@smartcityhub.test | citizen123 | CITIZEN, CITY_ADMINISTRATOR, DEPARTMENT_MANAGER |
| **Gina Guest** | guest@smartcityhub.test | guest123 | GUEST |
| **Adam Administrator** | admin@smartcityhub.test | admin123 | CITY_ADMINISTRATOR |
| **Maya Manager** | manager@smartcityhub.test | manager123 | DEPARTMENT_MANAGER (dept-001) |
| **Will Worker** | worker@smartcityhub.test | worker123 | DEPARTMENT_WORKER (dept-001) |

**Recommended Test Account**: Use `test@smartcityhub.test / test123` to access all features and test every role in the application.

#### User Roles

- **GUEST**: Can view public content (events, departments)
- **CITIZEN**: Can submit service requests, view events, and browse departments
- **CITY_ADMINISTRATOR**: Can access admin portal and view all system data
- **DEPARTMENT_MANAGER**: Can manage services and assign tasks to workers (assigned to dept-001)
- **DEPARTMENT_WORKER**: Can view and complete assigned tasks (assigned to dept-001)


