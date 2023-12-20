const form_new = document.getElementById('formForNewUser');
const rolesSelect_new = document.getElementById('roles');
const table = document.querySelector("table.table-striped");

async function addNewUser(event) {
    event.preventDefault();
    const urlNew = '/api/addNewUser';

    const listOfRole = Array.from(rolesSelect_new.selectedOptions).map(option => "ROLE_" + option.value);

    const method = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName: form_new.firstName.value,
            lastName: form_new.lastName.value,
            age: form_new.age.value,
            email: form_new.email.value,
            username: form_new.username.value,
            password: form_new.password.value,
            roles: listOfRole
        })
    };
    const response = await fetch(urlNew, method);
    form_new.reset();
    loadIntoTable("/api/allUsers", table);
}


form_new.addEventListener('submit', addNewUser);
loadIntoTable("/api/allUsers", table);