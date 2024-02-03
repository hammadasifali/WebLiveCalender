document.addEventListener("DOMContentLoaded", function () {
    const prevMonthButton = document.getElementById("prev-month");
    const nextMonthButton = document.getElementById("next-month");
    const currentMonthYear = document.getElementById("current-month-year");
    const calendarBody = document.getElementById("calendar-body");

    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    function updateCalendar() {
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

        currentMonthYear.textContent = new Date(currentYear, currentMonth).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });

        let calendarHTML = "";

        let day = 1;
        for (let i = 0; i < 6; i++) {
            let row = "<tr>";
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDayOfMonth) {
                    row += "<td></td>";
                } else if (day <= daysInMonth) {
                    row += `<td>${day}</td>`;
                    day++;
                }
            }
            row += "</tr>";
            calendarHTML += row;
        }

        calendarBody.innerHTML = calendarHTML;
    }

    updateCalendar();

    prevMonthButton.addEventListener("click", function () {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        updateCalendar();
    });

    nextMonthButton.addEventListener("click", function () {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        updateCalendar();
    });

    function updateClock() {
        const pakistanTime = new Date().toLocaleTimeString("en-US", {
            timeZone: "Asia/Karachi",
            hour12: true,
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
        });

        const clockElement = document.getElementById("clock");
        clockElement.textContent = `Pakistan Time: ${pakistanTime}`;
    }

    updateClock(); // Call it initially to set the time
    setInterval(updateClock, 1000); // Update every second

    calendarBody.addEventListener("click", function (e) {
        const target = e.target;
        if (target.tagName === "TD" && target.textContent.trim() !== "") {
            document.getElementById("event-title").value = "";
            document.getElementById("event-date").value = "";
            document.getElementById("event-modal").style.display = "block";
        }
    });

    // Close the event modal
    document.querySelector(".close").addEventListener("click", function () {
        document.getElementById("event-modal").style.display = "none";
    });

    // Add an event to the calendar
    document.getElementById("add-event-btn").addEventListener("click", function () {
        const eventTitle = document.getElementById("event-title").value;
        const eventDate = document.getElementById("event-date").value;

        if (eventTitle && eventDate) {
            const hoveredCell = document.querySelector(".calendar-table td:hover");
            if (hoveredCell) {
                const eventDiv = document.createElement("div");
                eventDiv.textContent = eventTitle;
                eventDiv.className = "event fade-in";
                hoveredCell.appendChild(eventDiv);
                document.getElementById("event-modal").style.display = "none";
            } else {
                alert("Please select a day on the calendar to add an event.");
            }
        }
    });
});
