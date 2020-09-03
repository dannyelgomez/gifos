let divImagesCreateGifos = document.getElementById('imagesCreateGifos');
let divSaveFirstGifo = document.getElementById('saveFirstGifo');
let btnGeneral = document.getElementById('buttonGeneral');
let removeFavFullScreen;

var arrCreate = JSON.parse(localStorage.getItem('sendCreateGifos'));
/* console.log(arrCreate); */

function loadContentMyGifos() {
    if (arrCreate != null && arrCreate != "") {
        for (let i = 0; i < arrCreate.length; i++) {
            let img = document.createElement('img');
            img.setAttribute('id', `imgGIF${i}`);
            img.src = arrCreate[i];

            let pUser = document.createElement('p');
            pUser.innerText = "User";
            pUser.setAttribute('class', 'pUser');
            let pTitle = document.createElement('p');
            /* pTitle.innerText = content.data[i].title; */
            pTitle.innerText = 'Titulo';
            pTitle.setAttribute('class', 'pTitle');


            let imgFavorite = document.createElement('img');
            imgFavorite.setAttribute('id', `imgFav${i}`);
            imgFavorite.src = "img/icon_trash.svg";
            imgFavorite.setAttribute('onclick', 'removeMyGifos(this)');
            imgFavorite.setAttribute('class', 'icon imgFavorite');

            let imgDownload = document.createElement('img');
            imgDownload.setAttribute('id', `imgDow${i}`);
            imgDownload.src = "img/icon-download.svg";
            imgDownload.setAttribute('onclick', 'download(this)');
            imgDownload.setAttribute('class', 'icon imgDownload');

            let imgFullSize = document.createElement('img');
            imgFullSize.setAttribute('id', `imgFul${i}`);
            imgFullSize.src = "img/icon-max.svg";
            imgFullSize.setAttribute('onclick', 'fullScreen(this)');
            imgFullSize.setAttribute('class', 'icon imgFullSize');

            /* Agregar imagenes al div */
            let div = document.createElement('div');
            div.setAttribute('class', 'containerImg imgHover');
            div.setAttribute('id', `divGif${i}`);

            div.appendChild(img); /* Agregar imagen buscada */
            div.appendChild(imgFavorite); /* Agregar icono Favorito <3*/
            div.appendChild(imgDownload); /* Agregar icono Descargar */
            div.appendChild(imgFullSize); /* Agregar icono Pantalla completa */
            div.appendChild(pUser); /* Agregar texto usuario */
            div.appendChild(pTitle); /* Agregar Titulo Gif */


            /* Agregar div a la seccion */
            let outImg = document.getElementById('imagesCreateGifos');
            outImg.appendChild(div);

        }
        divImagesCreateGifos.classList.remove('hidden');
        divImagesCreateGifos.classList.add('imagesGeneral');
        btnGeneral.classList.remove('hidden');
        divSaveFirstGifo.classList.add('hidden');
        divSaveFirstGifo.classList.remove('firstMyGifo');
    } else {
        noHaveContentMyGifos();
    }

}

function noHaveContentMyGifos() {
    divImagesCreateGifos.classList.add('hidden');
    btnGeneral.classList.add('hidden');
    divImagesCreateGifos.classList.remove('imagesGeneral');
    divSaveFirstGifo.classList.remove('hidden');
}

function removeMyGifos(imageMyGifos) {
    let idImgHtml = imageMyGifos.id;
    let extractLastDigit = idImgHtml.slice(6, idImgHtml.length);
    arrCreate.splice(extractLastDigit, 1);
    localStorage.removeItem('sendCreateGifos');
    localStorage.setItem('sendCreateGifos', JSON.stringify(arrCreate));
    location.reload();
}


async function download(imageMyGifos) {
    let idImgHtml = imageMyGifos.id;
    let extractLastDigit = idImgHtml.slice(6, idImgHtml.length);
    let tagGIF = document.getElementById(`imgGIF${extractLastDigit}`).src;
    /* console.log(tagGIF); */
    let a = document.createElement('a');
    let response = await fetch(tagGIF);
    let file = await response.blob();
    a.download = imageMyGifos.id;
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
}

function fullScreen(iconFullScreen) {

    let idImgFullScreen = iconFullScreen.id;
    let extractLastDigit = idImgFullScreen.slice(6, idImgFullScreen.length);
    auxExtractLastDigitSearch = extractLastDigit;
    let imgFullScreenSrc = document.getElementById(`imgGIF${extractLastDigit}`).src;

    removeFavFullScreen = extractLastDigit;

    let imgClose = document.createElement('img');
    imgClose.src = '../img/close.svg';
    imgClose.classList.add('styleClose');
    imgClose.setAttribute('onclick', 'closeFullScreen()');


    /* CONTENEDOR CON IMAGEN Y FLECHAS - SIGUIENTE ANTERIOR *******/



    let imgFullScreen = document.createElement('img');
    imgFullScreen.src = imgFullScreenSrc;
    imgFullScreen.classList.add('styleImgFullScreen');
    imgFullScreen.setAttribute('id', `imgFullScreen`);


    let divImgDirection = document.createElement('div');
    divImgDirection.classList.add('styleImgDirection');


    divImgDirection.appendChild(imgFullScreen);

    /* CONTENEDOR CON TITULOS Y ICONOS *******/
    let pUser = document.createElement('p');
    pUser.innerText = "User";

    let getTitle = document.getElementById(`divGif${extractLastDigit}`);
    let sendTitle = getTitle.getElementsByClassName('pTitle')[0].innerText;

    let pTitle = document.createElement('p');
    pTitle.innerText = sendTitle;

    //div title - user
    let divText = document.createElement('div');
    divText.classList.add('styleDivText')

    divText.appendChild(pUser);
    divText.appendChild(pTitle);

    let imgFavorite = document.createElement('img');
    imgFavorite.src = "img/icon_trash.svg";
    imgFavorite.setAttribute('onclick', 'removeMyGifosFullScreen(this)');
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

    /* CONTENEDOR PRINCIPAL *******/
    let divFullScreen = document.getElementById('divFullScreen');
    divFullScreen.classList.add('styleFullScreen');
    divFullScreen.classList.remove('hidden');

    divFullScreen.appendChild(imgClose);
    divFullScreen.appendChild(divImgDirection);
    divFullScreen.appendChild(divDescription);
    document.querySelector('body').appendChild(divFullScreen);
}

function closeFullScreen() {
    document.getElementById('divFullScreen').innerHTML = "";
    document.getElementById('divFullScreen').classList.add('hidden');
    document.getElementById('divFullScreen').classList.remove('styleFullScreen');
}

function removeMyGifosFullScreen() {

    arrCreate.splice(removeFavFullScreen, 1);
    localStorage.removeItem('sendCreateGifos');
    localStorage.setItem('sendCreateGifos', JSON.stringify(arrCreate));
    location.reload();

}