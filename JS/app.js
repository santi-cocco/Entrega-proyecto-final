const productos = [
  {
    id: "abedul",
    titulo: "Abedul",
    imagen: "./imagenes/abedul.jpg",
    categoria: {
      nombre: "maderas duras",
      id: "maderas-duras",
    },
    precio:  4400 ,
  },
  {
    id: "aliso",
    titulo: "Aliso",
    imagen: "./imagenes/aliso.jpg",
    categoria: {
      nombre: "maderas duras",
      id: "maderas-duras",
    },
    precio: 1800 ,
  },
  {
    id: "caoba",
    titulo: "Caoba",
    imagen: "./imagenes/caoba.jpg",
    categoria: {
      nombre: "maderas duras",
      id: "maderas-duras",
    },
    precio: 1600 ,
  },
  {
    id: "haya",
    titulo: "Haya",
    imagen: "./imagenes/haya.jpg",
    categoria: {
      nombre: "maderas blandas",
      id: "maderas-blandas",
    },
    precio: 2100 ,
  },
  {
    id: "roble",
    titulo: "Roble",
    imagen: "./imagenes/roble.jpg",
    categoria: {
      nombre: "maderas blandas",
      id: "maderas-blandas",
    },
    precio: 2400 ,
  },
  {
    id: "nogal",
    titulo: "Nogal",
    imagen: "./imagenes/nogal.jpg",
    categoria: {
      nombre: "maderas blandas",
      id: "maderas-blandas",
    },
    precio: 3000 ,
  },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll("producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML = "";
  productosElegidos.forEach(producto =>{
    
    const div = document.createElement("div")
    div.classList.add("producto");
    div.innerHTML = `
          <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
          <div class="producto-detalles">
             <h3 class="producto-titulo">${producto.titulo}</h3>
             <p class="producto-precio">$ ${producto.precio} x m2</p>
             <button class="producto-agregar" id="${producto.id}">Agregar</button>

          </div>
        `;
        contenedorProductos.append(div);
  })
  actualizarBotonesAgregar();
}
cargarProductos(productos);

//Esta funcion, es para poder navegar y filtrar los productos 
botonesCategorias.forEach(boton => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach(otroBoton => otroBoton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    const categoriaId = e.currentTarget.id.toLowerCase();

    if (categoriaId !== "todos") {
      tituloPrincipal.innerText = categoriaId;
      const productosBoton = productos.filter(producto => producto.categoria.id === categoriaId);
      cargarProductos(productosBoton);
    } else {
      tituloPrincipal.innerText = "Todos los productos";
      cargarProductos(productos);
    }
  });
});



function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-agregar");

  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

let productosEnCarrito;

const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));
if(productosEnCarritoLS){
  productosEnCarrito = productosEnCarritoLS;
  actualizarNumerito()
}else{
  productosEnCarrito = [];
}


function agregarAlCarrito(e) {

  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find(producto => producto.id === idBoton);

  if(productosEnCarrito.some(producto => producto.id === idBoton)){
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito[index].cantidad++;
  }else{
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }
  actualizarNumerito();

  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}


function actualizarNumerito(){
  let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  numerito.innerText = nuevoNumerito
}
