import {
    getTasks
} from "../state.js";

import {
    getProjects
} from "../projectsState.js";


const PRIORITY_COLORS = {
    high: "var(--danger)",
    medium: "var(--warning)",
    low: "var(--success)"
};

const STATUS_COLORS = {
    pending: "var(--warning)",
    progress: "var(--info)",
    completed: "var(--success)"
};

const TAG_COLORS = {
    design: "#7C3AED",
    backend: "#2563EB",
    frontend: "var(--primary)",
    javascript: "#A16207",
    documentation: "#64748B"
};


export function StatisticsView() {

    const section = document.createElement("section");

    section.className = "content";

    const tasks = getTasks();
    const projects = getProjects();


    const total = tasks.length;

    const completed =
        tasks.filter(task => task.status === "completed").length;

    const completionRate =
        total > 0
            ? Math.round((completed / total) * 100)
            : 0;

    const avgProjectProgress =
        projects.length > 0
            ? Math.round(
                projects.reduce((sum, project) => {

                    const progress =
                        project.totalTasks > 0
                            ? (project.completedTasks / project.totalTasks) * 100
                            : 0;

                    return sum + progress;

                }, 0) / projects.length
            )
            : 0;


    section.innerHTML = `

        <!-- SUMMARY -->

        <section class="stats">

            <article class="statCard">

                <div class="statInfo">

                    <span class="statLabel">
                        Total tasks
                    </span>

                    <strong class="statValue">
                        ${total}
                    </strong>

                </div>

                <div class="statIcon orange">
                    ✓
                </div>

            </article>


            <article class="statCard">

                <div class="statInfo">

                    <span class="statLabel">
                        Completion rate
                    </span>

                    <strong class="statValue">
                        ${completionRate}%
                    </strong>

                </div>

                <div class="statIcon success">
                    ✓
                </div>

            </article>


            <article class="statCard">

                <div class="statInfo">

                    <span class="statLabel">
                        Total projects
                    </span>

                    <strong class="statValue">
                        ${projects.length}
                    </strong>

                </div>

                <div class="statIcon info">
                    ↻
                </div>

            </article>


            <article class="statCard">

                <div class="statInfo">

                    <span class="statLabel">
                        Avg. project progress
                    </span>

                    <strong class="statValue">
                        ${avgProjectProgress}%
                    </strong>

                </div>

                <div class="statIcon warning">
                    !
                </div>

            </article>

        </section>


        <!-- PANELS -->

        <div class="statsPanels">

            <div class="statsPanel">

                <h3>
                    Tasks by status
                </h3>

                ${renderBars(
                    countBy(tasks, "status"),
                    total,
                    STATUS_COLORS,
                    {
                        pending: "Pending",
                        progress: "In progress",
                        completed: "Completed"
                    }
                )}

            </div>


            <div class="statsPanel">

                <h3>
                    Tasks by priority
                </h3>

                ${renderBars(
                    countBy(tasks, "priority"),
                    total,
                    PRIORITY_COLORS,
                    {
                        high: "High",
                        medium: "Medium",
                        low: "Low"
                    }
                )}

            </div>


            <div class="statsPanel">

                <h3>
                    Tasks by tag
                </h3>

                ${renderBars(
                    countBy(tasks, "tag"),
                    total,
                    TAG_COLORS,
                    {
                        design: "Design",
                        backend: "Backend",
                        frontend: "Frontend",
                        javascript: "JavaScript",
                        documentation: "Documentation"
                    }
                )}

            </div>


            <div class="statsPanel">

                <h3>
                    Projects by status
                </h3>

                ${renderBars(
                    countBy(projects, "status"),
                    projects.length,
                    STATUS_COLORS,
                    {
                        active: "Active",
                        onhold: "On hold",
                        completed: "Completed"
                    }
                )}

            </div>

        </div>

    `;


    return section;

}


function countBy(items, key) {

    const counts = {};


    items.forEach(item => {

        const value = item[key];

        counts[value] = (counts[value] || 0) + 1;

    });


    return counts;

}


function renderBars(counts, total, colors, labels) {

    return Object.entries(labels).map(([key, label]) => {

        const count = counts[key] || 0;

        const percent =
            total > 0
                ? Math.round((count / total) * 100)
                : 0;

        const color =
            colors[key] || "var(--primary)";

        return `

            <div class="statBarRow">

                <div class="statBarLabel">

                    <span>
                        ${label}
                    </span>

                    <span>
                        ${count} · ${percent}%
                    </span>

                </div>


                <div class="progressBarTrack">

                    <div
                        class="progressBarFill"
                        style="width: ${percent}%; background-color: ${color};">
                    </div>

                </div>

            </div>

        `;

    }).join("");

}