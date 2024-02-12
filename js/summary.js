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
    if (toDoAmount != 0) {
        document.getElementById('toDoAmount').innerHTML = toDoAmount;
    } else {
        document.getElementById('toDoAmount').innerHTML = "0";
    }

    if (doneAmount != 0) {
        document.getElementById('doneAmount').innerHTML = doneAmount;
    } else {
        document.getElementById('doneAmount').innerHTML = "0";
    }

    if (allAmounts != 0) {
        document.getElementById('allAmounts').innerHTML = allAmounts;
    } else {
        document.getElementById('allAmounts').innerHTML = "0";
    }

    if (inProgressAmount != 0) {
        document.getElementById('inProgressAmount').innerHTML = inProgressAmount;
    } else {
        document.getElementById('inProgressAmount').innerHTML = "0";
    }

    if (awaitingFeedbackAmount != 0) {
        document.getElementById('awaitingFeedbackAmount').innerHTML = awaitingFeedbackAmount;
    } else {
        document.getElementById('awaitingFeedbackAmount').innerHTML = "0";
    }
}