document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const taskTableBody = document.querySelector(".task-table__body");
    const openModalBtn = document.getElementById("openModal");
    const closeModalBtn = document.getElementById("closeModal");
    const modal = document.getElementById("imageModal");
    const imageInput = document.getElementById("imageInput");
    const imagePreview = document.getElementById("imagePreview");

    async function fetchTasks() {
        try {
            const response = await fetch("api.php");
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            const tasks = await response.json();
            updateTaskTable(tasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            showErrorInTable("Failed to load tasks.");
        }
    }

    function updateTaskTable(tasks) {
        taskTableBody.innerHTML = "";
        tasks.forEach(task => addTaskRow(task));
    }

    function addTaskRow(task) {
        const row = document.createElement("tr");
        row.className = "task-table__row";
        row.innerHTML = `
            <td class="task-table__cell task-table__cell--task">${task.task}</td>
            <td class="task-table__cell task-table__cell--title">${task.title}</td>
            <td class="task-table__cell task-table__cell--description">${task.description}</td>
            <td class="task-table__cell task-table__cell--color-code" style="background-color: ${task.colorCode};">${task.colorCode}</td>
        `;
        taskTableBody.appendChild(row);
    }

    function showErrorInTable(message) {
        taskTableBody.innerHTML = `
            <tr class="task-table__row">
                <td colspan="4" class="task-table__cell">${message}</td>
            </tr>
        `;
    }

    function filterTasks() {
        const query = searchInput.value.toLowerCase();
        const rows = taskTableBody.querySelectorAll(".task-table__row");
        rows.forEach(row => {
            const cells = Array.from(row.children);
            const matches = cells.some(cell => cell.textContent.toLowerCase().includes(query));
            row.style.display = matches ? "" : "none";
        });
    }

    function openModal() {
        modal.classList.add("visible");
    }

    function closeModal() {
        modal.classList.remove("visible");
    }

    function previewImage() {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.innerHTML = `<img src="${e.target.result}" alt="Selected Image">`;
            };
            reader.readAsDataURL(file);
        }
    }

    searchInput.addEventListener("input", filterTasks);
    openModalBtn.addEventListener("click", openModal);
    closeModalBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
    imageInput.addEventListener("change", previewImage);

    fetchTasks();
    setInterval(fetchTasks, 3600000);
});
