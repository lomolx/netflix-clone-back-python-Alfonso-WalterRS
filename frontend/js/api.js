// Función para realizar la solicitud a la API http://127.0.0.1:9091/movies
async function fetchMovies() {
try {
    const response = await fetch('http://localhost:9091/movies');
    const data = await response.json();

    // Llamada a la función para mostrar los datos
    displayMovies(data);
} catch (error) {
    console.error('Error al obtener datos:', error);
}
}

// Función para mostrar los datos en la interfaz de usuario
function displayMovies(movies) {
const movieList = document.getElementById('movieList');

movies.forEach(movie => {
    const listItem = document.createElement('li');
    const video = document.createElement('video');
    const imagen = document.createElement('img');
    const titulo = document.createElement('img');
    listItem.textContent = `Title: ${movie.title}, Overview: ${movie.overview}`;
    video.src = movie.trailer;
    video.autoplay = "true";
    imagen.src = movie.poster_path;
    titulo.src = movie.titlei[5];
movieList.appendChild(listItem);
    movieList.appendChild(video);
    movieList.appendChild(imagen);
    movieList.appendChild(titulo);
});
}

// Llamada a la función para obtener y mostrar las películas al cargar la página
fetchMovies();

/*const url = 'http://localhost:9091/movies';
const username = "poncho"
const password = "12345"

let response = await fetch(url, {
    method:'GET', 
    headers: {'Authorization': 'Basic ' + btoa('username:password')}});
    let data = await response.json();
console.log(data);*/

//fetch('http://localhost:9091/movies', {headers:{'Access-Control-Allow-Origin': '*',}})

/*
let response = await fetch(url, {
    method:'GET', 
    headers: {'Authorization': 'Basic ' + btoa('username:password')}});
    let data = await response.json();
console.log(data);

let response = await fetch(url, {'mode':'no-cors', method:'GET', 
headers: {'Authorization': 'Basic ' + btoa('username:password')}});
let data = await response.json();
console.log(data);

fetch(url, {method:'GET', 
headers: {'mode':'no-cors', 'Authorization': 'Basic ' + btoa('username:password')}})
.then(response => response.json())
.then(json => console.log(json));*/

export default json;