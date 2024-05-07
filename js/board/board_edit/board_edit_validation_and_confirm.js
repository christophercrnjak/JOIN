
/**
 * Starts the functions that save and display the changed entries.
 * 
 * @param {Number} taskId - Index of task in tasks array
 */
async function confirmInputsOfEditDialog(taskId) {
    getInputValuesOfEditDialog(); 
    await loadChangedContentInTasksArray(taskId);
    await setAndGetToServer(); //@storage.js:55
    dialog_status = 'taskdetails';
    await deleteCurrentTaskContent();
    renderDialogTask(taskId); // @board_dialog_taskdetails.js:24
}

/**
 * Load content of title, description, due date inputs and priority choice in currentTaskContent.
 * Contacts of Assigned to section and subtasks section are always directly saved in currentTaskContent after changes.
 */
function getInputValuesOfEditDialog() {
    currentTaskContent.title = document.getElementById('title_edit').value;
    currentTaskContent.description = document.getElementById('edit_input_description').value;
    currentTaskContent.dueDate = changeDueDateFormatInShortYear();
    currentTaskContent.priority = prioStatusEdit;
}

/**
 * Chages the due date fomat from yyyy-mm-dd to dd/mm/yy
 * 
 * @returns {String} "dd/mm/yy"
 */
function changeDueDateFormatInShortYear() {
    let date = document.getElementById('edit_input_dueDate').value;
    date = date.split('-');
    let year = parseInt(date[0]); 
    year = year - 2000;
    let newDate = date[2] + '/' + date[1] + '/' + year;
    return newDate
}

/**
 * Loads the items of the new task to tasks
 * 
 * @param {Number} taskId - - Index of task in tasks array
 */
function loadChangedContentInTasksArray(taskId) {
    tasks[taskId] = currentTaskContent;
}

/**
 * Resets the currentTaskContent array.
 */
function deleteCurrentTaskContent() {
    currentTaskContent = '';
}
