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
        console.log(display)
        document.querySelector(".gallery").innerHTML=display
    })



    fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(data => {
        let display = "<button class='tous'>Tous</button>"
        data.map(index=> {
            display+= `
                <button class="${index.id}">
                    ${index.name}
                </button>
            `
        })
        console.log(display)
        document.querySelector(".filter-items").innerHTML=display
        const buttonList = document.querySelectorAll("button")
        
        buttonList.forEach(filter => {    
            filter.addEventListener("click", (filter)=> {
                const figures = document.querySelectorAll(".projects") 
                const classListOfMyButton = filter.target.classList
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






