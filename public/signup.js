import firebase from './db.js';
const auth=firebase.auth();
import database from './db.js';

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
    var fname = document.getElementsByName["fname"].value; 
    var lname = document.getElementsByName["lname"].value;
    var email = document.getElementsByName["email"].value;
    var pass = document.getElementsByName["password"].value;
    var passCheck = document.getElementsByName["confirmPassword"].value;
    var type = document.getElementsByName["who"].value;

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
}
    function displayError(message){
        document.querySelector("#error").innerHTML = message;
    }
    function addExtra(uid, userData){
        database.ref('users/'+uid).set({
            email: userData["email"],
            fname: userData["fname"],
            lname:userData["lname"],
            type:userData["type"]
        });
    }
    function save(fname,lname,email,pass,type){
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

        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
                console.log(firebaseUser);
                addExtra(firebaseUser.uid, userData);
            }else{
                console.error('signup failed');
}});console.log("saved user");}