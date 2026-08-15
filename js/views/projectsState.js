import {
    loadProjects,
    saveProjects
} from "./storage.js";


const defaultProjects = [

    {
        id: 1,
        name: "Website Redesign",
        description: "Redesign the marketing site with the new brand guidelines.",
        status: "active",
        tag: "design",
        dueDate: "Sep 30",
        totalTasks: 12,
        completedTasks: 7
    },

    {
        id: 2,
        name: "TaskFlow API",
        description: "Build the REST API that will power the dashboard.",
        status: "active",
        tag: "backend",
        dueDate: "Oct 15",
        totalTasks: 20,
        completedTasks: 6
    },

    {
        id: 3,
        name: "Mobile App",
        description: "Companion mobile app for tracking tasks on the go.",
        status: "onhold",
        tag: "frontend",
        dueDate: "Nov 20",
        totalTasks: 15,
        completedTasks: 2
    },

    {
        id: 4,
        name: "Internal Docs",
        description: "Write onboarding and architecture documentation.",
        status: "completed",
        tag: "documentation",
        dueDate: "Aug 5",
        totalTasks: 8,
        completedTasks: 8
    }

];


let projects = loadProjects(defaultProjects);


export function getProjects() {

    return projects;

}


export function addProject(project) {

    projects.push(project);

    saveProjects(projects);

}


export function updateProject(id, changes) {

    projects = projects.map(project => {

        if (project.id !== id) {
            return project;
        }

        return {
            ...project,
            ...changes
        };

    });

    saveProjects(projects);

}


export function deleteProject(id) {

    projects = projects.filter(
        project => project.id !== id
    );

    saveProjects(projects);

}