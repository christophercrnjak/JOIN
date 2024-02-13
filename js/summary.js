let tasks = [];
let toDoAmount = 0;
let inProgressAmount = 0;
let awaitingFeedbackAmount = 0;
let doneAmount = 0;
let nextUpcomingTask; //TO-DO

async function init() {
    let resp = await fetch('assets/json/tasks.json'); 
    tasks = await resp.json(); 
    console.log(tasks);
    calcTaskAmount(tasks);
    calcSumOfAmount();
    renderAmountsInElements();
}

function calcTaskAmount(tasks) {
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        switch (task.status) {
            case 'toDo':
              toDoAmount++;
              break;
            case 'inProgress':
              inProgressAmount++;
              break;
            case 'awaitFeedback':
              awaitingFeedbackAmount++;
              break;
            case 'done':
              doneAmount++;
              break;
          }
    }
}

function calcSumOfAmount() {
    allAmounts = toDoAmount + inProgressAmount + awaitingFeedbackAmount + doneAmount;
}

function renderAmountsInElements() {
    renderToDoAmountInElement();
    renderDoneAmountInElement();
    renderAllAmountInElement();
    renderInProgressAmountInElement();
    renderAwaitingFeedbackAmountInElements();
}

function renderToDoAmountInElement() {
    let toDoAmountElement = document.getElementById('toDoAmount');
    if (toDoAmount != 0) {
        toDoAmountElement.innerHTML = toDoAmount;
    } else {
        toDoAmountElement.innerHTML = "0";
    }
}

function renderDoneAmountInElement() {
    let doneAmountElement = document.getElementById('doneAmount');
    if (toDoAmount != 0) {
        doneAmountElement.innerHTML = toDoAmount;
    } else {
        doneAmountElement.innerHTML = "0";
    }
}

function renderAllAmountInElement() {
    let allAmountElement = document.getElementById('allAmount');
    if (toDoAmount != 0) {
        allAmountElement.innerHTML = toDoAmount;
    } else {
        allAmountElement.innerHTML = "0";
    }
}

function renderInProgressAmountInElement() {
    let inProgressAmountElement = document.getElementById('inProgressAmount');
    if (toDoAmount != 0) {
        inProgressAmountElement.innerHTML = toDoAmount;
    } else {
        inProgressAmountElement.innerHTML = "0";
    }
}

function renderAwaitingFeedbackAmountInElements() {
    let awaitingFeedbackAmountElement = document.getElementById('awaitingFeedbackAmount');
    if (toDoAmount != 0) {
        awaitingFeedbackAmountElement.innerHTML = toDoAmount;
    } else {
        awaitingFeedbackAmountElement.innerHTML = "0";
    }
}