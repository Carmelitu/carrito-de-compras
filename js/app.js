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
    
    // Elimina curso al clickear la X
    carrito.addEventListener("click", eliminarCurso);

    // Carga carrito del LocalStorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    })

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener("click", () => {
        articulosCarrito = [];
        limpiarHTML();
    });
}

// Funciones

// Agrega curso al carrito
function agregarCurso(e){
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Lee los datos del curso seleccionado
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
    // revisa si el curso ya esta en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if (existe){
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id){
                curso.cantidad ++;
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // se agrega al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }
    carritoHTML();
}

// La funcion principal que mantiene actualizado el carrito
function carritoHTML(){

    limpiarHTML();

    articulosCarrito.forEach( curso => {

        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;

        contenedorCarrito.appendChild(row);
    })

    // Sincroniza con Local Storage
    sincronizarStorage();

}

// Limpia HTML
function limpiarHTML(){
    // forma lenta
    // contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

// Elimina curso
function eliminarCurso(e){
    if (e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        // elimina del arreglo por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML();
    }
}

// Mantiene el curos actualizado en LocalStorage en cada modificacion
function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}
