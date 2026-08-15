// ============================================================
// TASKFLOW — AUTHENTICATION
// ============================================================


function logout() {

    // --------------------------------------------------------
    // Eliminar sesión
    // --------------------------------------------------------

    sessionStorage.removeItem(
        "isLoggedIn"
    );


    // --------------------------------------------------------
    // Redirigir al login
    // --------------------------------------------------------

    window.location.href =
        "./login.html";

}


// ============================================================
// INITIALIZE LOGOUT
// ============================================================

export function initLogout() {

    document.addEventListener(
        "click",
        event => {

            const logoutButton =
                event.target.closest(
                    ".logout, .drawerLogout"
                );


            if (!logoutButton) {
                return;
            }


            // ------------------------------------------------
            // Evitar navegación de <a href="#">
            // ------------------------------------------------

            event.preventDefault();


            logout();

        }
    );

}