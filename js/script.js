const sendButton = document.getElementsByClassName("showInfo")[0];
const mainDiv = document.getElementsByClassName("mainDiv")[0];
const imageInput = document.getElementsByTagName("input")[0];
const inputs = mainDiv.getElementsByTagName("input");
let imageURL = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';

validation();

for (let i = 1; i < inputs.length; i++) {
    inputs[i].style.cssText = "border-bottom : 3px solid #605da0"
    inputs[i].onchange = function () {
        validationStyle(inputs[i]);
        validation();
    };
}

function validationStyle(input) {
    if (input.value != "" && input.checkValidity()) {
        input.style.border = "none"
    } else {
        input.style.cssText = "border-bottom : 3px solid #605da0"
    }
}

function validation() {
    for (let i = 1; i < inputs.length - 2; i++) {
        if (inputs[i].value != "" && inputs[i].checkValidity()) {
            sendButton.disabled = false;
        } else {
            sendButton.disabled = true;
            break;
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
    console.log(infoObj);
    createInfoDocument(infoObj);
}

function createInfoObj(obj, doc) {
    const blocks = doc.getElementsByClassName("block");
    const blockNames = doc.getElementsByClassName("blockName");

    for (let i = 0; i < blocks.length; i++) {
        let blockName = blockNames[i].innerHTML;

        let objInputs = {
            objIndex: `${i}`
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

        obj[`${blockName}`] = objInputs;
    }

    return obj;
}

function createInfoDocument(obj) {
    mainDiv.innerHTML = '<h1>Анкета</h1>'

    for (let keys in obj) {
        let infoHtml;
        let objectByKey = obj[keys];
        let blockHeader = `<h2>${keys}</h2><div class="block"></div>`;
        mainDiv.insertAdjacentHTML("beforeend", blockHeader);

        for (let key in objectByKey) {
            let blockHead = document.getElementsByClassName("block")[objectByKey.objIndex];
            if (key == "Фотография") {
                infoHtml = `<div> ${key}: <div class="photo"><img src="${imageURL}"></div> </div>`;
                blockHead.insertAdjacentHTML("beforeend", infoHtml);
            } else if (key != "objIndex") {
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
        let name = obj["Общие данные"]["Фамилия"] ? obj["Общие данные"]["Фамилия"] : "file";
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