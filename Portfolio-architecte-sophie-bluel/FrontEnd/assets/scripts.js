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
        document.querySelector(".tous").style.color=`red`
        const filters = document.querySelectorAll("button")
        
        filters.forEach(filter => {    
            filter.addEventListener("click", (e)=> {
                const figures = document.querySelectorAll("figure") 
                const myButton = e.target.classList[0]

                figures.forEach(figure => {
                    figure.style.display = `none`
                    const figureCategoryId = figure.classList[0]
                
                    if (myButton == figureCategoryId || myButton == 'tous') {
                    figure.style.display = `block`
                    }
                })
               
            }
            )  
        })
    })
// }

// button.style.background-color = #1D6154

// input[type="submit"]{
// 	font-family: 'Syne';
// 	font-weight: 700;
// 	color: white;
// 	background-color: #1D6154;
// 	margin : 2em auto ;
// 	width: 180px;
// 	text-align: center;
// 	border-radius: 60px ;


// callApi()
// callApiFilter()





