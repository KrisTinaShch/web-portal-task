document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const taskTableBody = document.querySelector(".task-table__body");
    async function fetchTasks() {
        try {
            const response = await fetch("api.php");
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            const tasks = await response.json();
            populateTable(tasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            taskTableBody.innerHTML = `<tr class="task-table__row"><td colspan="4" class="task-table__cell">Failed to load tasks.</td></tr>`;
        }
    }

    function populateTable(tasks) {
        taskTableBody.innerHTML = "";
        tasks.forEach(task => {
            const row = document.createElement("tr");
            row.className = "task-table__row";
            row.innerHTML = `
                <td class="task-table__cell task-table__cell--task">${task.task}</td>
                <td class="task-table__cell task-table__cell--title">${task.title}</td>
                <td class="task-table__cell task-table__cell--description">${task.description}</td>
                <td class="task-table__cell task-table__cell--color-code" style="background-color: ${task.colorCode};">${task.colorCode}</td>
            `;
            taskTableBody.appendChild(row);
        });
    }

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const rows = taskTableBody.querySelectorAll(".task-table__row");
        rows.forEach(row => {
            const cells = Array.from(row.children);
            const matches = cells.some(cell => cell.textContent.toLowerCase().includes(query));
            row.style.display = matches ? "" : "none";
        });
    });


    fetchTasks();
    setInterval(fetchTasks, 3600000);
});
