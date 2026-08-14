export function CalendarView() {

    const section =
        document.createElement("section");

    section.className = "content";

    section.innerHTML = `
        <section class="pagePlaceholder">

            <h1>
                Calendar
            </h1>

            <p>
                View and manage your deadlines.
            </p>

        </section>
    `;

    return section;

}