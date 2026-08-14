export function SettingsView() {

    const section =
        document.createElement("section");

    section.className = "content";

    section.innerHTML = `
        <section class="pagePlaceholder">

            <h1>
                Settings
            </h1>

            <p>
                Manage your application preferences.
            </p>

        </section>
    `;

    return section;

}