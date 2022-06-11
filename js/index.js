// selectores
const principal = document.querySelector('.principal');
const bienvenida = document.querySelector('.bienvenida');
const spinner = document.querySelector('.spinner');

//Formulario
const input = document.getElementById('input');
const formulario = document.getElementById('form');

//Escuchar el submit del formulario para llamar la api
formulario.addEventListener('submit', consultarAPI)

//Llamar a la api con el input del forulario
function consultarAPI(e) {
    e.preventDefault();

    let ciudad = input.value;//Ciudad ingresada

    const API_KEY = "ce21306042feaaae8711def9ee5c6e53";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},{AR}&appid=${API_KEY}`

    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (data.cod === "404") {
                alert("Ciudad no encontrada");
                location.reload()
            }

            imprimirHTML(data)
        })

    //Quitamos el cartel de bienenido Y reseteamos el form
    limipiarHTML()
    formulario.reset()
};





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

function limipiarHTML() {
    while (principal.firstChild) {
        principal.removeChild(principal.firstChild);
    }
}


const kelvinACentigrados = grados => (grados - 273.15).toFixed(1);