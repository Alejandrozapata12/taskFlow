const drawer = document.querySelector("#profileDrawer");
const overlay = document.querySelector("#profileOverlay");


function openProfile() {

    drawer.classList.add("active");

    overlay.classList.add("active");

}


function closeProfile() {

    drawer.classList.remove("active");

    overlay.classList.remove("active");

}


export function initProfileDrawer() {

    document.addEventListener("click", event => {

        if (event.target.closest(".profile")) {

            openProfile();

            return;

        }


        if (event.target.closest("#closeProfileDrawer")) {

            closeProfile();

            return;

        }


        if (event.target.closest("#profileOverlay")) {

            closeProfile();

        }

    });

}