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
        const confirmed = confirm('この行を削除しますか？');
        if (confirmed) {
            let users = getUser('key');
            users.splice(index, 1);
            localStorage.setItem('key', JSON.stringify(users));
            let usersTable = document.querySelector('.list');
            usersTable.deleteRow(index+1) 
            displayUsers();  
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

    var diverr = document.createElement('div');
    diverr.style.color = 'red';

    if (data.name === "") {
        var nameerr = document.createElement('p');
        nameerr.innerHTML = " 氏名を入力して";
        diverr.appendChild(nameerr);
    }
    if (data.gender === "") {
        var gendererr = document.createElement('p');
        gendererr.innerHTML = "性別を選択して";
        diverr.appendChild(gendererr);
    }
    if (data.group === "") {
        var grouperr = document.createElement('p');
        grouperr.innerHTML = "グループを入力して";
        diverr.appendChild(grouperr);
    }
    if (!mailRegex.test(data.mail) || data.mail === "") {
        var mailerr = document.createElement('p');
        mailerr.innerHTML = "「メール」を正しいに入力して。";
        diverr.appendChild(mailerr);
    }
    if (!phoneRegex.test(data.phone) || data.phone === "") {
        var phoneerr = document.createElement('p');
        phoneerr.innerHTML = "「電話番号」を正しいに入力して。";
        diverr.appendChild(phoneerr);
    }

    if (data.mark > 180 || data.mark < 0 || data.mark === "") {
        var markerr = document.createElement('p');
        markerr.innerHTML = "0 ~ 180 の「点数」を入力して。";
        diverr.appendChild(markerr);
    }
    var errorContainer = document.getElementById('error-container');
    if (errorContainer) {
        errorContainer.remove();
    }

    if (diverr.children.length > 0) {
       
        diverr.id = 'error-container';
        form.appendChild(diverr);
    } else {
        addUser('key', data);
        displayUsers();  
    }
    // window.location.reload();
});
window.onload = function () {
    displayUsers();
}

