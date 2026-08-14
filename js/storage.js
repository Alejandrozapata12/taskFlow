const TASKS_KEY = "taskflow_tasks";
const THEME_KEY = "taskflow_theme";


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