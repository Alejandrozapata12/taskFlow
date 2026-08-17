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


function disableTranslation() {
    document.documentElement.setAttribute('translate', 'no');
    document.documentElement.setAttribute('lang', 'es');

    const meta = document.createElement('meta');
    meta.name = 'google';
    meta.content = 'notranslate';

    document.head.appendChild(meta);

    document.documentElement.classList.add('notranslate');
}


function initApplication() {

    initNavigation();

    initTheme();

    initSidebar();

    initTaskModal();

    initProfileDrawer();

    initLogout();

    router();

    disableTranslation();

}


document.addEventListener(
    "DOMContentLoaded",
    initApplication
);