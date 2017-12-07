function loadFields() {
    var team = JSON.parse(localStorage.getItem("team"));
    var gameId = localStorage.getItem("editGame");
    var fields = team.schedule[gameId];
    ["opponent", "date","time","address"].forEach(data=>document.getElementById(data).value=fields[data]);

    var curLoc = fields["location"];
    var curType = fields["type"];

    if (curLoc == "home") {
        document.getElementById("home").checked = true;
    }
    else{
        document.getElementById("away").checked = true;
    }

    if (curType == "match") {
        document.getElementById("match").checked = true;
    }else{
        document.getElementById("practice").checked = true;
    }
}
window.onload = loadFields;

function saveEvent(){
    var team = JSON.parse(localStorage.getItem("team"));
    var gameId = localStorage.getItem("editGame");
    var fields = team.schedule[gameId];

    ["opponent", "date","time","address"].forEach(data=>
    fields[data] = document.getElementById(data).value);

    if (document.getElementById("home").checked) {
        fields.location = "home";
    }else{
        fields.location = "away";
    }

    if (document.getElementById("match").checked) {
        fields.type = "match";
    }else{
        fields.type = "practice";
    }

    localStorage.setItem("team", JSON.stringify(team));
}

function deleteG(){
    if (confirm("Do you want to delete the game?") == true) {
        alert("Game Deleted");
        var team = JSON.parse(localStorage.getItem("team"));

        var gameId = localStorage.getItem("editGame");
        var fields = team.schedule[gameId];

        team.schedule.splice(gameId, 1);
        localStorage.setItem("team", JSON.stringify(team));
        return true;
    }
    else {
        alert("Cancelled");
        return false;
    }
}