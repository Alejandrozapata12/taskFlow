import {
    addTask
} from "../state.js";


const modal = document.querySelector("#taskModal");
const form = document.querySelector("#taskForm");


function openModal() {

    modal.classList.add("active");

}


function closeModal() {

    modal.classList.remove("active");

}


function createTaskFromForm() {

    const data = new FormData(form);

    return {

        id: Date.now(),

        title: data.get("title").trim(),

        description: data.get("description").trim(),

        status: "pending",

        priority: data.get("priority"),

        tag: data.get("tag"),

        dueDate: data.get("dueDate"),

        comments: 0

    };

}


function handleSubmit(event) {

    event.preventDefault();

    const task = createTaskFromForm();

    addTask(task);

    closeModal();

    form.reset();

    window.dispatchEvent(
        new CustomEvent("tasks:changed")
    );

}


export function initTaskModal() {

    document.addEventListener("click", event => {

        if (event.target.closest(".newTask")) {

            openModal();

        }


        if (event.target.closest("#closeTaskModal")) {

            closeModal();

        }


        if (event.target.closest(".btnCancel")) {

            closeModal();

        }

    });


    form.addEventListener(
        "submit",
        handleSubmit
    );

}