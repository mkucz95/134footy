import {auth, database } from './db.js';
var db = database;


function saveGame() {

    db.ref('/team/schedule').limitToLast(1).once('value').then(x => {
        x.forEach(y => {
            var newKey = (parseInt(y.key) + 1).toString();
            var location = "";
            var type = "";
            var home_status = document.querySelector("#home");
            if (home_status) {
                location = "Home";
            } else {
                location = "Away";
            }

            var match_checked = document.querySelector("#match");
            if (match_checked.checked) {
                type = "match";
            } else {
                type = "practice";
            }

            db.ref('/team/schedule/' + newKey).set({
                "opponent": document.querySelector("#opponent").value,
                "date": document.querySelector("#date").value,
                "time": document.querySelector("#time").value,
                "address": document.querySelector("#address").value,
                "location": location,
                "type": type
            });

            if(type == 'match'){
                db.ref('/team/schedule/' + newKey + '/statsFor').set({
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
                db.ref('/team/schedule/' + newKey + '/statsAgainst').set({
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
            }


        });
    });

    alert('Game Added.');
    window.location.href = "viewSchedule.html";
}

window.onload=function(){
    document.getElementById("saveGame").onclick = saveGame;
}
