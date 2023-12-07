const registrationBtn = document.getElementById("registrationBtn")
const site = document.getElementById("site")
registrationBtn.onclick = function(){
    site.innerHTML = ''
    site.innerHTML = getRegistrationTemplate()
    const acceptRegistrationButton = document.getElementById("acceptButton")
    const nicknameInput = document.getElementById("nickname")
    const passwordInput = document.getElementById("password")
    const problems = document.getElementById("problems")
    acceptRegistrationButton.onclick = function(){
        problems.innerHTML = ''
        let problem = ''
        if(nicknameInput.value === '')
            problem += '<p>input username to registrate</p>'
        else
            problem += '<p>user with nickname' + nicknameInput.value + 'already registrated. please choose other nickname</p>'
        if(passwordInput.value === '')
            problem += '<p>input your password to registrate</p>'

        problems.insertAdjacentHTML('beforeend', problem)                    
    }
}

function getRegistrationTemplate(){
    return`
    <div class="input-group mb-3">
    <span class="input-group-text" id="basic-addon1">@</span>
    <input type="text" class="form-control" placeholder="enter your name" id="nickname">
</div>
  
<div class="input-group mb-3">
    <input type="text" class="form-control" placeholder="enter your password" id="password">
</div>

<button class="btn btn-success btn-lg" id="acceptButton">Next</button>

<div class="text-danger" id="problems"></div>
  `
}

