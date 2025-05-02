let modal = null // je sauvegarde une variable modal qui sera à null par défaut, elle permettra de savoir quelle boite modale est ouverte actuellement
const focusableSelector = 'button, a, input, textarea'
let focusablesElements = []
let previouslyFocusedElement = null

fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        let display = ""
        data.map(index=> {            
            display+= `
                <figure class="${index.category.id} projects">
                    <img src="${index.imageUrl}" alt="${index.title}">
                    <figcaption>${index.title}</figcaption>
			    </figure>
            `
        })
        document.querySelector(".gallery").innerHTML=display
    })

const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector("#modal1") //je crée target qui récupère le contenu de mon href
    
    focusablesElements = Array.from(modal.querySelectorAll(focusableSelector))
    modal.appendChild(".gallery")
    previouslyFocusedElement = document.querySelector(':focus')
    modal.style.display = null //de base le style est à none donc caché dans le html
    focusablesElements[0].focus()
    modal.removeAttribute('aria-hidden') 
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    e.preventDefault()
    modal.style.display = 'none' 
    modal.setAttribute('aria-hidden', 'true') 
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

const focusInModal = function (e) {
    e.preventDefault()
    let index = focusablesElements.findIndex(f => f === modal.querySelector(':focus'))
    if (e.shftKey === true){
        index--
    } else {
    index ++
    }
    if (index >= focusablesElements.length) {
        index = 0 
    }
    if (index < 0) {
        index = focusablesElements.length -1
    }
    focusablesElements[index].focus()
}

document.querySelector('.editButton').addEventListener('click', openModal) // au clic, j'appelle la fonction openModal définie ci-dessus


window.addEventListener('keydown', function (e){
    if(e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === "Tab" && modal !== null) {
        focusInModal(e)
    }
})