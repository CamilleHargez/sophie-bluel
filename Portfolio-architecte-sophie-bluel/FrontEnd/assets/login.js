document.querySelector(".login").style.fontWeight = 'bold'
document.querySelector(".logout").style.display = 'none'

document.getElementById("login").addEventListener("submit", (event)=> {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value

    console.log("Email :", email);
    console.log("Mot de passe :", password);

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({email, password})
    })

    .then(response => response.json())
    .then(response => {
        let tokenValue = response.token
        if (tokenValue) {
            window.localStorage.setItem("token", tokenValue)
            console.log("connected")
            document.querySelector(".login").style.display = 'none'
            document.querySelector(".logout").style.display = 'block'
            window.location.href = "index.html"

        }
        else {
            console.log("error")
            alert("Erreur dans l’identifiant ou le mot de passe")
        }
    })
})


// .catch(error=>{
//     console.log(error)
//     alert("Erreur dans l’identifiant ou le mot de passe")
// })