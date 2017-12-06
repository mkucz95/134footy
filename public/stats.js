
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
        console.log(document.querySelector("#form-number"));
        document.querySelector("#form-number").value = data[property];
    });

    console.log(data);
    associateToPlayer(data);
    associateToTeam(data);
}

function getCurrDate(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth()+1; //months start at 0
    var day = now.getDate();
    return year+'-'+month+'-'+day;
}

    function updateFormPlayers(){
        var team = JSON.parse(localStorage.getItem("team"));
        const sel = document.getElementsByName("form-number");

             for(var j=0; j<sel.length; j++){
             team.players.forEach(function(player){
                var option = document.createElement("option");
                
                option.text = player.lname +'-'+player.jerseynumber;
                option.value = player.jerseynumber;
                sel[j].add(option);
             });
        }
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
         if(team.schedule[id].type === "match" && team.schedule[id].date == todayDate){
             if(data['team'] ==="home") team.schedule[id].statsFor[data['stat']] += data['action'];
             else team.schedule[id].statsAgainst[data['stat']] += data['action'];
         }
 
         console.log(team.schedule[id]);
             localStorage.setItem("team", JSON.stringify(team));
             return;
         }
 
    function updateHeaders(id){
        var opposition = team.schedule[id].opponent;
        console.log(opposition);
        console.log(document.getElementsByClassName("opponentName"));
        console.log(document.getElementById("opponentOption"));

        (document.getElementsByClassName("opponentName")).innerHTML = opposition;
        (document.getElementById("opponentOption")).innerHTML = opposition;

        var el = document.getElementsByTagName("aside")[0];
        el.innerHTML = match.date;
    }

        function refreshAll(){
            console.log("refreshAll");
            ["goal", "shot", "onGoal", "foul", "red", "yellow", "corner", "gKick", "throw", "pen"].forEach(function(stat){
                console.log(stat);                
                refresh(stat, "home");
                refresh(stat, "away");
            });
        }

        function refresh(stat, teamName){
            var team = JSON.parse(localStorage.getItem("team"));            
            var match = team.schedule[id];

            let selector = "#"+teamName+stat;
            let el = document.querySelector(selector);
            
            console.log(el);

            let value;
            if(team === "home") value = match.statsFor[stat];
            else value = match.statsAgainst[stat]

            if(el !=null){
                    if(el.id.includes("shot")){
                        el.innerHTML = value +' ('+match.statsFor.onGoal+')';
                    }
                    else{
                        el.innerHTML = value;  
                    }
                }
        }

    function redirect(){
        window.location = 'edit_game_stats.html?i='+id;
    }