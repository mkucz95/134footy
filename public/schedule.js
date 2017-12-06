    buildHtml();

function edit(id) {
    localStorage.setItem('editGame', id);
    window.location.href = 'editGame.html?i=' + id;
}

function view(id) {
    localStorage.setItem('viewGame', id);
    window.location.href = 'stats.html?i=' + id;
}

function buildHtml(){
    const matchErr = '<tr><td>No scheduled matches.</td></tr>';
    const practiceErr = '<tr><td>No scheduled practices.</td></tr>';

    const teamSched = (JSON.parse(localStorage.getItem("team"))).schedule;    
     if (teamSched) {
        for (i = 0; i < teamSched.length; i++) {
            var gameAddr = teamSched[i]["address"];
            var gameDate = teamSched[i]["date"];
            var gameTime = teamSched[i]["time"];
            var gameType = teamSched[i]["type"];
            var gameLoc = teamSched[i]["location"];
            var opponent = teamSched[i]["opponent"];
    
            var el;
            if (gameType == "match") {
                el=document.querySelector("#matches");
            }else{
                el=document.querySelector("#practices");
            }
            var newEl = document.createElement('tr');
            newEl.innerHTML = `<td>${gameLoc} @ ${gameAddr}</td><td id="${i}" onclick="view(this.id)"> ${gameDate} at ${gameTime}</td> <td> ${opponent}</td><td class="edit permission" id="${i}" onclick="edit(this.id)">edit</td>`;
            el.insertAdjacentElement('beforeend',newEl);
        }
    }
    let matches = document.getElementById("matches");
    let practices = document.getElementById("practices");
    
    if(matches.childElementCount<1){
        matches.innerHTML = matchErr;
    }
    if(practices.childElementCount<1){
        practices.innerHTML = practiceErr;        
    }
}
