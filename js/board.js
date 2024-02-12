let tasks = [];

async function init() {
    let resp = await fetch('assets/json/tasks.json'); 
    tasks = await resp.json(); 
    console.log(tasks);
    renderColumnContent('task_container_Todo', 'To do');
    renderColumnContent('task_container_InProgress', 'In progress');
    renderColumnContent('task_container_AwaitFeedback', 'Await feedback');
    renderColumnContent('task_container_Done', 'Done');
}

// render content of column "To do" in Board
function renderColumnContent(container, header){
    let container = document.getElementById(`${container}`);
    container.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if(task.status == toDo) {
            container.innerHTML += taskHTML(task, i);
        } else {
            if(container.innerHTML == '')
            container.innerHTML = noTaskHTML(`${header}`);
        }
    }
}

function noTaskHTML(head_text) {
    return `<div class="no_task">No Task ${head_text}</div>`
}

function taskHTML(task, i) {

    let category = task.category;
    let title = task.title;
    let description = task.description;
    return `
        <article id="task${i}" onclick="close_open_Dialog()" class="task">
            <div class="task_category">${category}</div>
            <div class="task_title">${title}</div>
            <div class="task_description">${description}</div>
            <div class="task_progress">
                <div class="progressbar">
                    <div class="progressbar_blue"></div>
                </div>
                <div class="progressbar_text">1/2 Subtasks</div>
            </div>
            <div class="task_members_prio">
                <div class="task_members">
                    <div class="member_cycle orange pos1">${initials(task.contacts[0])}</div>
                    <div class="member_cycle turkies pos2">${initials(task.contacts[1])}</div>
                    <div class="member_cycle violett pos3">${initials(task.contacts[2])}</div>
                </div>
                <div class="task_prio">
                    <img src="assets/img/Priority_symbols_Medium.png" alt="">
                </div>
            </div>
        </article>
    `
}



// ****** DIALOG FUNCTIONS *****

function close_open_Dialog() {
    let container = document.getElementById('dialog_container');
    container.classList.toggle('d-none')
}


