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

