// function callApi() {
    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        let display = ""
        data.map(index=> {            
            display+= `
                <figure class="${index.category.id}">
                    <img src="${index.imageUrl}" alt="${index.title}">
                    <figcaption>${index.title}</figcaption>
			    </figure>
            `
        })
        console.log(display)
        document.querySelector(".gallery").innerHTML=display
    })
// }

// function callApiFilter() {
    fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(data => {
        let display = "<button class='0'>Tous</button>"
        data.map(index=> {
            display+= `
                <button class="${index.id}">
                    ${index.name}
                </button>
            `
        })
        console.log(display)
        document.querySelector(".filter-items").innerHTML=display  
        const filters = document.querySelectorAll("button")
        filters.forEach(filter => {
            
            filter.addEventListener("click", (e)=> {
                console.log("j'ai cliqué")
                console.log(e)
                console.log(e.target)
                console.log(e.target.classList[0])
            }
            )  
        })
    })
// }


// callApi()
// callApiFilter()





