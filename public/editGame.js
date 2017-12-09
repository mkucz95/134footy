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

alert("starting");



function loadFields() {
    alert("hello");
    var gameId = localStorage.getItem("editGame");
    alert(gameId);
    db.ref('team/schedule/' + gameId).on('value', function (snapshot) {

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

    alert("done");
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
}
window.onload = loadFields;

function saveEvent() {
    alert("hello");
    var gameId = localStorage.getItem("editGame");
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
    } else {
        updates['/team/schedule/' + gameId + '/type'] = "practice";
    }
    db.ref().update(updates);
    alert("done");


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