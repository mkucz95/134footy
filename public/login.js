import {auth, database} from './db.js';
const signup = document.querySelector('#signup');
const loginDoc = document.querySelector('#login');
const forgotInfo = document.querySelector('#forgot');
const forgotPass = document.querySelector('#send>button');

signup.addEventListener('click', e=>{
   window.location = 'signup.html';
});

loginDoc.addEventListener('click', e=>{
    const email=document.getElementById("username").value;
    const pass=document.getElementById("password").value;
    const promise=auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e=>
        {
            console.error(e.message);
            document.querySelector("#loginError").innerHTML=e.message
        });
});
forgotInfo.addEventListener('click', e=>{
    document.querySelector("#send").style.visibility='visible';
});
forgotPass.addEventListener('click', e=>{
   let email = document.querySelector("#send>#email").value;
   auth.sendPasswordResetEmail(email).then(function(){
       document.getElementById("successSend").style.visibility='visible';
   }).catch(err => document.getElementById("errorSend").style.visibility='visible');
});

auth.onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        console.log(firebaseUser);
    }else{
        console.log('logged out');
        window.location = 'login.html';
    }
});

