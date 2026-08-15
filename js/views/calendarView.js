import {
    getTasks
} from "../state.js";


const MONTH_NAMES = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

const DAY_HEADERS = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
];


const viewDate = new Date();
viewDate.setDate(1);


export function CalendarView() {

    viewDate.setTime(new Date().setDate(1));


    const section = document.createElement("section");

    section.className = "content";

    section.innerHTML = `

        <section class="taskSection">

            <div class="sectionHeader">

                <div>

                    <h2>
                        Calendar
                    </h2>

                    <p>
                        View and manage your deadlines.
                    </p>

                </div>

            </div>


            <div class="calendarHeader">

                <button
                    class="calendarTodayButton"
                    id="calendarToday"
                    type="button">

                    Today

                </button>


                <div class="calendarNav">

                    <button
                        class="calendarNavButton"
                        id="calendarPrev"
                        type="button"
                        aria-label="Previous month">

                        ‹

                    </button>


                    <span
                        class="calendarMonthLabel"
                        id="calendarMonthLabel">
                    </span>


                    <button
                        class="calendarNavButton"
                        id="calendarNext"
                        type="button"
                        aria-label="Next month">

                        ›

                    </button>

                </div>

            </div>


            <div
                class="calendarGrid"
                id="calendarGrid">
            </div>

        </section>

    `;


    initNavigation(section);

    renderCalendar(section);


    return section;

}


function initNavigation(container) {

    container.querySelector("#calendarPrev")
        .addEventListener("click", () => {

            viewDate.setMonth(viewDate.getMonth() - 1);

            renderCalendar(container);

        });


    container.querySelector("#calendarNext")
        .addEventListener("click", () => {

            viewDate.setMonth(viewDate.getMonth() + 1);

            renderCalendar(container);

        });


    container.querySelector("#calendarToday")
        .addEventListener("click", () => {

            viewDate.setTime(new Date().setDate(1));

            renderCalendar(container);

        });

}


function getTasksByDay(year, month) {

    const tasksByDay = {};


    getTasks().forEach(task => {

        const parsed =
            Date.parse(`${task.dueDate}, ${year}`);

        if (Number.isNaN(parsed)) {
            return;
        }

        const dueDate = new Date(parsed);


        if (
            dueDate.getFullYear() !== year ||
            dueDate.getMonth() !== month
        ) {
            return;
        }


        const day = dueDate.getDate();


        if (!tasksByDay[day]) {
            tasksByDay[day] = [];
        }

        tasksByDay[day].push(task);

    });


    return tasksByDay;

}


function renderCalendar(container) {

    const year =
        viewDate.getFullYear();

    const month =
        viewDate.getMonth();


    container.querySelector(
        "#calendarMonthLabel"
    ).textContent = `${MONTH_NAMES[month]} ${year}`;


    const grid =
        container.querySelector("#calendarGrid");

    grid.innerHTML = "";


    DAY_HEADERS.forEach(label => {

        const header =
            document.createElement("div");

        header.className = "calendarDayHeader";

        header.textContent = label;

        grid.append(header);

    });


    const firstDayIndex =
        new Date(year, month, 1).getDay();

    const daysInMonth =
        new Date(year, month + 1, 0).getDate();

    const daysInPrevMonth =
        new Date(year, month, 0).getDate();


    const today = new Date();

    const tasksByDay =
        getTasksByDay(year, month);


    // Días del mes anterior para completar la primera semana
    for (let i = firstDayIndex - 1; i >= 0; i--) {

        grid.append(
            createDayCell(
                daysInPrevMonth - i,
                true,
                false,
                []
            )
        );

    }


    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {

        const isToday =
            year === today.getFullYear() &&
            month === today.getMonth() &&
            day === today.getDate();

        grid.append(
            createDayCell(
                day,
                false,
                isToday,
                tasksByDay[day] || []
            )
        );

    }


    // Días del mes siguiente para completar la última semana
    const totalCells =
        firstDayIndex + daysInMonth;

    const trailingDays =
        (7 - (totalCells % 7)) % 7;

    for (let day = 1; day <= trailingDays; day++) {

        grid.append(
            createDayCell(
                day,
                true,
                false,
                []
            )
        );

    }

}


function createDayCell(
    day,
    otherMonth,
    isToday,
    tasks
) {

    const cell =
        document.createElement("div");

    cell.className = "calendarDay";

    if (otherMonth) {
        cell.classList.add("otherMonth");
    }

    if (isToday) {
        cell.classList.add("today");
    }


    const number =
        document.createElement("span");

    number.className = "calendarDayNumber";

    number.textContent = day;

    cell.append(number);


    tasks.slice(0, 3).forEach(task => {

        const chip =
            document.createElement("span");

        chip.className =
            `calendarTaskChip priority-${task.priority}`;

        chip.textContent = task.title;

        cell.append(chip);

    });


    if (tasks.length > 3) {

        const more =
            document.createElement("span");

        more.className = "calendarTaskChip";

        more.textContent = `+${tasks.length - 3} more`;

        cell.append(more);

    }


    return cell;

}