// fonctions ouvrir/fermer modale

let modal = null
const focusableSelector = 'h2, button, figure, input'
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
    const submitButtonAdmin = document.querySelector(".label-validation")
    submitButtonAdmin.style.backgroundColor = '#A7A7A7';
    formSubmit.reset();
    previewDelete();
    backWrapperSelection();
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
    const submitButtonAdmin = document.querySelector(".label-validation")
    submitButtonAdmin.style.backgroundColor = '#A7A7A7';
    formSubmit.reset()
    previewDelete()
  }
  
  