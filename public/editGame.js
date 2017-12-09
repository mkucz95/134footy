/*
var config = {
    apiKey: "AIzaSyCep4diOeZnGMpQIyeaO0RGCju42EKTkW4",
    authDomain: "footy-b0652.firebaseapp.com",
    databaseURL: "https://footy-b0652.firebaseio.com",
    projectId: "footy-b0652",
    storageBucket: "footy-b0652.appspot.com",
    messagingSenderId: "141339264361"
};
firebase.initializeApp(config);
var db = firebase.database();
*/
import {auth, database} from './db.js';
var db = database;


    var gameId = localStorage.getItem("editGame");

    db.ref('/team/schedule/' + gameId).on('value', function (snapshot) {

        document.getElementById("opponent").value = snapshot.val().opponent;
        document.getElementById("date").value = snapshot.val().date;
        document.getElementById("time").value = snapshot.val().time;
        document.getElementById("address").value = snapshot.val().address;


        var curLoc = snapshot.val().location;
        var curType = snapshot.val().type;

        if (curLoc == "Home") {
            document.getElementById("home").checked = true;
        }
        else {
            document.getElementById("away").checked = true;
        }

        if (curType == "match") {
            document.getElementById("match").checked = true;
        } else {
            document.getElementById("practice").checked = true;
        }
    });


    /*
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
    }*/

function saveEvent() {
    var gameId = localStorage.getItem("editGame");
    db.ref('/team/schedule/' + gameId + '/type').on('value', function (snapshot) {

        var updates = {};
        updates['/team/schedule/' + gameId + '/opponent'] = document.getElementById("opponent").value;
        updates['/team/schedule/' + gameId + '/date'] = document.getElementById("date").value;
        updates['/team/schedule/' + gameId + '/time'] = document.getElementById("time").value;
        updates['/team/schedule/' + gameId + '/address'] = document.getElementById("address").value;
        if (document.getElementById("home").checked) {
            updates['/team/schedule/' + gameId + '/location'] = "home";
        } else {
            updates['/team/schedule/' + gameId + '/location'] = "away";
        }
        if (document.getElementById("match").checked) {
            updates['/team/schedule/' + gameId + '/type'] = "match";
            if (snapshot.val() != "match") {
                updates['/team/schedule/' + gameId + '/statsFor'] = {
                    'assist': 0,
                    'goal': 0,
                    'shot': 0,
                    'onGoal': 0,
                    'foul': 0,
                    'red': 0,
                    'yellow': 0,
                    'corner': 0,
                    'gKick': 0,
                    'throw': 0,
                    'pen': 0
                }
                updates['/team/schedule/' + gameId + '/statsAgainst'] = {
                    'assist': 0,
                    'goal': 0,
                    'shot': 0,
                    'onGoal': 0,
                    'foul': 0,
                    'red': 0,
                    'yellow': 0,
                    'corner': 0,
                    'gKick': 0,
                    'throw': 0,
                    'pen': 0
                }
            }

        } else {
            updates['/team/schedule/' + gameId + '/type'] = "practice";
            if (snapshot.val() != "practice") {
                updates['/team/schedule/' + gameId + '/statsFor'] = null
                updates['/team/schedule/' + gameId + '/statsAgainst'] = null;
            }
        }
        db.ref().update(updates);

    });

    /*
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
    localStorage.setItem("team", JSON.stringify(team));*/
}

function deleteG() {
    var gameId = localStorage.getItem("editGame");
    if (confirm("Do you want to delete the game?") == true) {
        alert("Game Deleted");
        db.ref('team/schedule/' + gameId).set(null);
        /*var team = JSON.parse(localStorage.getItem("team"));

        var gameId = localStorage.getItem("editGame");
        var fields = team.schedule[gameId];

        team.schedule.splice(gameId, 1);
        localStorage.setItem("team", JSON.stringify(team));*/
        return true;
    }
    else {
        alert("Cancelled");
        return false;
    }
}

window.onload = function () {
    document.getElementById("save").onclick = saveEvent;
    document.getElementById("delete").onclick = deleteG;

}