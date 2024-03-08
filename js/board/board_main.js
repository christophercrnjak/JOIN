// ****** Main structure and functions for Kanban Board *****



/**
 * Global Variable with the current dragged task as Index of tasks[]
 * 
 * @type {number}
 */
let currentDraggedElement;

/**
 * Saves the status which shows, whether the dialog is showing taskdetails or editing fields.
 * 
 * @type {String} - 3 conditions: 'inactive' (dialog not open); 'taskdetails' (shows taskdetails); 'edit' (dialog to change content).
 */
let dialog_status = 'inactive';


/**
 * Load content of tasks.json in global array tasks[]. 
 * Initialize rendering content of Kanban Board.
 */
async function init() {
    await getTasksFromServer();
    renderColumnContent();
}


// ***** Search *****


/**
 * Gets Value of search-input-field (in the upper area of the page) in lowerCase letters and trasfer it to renderColumnContent()
 */
function searchTask() {
    let search_content = document.getElementById('task_to_be_found').value;
    search_content = search_content.toLowerCase();
    renderColumnContent(search_content);
}


// ***** Building Webpage *****


/**
 * Calls the functions which are responsiv for sort the task-elements in the right column of Kanban Board
 * 
 * @param {String} search_content - letters by which the Kanban board should be sorted
 */
async function renderColumnContent(search_content){
    let toDo_container = document.getElementById('task_container_Todo');
    let inProgress_container = document.getElementById('task_container_InProgress');
    let awaitFeedback_container = document.getElementById('task_container_AwaitFeedback');
    let done_container = document.getElementById('task_container_Done');
    deleteColumnContentToRenderNew(toDo_container, inProgress_container, awaitFeedback_container, done_container);
    await filterTasks(toDo_container, inProgress_container, awaitFeedback_container, done_container, search_content);
    noTask(toDo_container, inProgress_container, awaitFeedback_container, done_container);
}

/**
 * Delete content of columns for reset content
 * 
 * @param {HTMLDivElement} toDo_container - Column showing tasks to be completed
 * @param {HTMLDivElement} inProgress_container - Column showing tasks that are in progress
 * @param {HTMLDivElement} awaitFeedback_container - Column showing tasks that require feedback from colleagues
 * @param {HTMLDivElement} done_container - Column showing tasks that have been completed
 */
function deleteColumnContentToRenderNew(toDo_container, inProgress_container, awaitFeedback_container, done_container) {
    toDo_container.innerHTML = '';
    inProgress_container.innerHTML = '';
    awaitFeedback_container.innerHTML = '';
    done_container.innerHTML = '';
}

/**
 * Sorts all tasks by processing status.
 * Tasks are only displayed if there is no search or the content matches the search result.
 * 
 * @param {HTMLDivElement} toDo - Column showing tasks to be completed
 * @param {HTMLDivElement} inProgress - Column showing tasks that are in progress
 * @param {HTMLDivElement} awaitFeedback - Column showing tasks that require feedback from colleagues
 * @param {HTMLDivElement} done - Column showing tasks that have been completed
 * @param {String} search_content - letters by which the Kanban board should be sorted
 */
function filterTasks(toDo, inProgress, awaitFeedback, done, search_content) {
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        switch (task.status) { 

        case 'toDo': 
            if(!search_content || 
                task.title.toLowerCase().includes(search_content) || 
                task.description.toLowerCase().includes(search_content) || 
                task.category.toLowerCase().includes(search_content)) {
                    toDo.innerHTML += taskHTML(task, i);
                    renderTaskElements(i)
                }
            break;
        case 'inProgress': 
            if(!search_content || 
                task.title.toLowerCase().includes(search_content) || 
                task.description.toLowerCase().includes(search_content) || 
                task.category.toLowerCase().includes(search_content)) {
                    inProgress.innerHTML += taskHTML(task, i);
                    renderTaskElements(i)
                }
            break;
        case 'awaitFeedback':
            if(!search_content || 
                task.title.toLowerCase().includes(search_content) || 
                task.description.toLowerCase().includes(search_content) || 
                task.category.toLowerCase().includes(search_content)) {
                    awaitFeedback.innerHTML += taskHTML(task, i);
                    renderTaskElements(i)
                }
            break;
        case 'done':
            if(!search_content || 
                task.title.toLowerCase().includes(search_content) || 
                task.description.toLowerCase().includes(search_content) || 
                task.category.toLowerCase().includes(search_content)) {
                    done.innerHTML += taskHTML(task, i);
                    renderTaskElements(i)
                }
            break;
        }
    }
}

