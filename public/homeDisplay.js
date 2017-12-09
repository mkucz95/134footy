import {auth, database} from './db.js';

var team;

function getTeamVal(){
    console.log("getTeamVal");
    database.ref('team/').once("value").then(s=>
        {team = s.val();
            console.log(team);
            displayNextGame();
            updateSeasonStats();
        });
}

var overallStats = {
    'win':0,
    'loss':0,
    'tie':0,
    'goalsFor':0,
    'goalsAgainst':0
}

function updateSeasonStats(){
    for(var i=0; i<team.schedule.length; i++){
        if(team.schedule[i].type == "match"){
        var goalFor = team.schedule[i].statsFor["goal"];
        console.log(goalFor);
        var goalAgainst = team.schedule[i].statsAgainst["goal"];
        if(goalFor<goalAgainst){
            overallStats['loss'] += 1;
        }
        else if(goalFor>goalAgainst){
            overallStats['win'] += 1;
        }
        if(goalFor==goalAgainst){
            overallStats['tie'] += 1;
        }
        overallStats['goalsFor'] += goalFor;
        overallStats['goalsAgainst'] += goalAgainst;
        }
    }
    ['win','loss','tie','goalsFor','goalsAgainst'].forEach(stat=>{
        let el = document.getElementById(stat);
        el.innerHTML = overallStats[stat];
    });
}

function getCurrDate(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth()+1; //months start at 0
    var day = now.getDate();
    return year+'-'+month+'-'+day;
}
function findNextGame(){
    const today = Date.parse(getCurrDate()).value;
    for(let i=0;i<team.schedule.length-1; i++){
        let eventDate = Date.parse(team.schedule[i].date);
            if(eventDate>=today){
                console.log("event id: "+i);
                if(eventDate = today){
                    document.querySelector("#gamestats").style.visibility='visible';
                }return i;                
            }
    }return -1;
}
function displayNextGame(){
    const nextGame = findNextGame(); 
    if(nextGame != -1){
        let match = team.schedule[nextGame];
        ['type', 'date', 'location', 'time','opponent'].forEach(info => 
            document.getElementById(info).innerHTML = match[info]);
    }
    else{
        document.getElementById('type').innerHTML = 'Not Available';
        document.getElementById('extraInfo').style.visibility = 'hidden';
    }
}
window.onload = function(){
    console.log("onload");
    getTeamVal();
}