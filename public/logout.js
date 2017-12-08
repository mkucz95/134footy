import {auth, database} from './bd.js';
console.log(document.getElementById('signout'));
document.getElementById('signout').addEventListener('click', function(){
    console.log("logout");
    auth.signOut().then(function(){
        window.location = "login.html";        
    }).catch(function(error){
        console.error("signout unsuccessful");
    });
});