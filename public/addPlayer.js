import {auth, database} from './db.js';
function add() {
    var db = database;
    var datab = db.ref('/team/players').push();
    var key = datab.key;
    
    datab.set({
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

    db.ref('/team/players/' + key + '/stats').set({
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



    //Pre Firebase code
/*  
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
*/
}