// ***** Drag and Drop *****


/**
 * 
 * 
 * @param {Number} taskId - Index of current dragging task in JSON-array tasks.
 * @param {String} status - Status of current dragging task.
 */
function startDragging(taskId, status) {
    registerTaskId(taskId);
    markAddableColumns(status);
}

/**
 * The function is started by dragging the task element
 * and saves the index in the global variable currentDraggedElement.
 * 
 * @param {Number} taskId - Index of current dragging task in tasks[] global array.
 */
function registerTaskId(taskId) {
    currentDraggedElement = taskId;
}

/**
 * Has an array witch contains all status values.
 * Delete the status in the array witch is currently dragging.
 * Creates the id of possible target columns and add a style with dotted border to mark them.
 * 
 * @param {String} status - Status of current dragging task.
 */
function markAddableColumns(status) {
    let columns = ['toDo', 'inProgress','awaitFeedback','done']; // array mit alles status
    columns.splice(columns.indexOf(status), 1); // löschen der gedraggten Column aus array
    for (let i = 0; i < columns.length; i++) {
        let column = columns[i];
        let changedColumn = column.charAt(0).toUpperCase() + column.slice(1);
        let columnId = 'task_container_' + changedColumn;
        document.getElementById(columnId).style.border = 'dotted var(--bgdarkblue) 1px';
    }
}

/**
 * Prevents the browser's default behavior of dragging back elements.
 * 
 * @param {Event} event - The drag-and-drop-event.
 * @returns {void}
 */
function allowDrop(event) {
    event.preventDefault();
}

/**
 * Saves the current status of task (toDo, inProgress, awaitFeedback or done) in the current dragging task element 
 * 
 * @param {String} status - string like 'toDo' as a statusdescription in which column of the kanban Board the task is
 */
async function moveTo(status) {
    tasks[currentDraggedElement].status = status;
    await setAndGetToServer()
    init();
}

/**
 * Removes borderstyle after drag and drop.
 */
function deleteBorderStyles() {
    let columns = ['toDo', 'inProgress','awaitFeedback','done']; // array mit alles status
    for (let i = 0; i < columns.length; i++) {
        let column = columns[i];
        let changedColumn = column.charAt(0).toUpperCase() + column.slice(1);
        let columnId = 'task_container_' + changedColumn;
        document.getElementById(columnId).style.border = 'none';        
    }
}