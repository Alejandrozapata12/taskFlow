import {
    loadTheme,
    saveTheme
} from "./storage.js";





export function initTheme() {

    const button = document.querySelector("#theme");

    const html = document.documentElement;

    const savedTheme = loadTheme();

    html.dataset.theme = savedTheme;


    button.addEventListener("click", () => {

        const currentTheme =
            html.dataset.theme;

        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";


        html.dataset.theme = newTheme;

        saveTheme(newTheme);

    });

}


export function initSidebar() {

    const sidebarToggle =
        document.querySelector("#sidebarToggle");


    sidebarToggle.addEventListener("click", () => {

        const collapsed =
            document.body.classList.toggle(
                "sidebar-collapsed"
            );


        sidebarToggle.setAttribute(
            "aria-expanded",
            String(!collapsed)
        );


        sidebarToggle.setAttribute(
            "aria-label",
            collapsed
                ? "Expand menu"
                : "Collapse menu"
        );

    });

}