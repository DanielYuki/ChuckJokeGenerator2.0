let generate = document.querySelector('.generate');

let showSelection = document.querySelector('.showSelection');
let selectBar = document.querySelector('aside');

const mainUrl = 'https://api.chucknorris.io/jokes/random?';

// solution 1
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

//solution 2
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

// Solution 3 :Best solution ?
async function generateJoke(categoryUrl) {
    let loading = document.querySelector('.test')
    let jukes = document.querySelector('.jukes');
    generate.disabled = true;
    jukes.style.display = 'none'

    loading.innerHTML = '<div class="loadingAni"><div></div><div></div><div></div><div></div></div>'
    console.log('Loading...');
    try {
        let waitJoke = await fetch(`${mainUrl}${categoryUrl}`);
        let jokeReady = await waitJoke.json();

        console.log('Ready!');
        console.log(jokeReady.value);
        console.log(jokeReady);

        loading.textContent = ""
        jukes.style.display = 'flex'
        jukes.innerHTML = jokeReady.value

    } catch (error) {
        loading.textContent = "An Error Ocurred... Please Try Again Later"
        console.error(error);
    }
    generate.classList.toggle('btnClickd')
    generate.disabled = false;
}

generate.onclick = () => {
    generate.classList.toggle('btnClickd')
    let category = document.querySelector('.categories').value
    let categoryUrl = `category=${category}`
    generateJoke(categoryUrl);
}

showSelection.onclick = () => {
    showSelection.classList.toggle('rotate');
    selectBar.classList.toggle('showHide');
}


// Detects if device is on iOS 
const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
}
// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// Checks if should display install popup notification:
if (isIos() && !isInStandaloneMode()) {
    let showModal = document.querySelector('#iosAlertBoxWebApp');
    showModal.style.animation = 'show 8s ease-in-out 2s'
    showModal.style.display = 'flex'
    setTimeout(timeOutModal = () => { showModal.style.display = 'none' }, 10000)
}

// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('service-worker.js')
        .then(function () {
            console.log('Service Worker Registered');
        }, function (error) {
            console.error(error);
        });
}