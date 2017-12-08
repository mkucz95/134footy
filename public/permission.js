// JavaScript source code
import firebase from './db.js';
import database from'./db.js';
const auth = firebase.auth();

function userPermissions(){
    var currentUser = auth.currentUser;    
    if(currentUser!=null){
        database.ref('users/'+currentUser.uid).once("value").then(snapshot=>
        {if(snapshot.type === "coach"){
            const els=document.getElementsByClassName("permission");
            els.forEach(el=>el.style.visibility='hidden');        
            }
        });
    }else{
        window.location.href = "login.html";        
    }
}

window.onload = userPermissions;