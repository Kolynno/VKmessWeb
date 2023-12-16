function ButtonSendPostClick() {
    const text = document.getElementById("textAreaPost").value;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/sendPost", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    const varsTable = document.getElementById("tableViewVars");
    const rows = varsTable.getElementsByTagName("tr");
    let data = "text=" + encodeURIComponent(text);

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        const variableName = cells[0].innerHTML;
        const variableValue = document.getElementById("var_" + variableName).value;
        data += "&" + encodeURIComponent(variableName) + "=" + encodeURIComponent(variableValue);
    }

    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.success === 'true') {
                alert("Успешно");
                document.getElementById("textAreaPost").value = "";
                analyzeAndPopulateVars();
            } else {
                alert("Не отправлено");
            }
        }
    };

    xhr.onerror = function() {
        alert("Ошибка при отправке запроса");
    };
    xhr.send(data);
}
//Обновлять переменные при каждом вводе в поле для текста
document.getElementById("textAreaPost").addEventListener("input", analyzeAndPopulateVars);

function analyzeAndPopulateVars() {
    const text = document.getElementById("textAreaPost").value;
    const varsTable = document.getElementById("tableViewVars");
    varsTable.innerHTML = '<thead><tr><th>Переменная</th><th>Значение</th></tr></thead>';
    const regex = /__([а-яА-Яa-zA-Z0-9]+)__/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
        const variableName = match[1];
        const newRow = varsTable.insertRow(-1);
        const cellName = newRow.insertCell(0);
        cellName.innerHTML = variableName;
        const cellValue = newRow.insertCell(1);
        cellValue.innerHTML = '<input type="text" id="var_' + variableName + '" value="" />';
    }
}

function ButtonClearTextClick() {
    document.getElementById("textAreaPost").value = "";
    analyzeAndPopulateVars();
}

function ButtonClearVarsClick() {
    const varsTable = document.getElementById("tableViewVars");
    varsTable.innerHTML = '<thead><tr><th>Переменная</th><th>Значение</th></tr></thead>';
    analyzeAndPopulateVars();
}

function ButtonDeleteTemplateClick() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/deleteTemplate", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
}
function ButtonSaveTemplateClick() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/saveTemplate", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
}