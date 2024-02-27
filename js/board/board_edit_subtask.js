
function renderSubtasksEditDialog(taskId) {
    let container = document.getElementById('subtask_section_edit');
    container.innerHTML = subtaskListEditHTML();
    added_subtasks_edit(taskId);
}

function subtaskListEditHTML() {
    return `
        <div class="header_text_edit_section">Subtasks</div>
        <input type="text" placeholder="Add new subtask">
        <div class="unordered-list_subtasks">
            <ul id="added_subtasks_edit"></ul>
        </div>
    `;
}

function added_subtasks_edit(taskId) {
    let container = document.getElementById('added_subtasks_edit');
    container.innerHTML = '';
    let subtasks = tasks[taskId].subtasks;
    for (let i = 0; i < subtasks.length; i++) {
        let subtask = subtasks[i].name;
        container.innerHTML += `
            <li id=""><a ondblclick="editSubtask('${subtask}')">${subtask}</a></li>
        `;
    }
}

function editSubtask(subtask) {
    console.log(`${subtask} wird geändert!`);
}