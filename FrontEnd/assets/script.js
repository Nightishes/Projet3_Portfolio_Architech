

const apiWork = "http://localhost:5678/api/works";


// vérification token utilisateur connecté --> changer pour créer dynamiquement
function userLogging(){
    if (!sessionStorage.getItem("token")){
      // cbaState.className.replace("cba-admin-visible");
      console.log("Vous n'êtes pas connecté(e)")
    }
    else{
      document.getElementById("cba-admin1").className = "cba-admin-visible";
      document.getElementById("cba-admin2").className = "cba-admin-visible";
      document.getElementById("cba-admin3").className = "cba-admin-visible";
      document.getElementById("cba-admin-header").className = "cba-admin-visible";
      filterAdmin = document.getElementById("btnFilters");
      filterAdmin.style.display ='none';
    } 
}

// let userStateLogin = true;
userLogging();

// Application bouton
filterSelection("all")
function filterSelection(c){
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
  var btnContainer = document.getElementById("btnFilters");
  var btns = btnContainer.getElementsByClassName("btn");
  console.log(btns);
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
}

//appel fetch pour le portfolio
async function fetchWork(){
    const response = await fetch(apiWork);
    const json = await response.json();
    console.log(json);

    json.forEach(data => {
        const sectionWorks = document.querySelector(".gallery");
        // extrapoler la fonction 
        const figureElement = document.createElement("figure");
        figureElement.classList.add("filterDiv", data.categoryId, "show");
        const imageElement = document.createElement("img");
        imageElement.src = data.imageUrl;
        imageElement.crossOrigin = "anonymous";
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = data.title;
        figureElement.appendChild(imageElement);
        figureElement.appendChild(nomElement);
        sectionWorks.appendChild(figureElement);
    })
}

//appel fetch pour la modale admin
async function fetchWorkAdmin(){
  const response = await fetch(apiWork);
  const json = await response.json();
  console.log(json);
  json.forEach(data => {
      const sectionWorks = document.querySelector(".gallery-admin");
      const figureElement = document.createElement("figure");
      figureElement.classList.add("divAdmin");
      const imageElement = document.createElement("img");
      imageElement.src = data.imageUrl;
      imageElement.classList.add("adminImage", data.categoryId);
      imageElement.crossOrigin = "anonymous";
      const deleteButton = document.createElement("button")
      const binImg = document.createElement("img");
      binImg.src = 'assets/icons/bin-svgrepo-com.svg';
      deleteButton.classList.add("binDelete");
      deleteButton.setAttribute("id",  data.id)
      deleteButton.setAttribute("onclick","deleteWork(this.id);");
      const nomElement = document.createElement("figcaption");
      nomElement.innerText = "éditer";
      figureElement.appendChild(imageElement);
      figureElement.appendChild(nomElement);
      figureElement.appendChild(deleteButton)
      deleteButton.appendChild(binImg);
      sectionWorks.appendChild(figureElement);
  })
}
fetchWork();
fetchWorkAdmin();


// Refresh the galleries

function refreshWork(){
  const galleryAdmin = document.getElementsByClassName('divAdmin');
  while(galleryAdmin.length > 0){
    galleryAdmin[0].parentNode.removeChild(galleryAdmin[0]);
  }
  const galleryWork = document.getElementsByClassName('filterDiv');
  while(galleryWork.length > 0){
    galleryWork[0].parentNode.removeChild(galleryWork[0]);
  }
}

//suppression travaux 
async function deleteWork(clicked_id){
    console.log(clicked_id);  
    let token = sessionStorage.getItem("token");
    let apiWorkDelete = apiWork + "/" + clicked_id;
    let responseDelete = await fetch(apiWorkDelete, {
      method: 'DELETE',
      headers: {
         'Content-Type': "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(responseDelete);
    refreshWork();
    fetchWork();
    fetchWorkAdmin();
}
formSubmit = document.getElementById("formSubmit");

//ajout travaux
formSubmit.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(formSubmit) 
 
  let token = sessionStorage.getItem("token")
  let responseAdd = await fetch(apiWork, {
              method: 'POST',
              body : formData,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }); 
  let result = await responseAdd.json();

};


// fonctions ouvrir/fermer modale

let modal = null
const focusableSelector = 'h2, button'
let focusables = []

const openModal = function() {
  modal = document.getElementById("modal-gallery")
  focusables = Array.from(modal.querySelectorAll(focusableSelector))
  focusables[0].focus()
  modal.style.display = null
  modal.removeAttribute('aria-hidden')
  modal.setAttribute('aria-model', 'true')
}

const closeModal = function (){
  if (modal === null) return
  modal.style.display = 'none'
  modal.setAttribute('aria-hidden', 'true')
  modal.removeAttribute('aria-model')
  modal = null
}


// element d'accessibilité (tab, esc)
const focusInModal = function (e) {
  e.preventDefault()
  let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
  if (e.shiftKey === true) {
    index--
  } else {
    index++
  }
  
  if (index >= focusables.length){
    index = 0
  }
  if (index < 0) {
    index = focusables.length - 1
  }
  focusables[index].focus()
}

window.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' || e.key === 'Esc'){
    closeModal(e)
  }
  if (e.key === 'Tab' && modal !== null){
    focusInModal(e)
  }
})


// transition entre gallerie admin et ajout admin d'image

const openInputUpload = function () {
  wrapper = document.getElementById("modale-wrapper");
  uploadPage = document.getElementById('admin-modale-ajout')
  wrapper.style.display = 'none'
  uploadPage.style.display = null
}

const backWrapperSelection = function(){
  wrapper = document.getElementById("modale-wrapper");
  uploadPage = document.getElementById('admin-modale-ajout')
  uploadPage.style.display = 'none'
  wrapper.style.display = null
}

