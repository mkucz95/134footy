function saveGame() {
    var team = JSON.parse(localStorage.getItem("team"));
    var newGame = {}
    console.log(document.querySelector("#address"));    
    ["opponent", "date", "time", "address"].forEach(info=>
    newGame[info]=document.querySelector(`#${info}`).value);

    newGame["statsFor"] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    newGame["statsAgainst"] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    var match_checked = document.querySelector("#match");
    if (match_checked.checked) {
        newGame["type"] = "match";
            let status=document.document.querySelector("#home").checked; 
            if (status){
                newGame["location"] = "home";
            }else{
                newGame["location"] = "away";
            }
    }else{
        newGame["type"] = "practice";
        newGame["location"]="home";        
    }

    team.schedule.push(newGame);
    localStorage.setItem("team", JSON.stringify(team));

    window.location = "viewSchedule.html";
}