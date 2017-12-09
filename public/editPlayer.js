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



const url = window.location.href;
const view = parseInt(url.substr(url.length - 1, 1));

function displayPlayer() {
    db.ref('team/players/' + url.substr(url.length - 1, 1)).on('value', function (snapshot) {
        document.getElementById("position").placeholder = snapshot.val().position;
        document.getElementById("jerseynumber").placeholder = snapshot.val().jerseynumber;
        document.getElementById("dob").placeholder = snapshot.val().dob;
        document.getElementById("fname").placeholder = snapshot.val().fname;
        document.getElementById("lname").placeholder = snapshot.val().lname;
        document.getElementById("email").placeholder = snapshot.val().email;
        document.getElementById("captain").checked = (snapshot.val().captain == 'true');
        document.getElementById("starter").checked = (snapshot.val().starter == 'true');


        document.getElementById("position").value = snapshot.val().position;
        document.getElementById("jerseynumber").value = snapshot.val().jerseynumber;
        document.getElementById("dob").value = new Date(snapshot.val().dob);
        document.getElementById("fname").value = snapshot.val().fname;
        document.getElementById("lname").value = snapshot.val().lname;
        document.getElementById("email").value = snapshot.val().email;
        document.getElementById("captain").checked = (snapshot.val().captain == 'true');
        document.getElementById("starter").checked = (snapshot.val().starter == 'true');
    });

    /*var team = JSON.parse(localStorage.getItem("team"));
    var edit = team.players[view];
    ["position", "jerseynumber", "dob", "fname", "lname", "email", "position"].forEach(function(info){
    document.getElementById(info).innerHTML=edit[info];
    document.getElementById(info).value=edit[info];
    document.getElementById(info).placeholder=edit[info];    
    });
    document.getElementById("captain").checked = (edit.captain == 'true');
    document.getElementById("starter").checked = (edit.starter == 'true');*/
}
window.onload = displayPlayer;

function change() {
    db.ref('team/players/' + url.substr(url.length - 1, 1) + '/stats').on('value', function (snapshot) {
        db.ref('team/players/' + url.substr(url.length - 1, 1)).set({
            "fname": document.forms["editPlayer"]["fname"].value,
            "lname": document.forms["editPlayer"]["lname"].value,
            "profileImg": document.forms["editPlayer"]["profileImg"].value,
            "email": document.forms["editPlayer"]["email"].value,
            "dob": document.forms["editPlayer"]["dob"].value,
            "jerseynumber": document.forms["editPlayer"]["jerseynumber"].value,
            "position": document.forms["editPlayer"]["position"].value,
            "captain": (document.forms["editPlayer"]["captain"].checked).toString(),
            "starter": document.forms["editPlayer"]["starter"].checked.toString(),
            "stats": snapshot.val()
        });
    });



    /*var team = JSON.parse(localStorage.getItem("team"));
    ["fname", "lname", "profileImg", "email", "dob", "jerseynumber", "position"].forEach(data=>
        team.players[view][data] = document.forms["editPlayer"][data].value
    );
    team.players[view]["captain"]=document.forms["editPlayer"]["captain"].checked.toString();
    team.players[view]["starter"]=document.forms["editPlayer"]["starter"].checked.toString();
    localStorage.setItem("team", JSON.stringify(team));
    */
    return true;
}
function confirmDelete() {
    document.querySelector("#confirmButton").style.visibility = "visible";
}
function delplayer() {

    db.ref('team/players/' + url.substr(url.length - 1, 1)).set(null);
    /*var team = JSON.parse(localStorage.getItem("team"));
    team.players.splice(view, 1);
    localStorage.setItem("team", JSON.stringify(team));*/
    document.forms["deletePlayer"].submit();
}