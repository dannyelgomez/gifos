/* APIKEY */
const APIKEY = "ren22FMRFUwA8v4ZLr9iObmsr0pywuPW";

//Burguer Menu
let navBar = document.getElementById('navBar');
navBar.addEventListener('click', () => {
    navBarClose.classList.remove('hidden');
    navBar.classList.add('hidden');
    document.getElementById('ulNavBar').classList.toggle('active')
});
let navBarClose = document.getElementById('navBarClose');
navBarClose.addEventListener('click', () => {
    navBarClose.classList.add('hidden');
    navBar.classList.remove('hidden');
    document.getElementById('ulNavBar').classList.toggle('active')
});

//Theme dark -light
const btnTheme = document.querySelector('#theme');
var modeTheme = 0;
btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('changeTheme');
    if (btnTheme.innerText == "Modo Nocturno") {
        btnTheme.innerText = "Modo Diurno";
        modeTheme = 1;
        /* debugger */
        ImgDarkTheme();
    } else {
        btnTheme.innerText = "Modo Nocturno";
        modeTheme = 0;
        ImgLightTheme();
    }
    //enviar informacion del cambio de tema
    localStorage.setItem('sendTheme', JSON.stringify(modeTheme));
});

let logo = document.getElementById('logo');
let burger = document.getElementById('navBar');
let closeNav = document.getElementById('navBarClose');
let camara = document.getElementById('camara');
let movie = document.getElementById('movie');
let btnSearch = document.getElementById('imgBtnSearch')

function ImgDarkTheme() {
    logo.src = "/img/Logo-modo-noc.svg";
    burger.src = "/img/burger-modo-noct.svg";
    closeNav.src = "/img/close-modo-noct.svg";
    if (camara != null && movie != null) {
        camara.src = "/img/camara-modo-noc.svg";
        movie.src = "/img/pelicula-modo-noc.svg";
    }
    if (btnSearch != null) {
        btnSearch.src = "/img/icon-search-mod-noc.svg"
    }
}

function ImgLightTheme() {
    logo.src = "/img/logo-desktop.svg";
    burger.src = "/img/burger.svg";
    closeNav.src = "/img/button-close.svg";
    if (camara != null && movie != null) {
        camara.src = "/img/camara.svg";
        movie.src = "/img/pelicula.svg";
    }
    if (btnSearch != null) {
        btnSearch.src = "/img/icon-search.svg"
    }
}
//traer información del tema actual
var modeThemeResponse = JSON.parse(localStorage.getItem('sendTheme'));

//Mantener Tema al cambiar de páginas index
if (modeThemeResponse == 1) {
    document.body.classList.toggle('changeTheme');
    btnTheme.innerText = "Modo  Diurno";
}

async function downloadFullScreen(e) {

    let imgFullScreen = document.getElementById('imgFullScreen').src;
    console.log(imgFullScreen);

    let a = document.createElement('a');
    let response = await fetch(imgFullScreen);
    let file = await response.blob();
    a.download = e.id;
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
}

var arrayFavorites = [];
var arrFav = JSON.parse(localStorage.getItem("sendFavorites"));
console.log(arrFav);
if (arrFav != null) {
    arrayFavorites = arrFav;
}

function addFavoritesFullScreen(iconFavorite) {

    let imgFullScreen = document.getElementById('imgFullScreen').src;
    console.log(imgFullScreen);

    arrayFavorites.push(imgFullScreen);
    console.log(arrayFavorites);
    localStorage.setItem('sendFavorites', JSON.stringify(arrayFavorites));
}