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
    xhr.send("text=" + encodeURIComponent(text));
}
function ButtonClearTextClick() {
    document.getElementById("textAreaPost").value = "";
}
function ButtonClearVarsClick() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/clearVars", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
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