// récupérer les crédentials, valider ou confirmer

const apiUsers = 'http://localhost:5678/api/users/login';


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
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3NTcwNTU2MCwiZXhwIjoxNjc1NzkxOTYwfQ.ofJF-UcRPInvrE_yOPzySON0h1Pc7v4xUWOxS18-Xww
      });
      
      if(response.status == 200){
        const token = await response.json();
        sessionStorage.setItem("token", token.token);
        // document.cookie = "access_token = []";
        window.location = "index.html";
        //cookie secure + fonction globale (?)
      } else{
        document.getElementById("password-false").className = "password-false-display";
      };
      
}
  


addEventListener('submit', (event) => {
    event.preventDefault();
    authentification();
});