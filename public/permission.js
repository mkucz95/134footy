import {auth,database} from'./db.js';
auth.onAuthStateChanged(firebaseUser => {
    console.log(firebaseUser.uid);
    if(firebaseUser){
        database.ref(`users/${firebaseUser.uid}`).once("value").then(s=>
            {
                if(s.val().type === "coach"){
                    console.log("coach");
                window.onload = updateElements();     
                }
            });
        }else{
            window.location.href = "login.html";        
        }
});

    function updateElements(){
        console.log("updateEl-permissions");
        const els=document.getElementsByClassName("permission");
        console.log(els);
        if(els){
            for(let i=0; i<els.length;i++){
               els[i].style.visibility='visible';
            }
        }
    }