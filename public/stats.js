
var homeTeam = ["homegoal", "homeshot", "homeonGoal", "homefoul", "homered", "homeyellow", "homecorner", "homegKick", "homethrow", "homepen"];
var awayTeam = ["awaygoal", "awayshot", "awayonGoal", "awayfoul", "awayred", "awayyellow", "awaycorner", "awaygKick", "awaythrow","awaypen"];

var increment;
const url = window.location.href;
const id = parseInt(url.substr(url.length-1,1));
const todayDate = getCurrDate();

var team = JSON.parse(localStorage.getItem("team"));            
const match = team.schedule[id];

    refreshAll();
    updateFormPlayers();
    updateHeaders(id);

    var matchDate = team.schedule[id].date;
    
            var sendData = {
                "action":0,
                "assign":0,
                "teamAssign":0
            };

window.onload = function(){
    let element = document.getElementById("edit_stats");
    if(element && todayDate !== team.schedule[id].date){
        element.onclick = '';
    }
}

function openEdit(element){
    console.log("openEdit");
    document.getElementById(element).style.visibility = "visible";
}

function closeEdit(element){
    console.log("close");    
    document.getElementById(element).style.visibility = "hidden";
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
        console.log("updatePlayers");
        var team = JSON.parse(localStorage.getItem("team"));
        const sel = document.querySelector("#form-number");

             team.players.forEach(function(player){
                console.log(player);
                let option = document.createElement("option");
                option.text = player.lname +'-'+player.jerseynumber;
                option.value = player.jerseynumber;
                console.log(option.text);
                sel.insertAdjacentHTML('afterbegin', option);
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
        console.log(opposition);
        console.log(document.getElementsByClassName("opponentName"));
        let el = document.getElementsByClassName("opponentName");
        el[0].innerHTML = opposition;
        el[1].innerHTML = opposition;

        let dateEL = document.getElementsByTagName("aside")[0];
        dateEL.innerHTML = match.date;
    }

        function refreshAll(){
            console.log("refreshAll");
            ["goal", "assist", "shot", "onGoal", "foul", "red", "yellow", "corner", "gKick", "throw", "pen"].forEach(function(stat){
                console.log(stat);                
                refresh(stat, "home");
                refresh(stat, "away");
            });
        }

        function refresh(stat, teamType){
            let teamObj = JSON.parse(localStorage.getItem("team"));            
            var match = teamObj.schedule[id];

            let selector = "#"+teamType+stat;
            let el = document.querySelector(selector);

            let value;
            if(teamType === "home"){ 
                value = match.statsFor[stat];
            }
            else value = match.statsAgainst[stat];

            el.innerHTML = value;
        }