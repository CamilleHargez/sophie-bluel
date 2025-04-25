let modal = null // je sauvegarde une variable modal qui sera à null par défaut, elle permettra de savoir quelle boite modale est ouverte actuellement
const focusableSelector = 'button, a, input, textarea'
let focusablesElements = []

const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href')) //je crée target qui récupère le contenu de mon href
    focusablesElements = Array.from(modal.querySelectorAll(focusableSelector))
    modal.style.display = null //de base le style est à none donc caché dans le html
    modal.removeAttribute('aria-hidden') 
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return
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
}

document.querySelectorAll('.editButton').forEach(a => {
    a.addEventListener('click', openModal) // au clic, j'appelle la fonction openModal définie ci-dessus

})

window.addEventListener('keydown', function (e){
    if(e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === "Tab" && modal !== null) {
        focusInModal(e)
    }
})