/**
 * Define the HTML structure of tasks in the Kanban Board
 * 
 * @param {JSON} task - JSON Object of tasks array
 * @param {Number} i - Index of task in tasks array
 * @returns {String} HTML structure of tasks in the columns of Kanban Board
 */
function taskHTML(task, i) {
    let category = task.category;
    let title = task.title;
    let description = task.description;
    return `
        <article id="task${i}" draggable="true" ondragstart="startDragging(${i})" onclick="openTaskDetailsDialog(${i})" class="task">
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


// ***** No Task *****


/**
 * Render "no task" elements for columns without content.
 * 
 * @param {HTMLDivElement} toDo_container 
 * @param {HTMLDivElement} inProgress_container 
 * @param {HTMLDivElement} awaitFeedback_container 
 * @param {HTMLDivElement} done_container 
 */
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
        done_container.innerHTML = noTaskHTML('Done');
    };
}

/**
 * HTML structure of "no task" div.
 * 
 * @param {String} header_text - header of column
 * @returns {String} HTML structure of Element
 */
function noTaskHTML(header_text) {
    return `<div class="no_task"> no ${header_text} task</div>`
}


// ***** Task elements *****


/**
 * Calls all functions that require a dependent element design of task.
 * 
 * @param {Number} i - Index of task in tasks array.
 */
function renderTaskElements(i) {
    setColorOfCategory(i); 
    showprogressbar(i); 
    renderInitials(i); 
    renderPriority(i); 
}


// ***** Category *****


/**
 * Set the background-color of category-element.
 * 
 * @param {Number} i - Index of task in tasks array
 */
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


// ***** Priority *****


/**
 * Set the priority icon.
 * 
 * @param {Number} taskId - Index of task in tasks array
 */
function renderPriority(taskId) {
    let priority = tasks[taskId].priority;
    let container = document.getElementById(`prio_icon${taskId}`);
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


/**
 * Calls the functions which render the progressbar elements 
 * or let the progressbar-field disappear if there are no subtasks.
 * 
 * @param {Number} taskId - Index of task in tasks array
 */
function showprogressbar(taskId) {
    let container = document.getElementById(`task_progressbar${taskId}`)
    let task = tasks[taskId];
    if (task.subtasks.length > 0) {
        container.innerHTML = subtaskHTML(taskId);
        renderSubtaskAmounts(taskId);
        renderBlueProgressbar(taskId)
    } else {
        container.classList.add('d-none')
    }
}

/**
 * HTML structure of progressbar of completed tasks.
 * 
 * @param {Number} taskId - Index of task in tasks array
 * @returns {String} - HTML structure of progressbar
 */
function subtaskHTML(taskId) {
    return `
    <div  class="progressbar">
        <div id="blue_progressbar${taskId}" class="progressbar_blue"></div>
    </div>
    <div class="progressbar_text"> 
        <span id="subtasks_todo${taskId}"></span> / <span id="subtasks_total${taskId}"></span> Subtasks
    </div>
    `;
}

/**
 * Updating the progress bar based on completed tasks.
 * 
 * @param {Number} taskId - Index of task in tasks array
 */
function renderBlueProgressbar(taskId) {
    let container = document.getElementById(`blue_progressbar${taskId}`)
    let amountOfOpenTasks = calcSubtaskAmount(taskId);
    let totalSubtasks = tasks[taskId].subtasks.length;
    if (totalSubtasks > 0) {
        if (amountOfOpenTasks == 0 && container.style) {
            container.style.width = '0px';
        } else if (amountOfOpenTasks == tasks[taskId].subtasks.length) {
            container.style.width = '128px';
        } else {
            let progress = calcProgressbar(totalSubtasks) * amountOfOpenTasks;
            container.style.width = `${progress}px`;
        }
    }
}

/**
 * Calculate the level of the progressbar as pixel amount
 * 
 * @param {number} totalSubtasks - the amount of all subtasks in the task
 * @returns {number} - calculated pixel of progressbar level
 */
function calcProgressbar(totalSubtasks){
    let progressTotal = 128 / totalSubtasks;
    return +progressTotal; 
}

/**
 * Counts the completed subtasks and returns the amount
 * 
 * @param {Number} taskId - Index of task in tasks array
 * @returns {number}
 */
function calcSubtaskAmount(taskId) {
    let task = tasks[taskId];
    let subtask = task.subtasks;
    let subtask_amount_todo = 0;
    for (let i = 0; i < subtask.length; i++) {
        if(subtask[i].done == true) {
            subtask_amount_todo++;
        } 
    }
    return subtask_amount_todo;
}

/**
 * Render the labeling of progressbar.
 * 
 * @param {Number} taskId - Index of task in tasks array
 */
function renderSubtaskAmounts(taskId) {
    let sub_todo = document.getElementById(`subtasks_todo${taskId}`);
    let sub_total = document.getElementById(`subtasks_total${taskId}`);
    let amountOfOpenTasks = calcSubtaskAmount(taskId);
    sub_todo.innerHTML = amountOfOpenTasks;
    sub_total.innerHTML = tasks[taskId].subtasks.length;
}


// ***** Member of task *****


/**
 * Render the Initials (letters) of the first and second name of contact which is selected for the task.
 * 
 * @param {Number} taskId - Index of task in tasks array
 */
function renderInitials(taskId) {
    let task = tasks[taskId];
    let container = document.getElementById(`task_member_section${taskId}`);
    container.innerHTML = '';
    for (let i = 0; i < task.contacts.length; i++) {
        let contact = task.contacts[i];
        let firstCharacter = contact.firstName.charAt(0);
        let secondCharacter = contact.secondName.charAt(0);
        let colorClass = contact.color;
        container.innerHTML += taskMemberHTML(firstCharacter, secondCharacter, colorClass, taskId, i); 
        // create the position of cicles:  
        if(i > 0) {
            let additionalTaskMember = document.getElementById(`task_member${taskId}${i}`);
            additionalTaskMember.style.position = 'relative';
            additionalTaskMember.style.left     = calcPositionMember(i);
        }
    }
}

/**
 * HTML structure of contact image (in form of circle with initials in the middle).
 * 
 * @param {String} firstCharacter - First letter of first name of contact which is selected for the task
 * @param {String} secondCharacter - First letter of second name of contact which is selected for the task
 * @param {String} colorClass - Name of class with color attribute
 * @param {Number} taskId - Index of task in tasks array
 * @param {Number} i - Index of Contact in the key "contacts" of task
 * @returns {String} - HTML structure of circle with initials in the middle
 */
function taskMemberHTML(firstCharacter, secondCharacter, colorClass, taskId, i) {
    return `
        <div id="task_member${taskId}${i}" class="member_cycle ${colorClass}">${firstCharacter}${secondCharacter}</div>
    `;
}

/**
 * Calculates the position of circle
 * 
 * @param {Number} i - Index of Contact in the key "contacts" of task
 * @returns {Number} pixel amount for shift to the right of first cicle
 */
function calcPositionMember(i) {
    let position = i * -9;
    return `${position}px`
}


// ***** Global function *****


/**
 * Changes the Due Date format from dd/mm/yy to dd/mm/yyyy
 * 
 * @param {Number} taskId - Index of task in tasks array 
 * @returns {String} - String with the format dd/mm/yyyy
 */
function changeDueDateFormatInLongYear(taskId) {
    let date = tasks[taskId].dueDate;
    date = date.split('/');
    let year = parseInt(date[2]); 
    year = year + 2000;
    let newDate = date[0] + '/' + date[1] + '/' + year;
    return newDate
}


// ***** Drag and Drop *****


/**
 * The function is started by dragging the task element
 * and saves the index in the global variable currentDraggedElement.
 * 
 * @param {Number} taskId - Index of current dragging task in tasks[] global array.
 */
function startDragging(taskId) {
    currentDraggedElement = taskId;
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
 * Saves the current status of task (To do, In progress, Await feedback or Done) in current dragging task element 
 * 
 * @param {String} status - string like 'toDo' as a statusdescription in which column of the kanban Board the task is
 */
function moveTo(status) {
    tasks[currentDraggedElement].status = status;
    renderColumnContent();
}