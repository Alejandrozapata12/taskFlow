export function TagsView() {

    const section =
        document.createElement("section");

    section.className = "content";

    section.innerHTML = `
        <section class="pagePlaceholder">

            <h1>
                Tags
            </h1>

            <p>
                Organize your tasks using tags.
            </p>

        </section>
    `;

    return section;

}