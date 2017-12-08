// JavaScript source code
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCep4diOeZnGMpQIyeaO0RGCju42EKTkW4",
    authDomain: "footy-b0652.firebaseapp.com",
    databaseURL: "https://footy-b0652.firebaseio.com",
    projectId: "footy-b0652",
    storageBucket: "footy-b0652.appspot.com",
    messagingSenderId: "141339264361"
};
firebase.initializeApp(config);
var database = firebase.database();
var auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function(){
    console.log("persistence LOCAL");
}).catch(function(){
    console.error("persistence setting ERR");
});
//explicit sign out needed to clear persistence state

export{auth,database};