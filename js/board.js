// fetched JSON in own array
let tasks = [];

// save the current dragged task as the Position-number in the array tasks
let currentDraggedElement;

// start on load the HTML page and saves the JSON content in the array tasks
// initialized render of Kanban Board content
async function init() {
    let resp = await fetch('assets/json/tasks.json'); 
    tasks = await resp.json(); 
    console.log(tasks); // only for control the JSON content during debugging
    renderColumnContent();
}


// ***** Drag and Drop *****


// The function is initialized by starting dragging a task
// The parameter 'task' represents an index of the array 'tasks' and is transfered through rendering the html by functions taskHTML(task, i) -> i = param task
function startDragging(task) {
    currentDraggedElement = task;
}

// Prevents the browser's default behavior of dragging back elements
function allowDrop(event) {
    event.preventDefault();
}

// transfer of the new created status-value through dragging and render column content with new status
// to be found in columns element with the class board_column
function moveTo(status) {
    tasks[currentDraggedElement].status = status;
    renderColumnContent();
}


// ***** Search *****


// get Value of search-inputfield in lowerCase letters and trasfer function
function searchTask() {
    let search_content = document.getElementById('task_to_be_found').value;
    search_content = search_content.toLowerCase();
    renderColumnContent(search_content);
}

// render content of colums in depending on status
async function renderColumnContent(search_content){
    // Columns
    let toDo_container = document.getElementById('task_container_Todo');
    let inProgress_container = document.getElementById('task_container_InProgress');
    let awaitFeedback_container = document.getElementById('task_container_AwaitFeedback');
    let done_container = document.getElementById('task_container_Done');
    // delet columns
    deleteColumnContentToRenderNew(toDo_container, inProgress_container, awaitFeedback_container, done_container);
    // sort by JSON content in associated Columns
    await filterTasks(toDo_container, inProgress_container, awaitFeedback_container, done_container, search_content);
    // render no task divs for columns without content/ not assigned status
    noTask(toDo_container, inProgress_container, awaitFeedback_container, done_container);
}

// delete content of columns vor reset content
function deleteColumnContentToRenderNew(toDo_container, inProgress_container, awaitFeedback_container, done_container) {
    toDo_container.innerHTML = '';
    inProgress_container.innerHTML = '';
    awaitFeedback_container.innerHTML = '';
    done_container.innerHTML = '';
}

// sort by JSON content in associated Columns
function filterTasks(toDo, inProgress, awaitFeedback, done, search_content) {
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        switch (task.status) { // query tasks[i].status has the value of

        case 'toDo': // if value = 'toDo' true, 
            // search filter and render if no searching, in dependance of searching title oder description
            if(!search_content || 
                task.title.toLowerCase().includes(search_content) || 
                task.description.toLowerCase().includes(search_content) || 
                task.category.toLowerCase().includes(search_content)) {
            // render html of task
            toDo.innerHTML += taskHTML(task, i);
            // render task special content
            renderTaskElements(i)}
            break;
        case 'inProgress': 
            if(!search_content || task.title.toLowerCase().includes(search_content) || task.description.toLowerCase().includes(search_content) || task.category.toLowerCase().includes(search_content)) {
            inProgress.innerHTML += taskHTML(task, i);
            renderTaskElements(i)}
            break;
        case 'awaitFeedback':
            if(!search_content || task.title.toLowerCase().includes(search_content) || task.description.toLowerCase().includes(search_content) || task.category.toLowerCase().includes(search_content)) {
            awaitFeedback.innerHTML += taskHTML(task, i);
            renderTaskElements(i)}
            break;
        case 'done':
            if(!search_content || task.title.toLowerCase().includes(search_content) || task.description.toLowerCase().includes(search_content) || task.category.toLowerCase().includes(search_content)) {
            done.innerHTML += taskHTML(task, i);
            renderTaskElements(i)}
            break;
        }
    }
}

function taskHTML(task, i) {
    let category = task.category;
    let title = task.title;
    let description = task.description;
    return `
        <article id="task${i}" draggable="true" ondragstart="startDragging(${i})" onclick="close_open_Dialog(${i})" class="task">
            <div id="task_category${i}" class="task_category">${category}</div>
            <div class="task_title">${title}</div>
            <div class="task_description">${description}</div>
            <div id="task_progressbar${i}" class="task_progress"></div>
            <div class="task_members_prio">
                <div id="task_member_section${i}" class="task_members"></div>
            <div id="prio_icon${i}" class="task_prio">
                <img src="assets/img/Priority_symbols_Medium.png" alt="">
            </div>
        </article>
    `
}

// render task special content
function renderTaskElements(i) {
    setColorOfCategory(i); 
    showprogressbar(i); // set blue bar
    renderInitials(i); // Initials of task members
    renderPriority(i); 
}


