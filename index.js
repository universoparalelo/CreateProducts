import {getProducts, addProduct, deleteProduct} from './js/conexionAPI.js';

const listaProductos = document.querySelector('.principal__productos__lista');
const agregarProducto = document.querySelector('#agregarProducto');
let botonesEliminar;

main();

agregarProducto.addEventListener('click', evento => cargarProducto(evento));


async function main(){
    const productos = await getProducts();
    
    productos.forEach(producto => {
        let divProducto = document.createElement('div');
        divProducto.classList.add('principal__productos__lista__producto');
        const productoHTML = `
                    <img src=${producto.imagen} alt=${producto.nombre}>
                    <p>${producto.nombre}</p>
                    <div class="principal__productos__lista__producto__detalle">
                        <p>Precio: $${producto.precio}</p>
                        <a class="${producto.id}"><img src="/img/delete.png" class="eliminar__producto" alt="icono eliminar"></a>
                    </div>   
                    `;
        divProducto.innerHTML += productoHTML;
        listaProductos.appendChild(divProducto);
    });

    botonesEliminar = document.querySelectorAll('.eliminar__producto');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', evento => eliminarProducto(evento));
    });

    async function eliminarProducto(evento){
        evento.preventDefault();
        const response = await deleteProduct(evento.target.parentElement.classList[0]);
        console.log(response.statusText);
    }
}


async function cargarProducto(evento){
    evento.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const precio = document.querySelector('#precio').value;
    const imagen = document.querySelector('#imagen').value;
    const producto = {
        nombre,
        precio,
        imagen
    };
    const response = await addProduct(producto);
    
    console.log(response.statusText);
        
}

async function showingMessages(){
    await Toastify({
        text: "El producto fue cargado exitosamente",
        duration: 3000, // Duración en milisegundos (3 segundos)
        gravity: "top", // 'top' o 'bottom'
        position: "right", // 'left', 'center', o 'right'
        backgroundColor: "#4CAF50", // Color verde para indicar éxito
        close: true, // Muestra botón de cerrar
      }).showToast();  
}





