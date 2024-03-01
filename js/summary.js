let tasks = [];
let contacts = [];
let toDoAmount = 0;
let inProgressAmount = 0;
let awaitingFeedbackAmount = 0;
let doneAmount = 0;
let allAmounts = 0;
let urgentAmount = 0;
let nextDueDate;
let userName;

async function init() {
  await fetchTasks();
  await fetchContacts();
  calcTaskAmount();
  calcSumOfAmounts();
  calcUrgentAmount();
  getUserName();
  getNextDueDate();
  render();
}

async function fetchTasks() {
  let resp = await fetch("assets/json/tasks.json");
  tasks = await resp.json();
  tasks = tasks.map((task) => {
    let [DD, MM, YY] = task.dueDate.split("/");
    return { ...task, dueDate: new Date(`20${YY}-${MM}-${DD}`) };
  });
}

async function fetchContacts() {
  let resp = await fetch("assets/json/contacts.json");
  contacts = await resp.json();
}

function render() {
  renderToDoAmount();
  renderDoneAmount();
  renderNextDueDate();
  renderUrgentAmount();
  renderAllAmount();
  renderInProgressAmount();
  renderAwaitingFeedbackAmount();
  renderUserName();
}

function calcTaskAmount() {
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
  let toDoAmountElement = document.getElementById("to_do_amount");
  toDoAmountElement.innerHTML = toDoAmount;
}

function renderDoneAmount() {
  let doneAmountElement = document.getElementById("done_amount");
  doneAmountElement.innerHTML = doneAmount;
}

function renderAllAmount() {
  let allAmountElement = document.getElementById("all_amounts");
  allAmountElement.innerHTML = allAmounts;
}

function renderInProgressAmount() {
  let inProgressAmountElement = document.getElementById("in_progress_amount");
  inProgressAmountElement.innerHTML = inProgressAmount;
}

function renderAwaitingFeedbackAmount() {
  let awaitingFeedbackAmountElement = document.getElementById(
    "awaiting_feedback_amount"
  );
  awaitingFeedbackAmountElement.innerHTML = awaitingFeedbackAmount;
}

function getNextDueDate() {
  let tasksNotDone = tasks
    .filter((task) => task.status != "done")
    .sort((a, b) => a.dueDate - b.dueDate);

  // outputs the first value of this array
  let parsedValue = tasksNotDone[0].dueDate;
  nextDueDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsedValue);
}

function renderNextDueDate() {
  let nextDueDateElement = document.getElementById("next_due_date");
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
  urgentAmountElement.innerHTML = urgentAmount;
}

function getUserName() {
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    if (contact.lockedIn) {
      let mergedUserName =
        contact.name.firstName + " " + contact.name.secondName;
      userName = mergedUserName;
    }
  }
}

function renderUserName() {
  let userNameElement = document.getElementById("user_name");
  let comma = document.getElementById("comma");
  userNameElement.innerHTML = userName;
  comma.innerHTML = ",";
}

function hover(element) {
  let img = element.querySelector("img");
  img.setAttribute("src", "./assets/img/pencil_white.svg");
}

function unhover(element) {
  let img = element.querySelector("img");
  img.setAttribute("src", "./assets/img/pencil.svg");
}
