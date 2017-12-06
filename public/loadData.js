var users = [
    {
        "fname":"Mati",
        "lname":"Kucz",
        "email": "mkucz@ucsd.edu",
        "type":"coach",
        "password":"secret"
    },
    {
        "fname":"Raymond",
        "lname":"Ho",
        "email": "r4ho@ucsd.edu",
        "type":"parent",
        "password":"pizza"
    }
];

var team = {
    "name": "MBR",
    "location": "UC San Diego, 9500 Gilman Drive",
    "players":[
        {
            "fname":"Brian",
            "lname":"Thai",
            "email": "brthair4ho@ucsd.edu",
            "dob": "1994-10-11",
            "jerseynumber":"11",
            "position":"midfield",
            "pic":"/",
            "captain":"false",
            "starter":"true",
            "stats":{
                    'assist':0,
                    'goal':0,
                    'shot':0,
                    'onGoal':0,
                    'foul':0,
                    'red':0,
                    'yellow':0,
                    'corner':0,
                    'gKick':0,
                    'throw':0,
                    'pen':0
                }      
        },
        {
            "fname":"Thomas",
            "lname":"Powell",
            "email": "tpowell@ucsd.edu",
            "dob":"1974-10-11   ",
            "jerseynumber":"4",
            "position":"defence",
            "pic":"/",
            "captain":"true",
            "starter":"true",
            "stats":{
                'assist':0,
                'goal':0,
                'shot':0,
                'onGoal':0,
                'foul':0,
                'red':0,
                'yellow':0,
                'corner':0,
                'gKick':0,
                'throw':0,
                'pen':0
            } 
        }
    ],

    "schedule":[
        {
            "type": "practice",
            "opponent": "N/A",
            "time":"16:00",
            "date":"2017-11-15",
            "location":"home"
        },
        {
            "type": "match",
            "opponent": "UC Berkley",
            "time":"20:00",
            "date":"2017-11-16",
            "location":"home",
            "statsFor":{
                'goal':0,
                'assist':0,
                'shot':0,
                'onGoal':0,
                'foul':0,
                'red':0,
                'yellow':0,
                'corner':0,
                'gKick':0,
                'throw':0,
                'pen':0
            },
            "statsAgainst":{
                'goal':0,
                'assist':0,                
                'shot':0,
                'onGoal':0,
                'foul':0,
                'red':0,
                'yellow':0,
                'corner':0,
                'gKick':0,
                'throw':0,
                'pen':0
            }
        },
        {
            "type": "practice",
            "opponent": "N/A",
            "time":"18:00",
            "date":"2017-11-17",
            "location":"home",
            "result":"N/A"            
        },
        {
            "type": "match",
            "opponent": "Gooners",
            "time":"18:00",
            "date":"2017-11-23",
            "location":"away",
            "statsFor":{
                'goal':0,
                'assist':0,                
                'shot':0,
                'onGoal':0,
                'foul':0,
                'red':0,
                'yellow':0,
                'corner':0,
                'gKick':0,
                'throw':0,
                'pen':0
            },
            "statsAgainst":{
                'goal':0,
                'assist':0,                
                'shot':0,
                'onGoal':0,
                'foul':0,
                'red':0,
                'yellow':0,
                'corner':0,
                'gKick':0,
                'throw':0,
                'pen':0
            } },
        {
            "type": "match",
            "opponent": "Liverpool FC",
            "time":"18:00",
            "date":"2017-11-30",
            "location":"away",
            "statsFor":{
                'goal':0,
                'assist':0,                
                'shot':0,
                'onGoal':0,
                'foul':0,
                'red':0,
                'yellow':0,
                'corner':0,
                'gKick':0,
                'throw':0,
                'pen':0
            },
            "statsAgainst":{
                'goal':0,
                'assist':0,                
                'shot':0,
                'onGoal':0,
                'foul':0,
                'red':0,
                'yellow':0,
                'corner':0,
                'gKick':0,
                'throw':0,
                'pen':0
            } 
        },
        {
            "type": "practice",
            "opponent": "N/A",
            "time":"16:00",
            "date":"2017-12-30",
            "location":"home"
        },
    ]
};

localStorage.setItem("users", JSON.stringify(users));
localStorage.setItem("team", JSON.stringify(team));