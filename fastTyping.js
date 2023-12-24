const alreadyInputDiv = document.getElementById("already-input-div")
const inputDiv = document.getElementById("input-div")
const restartBtn = document.getElementById("restart-button")

const MAX_SHOW_TEXT_SIZE = 11

let index = 0
let text = getText()

inputDiv.textContent = text.substring(0, MAX_SHOW_TEXT_SIZE)


document.onkeypress = function (event) {
    event = event || window.event;
    if(text[index] === event.key){
        index++
        alreadyInputDiv.textContent += event.key
        if(alreadyInputDiv.textContent.length > MAX_SHOW_TEXT_SIZE){
            alreadyInputDiv.textContent = alreadyInputDiv.textContent.substring(alreadyInputDiv.textContent.length - MAX_SHOW_TEXT_SIZE, alreadyInputDiv.textContent.length)
        }

        inputDiv.textContent = text.substring(index, MAX_SHOW_TEXT_SIZE + index)
    }
}

function getText(){
    return 'rrtyuiop[]    qwqw dsfaasdfhjsah      hsk  '
}