/*import {auth,database} from './db.js'
var db = database;*/

var config = {
    apiKey: "AIzaSyCep4diOeZnGMpQIyeaO0RGCju42EKTkW4",
    authDomain: "footy-b0652.firebaseapp.com",
    databaseURL: "https://footy-b0652.firebaseio.com",
    projectId: "footy-b0652",
    storageBucket: "footy-b0652.appspot.com",
    messagingSenderId: "141339264361"
};
firebase.initializeApp(config);
var db = firebase.database();


buildHtml();
function edit(id) {
    localStorage.setItem('editGame', id);
    window.location.href = 'editGame.html?i=' + id;
}
function view(id) {
    localStorage.setItem('viewGame', id);
    window.location.href = 'stats.html?i=' + id;
}
function buildHtml() {
    const matchErr = '<tr><td>No scheduled matches.</td></tr>';
    const practiceErr = '<tr><td>No scheduled practices.</td></tr>';
    var counter = 0;
    //const teamSched = (JSON.parse(localStorage.getItem("team"))).schedule;
    var sched = db.ref('team/schedule');
    sched.once('value').then(x => {
        x.forEach(y => {
            var fname = db.ref('team/schedule/' + y.key);
            fname.once('value', function (snapshot) {
                var event = snapshot.val();
                var el;
                if(event.type == "match") {
                    el=document.querySelector("#matches");
                }else {
                    el=document.querySelector("#practices");
                }

                var newEl = document.createElement('tr');
                newEl.innerHTML = `<td>${event.location} @ ${event.address}</td><td id="${counter}" onclick="view(this.id)"> ${event.date} at ${event.time}</td> <td> ${event.opponent}</td><td class="edit permission" id="${counter}" onclick="edit(this.id)">edit</td>`;
                el.insertAdjacentElement('beforeend',newEl);
                counter++;


            });
        })
    });



    /* if (teamSched) {
          teamSched.forEach(function(event){
             var el;
             if (event.type == "match") {
                 el=document.querySelector("#matches");
             }else{
                 el=document.querySelector("#practices");
             }
             var newEl = document.createElement('tr');
             newEl.innerHTML = <td>${event.location} @ ${event.address}</td><td id="${counter}" onclick="view(this.id)"> ${event.date} at ${event.time}</td> <td> ${event.opponent}</td><td class="edit permission" id="${counter}" onclick="edit(this.id)">edit</td>;
             el.insertAdjacentElement('beforeend',newEl);
             counter++;
          });
     }
 
     var matches = document.getElementById("matches");
     if(matches.childElementCount<1){
         matches.innerHTML = matchErr;
     }
     var practices=document.getElementById("practices");
     if(practices.childElementCount<1){
         practices.innerHTML = practiceErr;        
     }*/
}