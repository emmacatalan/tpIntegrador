let productosDisponibles = {
    "Lolita´s Jean": 38900,
    "Catalina´s Street Jeans": 35500,
    "Paula´s Rebel Jeans": 42900,
    "Sophia´s jeans": 38000,
    "Stella´s baggy jean": 34500,
    "Charlotte´s bag": 47900,
    "Mía´s Stitched StyleBag": 38000,
    "Victoria´s RusticBag": 46900,
    "Antonia´s Patchwork SackBag": 45000,
    "Agustina´s DenimBag": 43000,
    "Zuzu´s boots": 64000,
    "Bella´s boots": 63500,
    "Florencia´s threds boots": 62000,
    "GGaby´s booties": 60100,
    "Valentina Blues Boots": 63000,
    "Matilda´s top": 30000,
    "Carla Indigo Soul Top": 29800,
    "Elena Raw EdgeTop": 28000,
    "Isabela Vintage Top": 33000,
    "Rocio´s Wild DenimTop": 27000
};


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.getElementById("nombreProducto").addEventListener("input", function() {
    let nombre = this.value;
    if (productosDisponibles[nombre]) {
        document.getElementById("precioProducto").value = productosDisponibles[nombre];
    } else {
        document.getElementById("precioProducto").value = "";
    }
});

function agregarManual() {
    let nombre = document.getElementById("nombreProducto").value;
    let talle = document.getElementById("talleProducto").value;
    let cantidad = parseInt(document.getElementById("cantidadProducto").value);
    let precioUnitario = parseFloat(document.getElementById("precioProducto").value);

    if (nombre && talle && cantidad > 0 && precioUnitario > 0) {
        let precioTotal = cantidad * precioUnitario;
        carrito.push({ nombre, talle, cantidad, precioTotal });
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    } else {
        alert("Por favor, ingresa todos los datos correctamente.");
    }
}

function mostrarCarrito() {
    let listaCarrito = document.getElementById("lista-carrito");
    let totalPrecio = document.getElementById("totalPrecio");
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.talle}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.precioTotal} ARS</td>
            <td><button onclick="eliminarProducto(${index})">Eliminar</button></td>
        `;
        listaCarrito.appendChild(fila);
        total += producto.precioTotal;
    });

    totalPrecio.innerText = total;
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function finalizarCompra() {
    alert("Gracias por tu compra. El carrito se ha vaciado.");
    localStorage.removeItem("carrito");
    location.reload();
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);
