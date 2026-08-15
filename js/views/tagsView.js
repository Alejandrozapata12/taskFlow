import {
    getTasks
} from "../state.js";

import {
    createTaskCard
} from "./taskCard.js";


const TAGS = [
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Backend" },
    { key: "design", label: "Design" },
    { key: "javascript", label: "JavaScript" },
    { key: "documentation", label: "Documentation" }
];


let selectedTag = null;


export function TagsView() {

    selectedTag = null;


    const section = document.createElement("section");

    section.className = "content";

    section.innerHTML = `

        <section class="taskSection">

            <div class="sectionHeader">

                <div>

                    <h2>
                        Tags
                    </h2>

                    <p>
                        Organize your tasks with tags.
                    </p>

                </div>

            </div>


            <div
                class="tagsGrid"
                id="tagsGrid">
            </div>


            <div
                class="taskList"
                id="tagTaskList">
            </div>

        </section>

    `;


    renderTagsGrid(section);

    renderTaskList(section);


    return section;

}


function renderTagsGrid(container) {

    const grid =
        container.querySelector("#tagsGrid");

    const tasks =
        getTasks();


    grid.innerHTML = "";


    TAGS.forEach(({ key, label }) => {

        const count =
            tasks.filter(task => task.tag === key).length;


        const card =
            document.createElement("article");

        card.className = "tagCard";

        card.dataset.tag = key;

        if (selectedTag === key) {
            card.classList.add("active");
        }

        card.innerHTML = `

            <span class="tag ${key}">
                ${label}
            </span>

            <span class="tagCardCount">
                ${count} ${count === 1 ? "task" : "tasks"}
            </span>

        `;

        card.addEventListener("click", () => {

            selectedTag =
                selectedTag === key ? null : key;

            renderTagsGrid(container);

            renderTaskList(container);

        });

        grid.append(card);

    });

}


function renderTaskList(container) {

    const list =
        container.querySelector("#tagTaskList");

    list.innerHTML = "";


    if (!selectedTag) {

        list.innerHTML = `
            <p class="emptyState">
                Select a tag to see its tasks
            </p>
        `;

        return;

    }


    const tasks =
        getTasks().filter(
            task => task.tag === selectedTag
        );


    if (tasks.length === 0) {

        list.innerHTML = `
            <p class="emptyState">
                No tasks with this tag yet
            </p>
        `;

        return;

    }


    tasks.forEach(task => {

        list.append(
            createTaskCard(task)
        );

    });

}