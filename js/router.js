import {
    TasksView
} from "./views/tasksView.js";

import {
    ProjectsView
} from "./views/projectsView.js";

import {
    CalendarView
} from "./views/calendarView.js";

import {
    StatisticsView
} from "./views/statisticsView.js";

import {
    TagsView
} from "./views/tagsView.js";

import {
    SettingsView
} from "./views/settingsView.js";


const routes = {

    "/":
        TasksView,

    "/tasks":
        TasksView,

    "/projects":
        ProjectsView,

    "/calendar":
        CalendarView,

    "/statistics":
        StatisticsView,

    "/tags":
        TagsView,

    "/settings":
        SettingsView

};


const routeMetadata = {

    "/": {
        title: "My tasks",
        description:
            "Organize and manage your tasks efficiently"
    },

    "/tasks": {
        title: "My tasks",
        description:
            "Organize and manage your tasks efficiently"
    },

    "/projects": {
        title: "Projects",
        description:
            "Manage your projects and workflows"
    },

    "/calendar": {
        title: "Calendar",
        description:
            "Plan and manage your deadlines"
    },

    "/statistics": {
        title: "Statistics",
        description:
            "Analyze your productivity"
    },

    "/tags": {
        title: "Tags",
        description:
            "Organize your tasks with tags"
    },

    "/settings": {
        title: "Settings",
        description:
            "Manage your application preferences"
    }

};


export function router() {

    const path =
        window.location.pathname;


    const View = routes[path];


    const app =
        document.querySelector("#app");


    if (!View) {

        renderNotFound(app);

        return;

    }


    const view =
        View();


    app.replaceChildren(view);


    updateHeader(path);


    updateActiveNavigation(path);

}


function updateHeader(path) {

    const metadata =
        routeMetadata[path];


    if (!metadata) return;


    const title =
        document.querySelector("#pageTitle");


    const description =
        document.querySelector(
            "#pageDescription"
        );


    title.textContent =
        metadata.title;


    description.textContent =
        metadata.description;

}


function updateActiveNavigation(path) {

    const links =
        document.querySelectorAll(
            "[data-link]"
        );


    links.forEach(link => {

        const linkPath =
            link.getAttribute("href");


        link.classList.toggle(
            "active",
            linkPath === path
        );

    });

}


function renderNotFound(app) {

    app.innerHTML = `

        <section class="content">

            <div class="pagePlaceholder">

                <h1>
                    404
                </h1>

                <p>
                    The page you're looking for doesn't exist.
                </p>

                <a
                    href="/tasks"
                    data-link>

                    Go to My Tasks

                </a>

            </div>

        </section>

    `;

}