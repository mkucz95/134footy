import {auth, database} from './db.js';
function logoutUser(){
        console.log("logout");
        auth.signOut().then(function(){
            window.location = "login.html";       
        }).catch(function(error){
            console.error("signout unsuccessful");
        });
}
    document.getElementById('signout').onclick = function(){logoutUser();};