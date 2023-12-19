const id_del = document.getElementById('id_del');
const firstName_del = document.getElementById('firstName_delete');
const lastName_del = document.getElementById('lastName_delete');
const age_del = document.getElementById('age_delete');
const email_del = document.getElementById('email_delete');
const password_del = document.getElementById('password_delete');

async function delModalData(id) {
    $('#deleteModal').modal('show');
    clearFormFieldsDel();

    const urlDataDel = 'api/users/' + id;
    const usersPageDel = await fetch(urlDataDel);
    const userData = await usersPageDel.json();
    id_del.value = userData.id;
    firstName_del.value = userData.firstName;
    lastName_del.value = userData.lastName;
    age_del.value = userData.age;
    email_del.value = userData.email;
    password_del.value = userData.password;

    const rolesSelectDel = document.getElementById('roles_delete');
    Array.from(rolesSelectDel.options).forEach(option => {
        option.selected = userData.roles.some(role => role.authority === option.value);
    });
}

function clearFormFieldsDel() {
    id_del.value = '';
    firstName_del.value = '';
    lastName_del.value = '';
    age_del.value = '';
    email_del.value = '';
    password_del.value = '';

    const rolesSelectDel = document.getElementById('roles_delete');
    Array.from(rolesSelectDel.options).forEach(option => option.selected = false);
}
async function delUser() {
    const urlDel = 'api/deleteUser/' + id_del.value;

    const method = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    };
    const response = await fetch(urlDel, method);
    loadIntoTable("/api/allUsers", document.querySelector("table.table-striped"));

}
const deleteUserButton = document.getElementById("delBtnModal");

deleteUserButton.addEventListener("click", async () => {
    console.log("Before clicking the button:");
    await delUser();
    console.log("After clicking the button:");

});