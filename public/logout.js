import {auth, database} from './db';
document.querySelector('#signout').addEventListener('click', function(){
    console.log("logout");
    auth.signOut().then(function(){
        window.location = "login.html";        
    }).catch(function(error){
        console.error("signout unsuccessful");
    });
});