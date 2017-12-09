import{auth, database} from './db.js';

var homeTeam = ["homegoal", "homeshot", "homeonGoal", "homefoul", "homered", "homeyellow", "homecorner", "homegKick", "homethrow", "homepen"];
var awayTeam = ["awaygoal", "awayshot", "awayonGoal", "awayfoul", "awayred", "awayyellow", "awaycorner", "awaygKick", "awaythrow","awaypen"];

var increment;
const url = window.location.href;
const id = parseInt(url.substr(url.length-1,1));
const todayDate = getCurrDate();

var team;
var match;
var matchDate;
   
            var sendData = {
                "action":0,
                "assign":0,
                "teamAssign":0
            };

window.onload = function(){
    database.ref('team/').once("value").then(s=>{team = s.val();
    match= team.schedule[id];
    matchDate=team.schedule[id].date;
    refreshAll();
    updateFormPlayers();
    updateHeaders(id);
    statsAllowed();
    });
}     

function statsAllowed(){
    let element = document.getElementById("edit_stats");
    if(element && todayDate !== team.schedule[id].date){
        element.onclick = '';
    }
}

function save(element){
    let data ={'number':0,'stat':0,'team':0,'action':0};

    ['number', 'stat', 'team', 'action'].forEach(property => {
        let selector = "#form-"+property;
        console.log(document.querySelector(selector));
        data[property] = document.querySelector(selector).value;
    });

    console.log(data);
    associateToPlayer(data);
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

    team.players.forEach(function(player){
        if(player.jerseynumber == data['number']){
            player.stats[type] += data['action'];
 
            console.log(player.stats);
            
            localStorage.setItem("team", JSON.stringify(team));
            return;
        }
    });
 }

 function associateToTeam(data){
     let action;
     if(data['action'] === "add") action = 1;
     else action=-1;

     /*needed for full functionality TODO*/
         //if(team.schedule[id].type === "match" && team.schedule[id].date == todayDate){
     if(team.schedule[id].type === "match"){
            if(data['team'] ==="home") team.schedule[id].statsFor[data['stat']] += action;
             else team.schedule[id].statsAgainst[data['stat']] += action;
         }
 
         console.log(team.schedule[id]);
             localStorage.setItem("team", JSON.stringify(team));
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
                console.log(stat);                
                refresh(stat, "home");
                refresh(stat, "away");
            });
        }

        function refresh(stat, teamType){
            let selector = "#"+teamType+stat;
            let el = document.querySelector(selector);

            if(teamType === "home"){ 
                database.ref(`team/schedule/${id}/statsFor/${stat}`).once("value").then(s=>{el.innerHTML = s.val();});                   
            }
            else{
                database.ref(`team/schedule/${id}/statsAgainst/${stat}`).once("value").then(s=>{el.innerHTML = s.val();});
            }
        }