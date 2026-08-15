import {
    getTasks
} from "../state.js";

import {
    createTaskCard
} from "./taskCard.js";


// ============================================================
// FILTER STATE
// ============================================================

const filterState = {
    status: "all",
    search: "",
    sort: ""
};


export function TasksView() {

    // Reiniciar filtros cada vez que se entra a la vista
    filterState.status = "all";
    filterState.search = "";
    filterState.sort = "";


    const section = document.createElement("section");

    section.className = "content";

    section.innerHTML = `

        <!-- STATS -->

        <section class="stats">

            <article class="statCard">

                <div class="statInfo">

                    <span class="statLabel">
                        Total tasks
                    </span>

                    <strong
                        class="statValue"
                        id="totalTasks">
                        0
                    </strong>

                </div>

                <div class="statIcon orange">
                    ✓
                </div>

            </article>


            <article class="statCard">

                <div class="statInfo">

                    <span class="statLabel">
                        Pending
                    </span>

                    <strong
                        class="statValue"
                        id="pendingStat">
                        0
                    </strong>

                </div>

                <div class="statIcon warning">
                    !
                </div>

            </article>


            <article class="statCard">

                <div class="statInfo">

                    <span class="statLabel">
                        In progress
                    </span>

                    <strong
                        class="statValue"
                        id="progressStat">
                        0
                    </strong>

                </div>

                <div class="statIcon info">
                    ↻
                </div>

            </article>


            <article class="statCard">

                <div class="statInfo">

                    <span class="statLabel">
                        Completed
                    </span>

                    <strong
                        class="statValue"
                        id="completedStat">
                        0
                    </strong>

                </div>

                <div class="statIcon success">
                    ✓
                </div>

            </article>

        </section>


        <!-- TASK SECTION -->

        <section class="taskSection">


            <div class="sectionHeader">

                <div>

                    <h2>
                        Tasks
                    </h2>

                    <p>
                        Manage your tasks and keep your work organized.
                    </p>

                </div>


                <button
                    class="newTask secondary"
                    type="button">

                    + New task

                </button>

            </div>


            <!-- TOOLBAR -->

            <div class="taskToolbar">


                <div class="taskSearch">

                    <span>
                        ⌕
                    </span>

                    <input
                        type="search"
                        id="taskSearch"
                        placeholder="Search tasks...">

                </div>


                <div class="filters">

                    <button
                        class="filter active"
                        data-filter="all"
                        type="button">
                        All
                    </button>

                    <button
                        class="filter"
                        data-filter="pending"
                        type="button">
                        Pending
                    </button>

                    <button
                        class="filter"
                        data-filter="progress"
                        type="button">
                        In progress
                    </button>

                    <button
                        class="filter"
                        data-filter="completed"
                        type="button">
                        Completed
                    </button>

                </div>


                <select
                    class="sortSelect"
                    id="sortTasks">

                    <option value="">
                        Sort by
                    </option>

                    <option value="priority">
                        Priority
                    </option>

                    <option value="date">
                        Date
                    </option>

                    <option value="name">
                        Name
                    </option>

                </select>

            </div>


            <!-- KANBAN -->

            <div class="kanban">


                <!-- PENDING -->

                <div class="kanbanColumn">

                    <div class="columnHeader">

                        <div class="columnTitle">

                            <span class="statusDot pending">
                            </span>

                            <h3>
                                Pending
                            </h3>

                            <span
                                class="taskCount"
                                id="pendingCount">
                                0
                            </span>

                        </div>


                        <button
                            class="columnMenu"
                            type="button">

                            ⋮

                        </button>

                    </div>


                    <div
                        class="taskList"
                        id="pendingTasks">
                    </div>


                    <button
                        class="addTask"
                        type="button">

                        + Add task

                    </button>

                </div>


                <!-- IN PROGRESS -->

                <div class="kanbanColumn">

                    <div class="columnHeader">

                        <div class="columnTitle">

                            <span class="statusDot progress">
                            </span>

                            <h3>
                                In progress
                            </h3>

                            <span
                                class="taskCount"
                                id="progressCount">
                                0
                            </span>

                        </div>


                        <button
                            class="columnMenu"
                            type="button">

                            ⋮

                        </button>

                    </div>


                    <div
                        class="taskList"
                        id="progressTasks">
                    </div>


                    <button
                        class="addTask"
                        type="button">

                        + Add task

                    </button>

                </div>


                <!-- COMPLETED -->

                <div class="kanbanColumn">

                    <div class="columnHeader">

                        <div class="columnTitle">

                            <span class="statusDot completed">
                            </span>

                            <h3>
                                Completed
                            </h3>

                            <span
                                class="taskCount"
                                id="completedCount">
                                0
                            </span>

                        </div>


                        <button
                            class="columnMenu"
                            type="button">

                            ⋮

                        </button>

                    </div>


                    <div
                        class="taskList"
                        id="completedTasks">
                    </div>


                    <button
                        class="addTask"
                        type="button">

                        + Add task

                    </button>

                </div>

            </div>

        </section>

    `;


    renderTasks(section);

    updateStats(section);

    initFilters(section);


    return section;

}


