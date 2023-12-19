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
            password: form_new.password.value,
            roles: listOfRole
        })
    };
    const response = await fetch(urlNew, method);
    form_new.reset();
    loadIntoTable("/api/allUsers", table);
}

async function loadIntoTable(url, table) {
    const response = await fetch(url);
    const users = await response.json();
    const tableBody = table.querySelector("tbody");
    tableBody.innerHTML = "";
    renderingTable(users, table);
}

function renderingTable(users, table) {
    const tableBody = table.querySelector("tbody");
    users.forEach(user => {
        const userRow = document.createElement("tr");
        userRow.setAttribute("data-id", user.id);

        ['id', 'firstName', 'lastName', 'age', 'email'].forEach(prop => {
            const cellElement = document.createElement("td");
            cellElement.textContent = user[prop];
            userRow.appendChild(cellElement);
        });

        const rolesCell = document.createElement("td");
        rolesCell.textContent = user.roles.map(role => role.authority.substring(5)).join(', ');
        userRow.appendChild(rolesCell);

        tableBody.appendChild(userRow);
    });
}

form_new.addEventListener('submit', addNewUser);
loadIntoTable("/api/allUsers", table);