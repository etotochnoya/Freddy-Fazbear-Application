const gameButton = document.getElementById("game")
let field
let table
let startButton

function fieldRender(){
    field = []
    for(let i = 0; i < 8; i++){
        const array = []
        for(let j = 0; j < 8; j++){
            array.push({
                canGo: true,
                onPath: false,
                steps: 0
            })
        }
        field.push(array)
    }
}

gameButton.onclick = function(){
    fieldRender()
    gameRender() 
}

function gameRender(){
    site.innerHTML = ''
    site.insertAdjacentHTML('beforeend', '<table class="table-secondary" id="table"></table>')
    site.insertAdjacentHTML('beforeend', '<button class="btn btn-primary" id="start-game">Start</button>')
    table = document.getElementById("table")
    startButton = document.getElementById("start-game")
    
    for(let i = 0; i < 8; i++){
        let line = `<tr class="table-secondary" id="line${i}"></tr>`
        table.insertAdjacentHTML('beforeend', line)
        const linei = document.getElementById('line' + i)
        for(let j = 0; j < 8; j++){
            linei.insertAdjacentHTML('beforeend', getCellTemplate(i, j))
        }           
    }

    table.onclick = function(event){
        const i = Number(event.target.dataset.id[0])
        const j = Number(event.target.dataset.id[1])
        field[i][j].canGo = !field[i][j].canGo
        gameRender()
    }

    startButton.onclick = function(event){ 
        bfs()
        gameRender()
        fillResultField()
        gameRender()
    }
}

function getCellTemplate(i, j){
    return`
    <td>
        <button class="btn btn-lg btn-${getColor(i, j)}" data-id="${String(i) + String(j)}">${field[Number(i)][Number(j)].steps}</button>
    </td>
     `

    // return`
    // <td>
    //     <button class="btn btn-lg btn-${field[Number(i)][Number(j)].canGo ? 'success' : 'warning'}" data-id="${String(i) + String(j)}">${field[Number(i)][Number(j)].steps}</button>
    // </td>

    // `
}
function getColor(i, j){
    if(field[Number(i)][Number(j)].onPath)
        return 'danger'
    return field[Number(i)][Number(j)].canGo ? 'success' : 'warning'
}

function bfs(){
    let queue = []
    queue.push([0,0])
    field[0][0].steps = 1
    let counter = 0
    while(queue.length > 0){
        let v = queue.shift()
        let i = Number(v[0]), j = Number(v[1])
        if(correct(i + 1, j)){
            queue.push([i + 1, j])
            field[i + 1][j].steps = field[i][j].steps + 1
        }
        if(correct(i, j + 1)){
            queue.push([i, j + 1])
            field[i][j + 1].steps = field[i][j].steps + 1
        }
        if(correct(i - 1, j)){
            queue.push([i - 1, j])
            field[i - 1][j].steps = field[i][j].steps + 1
        }
        if(correct(i, j - 1)){
            queue.push([i, j - 1])
            field[i][j - 1].steps = field[i][j].steps + 1
        }
    }
}

function correct(x, y){
    let i = Number(x)
    let j = Number(y)
    return (correctMove(i, j) && field[i][j].canGo && field[i][j].steps === 0)
}
function correctMove(x, y){
    let i = Number(x)
    let j = Number(y)
    return (i >= 0 && i < field.length && j >= 0 && j < field[i].length)
}
function fillResultField(){
    let i = field.length - 1
    let j = field[i].length - 1
    if(field[i][j].steps === 0)
        return
    while(true){
        field[i][j].onPath = true
        if(i === 0 && j === 0)
            return

        if(correctMove(i + 1, j) && field[i + 1][j].steps === field[i][j].steps - 1){
            i = i + 1
            continue
        }
        if(correctMove(i, j + 1) && field[i][j + 1].steps === field[i][j].steps - 1){
            j = j + 1
            continue
        }
        if(correctMove(i - 1, j) && field[i - 1][j].steps === field[i][j].steps - 1){
            i = i - 1
            continue
        }
        if(correctMove(i, j - 1) && field[i][j - 1].steps === field[i][j].steps - 1){
            j = j - 1
            continue
        }
    }
}
