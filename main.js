//DE PREFERÊNCIA, DEIXE O SERVICE WORKER NO FINAL DO ARQUIVO.JS
let generate = document.querySelector('.generate');

let showSelection = document.querySelector('.showSelection');
let selectBar = document.querySelector('aside');

const mainUrl = 'https://api.chucknorris.io/jokes/random?';

// ES6
// function generateJoke() {
//     let loading = document.querySelector('.test')
//     let jukes = document.querySelector('.jukes');

//     jukes.innerHTML = ""
//     loading.textContent = "Generating..."
//     console.log('Loading...');

//     fetch(url, {
//         method: 'GET'
//     }).then(function (response) {
//         response.json().then(function (content) {
//             console.log('Ready!');
//             loading.textContent = ""
//             jukes.innerHTML = content.value;
//             console.log(response)
//         })
//     }).catch(function (error) {
//         console.log(error)
//     })
// }

//ES8 & ES6 
// async function generateJoke() {
//     let loading = document.querySelector('.test')
//     let jukes = document.querySelector('.jukes');

//     jukes.innerHTML = ""
//     loading.textContent = "Generating..."
//     console.log('Loading...');
//     let waitJoke = await fetch(`https://api.chucknorris.io/jokes/random`)
//     .catch(function (error) {
//         loading.textContent = "An Error Ocurred... Try Again Later"
//         console.error(error);
//     });
//     let jokeReady = await waitJoke.json();
//     console.log('Ready!');
//     console.log(jokeReady);
//     loading.textContent = ""
//     jukes.innerHTML = jokeReady.value
// }

// ES8
async function generateJoke(categoryUrl) {
    let loading = document.querySelector('.test')
    let jukes = document.querySelector('.jukes');

    jukes.innerHTML = ""
    loading.textContent = "Generating..."
    console.log('Loading...');
    try {
        let waitJoke = await fetch(`${mainUrl}${categoryUrl}`);
        let jokeReady = await waitJoke.json();

        console.log('Ready!');
        console.log(jokeReady.value);
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
    let category = document.querySelector('.categories').value
    let categoryUrl = `category=${category}`
    generateJoke(categoryUrl);
}

showSelection.onclick = () => {
    selectBar.classList.toggle('showHide');
}

// Registra o service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('service-worker.js')
        .then(function () {
            console.log('Service Worker Registered');
        }, function (error) {
            console.error(error);
        });
}