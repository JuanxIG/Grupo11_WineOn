window.addEventListener("load", function () {
    let form = document.querySelector("form.reservation")
    form.addEventListener("submit", function(e){
        let campoNombre = document.getElementById("name")
        let campoApellido = document.getElementById("lastName")
        let campoPassword = document.getElementById("password")
        let campoEmail = document.getElementById("email")
       if (campoNombre.value == "") {
           e.preventDefault()
           document.getElementById("error-name").innerText = "Tenes que ingresar un nombre"
        }
       if (campoApellido.value == "") {
        e.preventDefault()
        document.getElementById("error-lastname").innerText = "Tenes que ingresar un apellido"
        }
        if (campoEmail.value == "")  {
            e.preventDefault()
            document.getElementById("error-email").innerText = "Tenes que ingresar un email"
        } else if (campoEmail.value != ""){
            document.getElementById("error-email").innerText = ""
        }
        if (campoPassword.value == ""){
            e.preventDefault()
            document.getElementById("error-pass").innerText = "Tenes que ingresar una contraseña"
        } else if (campoPassword.value != ""){
            document.getElementById("error-pass").innerText = ""
        }
    })
})
