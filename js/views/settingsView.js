import {
    loadTheme,
    saveTheme,
    loadSettings,
    saveSettings,
    clearAllData
} from "../storage.js";


const defaultSettings = {
    name: "Alejandro Zapata",
    email: "",
    notifications: true
};


export function SettingsView() {

    const section = document.createElement("section");

    section.className = "content";

    const settings =
        loadSettings(defaultSettings);

    const theme =
        loadTheme();


    section.innerHTML = `

        <section class="taskSection">

            <div class="sectionHeader">

                <div>

                    <h2>
                        Settings
                    </h2>

                    <p>
                        Manage your application preferences.
                    </p>

                </div>

            </div>


            <!-- PROFILE -->

            <div class="settingsPanel">

                <h3>
                    Profile
                </h3>

                <p class="settingsPanelHint">
                    This information is used across your dashboard.
                </p>


                <div class="formGroup">

                    <label for="settingsName">
                        Name
                    </label>

                    <input
                        type="text"
                        id="settingsName"
                        value="${settings.name}"
                        placeholder="Your name">

                </div>


                <div class="formGroup">

                    <label for="settingsEmail">
                        Email
                    </label>

                    <input
                        type="email"
                        id="settingsEmail"
                        value="${settings.email}"
                        placeholder="you@example.com">

                </div>

            </div>


            <!-- PREFERENCES -->

            <div class="settingsPanel">

                <h3>
                    Preferences
                </h3>

                <p class="settingsPanelHint">
                    Control how TaskFlow looks and notifies you.
                </p>


                <div class="settingsRow">

                    <div>

                        <div class="settingsRowLabel">
                            Dark mode
                        </div>

                        <div class="settingsRowHint">
                            Switch between light and dark theme.
                        </div>

                    </div>


                    <label class="switch">

                        <input
                            type="checkbox"
                            id="settingsTheme"
                            ${theme === "dark" ? "checked" : ""}>

                        <span class="switchTrack"></span>

                    </label>

                </div>


                <div class="settingsRow">

                    <div>

                        <div class="settingsRowLabel">
                            Notifications
                        </div>

                        <div class="settingsRowHint">
                            Get notified about upcoming due dates.
                        </div>

                    </div>


                    <label class="switch">

                        <input
                            type="checkbox"
                            id="settingsNotifications"
                            ${settings.notifications ? "checked" : ""}>

                        <span class="switchTrack"></span>

                    </label>

                </div>

            </div>


            <!-- DANGER ZONE -->

            <div class="settingsPanel">

                <h3>
                    Data
                </h3>

                <p class="settingsPanelHint">
                    Manage the data stored locally in this browser.
                </p>


                <div class="settingsDanger">

                    <div>

                        <div class="settingsRowLabel">
                            Clear all data
                        </div>

                        <div class="settingsRowHint">
                            Removes all tasks, projects and settings from this browser.
                        </div>

                    </div>


                    <button
                        class="btnDanger"
                        id="settingsClearData"
                        type="button">

                        Clear data

                    </button>

                </div>

            </div>


            <div class="settingsSaveRow">

                <button
                    class="newTask secondary"
                    id="settingsSave"
                    type="button">

                    Save changes

                </button>

            </div>

        </section>

    `;


    initSettings(section);


    return section;

}


function initSettings(container) {

    const themeToggle =
        container.querySelector("#settingsTheme");

    themeToggle.addEventListener("change", () => {

        const newTheme =
            themeToggle.checked ? "dark" : "light";

        document.documentElement.dataset.theme = newTheme;

        saveTheme(newTheme);

    });


    container.querySelector("#settingsSave")
        .addEventListener("click", () => {

            const settings = {

                name:
                    container.querySelector("#settingsName")
                        .value.trim(),

                email:
                    container.querySelector("#settingsEmail")
                        .value.trim(),

                notifications:
                    container.querySelector("#settingsNotifications")
                        .checked

            };

            saveSettings(settings);

            showSavedFeedback(container);

        });


    container.querySelector("#settingsClearData")
        .addEventListener("click", () => {

            const confirmed = window.confirm(
                "This will permanently delete all tasks, projects and settings from this browser. Continue?"
            );

            if (!confirmed) {
                return;
            }

            clearAllData();

            window.location.reload();

        });

}


function showSavedFeedback(container) {

    const button =
        container.querySelector("#settingsSave");

    const originalText =
        button.textContent;

    button.textContent = "Saved";

    setTimeout(() => {

        button.textContent = originalText;

    }, 1500);

}