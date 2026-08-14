export function createTaskCard(task) {

    const article = document.createElement("article");

    article.className = "taskCard";

    article.dataset.id = task.id;

    article.innerHTML = `

        <div class="taskTop">

            <span class="priority ${task.priority}">
                ${task.priority}
            </span>

            <button
                class="taskMenu"
                type="button"
                aria-label="Task options">

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