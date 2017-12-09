import {auth, database} from './db.js';
var db = database;


const url = window.location.href;
const view = parseInt((url.substr(url.length - 10, url.length)).split("=")[1]);
document.querySelector("#editButton").onclick=function(){window.location.href=`editplayer.html?id=${view}`};

function displayPlayer() {
    db.ref('/team/players/' + view).on('value', function(snapshot){
        document.getElementById("position").innerHTML = snapshot.val().position;
        document.getElementById("jerseynumber").innerHTML = snapshot.val().jerseynumber;
        document.getElementById("dob").innerHTML = snapshot.val().dob;
        document.getElementById("fname").innerHTML = snapshot.val().fname;
        document.getElementById("lname").innerHTML = snapshot.val().lname;  
    });
    db.ref('/team/players/' + view + '/stats').on('value', function(snapshot){
        document.getElementById("goal").innerHTML = snapshot.val().goal;
        document.getElementById("assist").innerHTML = snapshot.val().assist;
        document.getElementById("shot").innerHTML = snapshot.val().shot;
        document.getElementById("onGoal").innerHTML = snapshot.val().onGoal;
        document.getElementById("foul").innerHTML = snapshot.val().foul;
        document.getElementById("red").innerHTML = snapshot.val().red;
        document.getElementById("yellow").innerHTML = snapshot.val().yellow;
        document.getElementById("corner").innerHTML = snapshot.val().corner;
        document.getElementById("gKick").innerHTML = snapshot.val().gKick;
        document.getElementById("throw").innerHTML = snapshot.val().throw;
        document.getElementById("pen").innerHTML = snapshot.val().pen;
    });
}
window.onload = displayPlayer;

/*
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
*/