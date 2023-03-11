// récupérer les crédentials, valider ou confirmer

const apiUsers = 'http://localhost:5678/api/users/login';

function setCookieLogin(name,value,expires){
  document.cookie = name + "=" + value + "; SameSite=None; Secure;" +  ((expires==null) ? "" : ";expires=" + expires.toGMTString()) 
}


async function authentification(){
  let user = {
    email : document.getElementById("email").value,
    password : document.getElementById("password").value,
  };
    let response = await fetch(apiUsers, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user)
      });
      
      if(response.status == 200){
        const token = await response.json();
        const value = token.token
        const name = "token";
        setCookieLogin(name, value);
        window.location = "index.html";
      } else{
        document.getElementById("password-false").className = "password-false-display";
      }
}
  
addEventListener('submit', (event) => {
    event.preventDefault();
    authentification();
});