import {auth,database} from'./db.js';
auth.onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        database.ref(`users/${firebaseUser.uid}`).once("value").then(s=>
            {
                if(s.val().type === "coach"){
                window.onload = updateElements();     
                }
            });
        }else{
            window.location.href = "login.html";        
        }
});

    function updateElements(){
        const els=document.getElementsByClassName("permission");
        if(els){
            for(let i=0; i<els.length;i++){
               els[i].style.visibility='visible';
            }
        }
    }