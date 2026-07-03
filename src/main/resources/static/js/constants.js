/**
 * User Roles - Unchangeable constants
 * These roles are used throughout the application for role-based access control
 */

const USER_ROLES = {
    GUEST: 'GUEST',
    CITIZEN: 'CITIZEN',
    CITY_ADMINISTRATOR: 'CITY_ADMINISTRATOR',
    CITY_MANAGER: 'CITY_MANAGER',
    DEPARTMENT_WORKER: 'DEPARTMENT_WORKER'
};

// Freeze the object to prevent modifications
Object.freeze(USER_ROLES);

