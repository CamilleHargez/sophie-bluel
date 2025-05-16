let modal = null // je sauvegarde une variable modal qui sera à null par défaut, elle permettra de savoir quelle boite modale est ouverte actuellement
const focusableSelector = 'i, a, input, textarea'
let focusablesElements = []
let previouslyFocusedElement = null

const loadGalleryInModal = () => {
    const container = modal.querySelector('.modal-gallery')
    container.innerHTML = "Chargement..."

fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        let display = ""
        data.map(index=> {            
            display+= `
                <figure class="${index.category.id} projects editables" data-id="${index.id}">
                    <img class="editable-img" src="${index.imageUrl}" alt="${index.title}">
                    <div class="trashButton" onclick="removeWork(${index.id})"><i class="fa-solid fa-trash-can" style="color: #ffffff;"></i></div>
			    </figure>
            `

        })
        document.querySelector('.modal-gallery').innerHTML=display
        
    })
    .catch(error => {
        container.innerHTML = "Erreur lors du chargement."
        console.error(error)
    })
}

const removeWork = function (idToRemove) {
    console.log(idToRemove)
const token = localStorage.getItem("token")
console.log(token)

    fetch(`http://localhost:5678/api/works/${idToRemove}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}`}
})

.then(response => {
    console.log(response.status)
    if (response.status === 200 || response.status === 204) {
        console.log("Item Deleted")
        document.querySelector(`figure.editables[data-id="${idToRemove}"]`).remove()
        const galleryFigure = window.document.querySelector(`.gallery figure.projects[data-id="${idToRemove}"]`)
        console.log(galleryFigure)
            if (galleryFigure) {
                galleryFigure.remove()
            }
    }

})
}

const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector("#modal1") //je crée target qui récupère le contenu de mon href
    // focusablesElements = Array.from(modal.querySelectorAll(focusableSelector))
    // previouslyFocusedElement = document.querySelector(':focus')
    modal.style.display = null //de base le style est à none donc caché dans le html
    // focusablesElements[0].focus()
    // modal.removeAttribute('aria-hidden') 
    // modal.setAttribute('aria-modal', 'true')
    // modal.addEventListener('click', closeModal)
    // modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    // modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
    loadGalleryInModal()
    modal.querySelector('#marcel').addEventListener('click', console.log("salut"))
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