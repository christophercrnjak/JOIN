let tasks = [];
let toDoAmount = 0;
let inProgressAmount = 0;
let awaitingFeedbackAmount = 0;
let doneAmount = 0;
let allAmounts = 0;
let urgentAmount = 0;
let nextDueDate;

async function init() {
  let resp = await fetch("assets/json/tasks.json");
  tasks = await resp.json();
  calcTaskAmount(tasks);
  calcSumOfAmounts();
  calcUrgentAmount();
  getNextDueDate();
  render();
}

function render() {
  renderToDoAmount();
  renderDoneAmount();
  renderNextDueDate();
  renderUrgentAmount();
  renderAllAmount();
  renderInProgressAmount();
  renderAwaitingFeedbackAmount();
}

function calcTaskAmount(tasks) {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    switch (task.status) {
      case "toDo":
        toDoAmount++;
        break;
      case "inProgress":
        inProgressAmount++;
        break;
      case "awaitFeedback":
        awaitingFeedbackAmount++;
        break;
      case "done":
        doneAmount++;
        break;
    }
  }
}

function calcSumOfAmounts() {
  allAmounts =
    toDoAmount + inProgressAmount + awaitingFeedbackAmount + doneAmount;
}

function renderToDoAmount() {
  let toDoAmountElement = document.getElementById("toDoAmount");
  if (toDoAmount != 0) {
    toDoAmountElement.innerHTML = toDoAmount;
  } else {
    toDoAmountElement.innerHTML = "0";
  }
}

function renderDoneAmount() {
  let doneAmountElement = document.getElementById("doneAmount");
  if (doneAmount != 0) {
    doneAmountElement.innerHTML = doneAmount;
  } else {
    doneAmountElement.innerHTML = "0";
  }
}

function renderAllAmount() {
  let allAmountElement = document.getElementById("allAmounts");
  if (allAmounts != 0) {
    allAmountElement.innerHTML = allAmounts;
  } else {
    allAmountElement.innerHTML = "0";
  }
}

function renderInProgressAmount() {
  let inProgressAmountElement = document.getElementById("inProgressAmount");
  if (inProgressAmount != 0) {
    inProgressAmountElement.innerHTML = inProgressAmount;
  } else {
    inProgressAmountElement.innerHTML = "0";
  }
}

function renderAwaitingFeedbackAmount() {
  let awaitingFeedbackAmountElement = document.getElementById(
    "awaitingFeedbackAmount"
  );
  if (awaitingFeedbackAmount != 0) {
    awaitingFeedbackAmountElement.innerHTML = awaitingFeedbackAmount;
  } else {
    awaitingFeedbackAmountElement.innerHTML = "0";
  }
}

function getNextDueDate() {
  // excludes the tasks which are done
  let tasksNotDone = tasks.filter((taskElement) => {
    return taskElement.status != "done";
  });

  // create a new array called dueDates which only gives the dueDate-value of those tasks
  let dueDates = tasksNotDone.map((dueDates) => {
    return dueDates.dueDate;
  });

  // changes the format of this string (DD/MM/YY to YY/MM/DD)
  let newArray = dueDates.map((dateString) => {
    let [DD, MM, YY] = dateString.split("/");
    let newDateString = /*html*/ `${YY}/${MM}/${DD}`;

    return newDateString;
  });

  // puts it into an date format and sort it from small to big
  let formatedDueDates = newArray.sort((a, b) => {
    let dateA = new Date(
      "20" + a.replace(/(\d{2})\/(\d{2})\/(\d{2})/, "$1-$2-$3")
    );
    let dateB = new Date(
      "20" + b.replace(/(\d{2})\/(\d{2})\/(\d{2})/, "$1-$2-$3")
    );

    return dateA - dateB;
  });

  // outputs the first value of this array
  let firstValue = formatedDueDates[0];

  // format the last value as 'July 11, 2024'
  let lastValue = new Date(
    "20" + firstValue.replace(/(\d{2})\/(\d{2})\/(\d{2})/, "$1-$2-$3")
  );
  nextDueDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(lastValue);
}

function renderNextDueDate() {
  let nextDueDateElement = document.getElementById("nextDueDate");
  nextDueDateElement.innerHTML = nextDueDate;
}

function calcUrgentAmount() {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.priority == "Urgent") {
      urgentAmount++;
    }
  }
}

function renderUrgentAmount() {
  let urgentAmountElement = document.getElementById("urgent_amount");
  if (urgentAmount != 0) {
    urgentAmountElement.innerHTML = urgentAmount;
  } else {
    urgentAmountElement.innerHTML = "0";
  }
}
