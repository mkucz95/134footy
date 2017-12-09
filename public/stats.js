import{auth, database} from './db.js';

const url = window.location.href;
const id = parseInt(url.substr(url.length-1,1));
const todayDate = getCurrDate();

var team;
var match;
var matchDate;

window.onload = function(){
    database.ref('team/').once("value").then(s=>{team = s.val();
    match= team.schedule[id];
    matchDate=team.schedule[id].date;
    refreshAll();
    updateFormPlayers();
    updateHeaders(id);
    statsAllowed();
    });
    document.getElementById("saveStat").onclick = save;    
}     

function statsAllowed(){
    let element = document.getElementById("edit_stats");
    if(element && todayDate !== team.schedule[id].date){
        element.onclick = '';
    }
}

function save(){
    let data = {'number':0,'stat':0,'team':0,'action':0};
    ['number', 'stat', 'team'].forEach(property => {
        console.log(document.querySelector(`#form-${property}`));
        data[property] = document.querySelector(`#form-${property}`).value;
    });
    if(document.querySelector("#form-action").value==="add"){
        data["action"]=1;
    }else{data["action"]=-1}

    console.log(data);
    if(data["team"] === "home" && data["number"]!= -1){ console.log("home");associateToPlayer(data);}
    associateToTeam(data);
    refresh(data['stat'], data['team']);
}

function getCurrDate(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth()+1; //months start at 0
    var day = now.getDate();
    return year+'-'+month+'-'+day;
}

    function updateFormPlayers(){
        var sel = document.querySelector("#form-number");
             team.players.forEach(function(player){
                let option = document.createElement("option");
                option.text = player.lname +'-'+player.jerseynumber;
                option.value = player.jerseynumber;
                sel.appendChild(option);
             });
        }

function associateToPlayer(data){
    let type=data['stat'];
    var counter=0;
    var id=0;
    let newPlayerStats;

    team.players.forEach(function(player){
        if(player.jerseynumber == data['number']){
            newPlayerStats = player.stats;
            newPlayerStats[type] = data['action'] + parseInt(newPlayerStats[type]);
            console.log(newPlayerStats);
            id=counter;
        }
        counter++;
    });
    database.ref(`team/players/${id}/stats`).set(newPlayerStats);
 }

 function associateToTeam(data){
     let action;
     var newTeamStats;
     let type='';

     /*needed for full functionality TODO*/
         //if(team.schedule[id].type === "match" && team.schedule[id].date == todayDate){
     if(team.schedule[id].type === "match"){
            if(data['team'] ==="home"){
                newTeamStats = team.schedule[id].statsFor;                
                team.schedule[id].statsFor[data['stat']] = data["action"] + parseInt(team.schedule[id].statsFor[data['stat']]);
                type='statsFor';
            }
             else{
                 newTeamStats = team.schedule[id].statsAgainst;
                 team.schedule[id].statsAgainst[data['stat']] = data["action"] + parseInt(team.schedule[id].statsFor[data['stat']]);
                 type='statsAgainst';                 
                } 
         }
 
         console.log(team.schedule[id]);
         database.ref(`team/schedule/${id}/${type}`).set(newTeamStats);
             return;
         }
 
    function updateHeaders(id){
        var opposition = team.schedule[id].opponent;
        let el = document.getElementsByClassName("opponentName");
        el[0].innerHTML = opposition;
        el[1].innerHTML = opposition;
        let dateEL = document.getElementsByTagName("aside")[0];
        dateEL.innerHTML = match.date;
    }

        function refreshAll(){
            console.log("refreshAll");
            ["goal", "shot", "onGoal", "foul", "red", "yellow", "corner", "gKick", "throw", "pen"].forEach(function(stat){           
                refresh(stat, "home");
                refresh(stat, "away");
            });
        }

        function refresh(stat, teamType){
            let el = document.querySelector(`#${teamType}${stat}`);

            if(teamType === "home"){ 
                database.ref(`team/schedule/${id}/statsFor/${stat}`).once("value").then(s=>{el.innerHTML = s.val();});                   
            }
            else{
                database.ref(`team/schedule/${id}/statsAgainst/${stat}`).once("value").then(s=>{el.innerHTML = s.val();});
            }
        }