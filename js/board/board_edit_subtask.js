
function renderSubtasksEditDialog(taskId) {
    let container = document.getElementById('subtask_section_edit');
    container.innerHTML = subtaskListEditHTML();
    added_subtasks_edit(taskId);
}

function subtaskListEditHTML() {
    return `
        <div class="header_text_edit_section">Subtasks</div>
        <div class="input_section_edit_subtask">
            <input type="text" placeholder="Add new subtask">
            <a class="add_btn_subtask_edit">
                <img src="assets/img/addSubtask_btn.svg">
            </a>
        </div>
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
        container.innerHTML += subtasklistEditHTML(subtask, i);
    }
}

function subtasklistEditHTML(subtask, subtaskId) {
    return `
            <div class="subtask_list_row_main">
                <div class="subtask_list_row" ondblclick="editSubtask('${subtask}')">
                    <div class="subtask_name_edit"><span class="point">&bull; </span> ${subtask}</div>
                        <div class="subtask_delete_and_edit_editDialog">
                        <a class="edit_btn_subtask" id="edit_img_subtask_edit" onclick="renderEditDialog(${subtaskId})">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/>
                            </svg>
                        </a>
                        <div class="line_subtask"></div>

                        <a class="delete_btn_subtask" onclick="deleteTask(${subtaskId})">
                            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.14453 18C2.59453 18 2.1237 17.8042 1.73203 17.4125C1.34036 17.0208 1.14453 16.55 1.14453 16V3C0.861198 3 0.623698 2.90417 0.432031 2.7125C0.240365 2.52083 0.144531 2.28333 0.144531 2C0.144531 1.71667 0.240365 1.47917 0.432031 1.2875C0.623698 1.09583 0.861198 1 1.14453 1H5.14453C5.14453 0.716667 5.24036 0.479167 5.43203 0.2875C5.6237 0.0958333 5.8612 0 6.14453 0H10.1445C10.4279 0 10.6654 0.0958333 10.857 0.2875C11.0487 0.479167 11.1445 0.716667 11.1445 1H15.1445C15.4279 1 15.6654 1.09583 15.857 1.2875C16.0487 1.47917 16.1445 1.71667 16.1445 2C16.1445 2.28333 16.0487 2.52083 15.857 2.7125C15.6654 2.90417 15.4279 3 15.1445 3V16C15.1445 16.55 14.9487 17.0208 14.557 17.4125C14.1654 17.8042 13.6945 18 13.1445 18H3.14453ZM3.14453 3V16H13.1445V3H3.14453ZM5.14453 13C5.14453 13.2833 5.24036 13.5208 5.43203 13.7125C5.6237 13.9042 5.8612 14 6.14453 14C6.42786 14 6.66536 13.9042 6.85703 13.7125C7.0487 13.5208 7.14453 13.2833 7.14453 13V6C7.14453 5.71667 7.0487 5.47917 6.85703 5.2875C6.66536 5.09583 6.42786 5 6.14453 5C5.8612 5 5.6237 5.09583 5.43203 5.2875C5.24036 5.47917 5.14453 5.71667 5.14453 6V13ZM9.14453 13C9.14453 13.2833 9.24037 13.5208 9.43203 13.7125C9.6237 13.9042 9.8612 14 10.1445 14C10.4279 14 10.6654 13.9042 10.857 13.7125C11.0487 13.5208 11.1445 13.2833 11.1445 13V6C11.1445 5.71667 11.0487 5.47917 10.857 5.2875C10.6654 5.09583 10.4279 5 10.1445 5C9.8612 5 9.6237 5.09583 9.43203 5.2875C9.24037 5.47917 9.14453 5.71667 9.14453 6V13Z" fill="#2A3647"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
    `;
}

function editSubtask(subtask) {
    console.log(`${subtask} wird geändert!`);
}