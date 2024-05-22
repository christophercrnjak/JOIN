let touchStartX = 0;
let touchStartY = 0;

/**
 * Handles the start of a dragging event for a task.
 * @param {string} taskId - The ID of the task being dragged.
 * @param {string} status - The current status of the task.
 * @param {Event} event - The event object representing the drag or touch start event.
 */
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

/**
 * Registers the ID of the currently dragged task.
 * @param {string} taskId - The ID of the task being dragged.
 */
function registerTaskId(taskId) {
    currentDraggedElement = taskId;
}

/**
 * Marks columns as addable by changing their border style.
 * @param {string} status - The current status of the task being dragged.
 */
function markAddableColumns(status) {
    let columns = ['toDo', 'inProgress', 'awaitFeedback', 'done'];
    columns.splice(columns.indexOf(status), 1);
    columns.forEach(column => {
        let changedColumn = column.charAt(0).toUpperCase() + column.slice(1);
        let columnId = 'task_container_' + changedColumn;
        document.getElementById(columnId).style.border = 'dotted var(--bgdarkblue) 1px';
    });
}

/**
 * Moves the current task to a new status and updates the server and board.
 * @param {string} status - The new status to move the task to.
 * @returns {Promise<void>} - A promise that resolves when the task is moved.
 */
async function moveTo(status) {
    tasks[currentDraggedElement].status = status;
    await setAndGetToServer();
    deleteBorderStyles();
    document.getElementById('status_bar_id').style.display = 'none';
    init_board();
}

/**
 * Deletes the border styles from all columns and hides the status bar.
 */
function deleteBorderStyles() {
    let columns = ['toDo', 'inProgress', 'awaitFeedback', 'done'];
    columns.forEach(column => {
        let changedColumn = column.charAt(0).toUpperCase() + column.slice(1);
        let columnId = 'task_container_' + changedColumn;
        document.getElementById(columnId).style.border = 'none';
    });
    document.getElementById('status_bar_id').style.display = 'none';
}

/**
 * Highlights a status area by adding a class to it.
 * @param {string} id - The ID of the status area to highlight.
 */
function highlight(id) {
    let status_area = document.getElementById(id);
    status_area.classList.add('status_selected');
}

/**
 * Removes the highlight from a status area by removing a class from it.
 * @param {string} id - The ID of the status area to remove the highlight from.
 */
function removeHighlight(id) {
    let status_area = document.getElementById(id);
    status_area.classList.remove('status_selected');
}

/**
 * Allows an element to be dropped by preventing the default behavior.
 * @param {Event} event - The event object representing the drop event.
 */
function allowDrop(event) {
    event.preventDefault();
}

/**
 * Handles the start of a touch event for a task.
 * @param {string} taskId - The ID of the task being touched.
 * @param {string} status - The current status of the task.
 * @param {TouchEvent} event - The event object representing the touch start event.
 */
function touchStart(taskId, status, event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    startDragging(taskId, status, event);
}

/**
 * Handles the end of a touch event, determining if it should be treated as a click or a drag.
 * @param {TouchEvent} event - The event object representing the touch end event.
 */
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
