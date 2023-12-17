function buttonGetTokenClick() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/processTokenLink", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const url = xhr.responseText;
            openInNewTab(url);
        }
    };
}

function buttonGetHelp() {
    openInNewTab("/help");
}

function openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const checkboxRemember = document.getElementById('checkboxRemember');
    const fieldGroupLink = document.getElementById('fieldGroupLink');
    const fieldGroupToken = document.getElementById('fieldGroupToken');

    if (localStorage.getItem('rememberData') === 'true') {
        checkboxRemember.checked = true;
        fieldGroupLink.value = localStorage.getItem('fieldGroupLink');
        fieldGroupToken.value = localStorage.getItem('fieldGroupToken');
    }
    form.addEventListener('submit', function () {
        if (fieldGroupLink.value.trim() === "" || fieldGroupToken.value.trim() === "") {
            alert("Недопустимое значение в поле ввода");
        }
        if (checkboxRemember.checked) {
            localStorage.setItem('rememberData', 'true');
            localStorage.setItem('fieldGroupLink', fieldGroupLink.value);
            localStorage.setItem('fieldGroupToken', fieldGroupToken.value);
        } else {
            localStorage.setItem('rememberData', 'false');
            localStorage.setItem('fieldGroupLink', fieldGroupLink.value);
            localStorage.setItem('fieldGroupToken', fieldGroupToken.value);
        }
    });
});

window.onfocus = function() {
    const rememberMe = localStorage.getItem("rememberData");
    if (rememberMe === "false") {
        localStorage.removeItem("fieldGroupLink");
        localStorage.removeItem("fieldGroupToken");
    }
}

