window.addEventListener("load", function () {
    let form = document.querySelector("form#reservation")
    form.addEventListener("submit", function (e) {
        let errores = []
        let campoEmail =  document.getElementById("usuario")
        let campoPassword =  document.getElementById("password")
        if (campoEmail.value == "")  {
            errores.push("Campo Email OBLIGATORIO")
        }
        if (campoPassword.value == ""){
            errores.push("Campo Contraseña OBLIGATORIO")
        }
        if (errores.length > 0) {
            e.preventDefault()
            let ulErrores = document.querySelector("div.errores ul")
            for (let index = 0; index < errores.length; index++) {
                ulErrores.innerHTML = "<li>" + errores[index] + "</li>"
            }
        }
    })
})