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

alert("start");



function saveGame() {
    alert("hello");
    db.ref('team/schedule').limitToLast(1).once('value').then(x => {
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

            alert(document.querySelector("#opponent").value);
            db.ref('/team/schedule/' + newKey).set({
                "opponent": document.querySelector("#opponent").value,
                "date": document.querySelector("#date").value,
                "time": document.querySelector("#time").value,
                "address": document.querySelector("#address").value,
                "location": location,
                "type": type
            });

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



        });
    });
    alert("done");
    window.location.href = "viewSchedule.html";




    /*
    var team = JSON.parse(localStorage.getItem("team"));
    var newGame = {}
    console.log(document.querySelector("#address"));    
    ["opponent", "date", "time", "address"].forEach(info=>
    newGame[info]=document.querySelector(#${info}).value);

    newGame["statsFor"] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    newGame["statsAgainst"] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    var home_status = document.querySelector("#home").checked;
    if (home_status){
        newGame["location"] = "home";
    }else{
        newGame["location"] = "away";
    }

    var match_checked = document.querySelector("#match");
    if (match_checked.checked) {
        newGame["type"] = "match";
    }else{
        newGame["type"] = "practice";
    }
    team.schedule.push(newGame);
    localStorage.setItem("team", JSON.stringify(team));

    window.location = "viewSchedule.html";*/
}