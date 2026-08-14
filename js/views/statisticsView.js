export function StatisticsView() {

    const section =
        document.createElement("section");

    section.className = "content";

    section.innerHTML = `
        <section class="pagePlaceholder">

            <h1>
                Statistics
            </h1>

            <p>
                Analyze your productivity.
            </p>

        </section>
    `;

    return section;

}