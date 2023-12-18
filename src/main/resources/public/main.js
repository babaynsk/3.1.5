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

            const updateCell = document.createElement("td");
            const updateButton = document.createElement("button");
            updateButton.setAttribute("class","btn btn-primary");
            updateButton.setAttribute("data-bs-toogle","modal");
            updateButton.setAttribute("data-bs-target","#updateModal");
            updateButton.setAttribute("onclick", "updModalData(" + user.id + ")");
            updateButton.textContent ="Update";

            const delCell = document.createElement("td");
            const delButton = document.createElement("button");
            delButton.setAttribute("class","btn btn-danger");
            delButton.setAttribute("data-bs-toogle","modal");
            delButton.setAttribute("data-bs-target","#deleteModal");
            delButton.setAttribute("onclick", "delModalData(" + user.id + ")");
            delButton.textContent ="Delete";

            updateCell.appendChild(updateButton);
            userRow.appendChild(updateCell);
            delCell.appendChild(delButton);
            userRow.appendChild(delCell);
            tableBody.appendChild(userRow);
        });

}


loadIntoTable("/api/allUsers", document.querySelector("table.table-striped"));