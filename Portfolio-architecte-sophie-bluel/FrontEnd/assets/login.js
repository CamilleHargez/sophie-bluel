document.querySelector(".login").style.fontWeight = 'bold'

// Envoyer les données du form à l'API et gérer la réponse selon le résultat 
document.getElementById("login").addEventListener("submit", (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })

        .then(response => response.json())
        .then(response => {
            let tokenValue = response.token
            if (tokenValue) {
                window.localStorage.setItem("token", tokenValue)
                window.location.href = "index.html"
            }
            else {
                alert("Erreur dans l’identifiant ou le mot de passe")
            }
        })
        .catch(error => {
            console.error(error)
        })
})