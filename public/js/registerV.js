window.addEventListener("load", function () {
    let form = document.querySelector("form.reservation")
    form.addEventListener("submit", function(e){
        let errores = []
        let campoNombre = document.getElementById("name")
        let campoPassword = document.getElementById("password")
        let campoEmail = document.getElementById("email")
        if (campoNombre.value == "")  {
            errores.push("Campo Nombre OBLIGATORIO")
        } else if (campoNombre.value.length < 2) {
            errores.push("El campo de nombre debe de tener al menos 2 caracteres")
        }
        if (campoEmail.value == "")  {
            errores.push("Campo Email OBLIGATORIO")
        }
        if (campoPassword.value == ""){
            errores.push("Campo Contraseña OBLIGATORIO")
        } else if (campoPassword.value.length < 8) {
            errores.push("El campo de contraseña debe de tener al menos 8 caracteres")
        }
        if (errores.length > 0) {
            e.preventDefault()
            let ulErrores = document.querySelector("div.errores ul")
            for (let index = 0; index < errores.length; index++) {
                ulErrores.innerHTML += "<li>" + errores[index] + "</li>"
            }
        }
    })
})
