// ============================================================
// DATOS DE LAS TAREAS
// ============================================================

let tasks = [
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
    },

    {
        id: 5,
        title: "Create HTML structure",
        description: "Create the initial structure of TaskFlow.",
        status: "completed",
        priority: "low",
        tag: "Frontend",
        dueDate: "Aug 5",
        comments: 0
    },

    {
        id: 6,
        title: "Create additional functionality modules",
        description: "Implement the remaining usability modules.",
        status: "pending",
        priority: "low",
        tag: "Frontend",
        dueDate: "Aug 8",
        comments: 0
    }
];


// ============================================================
// RECUPERAR TAREAS DEL LOCALSTORAGE
// ============================================================

const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {

    tasks = JSON.parse(savedTasks);

}


// ============================================================
// REFERENCIAS DEL DOM
// ============================================================

const pendingTasks = document.querySelector("#pendingTasks");
const progressTasks = document.querySelector("#progressTasks");
const completedTasks = document.querySelector("#completedTasks");


// ============================================================
// CREAR TARJETA
// ============================================================

function createTask(task) {

    const article = document.createElement("article");

    article.classList.add("taskCard");

    article.dataset.id = task.id;

    article.innerHTML = `
        <div class="taskTop">

            <span class="priority ${task.priority}">
                ${task.priority}
            </span>

            <button
                class="taskMenu"
                type="button">
                ⋮
            </button>

        </div>


        <h4>
            ${task.title}
        </h4>


        <p>
            ${task.description}
        </p>


        <div class="taskMeta">

            <span>
                📅 ${task.dueDate}
            </span>

            <span>
                💬 ${task.comments}
            </span>

        </div>


        <div class="taskFooter">

            <span class="tag">
                ${task.tag}
            </span>

            <div class="taskAvatar">
                AZ
            </div>

        </div>
    `;

    return article;
}


// ============================================================
// RENDERIZAR TAREAS
// ============================================================

function renderTasks() {

    pendingTasks.innerHTML = "";
    progressTasks.innerHTML = "";
    completedTasks.innerHTML = "";


    tasks.forEach(task => {

        const card = createTask(task);


        if (task.status === "pending") {

            pendingTasks.append(card);

        }


        if (task.status === "progress") {

            progressTasks.append(card);

        }


        if (task.status === "completed") {

            completedTasks.append(card);

        }

    });

}


// ============================================================
// GUARDAR TAREAS
// ============================================================

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// ============================================================
// RENDER INICIAL
// ============================================================

renderTasks();


// ============================================================
// THEME
// ============================================================

const btnThe = document.querySelector("#theme");
const html = document.documentElement;

const temaGuardado = localStorage.getItem("theme");


if (temaGuardado) {

    html.dataset.theme = temaGuardado;

}


btnThe.addEventListener("click", () => {

    const temaActual = html.dataset.theme;


    if (temaActual === "dark") {

        html.dataset.theme = "light";

    } else {

        html.dataset.theme = "dark";

    }


    localStorage.setItem(
        "theme",
        html.dataset.theme
    );

});


// ============================================================
// MODAL NUEVA TAREA
// ============================================================

const modalTask = document.querySelector("#taskModal");


document.addEventListener("click", event => {


    // Abrir modal
    if (event.target.closest(".newTask")) {

        modalTask.classList.add("active");

    }


    // Cerrar modal
    if (event.target.closest("#closeTaskModal")) {

        modalTask.classList.remove("active");

    }


    // Cancelar
    if (event.target.closest(".btnCancel")) {

        modalTask.classList.remove("active");

    }

});


// ============================================================
// FORMULARIO DE CREAR TAREA
// ============================================================

const taskForm = document.querySelector("#taskForm");


taskForm.addEventListener("submit", event => {

    event.preventDefault();


    // Obtener información del formulario
    const data = new FormData(taskForm);


    // Crear nueva tarea
    const modelo = {

        id: Date.now(),

        title: data.get("title"),

        description: data.get("description"),

        status: "pending",

        priority: data.get("priority"),

        tag: data.get("tag"),

        dueDate: data.get("dueDate"),

        comments: 0

    };


    // Agregar al array
    tasks.push(modelo);


    // Guardar en localStorage
    saveTasks();


    // Actualizar interfaz
    renderTasks();


    // Cerrar modal
    modalTask.classList.remove("active");


    // Limpiar formulario
    taskForm.reset();

});



const profileDrawer = document.querySelector("#profileDrawer");
const profileOverlay = document.querySelector("#profileOverlay");

document.addEventListener("click", (event) => {

    // Abrir perfil
    if (event.target.closest(".profile")) {

        profileDrawer.classList.add("active");
        profileOverlay.classList.add("active");

        return;
    }


    // Cerrar con X
    if (event.target.closest("#closeProfileDrawer")) {

        profileDrawer.classList.remove("active");
        profileOverlay.classList.remove("active");

        return;
    }


});


const sidebarToggle = document.querySelector("#sidebarToggle");

sidebarToggle.addEventListener("click", () => {

    const collapsed = document.body.classList.toggle(
        "sidebar-collapsed"
    );

    sidebarToggle.setAttribute(
        "aria-expanded",
        !collapsed
    );

    sidebarToggle.setAttribute(
        "aria-label",
        collapsed
            ? "Expandir menú"
            : "Contraer menú"
    );

});