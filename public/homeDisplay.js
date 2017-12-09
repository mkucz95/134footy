import {auth, database} from './db.js';

var team;

function getTeamVal(){
    database.ref('team/').once("value").then(s=>{team = s.val();displayNextGame();updateSeasonStats(); });
}
var overallStats = {'win':0,'loss':0,'tie':0,'goalsFor':0,'goalsAgainst':0}
function updateSeasonStats(){
    team.schedule.forEach(event=>{
        if(event.type == "match"){
            console.log(event);
            var goalFor = parseInt(event.statsFor["goal"]);
            var goalAgainst = parseInt(event.statsAgainst["goal"]);
            if(goalFor<goalAgainst){overallStats['loss'] += 1;}
            else if(goalFor>goalAgainst){overallStats['win'] += 1;}
            if(goalFor==goalAgainst){overallStats['tie'] += 1;}
            overallStats['goalsFor'] += goalFor;
            overallStats['goalsAgainst'] += goalAgainst;
            }
    });
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
    const today = Date.parse(getCurrDate());
    var counter=0;
    team.schedule.forEach(match=>{
        if(counter==team.schedule.length)return-1;
        let eventDate = Date.parse(match.date);
        if(eventDate>=today){
            if(eventDate == today){
                document.querySelector("#gamestats").style.visibility='visible';
                return counter;                                    
            }return counter+1;
        } counter++;
    });return -1;
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
window.onload = getTeamVal;
