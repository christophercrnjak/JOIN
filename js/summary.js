let tasks = [];
let toDoAmount = 0;
let inProgressAmount = 0;
let awaitingFeedbackAmount = 0;
let doneAmount = 0;
let allAmounts = 0;
let nextUpcomingTask; //TO-DO
let allDeadlines  = [];
let sortedDeadlines = [];

async function init() {
    let resp = await fetch('assets/json/tasks.json'); 
    tasks = await resp.json(); 
    console.log(tasks);
    calcTaskAmount(tasks);
    calcSumOfAmounts();
    renderAmountsInElements();
    calcNextDeadline();
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

function calcSumOfAmounts() {
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
    if (doneAmount != 0) {
        doneAmountElement.innerHTML = doneAmount;
    } else {
        doneAmountElement.innerHTML = "0";
    }
}

function renderAllAmountInElement() {
    let allAmountElement = document.getElementById('allAmounts');
    if (allAmounts != 0) {
        allAmountElement.innerHTML = allAmounts;
    } else {
        allAmountElement.innerHTML = "0";
    }
}

function renderInProgressAmountInElement() {
    let inProgressAmountElement = document.getElementById('inProgressAmount');
    if (inProgressAmount != 0) {
        inProgressAmountElement.innerHTML = inProgressAmount;
    } else {
        inProgressAmountElement.innerHTML = "0";
    }
}

function renderAwaitingFeedbackAmountInElements() {
    let awaitingFeedbackAmountElement = document.getElementById('awaitingFeedbackAmount');
    if (awaitingFeedbackAmount != 0) {
        awaitingFeedbackAmountElement.innerHTML = awaitingFeedbackAmount;
    } else {
        awaitingFeedbackAmountElement.innerHTML = "0";
    }
}

function calcNextDeadline() {
    // for (let i = 0; i < tasks.length; i++) {
    //     const task = tasks[i];
    //     allDeadlines.push(task.dueDate);
    //     sortedDeadlines.sort();
    // }

    // tasks.sort((a,b) => a.getTime() - b.getTime());


}

// Function to find the next upcoming due date
function getNextDueDate(tasks) {
    // Filter out tasks with due dates greater than today
    const upcomingTasks = tasks.filter(task => new Date(task.dueDate) > new Date());
  
    // Sort the upcoming tasks by due date in ascending order
    upcomingTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  
    // Return the due date of the first task (next upcoming due date)
    return upcomingTasks.length > 0 ? upcomingTasks[0].dueDate : null;
  }
  
  // Get the next upcoming due date
  const nextDueDate = getNextDueDate(tasks);
  
  // Display the result
  console.log("Next Upcoming Due Date:", nextDueDate);