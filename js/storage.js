const TASKS_KEY = "taskflow_tasks";
const THEME_KEY = "taskflow_theme";
const PROJECTS_KEY = "taskflow_projects";
const SETTINGS_KEY = "taskflow_settings";


export function loadTasks(defaultTasks = []) {

    try {

        const savedTasks = localStorage.getItem(TASKS_KEY);

        if (!savedTasks) {
            return defaultTasks;
        }

        const parsedTasks = JSON.parse(savedTasks);

        return Array.isArray(parsedTasks)
            ? parsedTasks
            : defaultTasks;

    } catch (error) {

        console.error("Error loading tasks:", error);

        return defaultTasks;

    }

}


export function saveTasks(tasks) {

    try {

        localStorage.setItem(
            TASKS_KEY,
            JSON.stringify(tasks)
        );

    } catch (error) {

        console.error("Error saving tasks:", error);

    }

}


export function loadTheme() {

    return localStorage.getItem(THEME_KEY) || "light";

}


export function saveTheme(theme) {

    localStorage.setItem(
        THEME_KEY,
        theme
    );

}


export function loadProjects(defaultProjects = []) {

    try {

        const savedProjects = localStorage.getItem(PROJECTS_KEY);

        if (!savedProjects) {
            return defaultProjects;
        }

        const parsedProjects = JSON.parse(savedProjects);

        return Array.isArray(parsedProjects)
            ? parsedProjects
            : defaultProjects;

    } catch (error) {

        console.error("Error loading projects:", error);

        return defaultProjects;

    }

}


export function saveProjects(projects) {

    try {

        localStorage.setItem(
            PROJECTS_KEY,
            JSON.stringify(projects)
        );

    } catch (error) {

        console.error("Error saving projects:", error);

    }

}


export function loadSettings(defaultSettings = {}) {

    try {

        const savedSettings = localStorage.getItem(SETTINGS_KEY);

        if (!savedSettings) {
            return defaultSettings;
        }

        return {
            ...defaultSettings,
            ...JSON.parse(savedSettings)
        };

    } catch (error) {

        console.error("Error loading settings:", error);

        return defaultSettings;

    }

}


export function saveSettings(settings) {

    try {

        localStorage.setItem(
            SETTINGS_KEY,
            JSON.stringify(settings)
        );

    } catch (error) {

        console.error("Error saving settings:", error);

    }

}


export function clearAllData() {

    localStorage.removeItem(TASKS_KEY);
    localStorage.removeItem(PROJECTS_KEY);
    localStorage.removeItem(SETTINGS_KEY);

}