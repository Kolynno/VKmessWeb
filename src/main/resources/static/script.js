function buttonGetTokenClick() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/processTokenLink", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var url = xhr.responseText;
            openInNewTab(url);
        }
    };
    xhr.send();
}

function buttonGetHelp() {
    openInNewTab("/help");
}



function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function ButtonSendPostClick() {
    var text = document.getElementById("textAreaPost").value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/sendPost", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Получение значений переменных и их имен
    var varsTable = document.getElementById("tableViewVars");
    var rows = varsTable.getElementsByTagName("tr");
    var data = "text=" + encodeURIComponent(text);

    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var variableName = cells[0].innerHTML;
        var variableValue = document.getElementById("var_" + variableName).value;

        // Добавление данных о переменных в строку запроса
        data += "&" + encodeURIComponent(variableName) + "=" + encodeURIComponent(variableValue);
    }

    // Определение обработчика успешного ответа
    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success === 'true') {
                alert("Успешно");
                document.getElementById("textAreaPost").value = "";
                analyzeAndPopulateVars();
            } else {
                alert("Не отправлено");
            }
        }
    };

    // Определение обработчика ошибки
    xhr.onerror = function() {
        alert("Ошибка при отправке запроса");
    };

    // Отправка запроса
    xhr.send(data);
}



document.getElementById("textAreaPost").addEventListener("input", analyzeAndPopulateVars);

function analyzeAndPopulateVars() {
    var text = document.getElementById("textAreaPost").value;
    var varsTable = document.getElementById("tableViewVars");

    varsTable.innerHTML = '<thead><tr><th>Переменная</th><th>Значение</th></tr></thead>';

    var regex = /__([а-яА-Яa-zA-Z0-9]+)__/g;
    var match;

    while ((match = regex.exec(text)) !== null) {
        var variableName = match[1];

        // Создание новой строки в таблице
        var newRow = varsTable.insertRow(-1);

        // Добавление ячейки с именем переменной
        var cellName = newRow.insertCell(0);
        cellName.innerHTML = variableName;

        // Добавление ячейки со значением переменной
        var cellValue = newRow.insertCell(1);
        cellValue.innerHTML = '<input type="text" id="var_' + variableName + '" value="" />';
    }
}

function ButtonClearTextClick() {
    document.getElementById("textAreaPost").value = "";
    analyzeAndPopulateVars();
}
function ButtonClearVarsClick() {
    var varsTable = document.getElementById("tableViewVars");
    varsTable.innerHTML = '<thead><tr><th>Переменная</th><th>Значение</th></tr></thead>';
    analyzeAndPopulateVars();
}
function ButtonDeleteTemplateClick() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/deleteTemplate", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
}
function ButtonSaveTemplateClick() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/saveTemplate", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
}