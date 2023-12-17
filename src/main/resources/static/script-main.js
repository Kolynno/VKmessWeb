function setName() {
    const label = document.getElementById("labelNameOfGroup");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/getName", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            console.log(response);
            label.textContent = response.name;
            console.log(response.name);
        }
    };

    xhr.send();
}

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


function ButtonSaveTemplateClick() {
    const templateName = prompt("Введите имя для шаблона:");
    if (templateName !== null && templateName.trim() !== "" && templateName.length <= 15) {
        const textToSave = document.getElementById("textAreaPost").value;
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem(`template_${templateName}`, textToSave);
            alert(`Шаблон "${templateName}" сохранен в локальной памяти.`);
            updateListViewTemplates();
        } else {
            alert("Ваш браузер не поддерживает локальное хранилище, шаблон не может быть сохранен.");
        }
    } else {
        alert("Пустое или слишком длинное имя")
    }
}

let lastSelectedTemplateKey = null;

function updateListViewTemplates() {
    const listView = document.getElementById("listViewTemplates");
    listView.innerHTML = "";
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("template_")) {
            const templateName = key.replace("template_", "");
            const templateButton = document.createElement("button");
            templateButton.setAttribute("class", "templateButton");
            templateButton.innerText = templateName;
            templateButton.onclick = function() {
                lastSelectedTemplateKey = key;
                document.getElementById("textAreaTemplatePreview").value = localStorage.getItem(key);

                const templateButtons = document.querySelectorAll(".templateButton");
                templateButtons.forEach(function(button) {
                    button.style.backgroundColor = "#D9D9D9";
                });
                templateButton.style.backgroundColor = "#828282";
            };
            templateButton.ondblclick = function () {
                document.getElementById("textAreaPost").value = localStorage.getItem(key);
                document.getElementById("textAreaTemplatePreview").value = "Превью шаблона";
                analyzeAndPopulateVars();
            }
            listView.appendChild(templateButton);
        }
    }
}

function ButtonDeleteTemplateClick() {
    if (lastSelectedTemplateKey !== null) {
        localStorage.removeItem(lastSelectedTemplateKey);
        lastSelectedTemplateKey = null;
        alert("Шаблон удален.");
        document.getElementById("textAreaTemplatePreview").value = "";
        updateListViewTemplates();

    } else {
        alert("Нет выбранного шаблона для удаления.");
    }
}

function checkAndRedirect() {

    const rememberMe = localStorage.getItem("rememberData");
    if (rememberMe === "false") {
        setTimeout(function () {
            localStorage.removeItem("fieldGroupLink");
            localStorage.removeItem("fieldGroupToken");
        }, 5000)
    }

    const groupLink = localStorage.getItem("fieldGroupLink");
    const groupToken = localStorage.getItem("fieldGroupToken");
    if (!groupLink || !groupToken) {
        window.location.href = "/start";
    }
}

function ButtonBackClick() {
    window.location.href = "/start";
}


window.onload = function () {
    updateListViewTemplates();
    checkAndRedirect();
    setName()
};
