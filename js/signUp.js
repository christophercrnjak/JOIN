let users = [];

async function register() {
    let register_btn = document.getElementById('register_btn');
    register_btn.disabled = true;
    users.push({
        email: email.value,
        password: password.value
    })

    resetForm();
}

function resetForm() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let confirm_password = document.getElementById('confirm_password');
    let checkbox = document.getElementById('checkbox');
    let register_btn = document.getElementById('register_btn');
    name.value = '';
    email.value = '';
    password.value = '';
    confirm_password.value = '';
    checkbox.checked = false;
    register_btn.disabled = false;
}