function saveGame() {
    var team = JSON.parse(localStorage.getItem("team"));
    var newGame = {}
    ["opponent", "date", "time", "address"].forEach(info=>
newGame[info]=document.getElementById[info].value);
    newGame["statsFor"] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    newGame["statsAgainst"] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    var home_status = getElementById("home").checked;
    if (home_status){
        newGame["location"] = "home";
    }else{
        newGame["location"] = "away";
    }

    var match_checked = document.getElementById("match");
    if (match_checked.checked) {
        newGame["type"] = "match";
    }else{
        newGame["type"] = "practice";
    }
    team.schedule.push(newGame);
    localStorage.setItem("team", JSON.stringify(team));
}