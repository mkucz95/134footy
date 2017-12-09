import { auth , database } from './db.js';

function userExists(email){
    var users = database.ref('users/');
    users.once("value").then(snapshot=>{
        console.log(snapshot);if(snapshot){
        snapshot.forEach(user=>{
            if(user.email === email) return true;
        });}
        return false
    });
} //TODO could delete this and just use server side checking

function validate(){
    console.log("validating");
    ["fname", "lname", "email", "password", "confirmPassword", "who"].forEach(e=>{
        if(e == null){printError("wrong form input");return false;}
    });
    var fname = document.getElementById("fname").value; 
    console.log(document.getElementById("fname").value);    
    var lname = document.getElementById("lname").value;
    console.log(document.getElementById("email").value);
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    var passCheck  = document.getElementById("confirmPassword").value;
    var type;
    for(let i=0;i<3;i++){
        if(document.getElementsByName("who")[i].checked){
            type=document.getElementsByName("who")[i].value;
            break;
        }
    }

    console.log(document.getElementsByName("who")[0].che);    

    var status = true;
    if(pass !== passCheck){
        printError("Passwords do Not Match", "confirm", "passErr");
        console.error("Passwords do Not Match")
        status=false;
    }
    if(userExists(email)){
        printError("User Already Exists", "username", "userErr");
        console.error("User Already Exists")
        status=false;
    }
    if(status){save(fname, lname, email, pass, type);}
    return status;
}
    function displayError(message){
        document.querySelector("#error").innerHTML = message;
    }
    function addExtra(uid, userData){
        console.log("addingUser");        
        database.ref('users/'+uid).set({
            email: userData["email"],
            fname: userData["fname"],
            lname:userData["lname"],
            type:userData["type"]
        });
        window.location.href="index.html";
    }
    function save(fname,lname,email,pass,type){
        console.log("save user");        
        var userData = {
            "fname": fname,
            "lname":lname,
            "email":email,
            "type": type,
             "password": pass
        };
        auth.createUserWithEmailAndPassword(email, pass).catch(function(error){
            var errorCode = error.code;
            var errorMessage = "";
            if(error.code == "auth/email-already-in-use"){
               errorMessage+= "User Already Exists | ";
                
            }if(error.code =="auth/weak-password"){
                errorMessage+= "Choose Better Password | ";                
            }if(error.code =="auth/invalid-email"){
                errorMessage+="Invalid Email |";
            }displayError(errorMessage);
        });

        auth.onAuthStateChanged(firebaseUser => {
            console.log(firebaseUser)
            if(firebaseUser){
                console.log(firebaseUser);
                addExtra(firebaseUser.uid, userData);
            }else{
                console.error('signup failed');
    }});
}

window.onload=function(){
    document.getElementById("submit").onclick = validate;
}