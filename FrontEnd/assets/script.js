const apiWork = "http://localhost:5678/api/works";

// Application bouton
filterSelection("all")
function filterSelection(c){
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

const buttonCatAll = document.getElementById("button all")
buttonCatAll.addEventListener('click', function() {
    filterSelection(c);
})
const buttonCat1 = document.getElementById("button 1")
buttonCat1.addEventListener('click', function() {
    filterSelection(1);
})

const buttonCat2 = document.getElementById("button 2")
buttonCat2.addEventListener('click', function() {
    filterSelection(2);
})
const buttonCat3 = document.getElementById("button 3")
buttonCat3.addEventListener('click', function() {
    filterSelection(3);
})

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
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
}

//appel fetch pour le portfolio
 // extrapoler la fonction 
function createNewGalleryWork(data){
  const sectionWorks = document.querySelector(".gallery");
  const figureElement = document.createElement("figure");
  figureElement.classList.add("filterDiv", data.categoryId, "show");
  figureElement.setAttribute("id", "dataWork " + data.id)
  const imageElement = document.createElement("img");
  imageElement.src = data.imageUrl;
  imageElement.crossOrigin = "anonymous";
  const nomElement = document.createElement("figcaption");
  nomElement.innerText = data.title;
  figureElement.appendChild(imageElement);
  figureElement.appendChild(nomElement);
  sectionWorks.appendChild(figureElement);
}

// appeler la fonction fetch
async function fetchWork(){
  const response = await fetch(apiWork);
  const json = await response.json();
    json.forEach(data => {
        createNewGalleryWork(data);
    })
}
fetchWork();








