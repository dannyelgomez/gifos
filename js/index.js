/* APIKEY */
const APIKEY = "ren22FMRFUwA8v4ZLr9iObmsr0pywuPW";

/* Menu hamburguesa */
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



function fullScreen(iconFullScreen) {


    let idImgFullScreen = iconFullScreen.id;
    let extractLastDigit = idImgFullScreen.slice(6, idImgFullScreen.length);
    let imgFullScreenSrc = document.getElementById(`imgGIF${extractLastDigit}`).src;

    let imgClose = document.createElement('img');
    imgClose.src = '../img/close.svg';
    imgClose.classList.add('styleClose');
    imgClose.setAttribute('onclick', 'closeFullScreen()');


    /* CONTENEDOR CON IMAGEN Y FLECHAS - SIGUIENTE ANTERIOR *********************************/

    let imgFullScreen = document.createElement('img');
    imgFullScreen.src = imgFullScreenSrc;
    imgFullScreen.classList.add('styleImgFullScreen');
    imgFullScreen.setAttribute('id', `imgFullScreen`);

    
    let divImgDirection = document.createElement('div');
    divImgDirection.classList.add('styleImgDirection');

    divImgDirection.appendChild(imgFullScreen);



    /* CONTENEDOR CON TITULOS Y ICONOS *******************/
    let pUser = document.createElement('p');
    pUser.innerText = "User";

    let getTitle = document.getElementById(`divGif${extractLastDigit}`);
    let sendTitle = getTitle.getElementsByClassName('pTitle')[0].innerText;

    let pTitle = document.createElement('p');
    pTitle.innerText = sendTitle;

    let divText = document.createElement('div');
    divText.classList.add('styleDivText');

    divText.appendChild(pUser);
    divText.appendChild(pTitle);

    let imgFavorite = document.createElement('img');
    imgFavorite.src = "img/icon-fav-hover.svg";
    imgFavorite.setAttribute('onclick', 'addFavoritesFullScreen(this)');
    imgFavorite.setAttribute('class', 'icon imgFavorite');


    let imgDownload = document.createElement('img');
    imgDownload.src = "img/icon-download.svg";
    imgDownload.setAttribute('onclick', 'downloadFullScreen(this)');
    imgDownload.setAttribute('class', 'icon imgDownload');

    let divDescription = document.createElement('div');
    divDescription.classList.add('styleDivDescription');

    divDescription.appendChild(divText);
    divDescription.appendChild(imgFavorite);
    divDescription.appendChild(imgDownload);

    /* CONTENEDOR PRINCIPAL *********************/
    let divFullScreen = document.getElementById('divFullScreen');
    divFullScreen.classList.add('styleFullScreen');
    divFullScreen.classList.remove('hidden');

    divFullScreen.appendChild(imgClose);
    divFullScreen.appendChild(divImgDirection);
    divFullScreen.appendChild(divDescription);
    document.querySelector('body').appendChild(divFullScreen);


}