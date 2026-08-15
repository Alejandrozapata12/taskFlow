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

// ============================================================
// LOGOUT CONFIRMATION
// ============================================================

function showLogoutConfirmation() {

    const toastContainer =
        document.querySelector(
            "#toastContainer"
        );


    if (!toastContainer) {
        return;
    }


    // --------------------------------------------------------
    // Crear toast
    // --------------------------------------------------------

    const toast =
        document.createElement("div");

    toast.className =
        "toast toast-warning";


    // --------------------------------------------------------
    // Contenido
    // --------------------------------------------------------

    toast.innerHTML = `

        <div class="toastIcon">

            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path
                    d="M12 3 21 20H3L12 3Z"
                ></path>

                <path
                    d="M12 9v4"
                ></path>

                <path
                    d="M12 17h.01"
                ></path>

            </svg>

        </div>


        <div class="toastContent">

            <div class="toastTitle">
                Log out?
            </div>

            <div class="toastMessage">
                Are you sure you want to log out?
            </div>


            <div class="toastActions">

                <button
                    type="button"
                    class="toastAction cancel"
                >
                    Cancel
                </button>


                <button
                    type="button"
                    class="toastAction confirm"
                >
                    Log out
                </button>

            </div>

        </div>


        <button
            type="button"
            class="toastClose"
            aria-label="Close"
        >
            ×
        </button>

    `;


    // --------------------------------------------------------
    // Agregar toast al container
    // --------------------------------------------------------

    toastContainer.appendChild(
        toast
    );


    // --------------------------------------------------------
    // Referencias a botones
    // --------------------------------------------------------

    const cancelButton =
        toast.querySelector(
            ".toastAction.cancel"
        );


    const confirmButton =
        toast.querySelector(
            ".toastAction.confirm"
        );


    const closeButton =
        toast.querySelector(
            ".toastClose"
        );


    // --------------------------------------------------------
    // Eliminar toast
    // --------------------------------------------------------

    function removeConfirmation() {

        toast.classList.add(
            "removing"
        );


        setTimeout(
            () => {

                toast.remove();

            },
            250
        );

    }


    // ========================================================
    // CANCEL
    // ========================================================

    cancelButton.addEventListener(
        "click",
        () => {

            removeConfirmation();

        }
    );


    // ========================================================
    // CLOSE
    // ========================================================

    closeButton.addEventListener(
        "click",
        () => {

            removeConfirmation();

        }
    );


    // ========================================================
    // CONFIRM LOGOUT
    // ========================================================

    confirmButton.addEventListener(
        "click",
        () => {

            logout();

        }
    );

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


            // ------------------------------------------------
            // Mostrar confirmación
            // ------------------------------------------------

            showLogoutConfirmation();

        }
    );

}