// render no task divs for columns without content/ not assigned status
function noTask(toDo_container, inProgress_container, awaitFeedback_container, done_container) {
    if (toDo_container.innerHTML == '') {
        toDo_container.innerHTML = noTaskHTML('To do');
    };
    if (inProgress_container.innerHTML == '') {
        inProgress_container.innerHTML = noTaskHTML('In Progress');
    };
    if (awaitFeedback_container.innerHTML == '') {
        awaitFeedback_container.innerHTML = noTaskHTML('Await feedback');
    };
    if (done_container.innerHTML == '') {
        done_container.innerHTML = noTaskHTML('done');
    };
}


// HTML representation of no task div
function noTaskHTML(head_text) {
    return `<div class="no_task"> no ${head_text} task</div>`
}


function setColorOfCategory(i) {
    let category = tasks[i].category;
    container = document.getElementById(`task_category${i}`);
    switch (category) {
        case 'User Story':
          container.style.backgroundColor = '#0038FF';
          break;
        case 'Technical Task':
          container.style.backgroundColor = '#1FD7C1';
          break;
    }
}


function renderPriority(i) {
    let priority = tasks[i].priority;
    let container = document.getElementById(`prio_icon${i}`);
    switch (priority) {
        case "Low":
          container.innerHTML = `<img src="assets/img/Priority_symbols_Low.png" alt="">`;
          break;
        case "Medium":
            container.innerHTML = `<img src="assets/img/Priority_symbols_Medium.png" alt="">`;
          break;
        case "Urgent":
          container.innerHTML = `<img src="assets/img/Priority_symbols_Urgent.png" alt="">`;
        break;
    }
}


// ***** Progressbar *****


function showprogressbar(i) {
    let container = document.getElementById(`task_progressbar${i}`)
    let task = tasks[i];
    if (task.subtasks.length > 0) {
        container.innerHTML = subtaskHTML(i);
        renderSubtaskAmounts(i);
        renderBlueProgressbar(i)
    } else {
        container.classList.add('d-none')
    }
}

function renderBlueProgressbar(i) {
    let container = document.getElementById(`blue_progressbar${i}`)
    let amountOfOpenTasks = calcSubtaskAmount(i);
    let totalSubtasks = tasks[i].subtasks.length;
    if (amountOfOpenTasks == 0) {
        container.style.width = '0px';
    } else if (amountOfOpenTasks == tasks[i].subtasks.length) {
        container.style.width = '128px';
    } else {
        let progress = calcProgressbar(totalSubtasks) * amountOfOpenTasks;
        container.style.width = `${progress}px`;
    }
}

function calcProgressbar(totalSubtasks){
    let progressTotal = 128 / totalSubtasks;
    return +progressTotal;
}


// ***** Subtask *****


function subtaskHTML(i) {
    return `
    <div  class="progressbar">
        <div id="blue_progressbar${i}" class="progressbar_blue"></div>
    </div>
    <div class="progressbar_text"> 
        <span id="subtasks_todo${i}"></span> / <span id="subtasks_total${i}"></span> Subtasks
    </div>
    `;
}

function renderSubtaskAmounts(i) {
    let sub_todo = document.getElementById(`subtasks_todo${i}`);
    let sub_total = document.getElementById(`subtasks_total${i}`);
    let amountOfOpenTasks = calcSubtaskAmount(i);
    sub_todo.innerHTML = amountOfOpenTasks;
    sub_total.innerHTML = tasks[i].subtasks.length;
}

function calcSubtaskAmount(i) {
    let task = tasks[i];
    let subtask = task.subtasks;
    let subtask_amount_todo = 0;
    for (let i = 0; i < subtask.length; i++) {
        if(subtask[i].done == true) {
            subtask_amount_todo++;
        } 
    }
    return subtask_amount_todo;
}


// ***** Member of task *****


function renderInitials(task_number) {
    let task = tasks[task_number];
    let container = document.getElementById(`task_member_section${task_number}`);
    container.innerHTML = '';
    for (let i = 0; i < task.contacts.length; i++) {
        let contact = task.contacts[i];
        let firstCharacter = contact.firstName.charAt(0);
        let secondCharacter = contact.secondName.charAt(0);
        let colorClass = contact.color;
        container.innerHTML += taskMemberHTML(firstCharacter, secondCharacter, colorClass, task_number, i);   
        if(i > 0) {
            let additionalTaskMember = document.getElementById(`task_member${task_number}${i}`);
            additionalTaskMember.style.position = 'relative';
            additionalTaskMember.style.left     = calcPositionMember(i);
        }
    }
}

function taskMemberHTML(firstCharacter, secondCharacter, colorClass, task_number, i) {
    return `
        <div id="task_member${task_number}${i}" class="member_cycle ${colorClass}">${firstCharacter}${secondCharacter}</div>
    `;
}

function calcPositionMember(i) {
    let position = i * -9;
    return `${position}px`
}


// ****** DIALOG FUNCTIONS *****

