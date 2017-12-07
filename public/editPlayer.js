const url = window.location.href;
const view = parseInt(url.substr(url.length-1,1));
function displayPlayer() {
    var team = JSON.parse(localStorage.getItem("team"));
    var edit = team.players[view];
    ["position", "jerseynumber", "dob", "fname", "lname", "email", "position"].forEach(function(info){
    document.getElementById(info).innerHTML=edit[info];
    document.getElementById(info).value=edit[info];
    document.getElementById(info).placeholder=edit[info];    
});

    document.getElementById("captain").checked = (edit.captain == 'true');
    document.getElementById("starter").checked = (edit.starter == 'true');
}
window.onload = displayPlayer;

function change() {
    var team = JSON.parse(localStorage.getItem("team"));
    ["fname", "lname", "profileImg", "email", "dob", "jerseynumber", "position"].forEach(data=>
        team.players[view][data] = document.forms["editPlayer"][data].value
    );
  //  var imag = img.replace(/^.*[\\\/]/, '');
    team.players[view]["captain"]=document.forms["editPlayer"]["captain"].checked.toString();
    team.players[view]["starter"]=document.forms["editPlayer"]["starter"].checked.toString();
    localStorage.setItem("team", JSON.stringify(team));

    return true;
}
function confirmDelete(){
     document.querySelector("#confirmButton").style.visibility="visible";
}
function delplayer() {
        var team = JSON.parse(localStorage.getItem("team"));
        team.players.splice(view, 1);
        localStorage.setItem("team", JSON.stringify(team));
        document.forms["deletePlayer"].submit();
}