// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener();

function cargarEventListener(){
    // Agrega curso al carrito al hacer click en "Agregar Curso"
    listaCursos.addEventListener("click", agregarCurso);
}

// Funciones
function agregarCurso(e){
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function leerDatosCurso (curso){
    console.log(curso);
    // se crea objeto con datos del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    // se agrega al carrito
    articulosCarrito = [...articulosCarrito, infoCurso]
    console.log(articulosCarrito);

    carritoHTML();

}

function carritoHTML(){

    limpiarHTML();

    articulosCarrito.forEach( curso => {

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>
            ${curso.titulo}
        </td>
        `;

        contenedorCarrito.appendChild(row);
    })
}

function limpiarHTML(){
    // forma lenta
    // contenedorCarrito.innerHTML = '';
    
    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}