document.addEventListener('DOMContentLoaded', consultarAPI);//apenas abre la pagina hace una llamada a la api
const principal = document.querySelector('.principal');
const input = document.getElementById('input');
const form = document.getElementById('form');

form.addEventListener('submit', () => {
    let valor = input.value
    return console.log(valor);
})


function consultarAPI() {

    const API_KEY = "ce21306042feaaae8711def9ee5c6e53"

    let ciudad = "lozada";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},{AR}&appid=${API_KEY}`

    fetch(url)
        .then(response => response.json())
        .then(data => imprimirHTML(data))

}



function imprimirHTML(datos) {

    const { main: { temp, feels_like, humidity }, name } = datos;

    let temperatura = kelvinACentigrados(temp);
    let termica = kelvinACentigrados(feels_like);


    let html = '';

    html += `
        <div class="card">
        <img src="/image/clima.png" alt="">
        <h2>${name}</h2>
        <h1>${temperatura}°c</h1>
        <p>Humedad: ${humidity}%</p>
        <p>Sensación Termica: ${termica}°</p>
        
        </div>   
        `
    principal.innerHTML = html;
}

const kelvinACentigrados = grados => (grados - 273.15).toFixed(1);