var team = JSON.parse(localStorage.getItem("team"));
console.log(team);
var overallStats = {
    'win':0,
    'loss':0,
    'tie':0,
    'goalsFor':0,
    'goalsAgainst':0
}

var statsArr = ['win','loss','tie','goalsFor','goalsAgainst'];

for(var i=0; i<team.schedule.length; i++){
    if(team.schedule[i].type == "match"){
    var goalFor = team.schedule[i].statsFor["goal"];
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

for(var j=0; j<statsArr.length; j++){
    var el = document.getElementById(statsArr[j]);
    el.innerHTML = overallStats[statsArr[j]];
}