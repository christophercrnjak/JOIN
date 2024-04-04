let contacts_summary = [];
let toDoAmount = 0;
let inProgressAmount = 0;
let awaitingFeedbackAmount = 0;
let doneAmount = 0;
let allAmounts = 0;
let urgentAmount = 0;
let nextDueDate;
let tasks_summery = '';


async function init() {
  await loadServerData();
  copyTasksArray();
  copyContactsArray();
  calcValuesOfSummery();
  getNextDueDate();
  render();
  setUserInitialsAtHeader()
}

async function loadServerData() {
  await getCurrentUserOnServer();
  await getContactsFromServer();
  await getTasksFromServer();
}

function calcValuesOfSummery() {
  calcTaskAmount();
  calcSumOfAmounts();
  calcUrgentAmount();
}

function setUserInitialsAtHeader() {
  let accountLogo = document.getElementById('navbarHeadIcon');
  if (currentUser.length === 0 || typeof currentUser == "undefined" || currentUser[0] == '') {
    accountLogo.innerHTML = 'G';
  } else {
    let firstName = currentUser[0].name.firstName;
    firstName = firstName.charAt(0);
    let secondName = currentUser[0].name.secondName;
    secondName = secondName.charAt(0);
    accountLogo.innerHTML = `${firstName} ${secondName}`;
  }
}

async function copyTasksArray() {
  tasks_summery = JSON.parse(JSON.stringify(tasks));
  await changeDateFormatOfTasks();
}

async function changeDateFormatOfTasks() {
  tasks_summery = tasks.map((task) => {
    let [DD, MM, YY] = task.dueDate.split("/");
    return { ...task, dueDate: new Date(`20${YY}-${MM}-${DD}`) };
  });
}

function copyContactsArray() {
  contacts_summary = JSON.parse(JSON.stringify(contacts_global));
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
  let tasksNotDone = tasks.filter((task) => task.status != "done").sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  // Überprüfen, ob das Array tasksNotDone leer ist
  if (tasksNotDone.length > 0) {
    let parsedValue = new Date(tasksNotDone[0].dueDate); // Konvertiert das Datum in das richtige Format
    nextDueDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(parsedValue);
    return nextDueDate;
  } else {
    return "Keine ausstehenden Aufgaben gefunden.";
  }
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

function renderUserName() {
  let userNameElement = document.getElementById("user_name");
  if (currentUser.length === 0 || typeof currentUser == "undefined" || currentUser[0] == '') {
    userNameElement.innerHTML = `Guest`;
  } else {
  userNameElement.innerHTML = `${currentUser[0].name.firstName} ${currentUser[0].name.secondName}`;}
}

function hover(element, newSrc) {
  let img = element.querySelector("img");
  img.setAttribute("src", newSrc);
}

function unhover(element, originalSrc) {
  let img = element.querySelector("img");
  img.setAttribute("src", originalSrc);
}

async function logOut() {
  currentUser = [];
  saveCurrentUserOnServer();
  toastMessageLogOut();
  await timeout (750);
  await closeToast();
  window.location.href = "index.html";
}

/**
 * Makes the element saying "Task added to board" appear and disappear after 1 s and 20 ms.
 */
function toastMessageLogOut() {
  let container = document.getElementById('toastMessageLogOut');
  container.classList.remove('d-none');
}

/**
 * Starts a timeout.
 * 
 * @param {Number} ms - Time of timeout
 * @returns {TimeRanges}
 */
function timeout(ms) {
  return new Promise(res => setTimeout(res,ms));
}

/**
 * Hides the toast message box
 */
function closeToast() {
  let container = document.getElementById('toastMessageLogOut'); 
  container.classList.add('d-none');
}