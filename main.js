//DE PREFERÊNCIA, DEIXE O SERVICE WORKER NO FINAL DO ARQUIVO.JS
let generate = document.querySelector('.generate');

const url = 'https://api.chucknorris.io/jokes/random';



async function generateJoke() {
    let loading = document.querySelector('.test')
    let jukes = document.querySelector('.jukes');

    jukes.innerHTML = ""
    loading.textContent = "Generating..."
    console.log('Loading...');
    try {
        let waitJoke = await fetch(`https://api.chucknorris.io/jokes/random`);
        let jokeReady = await waitJoke.json();
        console.log('Ready!');
        console.log(jokeReady);
        loading.textContent = ""
        jukes.innerHTML = jokeReady.value
    } catch (error) {
        loading.textContent = "An Error Ocurred... Try Again Later"
        console.error(error);
        console.log('Try again Later')
    }
}

generate.onclick = () => {
    generateJoke();
}

// Registra o service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(function () {
            console.log('Service Worker Registered');
        }, function (error) {
            console.error(error);
        });
}