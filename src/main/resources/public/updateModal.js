const form_upd = document.getElementById('updModal');
const id_upd = document.getElementById('id');
const firstName_upd = document.getElementById('firstName');
const lastName_upd = document.getElementById('lastName');
const age_upd = document.getElementById('age');
const email_upd = document.getElementById('email');
const username_upd = document.getElementById('username');
const password_upd = document.getElementById('password');

async function updModalData(id) {
    $('#updateModal').modal('show');
    clearFormFields();
    const urlDataUpd = 'api/users/' + id;
    const usersPageUpd = await fetch(urlDataUpd);
    const userData = await usersPageUpd.json();
    id_upd.value = userData.id;
    firstName_upd.value = userData.firstName;
    lastName_upd.value = userData.lastName;
    age_upd.value = userData.age;
    email_upd.value = userData.email;
    username_upd.value=userData.username;
    password_upd.value = userData.password;
}

function clearFormFields() {
    id_upd.value = '';
    firstName_upd.value = '';
    lastName_upd.value = '';
    age_upd.value = '';
    email_upd.value = '';
    username_upd.value = '';
    password_upd.value = '';

}

async function updUser() {
    const urlUpd = 'api/users/' + id_upd.value;
    const listOfRole = Array.from(form_upd.roles.options)
        .filter(option => option.selected)
        .map(option => "ROLE_" + option.value);


    const method = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName: form_upd.firstName.value,
            lastName: form_upd.lastName.value,
            age: form_upd.age.value,
            email: form_upd.email.value,
            password: form_upd.password.value,
            username: form_upd.username.value,
            roles: listOfRole
        })
    };

    const response = await fetch(urlUpd, method);
    const responseData = await response.json();
    loadIntoTable("/api/allUsers", document.querySelector("table.table-striped"));
}

const updateUserButton = document.getElementById("updBtnModal");
updateUserButton.addEventListener("click", async () => {
    console.log("Before clicking the button:");
    await updUser();
    console.log("After clicking the button:");
});