let modal = null
const focusableSelector = 'i, a, input, textarea'
let focusablesElements = []
let previouslyFocusedElement = null

let modalPage1 = document.querySelector('.page1')
let modalPage2 = document.querySelector('.page2')

modalPage2.style.display = 'none'

const form = document.querySelector("#addPhotoForm")

/**
 * Fonction pour charger les travaux dans la modale
 */
const loadGalleryInModal = () => {
    const container = modal.querySelector('.modal-gallery')
    container.innerHTML = "Chargement..."

    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(data => {
            let display = ""
            data.map(index => {
                display += `
                <figure class="${index.category.id} projects editables" data-id="${index.id}">
                    <img class="editable-img" src="${index.imageUrl}" alt="${index.title}">
                    <div class="trashButton" onclick="removeWork(${index.id})"><i class="fa-solid fa-trash-can" style="color: #ffffff;"></i></div>
			    </figure>
            `

            })
            document.querySelector('.modal-gallery').innerHTML = display

        })
        .catch(error => {
            container.innerHTML = "Erreur lors du chargement."
            console.error(error)
        })
}

/**
 * Fonction pour charger les catégories dans la modale
 */
const loadCategoryInModal = () => {
    const container = modal.querySelector('#category')

    fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(data => {
            let display = `<option value="" label="Veuillez choisir une catégorie"></option>`
            data.map(index => {
                display += `                
                    <option value="${index.id}">${index.name}</option>                
                `

            })
            container.innerHTML = display

        })
        .catch(error => {
            container.innerHTML = "Erreur lors du chargement."
            console.error(error)
        })
}

/**
 * Fonction pour supprimer un projet
 * @param {Number} idToRemove 
 */
const removeWork = (idToRemove) => {
    const token = localStorage.getItem("token")

    fetch(`http://localhost:5678/api/works/${idToRemove}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    })

        .then(response => {
            if (response.status === 200 || response.status === 204) {
                document.querySelector(`figure.editables[data-id="${idToRemove}"]`).remove()
                const galleryFigure = window.document.querySelector(`.gallery figure.projects[data-id="${idToRemove}"]`)
                if (galleryFigure) {
                    galleryFigure.remove()
                }
            }

        })
        .catch(error => {
            console.error(error)
        })
}

/**
 * Fonction gérant l'ouverture de la modale
 * @param {Event} e 
 */
const openModal = function (e) {
    e.preventDefault()
    
    modal = document.querySelector("#modal1")
    focusablesElements = Array.from(modal.querySelectorAll(focusableSelector))
    previouslyFocusedElement = document.querySelector(':focus')
    modal.style.display = null
    focusablesElements[0].focus()
    
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
   
    // Chargement des datas
    loadGalleryInModal()
    loadCategoryInModal()
   
    modal.querySelector('.addPhoto').addEventListener('click', () => {
        modalPage1.style.display = 'none'
        modalPage2.style = 'display'
    })
    function goBack() {
        modalPage1.style = 'display'
        modalPage2.style.display = 'none'
    }
    modal.querySelector('.go-back').addEventListener('click', () => {
        goBack()
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData(form)
            fetch("http://localhost:5678/api/works", {
                method: 'POST',
                body: formData,
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(function () {
                    fetch("http://localhost:5678/api/works")
                        .then(response => response.json())
                        .then(data => {
                            let display = ""
                            data.map(index => {
                                display += `
                                    <figure class="${index.category.id} projects" data-id="${index.id}">
                                        <img src="${index.imageUrl}" alt="${index.title}">
                                        <figcaption>${index.title}</figcaption>
                                    </figure>
                                `
                            })
                            document.querySelector(".gallery").innerHTML = display
                            resetModalForm()
                            loadGalleryInModal()
                        })
                        .catch(error => {
                            console.error(error)
                        })
                })
                .catch(error => {
                    console.error(error)
                })


        /**
         * Fonction pour vider les champs du formulaire de la modale
         */
        function resetModalForm() {
            document.getElementById("addPhotoForm").reset()
            const preview = document.querySelector(".previewImg");
            if (preview) {
                preview.remove()
                document.querySelector(".imgicon").style.display = "block"
                document.querySelector(".addImg").style.display = "block"
                document.querySelector("#textDropFile").style.display = "block"
            }
        }

        modal.querySelector('.js-modal-close').addEventListener('click', () => {
            resetModalForm()
            goBack()
        })

        modal.addEventListener('click', () => {
            resetModalForm()
            goBack()
        })

    })
}


/**
 * Fonction pour fermer la modale
 * @param {Event} e 
 */
const closeModal = function (e) {
    if (modal === null) return
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

/**
 * Fonction pour empêcher la propagation de l'évenement
 * @param {Event} e 
 */
const stopPropagation = function (e) {
    e.stopPropagation()
}

/**
 * Fonction pour garder le focus à l'intérieur de la modale
 * @param {Event} e 
 */
const focusInModal = function (e) {
    e.preventDefault()
    let index = focusablesElements.findIndex(f => f === modal.querySelector(':focus'))
    if (e.shftKey === true) {
        index--
    } else {
        index++
    }
    if (index >= focusablesElements.length) {
        index = 0
    }
    if (index < 0) {
        index = focusablesElements.length - 1
    }
    focusablesElements[index].focus()
}

document.querySelector('.editButton').addEventListener('click', openModal)


window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === "Tab" && modal !== null) {
        focusInModal(e)
    }
})


const imageInput = document.getElementById('image')
const formButton = document.getElementById("formButton")
const titleInput = document.getElementById("title")
const categorySelect = document.getElementById("category")

imageInput.addEventListener('change', function (e) {
    const dropZone = document.getElementById('drop-zone')
    const previewImg = document.createElement('img')
    previewImg.classList.add("previewImg")
    previewImg.src = URL.createObjectURL(e.target.files[0])
    dropZone.appendChild(previewImg)

    if (previewImg) {
        document.querySelector(".imgicon").style.display = 'none'
        document.querySelector(".addImg").style.display = 'none'
        document.getElementById("textDropFile").style.display = 'none'
    }
    checkFormValidity()
})

titleInput.addEventListener('change', function (e) {
    checkFormValidity()
})

categorySelect.addEventListener('change', function (e) {
    checkFormValidity()
})

/**
 * Fonction pour s'assurer que les inputs dans le form soient remplis pour rendre le boutton de validation du form cliquable
 */
function checkFormValidity() {
    const imageOk = imageInput.files && imageInput.files.length > 0
    const titleOk = titleInput.value !== ""
    const categoryOk = categorySelect.value !== ""

    if (imageOk && titleOk && categoryOk) {
        formButton.disabled = false
        formButton.style.backgroundColor = "rgba(29, 97, 84, 1)"
    } else {
        formButton.disabled = true
        formButton.style.backgroundColor = "rgba(167, 167, 167, 1)"
    }

}