// ============================================================
// FILTERS / SEARCH / SORT
// ============================================================

function initFilters(container) {

    const filterButtons =
        container.querySelectorAll(".filter");

    const searchInput =
        container.querySelector("#taskSearch");

    const sortSelect =
        container.querySelector("#sortTasks");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(
                btn => btn.classList.remove("active")
            );

            button.classList.add("active");

            filterState.status =
                button.dataset.filter;

            renderTasks(container);

        });

    });


    searchInput.addEventListener("input", () => {

        filterState.search =
            searchInput.value.trim().toLowerCase();

        renderTasks(container);

    });


    sortSelect.addEventListener("change", () => {

        filterState.sort =
            sortSelect.value;

        renderTasks(container);

    });

}


function getFilteredTasks() {

    let tasks = getTasks();


    if (filterState.status !== "all") {

        tasks = tasks.filter(
            task => task.status === filterState.status
        );

    }


    if (filterState.search) {

        tasks = tasks.filter(task => {

            const haystack = `
                ${task.title}
                ${task.description}
                ${task.tag}
            `.toLowerCase();

            return haystack.includes(filterState.search);

        });

    }


    if (filterState.sort) {

        tasks = sortTasks(tasks, filterState.sort);

    }


    return tasks;

}


function sortTasks(tasks, criteria) {

    const priorityOrder = {
        high: 0,
        medium: 1,
        low: 2
    };


    const sorted = [...tasks];


    if (criteria === "priority") {

        sorted.sort(
            (a, b) =>
                priorityOrder[a.priority] -
                priorityOrder[b.priority]
        );

    }


    if (criteria === "date") {

        sorted.sort(
            (a, b) =>
                parseDueDate(a.dueDate) -
                parseDueDate(b.dueDate)
        );

    }


    if (criteria === "name") {

        sorted.sort(
            (a, b) => a.title.localeCompare(b.title)
        );

    }


    return sorted;

}


function parseDueDate(dueDate) {

    // Las fechas vienen sin año ("Aug 10"), se asume el año actual
    const parsed = Date.parse(
        `${dueDate}, ${new Date().getFullYear()}`
    );

    return Number.isNaN(parsed) ? 0 : parsed;

}


// ============================================================
// RENDER
// ============================================================

function renderTasks(container) {

    const tasks = getFilteredTasks();


    const columns = {

        pending:
            container.querySelector(
                "#pendingTasks"
            ),

        progress:
            container.querySelector(
                "#progressTasks"
            ),

        completed:
            container.querySelector(
                "#completedTasks"
            )

    };


    Object.values(columns).forEach(
        column => column.innerHTML = ""
    );


    if (tasks.length === 0) {

        renderEmptyState(container);

    }


    tasks.forEach(task => {

        const card =
            createTaskCard(task);


        const column =
            columns[task.status];


        if (column) {

            column.append(card);

        }

    });


    updateColumnCounts(
        container,
        tasks
    );

}


function renderEmptyState(container) {

    const columns =
        container.querySelectorAll(".taskList");


    columns.forEach(column => {

        column.innerHTML = `
            <p class="emptyState">
                No tasks found
            </p>
        `;

    });

}


function updateColumnCounts(
    container,
    tasks
) {

    const counts = {

        pending: 0,
        progress: 0,
        completed: 0

    };


    tasks.forEach(task => {

        if (counts[task.status] !== undefined) {

            counts[task.status]++;

        }

    });


    container.querySelector(
        "#pendingCount"
    ).textContent = counts.pending;


    container.querySelector(
        "#progressCount"
    ).textContent = counts.progress;


    container.querySelector(
        "#completedCount"
    ).textContent = counts.completed;

}


function updateStats(container) {

    const tasks = getTasks();


    const total =
        tasks.length;


    const pending =
        tasks.filter(
            task => task.status === "pending"
        ).length;


    const progress =
        tasks.filter(
            task => task.status === "progress"
        ).length;


    const completed =
        tasks.filter(
            task => task.status === "completed"
        ).length;


    container.querySelector(
        "#totalTasks"
    ).textContent = total;


    container.querySelector(
        "#pendingStat"
    ).textContent = pending;


    container.querySelector(
        "#progressStat"
    ).textContent = progress;


    container.querySelector(
        "#completedStat"
    ).textContent = completed;

}