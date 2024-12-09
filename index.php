<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager</title>
    <link rel="stylesheet" href="reset-styles.css"/>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="body-background"></div>
<div class="container">
    <header class="header">
        <h1 class="header__title">Task Manager</h1>
    </header>
    <main class="main">
        <div class="search-bar">
            <input type="text" id="searchInput" class="search-bar__input" placeholder="Search tasks...">
        </div>

        <table id="taskTable" class="task-table">
            <thead class="task-table__head">
            <tr class="task-table__row">
                <th class="task-table__header">Task</th>
                <th class="task-table__header">Title</th>
                <th class="task-table__header">Description</th>
                <th class="task-table__header">Color Code</th>
            </tr>
            </thead>
            <tbody class="task-table__body">

            </tbody>
        </table>
    </main>
</div>
<script src="app.js"></script>
</body>
</html>
