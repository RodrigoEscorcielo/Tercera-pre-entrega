// <-- Inicio - Tercera pre entrega --> 
let arrayCarrito = JSON.parse(localStorage.getItem("arrayCarrito")) || [];

class Posters {
    constructor(id, nombre, precio, tipo, imagen){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.tipo = tipo;
        this.imagen = imagen;
    }
};

const contendorProductos = document.getElementById("contendorProductos");
const menu = document.getElementById("menu");

function crearProductoElemento(producto, esCarrito = false) {
    const productoContenedor = document.createElement("div");
    productoContenedor.className = "producto";

    const productoImagen = document.createElement("img");
    productoImagen.src = producto.imagen;
    productoImagen.className = "productoImagen";

    const productoDetalles = document.createElement("div");
    productoDetalles.className = "productoDetalles";

    const productoTitulo = document.createElement("h1");
    productoTitulo.textContent = producto.nombre;
    productoTitulo.className = "productoTitulo";

    const productoPrecio = document.createElement("h2");
    productoPrecio.textContent = producto.precio;
    productoPrecio.className = "productoPrecio";

    const productoTipo = document.createElement("p");
    productoTipo.textContent = producto.tipo;
    productoTipo.className = "productoTipo";

    productoDetalles.appendChild(productoTitulo);
    productoDetalles.appendChild(productoTipo);
    productoDetalles.appendChild(productoPrecio);

    if (esCarrito) {
        const productoEliminar = document.createElement("button");
        productoEliminar.textContent = "Eliminar";
        productoEliminar.className = "productoEliminar";
        productoEliminar.onclick = () => eliminarDelCarrito(producto.id);
        productoEliminar.addEventListener('click', () => {
            Toastify({
                text: "Producto eliminado del carrito",
                duration: 3000,
                style: {
                    background: '#f44336',
                    color: 'white', 
                    borderRadius: '10px', 
                    padding: '15px', 
                    fontSize: '16px'
                }
            }).showToast();
        });
        productoDetalles.appendChild(productoEliminar);
    } else {
        const productoAgregar = document.createElement("button");
        productoAgregar.textContent = "Agregar";
        productoAgregar.className = "productoAgregar";
        productoAgregar.onclick = () => agregarAlCarrito(producto.id);
        productoAgregar.addEventListener('click', () => {
            Toastify({
                text: "Producto agregado al carrito",
                duration: 3000,
                style: {
                    background: '#4CAF50',
                    color: 'white', 
                    borderRadius: '10px', 
                    padding: '15px', 
                    fontSize: '16px'
                }
            }).showToast();
        });
        productoDetalles.appendChild(productoAgregar);
    }

    productoContenedor.appendChild(productoImagen);
    productoContenedor.appendChild(productoDetalles);
    
    return productoContenedor;
}

function todosLosProductos(producto){
    const productoElemento = crearProductoElemento(producto);
    contendorProductos.appendChild(productoElemento);
}

arrayPosters.forEach(el => todosLosProductos(el));

const botonesProductosFiltrados = tipo => {
    contendorProductos.innerHTML = "";
    const productos = tipo === 1 ? arrayPosters : tipo === 2 ? arrayPosters.slice(0, 8) : tipo === 3 ? arrayPosters.slice(8, 16) : [];
    productos.forEach(el => todosLosProductos(el));
}

function agregarAlCarrito(productoId) {
    const productoElegido = arrayPosters.find(el => el.id === productoId);
    if (productoElegido) {
        const nuevoPoster = new Posters(productoElegido.id, productoElegido.nombre, productoElegido.precio, productoElegido.tipo, productoElegido.imagen);
        arrayCarrito.push(nuevoPoster);
        localStorage.setItem("arrayCarrito", JSON.stringify(arrayCarrito));
    };
};

function eliminarDelCarrito(productoId) { 
    const objetoAEliminar = arrayCarrito.find(el => el.id === productoId);
    if (objetoAEliminar) {
        const indiceAEliminar = arrayCarrito.indexOf(objetoAEliminar);
        arrayCarrito.splice(indiceAEliminar, 1);
        localStorage.setItem("arrayCarrito", JSON.stringify(arrayCarrito));
        mostrarCarrito();
    } 
}

function mostrarCarrito() {
    contendorProductos.innerHTML = "";
    if (arrayCarrito.length > 0) {
        arrayCarrito.forEach(producto => {
            const productoElemento = crearProductoElemento(producto, true);
            contendorProductos.appendChild(productoElemento);
        });
    } else {
        contendorProductos.textContent = "Tu carrito está vacío :(";
    }
}

function agregarEventoBotones(){
    const botonesDelMenu = document.querySelectorAll(".botonCategoria");
    botonesDelMenu.forEach(boton => {
        boton.addEventListener("click", (e) => {
            botonesDelMenu.forEach(boton => boton.classList.remove("active"));
            e.currentTarget.classList.add("active");
        });
    });
}

const boton1 = document.createElement("button");
boton1.innerHTML = `<i class="bi bi-arrow-90deg-right"></i></i>Todos los productos</li>`;
boton1.className = "botonMenu botonCategoria";
boton1.onclick = () => botonesProductosFiltrados(1);

const boton2 = document.createElement("button");
boton2.innerHTML = `<i class="bi bi-arrow-right-circle"></i>Portadas Peliculas</li>`;
boton2.className = "botonMenu botonCategoria";
boton2.onclick = () => botonesProductosFiltrados(2);

const boton3 = document.createElement("button");
boton3.innerHTML = `<i class="bi bi-arrow-right-circle"></i>Portadas Musica</li>`;
boton3.className = "botonMenu botonCategoria";
boton3.onclick = () => botonesProductosFiltrados(3);

const boton4 = document.createElement("button");
boton4.innerHTML = `<i class="bi bi-box"></i> Carrito</li>`;
boton4.className = "botonMenu botonCategoria";
boton4.onclick = () => mostrarCarrito();

menu.appendChild(boton1);
menu.appendChild(boton2);
menu.appendChild(boton3);
menu.appendChild(boton4);

agregarEventoBotones();
// <-- Fin - Tercera pre entrega --> 