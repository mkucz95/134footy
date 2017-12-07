buildHtml();

function buildHtml(){
    var today_date = new Date();
    var today_year = today_date.getFullYear();
    var today_month = today_date.getMonth();
    var today_day = today_date.getDate();
    var tBody = document.querySelector('#template');
    var counter=0;

    var team = JSON.parse(localStorage.getItem("team"));
        team.players.forEach(
            function(player){
            let name = player.fname + " " + player.lname;
            let position = player.position;
            let jerseynum = player.jerseynumber;
            console.log(player.dob);
            let date = new Date(player.dob);
            console.log(date.getFullYear());
            let age = today_year - date.getFullYear();

            if (today_month < (date.getMonth() + 1)) {
                age--;
            }
            if (((date.getMonth() + 1) == today_month) && (today_day < date.getDate())) {
                age--;
            }

            let el = document.createElement("tr");
            el.id = counter;
            el.innerHTML = `<td></td><td>${name}</td><td>${position}</td><td>${jerseynum}</td><td>${age}</td>`;
            el.onclick = function(){edit(this.id)};            
            console.log(el);
            tBody.appendChild(el);
            counter++;
        });
}

function edit(id) {
                window.location.href = `viewplayer.html?id=${id}`;
}
           