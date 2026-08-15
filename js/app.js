import {
    router
} from "./router.js";

import {
    initTheme,
    initSidebar
} from "./events.js";

import {
    initTaskModal
} from "./components/taskModal.js";

import {
    initProfileDrawer
} from "./components/profileDrawer.js";

import {
    initLogout
} from "./auth.js";


function initNavigation() {

    document.addEventListener(
        "click",
        event => {

            const link =
                event.target.closest(
                    "[data-link]"
                );


            if (!link) return;


            const href =
                link.getAttribute("href");


            if (
                !href ||
                href.startsWith("#") ||
                href.startsWith("http")
            ) {
                return;
            }


            event.preventDefault();


            if (
                href ===
                window.location.pathname
            ) {
                return;
            }


            history.pushState(
                null,
                "",
                href
            );


            router();

        }
    );


    window.addEventListener(
        "popstate",
        router
    );

}


function initApplication() {

    initNavigation();

    initTheme();

    initSidebar();

    initTaskModal();

    initProfileDrawer();

    initLogout();

    router();

}


document.addEventListener(
    "DOMContentLoaded",
    initApplication
);