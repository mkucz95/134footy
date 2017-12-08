import {auth, database} from './bd.js';
console.log(document.getElementById('signout'));
function logoutUser(){
        console.log("logout");
        auth.signOut().then(function(){
            window.location = "login.html";        
        }).catch(function(error){
            console.error("signout unsuccessful");
        });
}
document.getElementById('signout').addEventListener('click', logoutUser());