export function ProjectsView() {

    const section =
        document.createElement("section");

    section.className = "content";

    section.innerHTML = `
        <section class="pagePlaceholder">

            <h1>
                Projects
            </h1>

            <p>
                Manage your projects from here.
            </p>

        </section>
    `;

    return section;

}