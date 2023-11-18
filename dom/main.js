function addUser(key, value) {
    let users = JSON.parse(localStorage.getItem(key)) || [];
    users.push(value);
    localStorage.setItem(key, JSON.stringify(users));
}

function getUser(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}


function displayUsers() {
    const usersTable = document.querySelector('.list');
    const users = getUser('key');
    while (usersTable.rows.length > 1) {
        usersTable.deleteRow(1);
    }
    users.forEach((user, index) => {
        const newRow = usersTable.insertRow();
        newRow.innerHTML = `
        <tr>
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.gender === '1' ? '男' : '女'}</td>
            <td>${user.group}</td>
            <td>${user.mail}</td>
            <td>${user.phone}</td>
            <td>${user.lvl}</td>
            <td>${user.mark}</td>
            <td><button onclick="deleteUser(${index})">削除</button></td>
            </tr>
        `;
    })
}
function deleteUser(index) {
    const usersTable = document.querySelector('.list');
    const confirmed = confirm('この行を削除しますか？');
    if (confirmed) {

        let users = getUser('key');
        if (users.length > 1) {
            users.splice(index, 1);
            localStorage.setItem('key', JSON.stringify(users));
            let usersTable = document.querySelector('.list');
            usersTable.deleteRow(index + 1)
            displayUsers();
        } else {
            localStorage.clear();
            displayUsers();

        }

    }
};
const submitBtn = document.getElementById('submit');
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const form = document.getElementsByClassName('form-user')[0];
    const fullName = document.getElementById('fullname').value;
    const gender = document.querySelector('input[type="radio"]:checked').value;
    const group = document.getElementById('group').value;
    const mail = document.getElementById('mail').value;
    const phone = document.getElementById('telnumber').value;
    const jlpt = document.getElementById('japanlevel').value;
    const mark = document.getElementById('marks').value;
    const phoneRegex = /^\d{2}(?:-\d{4}-\d{4}|\d{8}|\d-\d{3,4}-\d{4})$/;
    const mailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    const data = {
        name: fullName,
        gender: gender,
        group: group,
        mail: mail,
        phone: phone,
        lvl: jlpt,
        mark: mark,
    };

    const nameFail = document.getElementById('IDFail');
    const genderFail = document.getElementById('genderFail');
    const groupFail = document.getElementById('groupFail');
    const mailFail = document.getElementById('mailFail');
    const phoneFail = document.getElementById('phoneFail');
    const markFail = document.getElementById('markFail');
    nameFail.innerHTML = "";
    genderFail.innerHTML = "";
    groupFail.innerHTML = "";
    mailFail.innerHTML = "";
    phoneFail.innerHTML = "";
    markFail.innerHTML = "";

    if (data.name === "") {
        var nameerr = document.createElement('div');
        nameerr.innerHTML = " 氏名を入力して";
        nameFail.style.color="red";
        nameFail.appendChild(nameerr);
    }
    if (data.gender === "") {
        var gendererr = document.createElement('div');
        gendererr.innerHTML = "性別を選択して";
        genderFail.style.color="red";
        genderFail.appendChild(gendererr);
    }
    if (data.group === "") {
        var grouperr = document.createElement('div');
        grouperr.innerHTML = "グループを入力して";
        groupFail.style.color="red";
        groupFail.appendChild(grouperr);
    }
    if (!mailRegex.test(data.mail) || data.mail === "") {
        var mailerr = document.createElement('div');
        mailerr.innerHTML = "「メール」を正しいに入力して。";
        mailFail.style.color="red";
        mailFail.appendChild(mailerr);
    }
    if (!phoneRegex.test(data.phone) || data.phone === "") {
        var phoneerr = document.createElement('div');
        phoneerr.innerHTML = "「電話番号」を正しいに入力して。";
        phoneFail.style.color="red";
        phoneFail.appendChild(phoneerr);
    }

    if (data.mark > 180 || data.mark < 0 || data.mark === "") {
        var markerr = document.createElement('div');
        markerr.innerHTML = "0 ~ 180 の「点数」を入力して。";
        markFail.style.color="red";
        markFail.appendChild(markerr);
    }
    var errorContainer = document.getElementById('error-container');
    if (errorContainer) {
        errorContainer.remove();
    }

    if (nameFail.innerHTML === "" &&
        genderFail.innerHTML === "" &&
        groupFail.innerHTML === "" &&
        mailFail.innerHTML === "" &&
        phoneFail.innerHTML === "" &&
        markFail.innerHTML === "") {
        addUser('key', data);
        displayUsers();
    }
});
window.onload = function () {
        displayUsers();
    }
