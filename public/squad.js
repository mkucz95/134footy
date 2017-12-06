buildHtml();

function buildHtml(){
    document.write("<table><thead><tr><th></th><th>Player</th><th>Position</th><th>Number</th><th>Age</th></tr></thead>")
    var name;
    var position;
    var jerseynum;
    var date;
    var today_date = new Date();
    var today_year = today_date.getFullYear();
    var today_month = today_date.getMonth();
    var today_day = today_date.getDate();
    var age;
    var team = JSON.parse(localStorage.getItem("team"));
        for (j = 0; j < team.players.length; j++) {
            name = team.players[j].fname + " " + team.players[j].lname;
            position = team.players[j].position;
            jerseynum = team.players[j].jerseynumber;
            date = new Date(team.players[j].dob);
            age = today_year - date.getFullYear();
            if (today_month < (date.getMonth() - 1)) {
                age--;
            }
            if (((date.getMonth() - 1) == today_month) && (today_day < date.getDate())) {
                age--;
            }
            document.write("<tr id = " + j + " onclick= edit(this.id)" + "><td></td> <td>" + name + "</td> <td>" + position + "</td> <td>" + jerseynum + "</td><td>" + age + "</td></tr>");
    }
    document.write("</table>");
}

function edit(id) {
    
                localStorage.setItem('viewplayer', id);
                window.location.href = 'viewplayer.html';
}
           