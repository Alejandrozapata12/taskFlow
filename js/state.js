import {
    loadTasks,
    saveTasks
} from "./storage.js";


const defaultTasks = [

    {
        id: 1,
        title: "Design dashboard interface",
        description: "Create the main visual structure of TaskFlow.",
        status: "pending",
        priority: "high",
        tag: "Design",
        dueDate: "Aug 10",
        comments: 3
    },

    {
        id: 2,
        title: "Design database model",
        description: "Define the main tables and relationships.",
        status: "pending",
        priority: "medium",
        tag: "Backend",
        dueDate: "Aug 12",
        comments: 1
    },

    {
        id: 3,
        title: "Create tasks API",
        description: "Implement CRUD endpoints for tasks.",
        status: "progress",
        priority: "high",
        tag: "Backend",
        dueDate: "Aug 9",
        comments: 5
    },

    {
        id: 4,
        title: "Implement filters",
        description: "Add search and filtering by status.",
        status: "progress",
        priority: "medium",
        tag: "Frontend",
        dueDate: "Aug 11",
        comments: 0
    }
];


let tasks = loadTasks(defaultTasks);


export function getTasks() {

    return tasks;

}


export function addTask(task) {

    tasks.push(task);

    saveTasks(tasks);

}


export function updateTask(id, changes) {

    tasks = tasks.map(task => {

        if (task.id !== id) {
            return task;
        }

        return {
            ...task,
            ...changes
        };

    });

    saveTasks(tasks);

}


export function deleteTask(id) {

    tasks = tasks.filter(
        task => task.id !== id
    );

    saveTasks(tasks);

}