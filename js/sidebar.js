
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