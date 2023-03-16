// vérification token utilisateur connecté --> Check le cookie token

function userLogging(){
  const loginSwap = document.getElementById("loginHtml")
  const cbaAdminHeader = document.getElementById("cba-admin-header")
  const projetHeader = document.querySelector(".projet-header-flex");
    if (document.cookie.split(";").some((item) => item.includes("token="))){
      document.getElementById("cba-admin1").className = "cba-admin-visible";
      document.getElementById("cba-admin2").className = "cba-admin-visible";
      loginSwap.innerHTML= "logout"
      loginSwap.setAttribute("onclick","logout();")
      cbaAdminHeader.className = "cba-admin-visible";
      cbaAdminHeader.style.display = "flex"
      projetHeader.setAttribute("style", "margin-bottom:6em");
      const boutonAdminModifier = document.createElement("button");
      boutonAdminModifier.setAttribute("id",  "cba-admin3");
      boutonAdminModifier.classList.add("cba-admin-visible");
      boutonAdminModifier.setAttribute("onclick", "openModal()")
      projetHeader.appendChild(boutonAdminModifier);
      const emojiAdminModifier = document.createElement("img")
      emojiAdminModifier.src = 'assets/icons/pen-to-square-regular.svg';
      boutonAdminModifier.appendChild(emojiAdminModifier);
      const spanAdminModifier = document.createElement("span")
      spanAdminModifier.innerHTML = "modifier";
      boutonAdminModifier.appendChild(spanAdminModifier);
      filterAdmin = document.getElementById("btnFilters");
      filterAdmin.style.display ='none';
    }
    else{
      cbaAdminHeader.style.display = "none"
    }
}
// let userStateLogin = true;
userLogging();

function logout(){
  document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
  location.reload();
}

function createNewAdminGalleryWork(data){
    const sectionWorks = document.querySelector(".gallery-admin");
    const figureElement = document.createElement("figure");
    figureElement.classList.add("divAdmin");
    const imageElement = document.createElement("img");
    imageElement.src = data.imageUrl;
    figureElement.setAttribute("id", "data " + data.id)
    imageElement.classList.add("adminImage", data.categoryId);
    imageElement.crossOrigin = "anonymous";
    const deleteButton = document.createElement("button")
    const binImg = document.createElement("img");
    binImg.src = 'assets/icons/trash-can-solid.svg';
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
}

async function fetchWorkAdmin(){
    const response = await fetch(apiWork);
    const json = await response.json();
    json.forEach(data => {
        createNewAdminGalleryWork(data);
    });
    const figureFirstElement = document.querySelectorAll(".divAdmin")[0]
    const moveWork = document.createElement("bouton");
    moveWork.classList.add("moveWork");
    const moveImg = document.createElement("img");
    moveImg.src = 'assets/icons/arrows-up-down-left-right-solid.svg';
    figureFirstElement.appendChild(moveWork)
    moveWork.appendChild(moveImg);
}

fetchWorkAdmin();

// suppression travaux
  async function deleteWork(clicked_id){  
    let token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
    let apiWorkDelete = apiWork + "/" + clicked_id;
    let responseDelete = await fetch(apiWorkDelete, {
      method: 'DELETE',
      headers: {
         'Content-Type': "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    });
    const figureDelete = document.getElementById("data " + clicked_id);
    const figureWorkDelete = document.getElementById("dataWork " + clicked_id);
    figureDelete.remove();
    figureWorkDelete.remove()
}

const preview = (event) => {
    //   Get the selected files.
    const imageFiles = event.target.files;
    const fileDescription = document.querySelector("#fileDescription")
    const labelDescription = document.querySelector("#labelFileSubmit")
    const inputZone = document.querySelector(".carre-input-file")
    //  Count the number of files selected.
    const imageFilesLength = imageFiles.length;
    //  If at least one image is selected, then proceed to display the preview.
    if (imageFilesLength > 0) {
        //   Get the image path.
        const imageSrc = URL.createObjectURL(imageFiles[0]);
        //   Select the image preview element. + display
        const imagePreviewElement = document.querySelector("#previewImage");
        imagePreviewElement.src = imageSrc;
        imagePreviewElement.style.height = "200px";
        inputZone.style.padding = "0";
        fileDescription.style.display ="none";
        labelDescription.style.display ="none";
    }
};

function previewDelete(){
    const fileDescription = document.querySelector("#fileDescription")
    const labelDescription = document.querySelector("#labelFileSubmit")
    const inputZone = document.querySelector(".carre-input-file")
    const imagePreviewElement = document.querySelector("#previewImage");
    imagePreviewElement.src = "../FrontEnd/assets/icons/picture-svgrepo-com 1.svg";
    imagePreviewElement.style.height = "50%";
    inputZone.style.padding = "22px 0 0 0";
    fileDescription.style.display ="block";
    labelDescription.style.display ="block";
}

//ajout travaux
formSubmit = document.getElementById("formSubmit");
formSubmit.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(formSubmit) 
  let token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
  let responseAdd = await fetch(apiWork, {
              method: 'POST',
              body : formData,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }); 
    const data = await responseAdd.json();
    if (responseAdd.ok){
      createNewAdminGalleryWork(data);
    createNewGalleryWork(data);
    previewDelete();
    formSubmit.reset();
    closeModal();  
    } else{
      alert("Echec de l'opération, veuillez réessayer")
    }
};

function changeColorButton(){
  const elements = document.querySelectorAll('.requiredField');
  const submitButtonAdmin = document.querySelector(".label-validation")
  const fileSubmitCheck = document.getElementById("fileSubmit").value
  const titleSubmitCheck = document.getElementById("titreWorkAdmin").value
  elements.forEach(element => {
     if (element.value === "" || fileSubmitCheck === "" || titleSubmitCheck === "") {
      submitButtonAdmin.style.backgroundColor = '#A7A7A7';
     } else {
      submitButtonAdmin.style.backgroundColor = '#1D6154';
     }
  });
}

formSubmit.onchange = (e) =>{
  changeColorButton();
}

