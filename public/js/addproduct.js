window.addEventListener("load", function (){
    
    let agregarProducto = document.getElementById("botonAgregar")
    agregarProducto.addEventListener("click", function(e){
        let url = window.location.href.split("/");
        let id = url [url.length -1]
        let imagen = document.querySelector(".vip img").getAttribute("src")
        let tituloProducto = document.querySelector("#vinoNombre").innerText
        let precio = document.querySelector("#vinoPrecio").innerText
        let descuento = document.querySelector("#vinoDescuento").innerText
        let cantidad = document.querySelector("#vinoCantidad").value

        let producto = {
            idProducto: id, 
            imagen: imagen,
            tituloProducto: tituloProducto,
            precio: parseFloat(precio),
            descuento: parseFloat(descuento),
            cantidad: parseFloat(cantidad)
        }

        if(localStorage.length == 0) {
            let carrito = []
            carrito.push(producto)
            localStorage.setItem("carrito", JSON.stringify(carrito))
            localStorage.setItem("totalCarrito", producto.precio * producto.cantidad)
        } else {
            let carrito = JSON.parse(localStorage.carrito)
            let arrayProductos = carrito.filter(function(producto){
                return producto.idProducto == id
            })
            if(arrayProductos.length == 0){
                carrito.push(producto)
                localStorage.setItem("carrito", JSON.stringify(carrito))
            } else {
                arrayProductos[0].cantidad == parseInt(arrayProductos[0].cantidad)+1;
                localStorage.setItem("carrito", JSON.stringify(carrito))
            }
            let totalCarrito = 0
            for (let i=0; i<carrito.length; i++) {
               let carro = carrito[i].precio * carrito[i].cantidad;
               totalCarrito += carro 
            }
            localStorage.setItem("totalCarrito", totalCarrito)
        }
        alert("Agregaste " + tituloProducto + " al carrito")
        }
)})
