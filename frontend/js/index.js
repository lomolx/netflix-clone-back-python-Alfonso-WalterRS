

const links = [
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5cd1f737abdc18f94efc569d4d80bf6b',
    'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=5cd1f737abdc18f94efc569d4d80bf6b',
    'https://api.themoviedb.org/3/discover/movie?with_genres=18&primary_release_year=2014&api_key=5cd1f737abdc18f94efc569d4d80bf6b'
];

window.addEventListener('DOMContentLoaded', ()=>{
    const solicitudes = links.map(peticion=>fetch(peticion));
    Promise.all(solicitudes).then(values=>{
        return Promise.all(values.map(r=>r.json()))
    }).then(catologos=>{
        const [catalogoUno,catalogoDos,catalogoTres] = catologos;
        
        // Catalogo uno
        const populares = document.getElementById('populares');
        catalogoUno.results.forEach(pelicula => {
            const article = document.createElement('article');
            article.classList.add('pelicula');
            const img = document.createElement('img');
            img.src = 'https://image.tmdb.org/t/p/original/'+pelicula.poster_path;
            article.append(img);
            populares.append(article);
        }); 

        // Catalogo dos
        const estrenos = document.getElementById('estreno');
        catalogoDos.results.forEach(pelicula => {
            const article = document.createElement('article');
            article.classList.add('pelicula');
            const img = document.createElement('img');
            img.src = 'https://image.tmdb.org/t/p/original/'+pelicula.poster_path;
            article.append(img);
            estrenos.append(article);
        });

        // Catalogo tres
        const vistas = document.getElementById('vistas');
        catalogoTres.results.forEach(pelicula => {
            const article = document.createElement('article');
            article.classList.add('pelicula');
            const img = document.createElement('img');
            img.src = 'https://image.tmdb.org/t/p/original/'+pelicula.poster_path;
            article.append(img);
            vistas.append(article);
        });
    });
});


const filaPelicula = document.querySelectorAll(".peliculas-top")
const fila = document.querySelector(".peliculas");
const peliculas = document.querySelector(".slide-dos");

const flechaIzquierda = document.getElementById("flecha-izquierda");
const flechaDerecha = document.getElementById('flecha-derecha');

/* Evento Flecha derecha */

flechaDerecha.addEventListener('click', () => {

    peliculas.scrollLeft += peliculas.offsetWidth;

    const indicadorActivo = document.querySelector(".indicadores .activo")

    if(indicadorActivo.nextSibling){
        indicadorActivo.nextSibling.classList.add("activo");
        indicadorActivo.classList.remove("activo");

    }
});

/* Evento Flecha derecha */

flechaIzquierda.addEventListener('click', () => {

    peliculas.scrollLeft -= peliculas.offsetWidth;

    const indicadorActivo = document.querySelector(".indicadores .activo")

    if(indicadorActivo.previousSibling){
        indicadorActivo.previousSibling.classList.add("activo");
        indicadorActivo.classList.remove("activo");

    }
});

/* paginación */

const numeroPagina = Math.ceil(filaPelicula.length/5);
for (let i=0; i< numeroPagina; i++){
    const indicador = document.createElement('button');

    if(i === 0){
        indicador.classList.add("activo");
    }

    document.querySelector('.indicadores').appendChild(indicador);
    indicador.addEventListener("click", (e)=>{
        peliculas.scrollLeft = i * peliculas.offsetWidth;

        document.querySelector(".indicadores .activo").classList.remove("activo")
        e.target.classList.add("activo")
    })
}

/* Hover */

peliculas.forEach((peliculas) => {
    peliculas.addEventListener("mouseenter", (e) =>{
        const elemento = e.currentTarget;
        setTimeout(() => {
            peliculas.forEach(peliculas => peliculas.classList.remove("hover"));
            elemento.classList.add("hover")
        }, 300)
    })
}) 