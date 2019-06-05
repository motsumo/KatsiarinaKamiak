let sendButton = document.getElementsByClassName("showInfo")[0];

sendButton.onclick = function () {
    let mainDiv = document.getElementsByClassName("mainDiv")[0];
    let inputs = document.getElementsByTagName("input");

    let labels = document.getElementsByTagName("label");
    let documentInfo = `<div class="info">    
    <h2>Общие данные: </h2>
    <div>
        ${labels[0].innerHTML}: ${inputs[0].value}
    </div>
    <div>
    ${labels[1].innerHTML}: ${inputs[1].value}
    </div>
    <div>
    ${labels[2].innerHTML}: ${inputs[2].value}
    </div>
    <div>
    ${labels[2].innerHTML}: ${inputs[2].value}
    </div>
    </div>
    <div class="education">
    <h2>Образование: </h2>
    <div>
    ${labels[3].innerHTML}: ${inputs[3].value}
    </div>

    <div>
    ${labels[4].innerHTML}: ${inputs[4].value}
    </div>

    <div>
    ${labels[5].innerHTML}: ${inputs[5].value}
    </div>

    <div>
    ${labels[6].innerHTML}: ${inputs[6].value}
    </div>

    </div>
    <div class="contactInfo">
    <h2>Контактная информация: </h2>
    <div>
    ${labels[7].innerHTML}: ${inputs[7].value}
    </div>

    <div>
    ${labels[8].innerHTML}: ${inputs[8].value}
    </div>

    <div>
    ${labels[9].innerHTML}: ${inputs[9].value}
    </div>

    <div>
    ${labels[10].innerHTML}: ${inputs[10].value}
    </div>
    <div>
    ${labels[11].innerHTML}: ${inputs[11].value}
    </div>
    </div>`;

    mainDiv.innerHTML = documentInfo;
}