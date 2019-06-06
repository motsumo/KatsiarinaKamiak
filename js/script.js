const sendButton = document.getElementsByClassName("showInfo")[0];
const mainDiv = document.getElementsByClassName("mainDiv")[0];
const imageInput = document.getElementsByTagName("input")[0];
const inputs = mainDiv.getElementsByTagName("input");
let imageURL = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';

validation();

for (const input of inputs) {
    input.onchange = function () {
        validation();
    };
}

function validation() {
    const inputs = mainDiv.getElementsByTagName("input");
    for (const input of inputs) {
        if (input.value != "" && input.checkValidity()) {
            sendButton.disabled = false;
            input.style.border = "none"
        } else {
            sendButton.disabled = true;
            input.style.border = "3px solid #605da0"
        }
    }
}

imageInput.addEventListener('change', photoDisplay);

function photoDisplay() {
    let curFiles = imageInput.files[0];

    imageURL = window.URL.createObjectURL(curFiles);
    return imageURL;
}

sendButton.onclick = function () {
    let infoObj = {};
    createInfoObj(infoObj, mainDiv);

    createInfoDocument(infoObj);
}

function createInfoObj(obj, doc) {
    const blocks = doc.getElementsByClassName("block");
    const blockNames = doc.getElementsByClassName("blockName");

    for (let i = 0; i < blocks.length; i++) {
        let blockName = blockNames[i].innerHTML;

        let objInputs = {
            name: `${blockName}`
        }

        if (blockName == 'Другое') {
            const textArea = blocks[i].getElementsByTagName('textarea')[0];
            objInputs[`${blockName}`] = textArea.value;
        } else {
            const inputs = blocks[i].getElementsByTagName("input");
            for (let i = 0; i < inputs.length; i++) {
                let key = inputs[i].placeholder;
                objInputs[key] = `${inputs[i].value}`;
            }
        }

        obj[i] = objInputs;
    }

    return obj;
}

function createInfoDocument(obj) {
    mainDiv.innerHTML = '<h1>Анкета</h1>'

    for (let keys in obj) {
        let infoHtml;
        let objectByKey = obj[keys];
        let blockHeader = `<h2>${objectByKey.name}</h2><div class="block"></div>`;
        mainDiv.insertAdjacentHTML("beforeend", blockHeader);

        for (let key in objectByKey) {
            let blockHead = document.getElementsByClassName("block")[keys];
            if (key == "Фотография") {
                infoHtml = `<div> ${key}: <div class="photo"><img src="${imageURL}"></div> </div>`;
                blockHead.insertAdjacentHTML("beforeend", infoHtml);
            } else if (key != "name") {
                infoHtml = `<div>${key}: ${objectByKey[key]}</div>`;
                blockHead.insertAdjacentHTML("beforeend", infoHtml);
            }
        }
    }

    let buttonsDownloadAndPrint = ` <button class="download">Download</button>
                                    <button class="print">Print</button>`;
    mainDiv.insertAdjacentHTML("beforeend", buttonsDownloadAndPrint);

    const buttonDownload = document.getElementsByClassName("download")[0];
    buttonDownload.onclick = function () {
        let data = JSON.stringify(obj);
        let name = obj[0]["Фамилия"] ? obj[0]["Фамилия"] : "file";
        let fileName = name.toString() + ".json";
        download(fileName, data)
    }

    const printDownload = document.getElementsByClassName("print")[0];
    printDownload.onclick = function () {
        window.print()
    }
}


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}