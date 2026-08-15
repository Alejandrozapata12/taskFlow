import {
    getProjects
} from "../projectsState.js";


// ============================================================
// FILTER STATE
// ============================================================

const filterState = {
    status: "all",
    search: ""
};


export function ProjectsView() {

    filterState.status = "all";
    filterState.search = "";


    const section = document.createElement("section");

    section.className = "content";

    section.innerHTML = `

        <!-- STATS -->

        <section class="stats">

            <article class="statCard">

                <div class="statInfo">

                    <span class="statLabel">
                        Total projects
                    </span>

                    <strong
                        class="statValue"
                        id="totalProjects">
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
                        Active
                    </span>

                    <strong
                        class="statValue"
                        id="activeStat">
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
                        On hold
                    </span>

                    <strong
                        class="statValue"
                        id="onholdStat">
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
                        Completed
                    </span>

                    <strong
                        class="statValue"
                        id="completedProjectsStat">
                        0
                    </strong>

                </div>

                <div class="statIcon success">
                    ✓
                </div>

            </article>

        </section>


        <!-- PROJECTS SECTION -->

        <section class="taskSection">


            <div class="sectionHeader">

                <div>

                    <h2>
                        Projects
                    </h2>

                    <p>
                        Manage your projects and workflows.
                    </p>

                </div>


                <button
                    class="newTask secondary"
                    type="button">

                    + New project

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
                        id="projectSearch"
                        placeholder="Search projects...">

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
                        data-filter="active"
                        type="button">
                        Active
                    </button>

                    <button
                        class="filter"
                        data-filter="onhold"
                        type="button">
                        On hold
                    </button>

                    <button
                        class="filter"
                        data-filter="completed"
                        type="button">
                        Completed
                    </button>

                </div>

            </div>


            <!-- GRID -->

            <div
                class="projectsGrid"
                id="projectsGrid">
            </div>

        </section>

    `;


    renderProjects(section);

    updateStats(section);

    initFilters(section);


    return section;

}


// ============================================================
// FILTERS / SEARCH
// ============================================================

function initFilters(container) {

    const filterButtons =
        container.querySelectorAll(".filter");

    const searchInput =
        container.querySelector("#projectSearch");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(
                btn => btn.classList.remove("active")
            );

            button.classList.add("active");

            filterState.status =
                button.dataset.filter;

            renderProjects(container);

        });

    });


    searchInput.addEventListener("input", () => {

        filterState.search =
            searchInput.value.trim().toLowerCase();

        renderProjects(container);

    });

}


function getFilteredProjects() {

    let projects = getProjects();


    if (filterState.status !== "all") {

        projects = projects.filter(
            project => project.status === filterState.status
        );

    }


    if (filterState.search) {

        projects = projects.filter(project => {

            const haystack = `
                ${project.name}
                ${project.description}
                ${project.tag}
            `.toLowerCase();

            return haystack.includes(filterState.search);

        });

    }


    return projects;

}


// ============================================================
// RENDER
// ============================================================

function renderProjects(container) {

    const grid =
        container.querySelector("#projectsGrid");

    const projects =
        getFilteredProjects();


    grid.innerHTML = "";


    if (projects.length === 0) {

        grid.innerHTML = `
            <p class="emptyState">
                No projects found
            </p>
        `;

        return;

    }


    projects.forEach(project => {

        grid.append(
            createProjectCard(project)
        );

    });

}


function createProjectCard(project) {

    const article =
        document.createElement("article");

    article.className = "projectCard";

    article.dataset.id = project.id;


    const progress =
        project.totalTasks > 0
            ? Math.round(
                (project.completedTasks / project.totalTasks) * 100
            )
            : 0;


    const statusLabel = {
        active: "Active",
        onhold: "On hold",
        completed: "Completed"
    }[project.status] || project.status;


    article.innerHTML = `

        <div class="projectTop">

            <span class="tag ${project.tag}">
                ${project.tag}
            </span>

            <span class="projectStatus ${project.status}">
                ${statusLabel}
            </span>

        </div>


        <h4>
            ${project.name}
        </h4>


        <p>
            ${project.description}
        </p>


        <div class="projectProgress">

            <div class="projectProgressLabel">

                <span>
                    ${project.completedTasks}/${project.totalTasks} tasks
                </span>

                <span>
                    ${progress}%
                </span>

            </div>


            <div class="progressBarTrack">

                <div
                    class="progressBarFill"
                    style="width: ${progress}%">
                </div>

            </div>

        </div>


        <div class="projectFooter">

            <span class="taskMeta">
                📅 ${project.dueDate}
            </span>

            <div class="taskAvatar">
                AZ
            </div>

        </div>

    `;

    return article;

}


function updateStats(container) {

    const projects =
        getProjects();


    const total =
        projects.length;


    const active =
        projects.filter(
            project => project.status === "active"
        ).length;


    const onhold =
        projects.filter(
            project => project.status === "onhold"
        ).length;


    const completed =
        projects.filter(
            project => project.status === "completed"
        ).length;


    container.querySelector(
        "#totalProjects"
    ).textContent = total;


    container.querySelector(
        "#activeStat"
    ).textContent = active;


    container.querySelector(
        "#onholdStat"
    ).textContent = onhold;


    container.querySelector(
        "#completedProjectsStat"
    ).textContent = completed;

}