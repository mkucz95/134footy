import {auth,database} from './db.js'
var db = database;
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
function add() {

    db.ref('/team/players').limitToLast(1).once('value').then(x => {
        x.forEach(y => {
            var newKey = (parseInt(y.key) + 1).toString();


            db.ref('/team/players/' + newKey).set({
                "fname": document.forms["newPlayer"]["fname"].value,
                "lname": document.forms["newPlayer"]["lname"].value,
                "profileImg": document.forms["newPlayer"]["profileImg"].value,
                "email": document.forms["newPlayer"]["email"].value,
                "dob": document.forms["newPlayer"]["dob"].value,
                "jerseynumber": document.forms["newPlayer"]["jerseynumber"].value,
                "position": document.forms["newPlayer"]["position"].value,
                "captain": (document.forms["newPlayer"]["captain"].checked).toString(),
                "starter": "false"
            });

            db.ref('/team/players/' + newKey + '/stats').set({
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
            });
        });
    });
    alert('Player added');
}

window.onload=function(){
    document.getElementById("addPlayer").onclick = add;
}
/*function add() {
    var team = JSON.parse(localStorage.getItem("team"));
    var edit = {};
    ["fname", "lname", "profileImg", "email", "dob", "jerseynumber", "position"].forEach(function(data){
        edit[data] = document.forms["newPlayer"][data].value;
    });
    var captain = (document.forms["newPlayer"]["captain"].checked).toString();
    edit["pic"] = imag;
    edit["captain"] = captain;
    edit["starter"] = "false";
    edit["stats"] = {'assist': 0,'goal': 0,'shot': 0,'onGoal': 0,'foul': 0,'red': 0,'yellow': 0,'corner': 0,'gKick': 0,'throw': 0,'pen': 0}
    team.players.push(edit);
    localStorage.setItem("team", JSON.stringify(team));
}*/
