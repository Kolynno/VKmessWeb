function buttonGetTokenClick() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/processTokenLink", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const url = xhr.responseText;
            openInNewTab(url);
        }
    };
    xhr.send();
}

function buttonGetHelp() {
    openInNewTab("/help");
}

function openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
}

document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы формы и чекбокса
    var form = document.querySelector('form');
    var checkboxRemember = document.getElementById('checkboxRemember');
    var fieldGroupLink = document.getElementById('fieldGroupLink');
    var fieldGroupToken = document.getElementById('fieldGroupToken');

    // Загружаем сохраненные значения при запуске страницы
    if (localStorage.getItem('rememberData') === 'true') {
        checkboxRemember.checked = true;
        fieldGroupLink.value = localStorage.getItem('fieldGroupLink');
        fieldGroupToken.value = localStorage.getItem('fieldGroupToken');
    }

    // Обработчик события отправки формы
    form.addEventListener('submit', function (event) {
        // При отправке формы сохраняем данные, если чекбокс отмечен
        if (checkboxRemember.checked) {
            localStorage.setItem('rememberData', 'true');
            localStorage.setItem('fieldGroupLink', fieldGroupLink.value);
            localStorage.setItem('fieldGroupToken', fieldGroupToken.value);
        } else {
            // Если чекбокс не отмечен, очищаем сохраненные данные
            localStorage.removeItem('rememberData');
            localStorage.removeItem('fieldGroupLink');
            localStorage.removeItem('fieldGroupToken');
        }
    });
});

