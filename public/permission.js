// JavaScript source code

    if (localStorage.getItem('permission') == "false") {
        alert("User not allowed to access page.");
        window.location.href = "index.html";
    }
