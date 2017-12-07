const url = window.location.href;
const view = parseInt(url.substr(url.length-1,1));
document.querySelector("#editButton").onclick=function(){window.location.href=`editplayer.html?id=${view}`};

function displayPlayer() {
    var team = JSON.parse(localStorage.getItem("team"));
    var edit = team.players[view];
    ["position", "jerseynumber", "dob", "fname", "lname"].forEach(info =>
    document.getElementById(info).innerHTML=edit[info]);
    ["goal", "assist", "shot", "onGoal", "foul", "red", "yellow", "corner", "gKick", "throw", "pen"].forEach(stat=>
        document.getElementById(stat).innerHTML = edit.stats[stat]
    );
}
window.onload = displayPlayer;