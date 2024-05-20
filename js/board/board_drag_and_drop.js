let touchStartX = 0;
let touchStartY = 0;

function startDragging(taskId, status, event) {
    if (event.type === 'dragstart') {
        registerTaskId(taskId);
        markAddableColumns(status);
        document.getElementById('status_bar_id').style.display = 'flex';
    } else if (event.type === 'touchstart') {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
        registerTaskId(taskId);
        markAddableColumns(status);
        document.getElementById('status_bar_id').style.display = 'flex';
    }
}

function registerTaskId(taskId) {
    currentDraggedElement = taskId;
}

function markAddableColumns(status) {
    let columns = ['toDo', 'inProgress', 'awaitFeedback', 'done'];
    columns.splice(columns.indexOf(status), 1);
    columns.forEach(column => {
        let changedColumn = column.charAt(0).toUpperCase() + column.slice(1);
        let columnId = 'task_container_' + changedColumn;
        document.getElementById(columnId).style.border = 'dotted var(--bgdarkblue) 1px';
    });
}

async function moveTo(status) {
    tasks[currentDraggedElement].status = status;
    await setAndGetToServer();
    init_board();
}

function deleteBorderStyles() {
    let columns = ['toDo', 'inProgress', 'awaitFeedback', 'done'];
    columns.forEach(column => {
        let changedColumn = column.charAt(0).toUpperCase() + column.slice(1);
        let columnId = 'task_container_' + changedColumn;
        document.getElementById(columnId).style.border = 'none';
    });
    document.getElementById('status_bar_id').style.display = 'none';
}

function highlight(id) {
    let status_area = document.getElementById(id);
    status_area.classList.add('status_selected');
}

function removeHighlight(id) {
    let status_area = document.getElementById(id);
    status_area.classList.remove('status_selected');
}

function allowDrop(event) {
    event.preventDefault();
}

function touchStart(taskId, status, event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    startDragging(taskId, status, event);
}

function touchEnd(event) {
    let touchEndX = event.changedTouches[0].clientX;
    let touchEndY = event.changedTouches[0].clientY;
    let deltaX = touchEndX - touchStartX;
    let deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
        // Treat as a click
        return;
    }

    let targetElement = document.elementFromPoint(touchEndX, touchEndY);
    if (targetElement && targetElement.classList.contains('status')) {
        let status = targetElement.id.split('_')[1];
        moveTo(status);
    }
}
