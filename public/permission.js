import {auth,database,firebase} from'./db.js';
auth.onAuthStateChanged(firebaseUser => {
    console.log(firebaseUser);
    if(firebaseUser){
        database.ref('users/'+firebaseUser.uid).once("value").then(snapshot=>
            {   console.log(snapshot);
                if(snapshot.type === "coach"){
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
        els.forEach(el=>el.style.visibility='hidden');   
    }