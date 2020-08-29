/* APIKEY */
const APIKEY = "ren22FMRFUwA8v4ZLr9iObmsr0pywuPW";

/* Menu hamburguesa */
let navBar = document.getElementById('navBar');
navBar.addEventListener('click', () => {
    document.getElementById('ulNavBar').classList.toggle('active')
});

/* Cambiar tema Nocturno */
const btnTheme = document.getElementById('theme');
var modeTheme = 0;
btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('changeTheme');
    if (btnTheme.innerText == "Modo Nocturno") {
        btnTheme.innerText = "Modo Diurno";
        modeTheme = 1;
    } else {
        btnTheme.innerText = "Modo Nocturno";
        modeTheme = 0;
    }
    /* Enviar información del cambio de modo */
    localStorage.setItem('sendTheme', JSON.stringify(modeTheme));
});

/* Traer información del modo actual */
var modeThemeResponse = JSON.parse(localStorage.getItem("sendTheme"));

if (modeThemeResponse == 1) {
    document.body.classList.toggle('changeTheme');
    btnTheme.innerText = "Modo Diurno";
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

    let idImgHtml = iconFavorite.id;
    let extractLastDigit = idImgHtml.slice(6, idImgHtml.length);
    let tagGif = document.getElementById(`imgGIF${extractLastDigit}`);
    arrayFavorites.push(imgFullScreen);
    console.log(arrayFavorites);
    localStorage.setItem('sendFavorites', JSON.stringify(arrayFavorites));
}