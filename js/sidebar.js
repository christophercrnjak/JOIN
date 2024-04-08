
function footerToggle() {
  let footerNotice = document.getElementById('footer_notice');
  footerNotice.classList.toggle('show');
}

document.addEventListener('click', function(event) {
  let footerNotice = document.getElementById('footer_notice');
  if (!event.target.closest('.footer_notice') && !footerNotice.contains(event.target)) {
    footerNotice.classList.remove('show');
  }
});


/**
 * Sets the innitials of logged account in the head navbar in the top right corner.
 * currentUser is an Array in storage.js.
 */
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
  let container = document.getElementById('toastMessageLogOut_addTask');
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
  let container = document.getElementById('toastMessageLogOut_addTask'); 
  container.classList.add('d-none');
}  