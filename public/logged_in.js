// JavaScript source code
if (!localStorage.getItem('logged_in')) {
    alert("User Not Logged In");
    window.location.href = "login.html";
}