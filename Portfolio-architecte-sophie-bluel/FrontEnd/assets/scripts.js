// Homepage
document.querySelector(".editionMode").style.display = 'none'
document.querySelector(".editButton").style.display = 'none'

const logoutButton = document.querySelector(".logout")
logoutButton.style.display = 'none'

const displayImageGalleryHomepage = () => {
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
        })
        .catch(error => {
            console.error(error)
        })
}

displayImageGalleryHomepage()
window.displayImageGalleryHomepage = displayImageGalleryHomepage


fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(data => {
        let display = "<button class='tous active'>Tous</button>"
        data.map(index => {
            display += `
                <button class="${index.id}">
                    ${index.name}
                </button>
            `
        })


        document.querySelector(".filter-items").innerHTML = display
        const buttonList = document.querySelectorAll("button")


        buttonList.forEach(filter => {
            filter.addEventListener("click", (event) => {
                const figures = document.querySelectorAll(".projects")
                const classListOfMyButton = event.target.classList
                const firstClassOfCurrentButton = classListOfMyButton[0]

                if (!classListOfMyButton.contains('active')) {
                    buttonList.forEach(button => {
                        button.classList.remove(`active`)
                    })
                    classListOfMyButton.add('active')

                }


                figures.forEach(imageFigure => {
                    imageFigure.style.display = `none`
                    const figureCategoryId = imageFigure.classList[0]

                    if (firstClassOfCurrentButton == figureCategoryId || firstClassOfCurrentButton == 'tous') {
                        imageFigure.style.display = `block`
                    }
                })

            }
            )
        })

    })

    .catch(error => {
        console.error(error)
    })

 // Homepage edit 

let token = localStorage.getItem("token")

if (token) {
    document.querySelector(".login").style.display = 'none'
    logoutButton.style = 'display'
    document.querySelector(".filter-items").style.display = 'none'
    document.querySelector(".editionMode").style = 'display'
    document.querySelector(".editButton").style = 'display'
}

logoutButton.addEventListener("click", logout => {
    localStorage.removeItem("token")
})


