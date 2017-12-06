/*
action: increase or decrease
type:
method:

*/
var increment;
var url = window.location.href;
var id = url.substr(url.length-1,1);
id= parseInt(id);

function submit(matchDate, number, action, assign, team){ 
    console.log("submit");  
    
   if(action === "plus") increment = 1;
   else increment = -1;  
 
    if(number !== -1 && team !== "away"){        
        associateToPlayer(number, assign, increment);
    }
    associateToTeam(matchDate, assign, increment, team);
    //TODO, would need to fix this to have it assigned to correct match

    refresh(assign, team);
    console.debug(number+assign+action+team);
}

function associateToPlayer(id, type, action){
   for(var i = 0; i<team.players.length; i++){
       if(team.players[i].jerseynumber == id){
           team.players[i].stats[type] += increment;

           console.log(team.players[i].stats);
           
           localStorage.setItem("team", JSON.stringify(team));
           return;
       }
   }
}

function associateToTeam(date, data, action, teamLoc){
        if(team.schedule[id].type === "match" && team.schedule[id].date == date){
            if(teamLoc ==="home") team.schedule[id].statsFor[data] += action;
            else team.schedule[id].statsAgainst[data] += action;
        }

        console.log(team.schedule[id]);
            localStorage.setItem("team", JSON.stringify(team));
            return;
        }