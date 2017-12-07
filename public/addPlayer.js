function add() {
    var team = JSON.parse(localStorage.getItem("team"));
    var edit = {};
    ["fname", "lname", "profileImg", "email", "dob", "jerseynumber", "position"].forEach(function(data){
        edit[data] = document.forms["newPlayer"][data].value;
    });
    var imag = img.replace(/^.*[\\\/]/, '');
    var captain = (document.forms["newPlayer"]["captain"].checked).toString();
    edit["pic"] = imag;
    edit["captain"] = captain;
    edit["starter"] = "false";
    edit["stats"] = {'assist': 0,'goal': 0,'shot': 0,'onGoal': 0,'foul': 0,'red': 0,'yellow': 0,'corner': 0,'gKick': 0,'throw': 0,'pen': 0}
    team.players.push(edit);
    localStorage.setItem("team", JSON.stringify(team));
}