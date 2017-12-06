// JavaScript source code

    if (localStorage.getItem('permission') == "false") {
        preventView();
        alert("User not allowed to access page.");
        window.location.href = "index.html";
    }

    function preventView(){
        const els=document.getElementsByClassName("permission");
        
        for(let i=0;i<els.length;i++){
            els[i].style.visibility = 'hidden';
        }
        
    }