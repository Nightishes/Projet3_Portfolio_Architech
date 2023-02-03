const apiWork = "http://localhost:5678/api/works";

// Application bouton
filterSelection("all")
function filterSelection(c) {
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

fetchWork();



