import {auth, database} from'./db.js';

    var currentUser = auth.currentUser;   
    console.log(currentUser);
    if(currentUser!=null){
        database.ref('users/'+currentUser.uid).once("value").then(snapshot=>
        {if(snapshot.type === "coach"){
            window.onload = updateElements();     
            }
        });
    }else{
        window.location.href = "login.html";        
    }

    function updateElements(){
        const els=document.getElementsByClassName("permission");
        els.forEach(el=>el.style.visibility='hidden');   
    }