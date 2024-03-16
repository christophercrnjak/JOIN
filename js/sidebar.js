
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
  
  