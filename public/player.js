function var1() {
    var team = JSON.parse(localStorage.getItem("team"));
    var view = localStorage.getItem("viewplayer");
    var edit = team.players[view];
    document.getElementById("position").innerHTML = edit.position;
    document.getElementById("jerseynum").innerHTML = edit.jerseynumber;
    document.getElementById("dob").innerHTML = edit.dob;
    document.getElementById("playername").innerHTML = edit.fname + " " + edit.lname;

    document.getElementById("goals").innerHTML = edit.stats["goal"];
    document.getElementById("shots").innerHTML = edit.stats["shot"];
    document.getElementById("fouls").innerHTML = edit.stats["foul"];
    document.getElementById("redcards").innerHTML = edit.stats["red"];
    document.getElementById("yellowcards").innerHTML = edit.stats["yellow"];
    document.getElementById("corner").innerHTML = edit.stats["corner"];
    document.getElementById("goalkick").innerHTML = edit.stats["gKick"];
    document.getElementById("throw").innerHTML = edit.stats["throw"];
    document.getElementById("penalty").innerHTML = edit.stats["pen"];
}
window.onload = var1;