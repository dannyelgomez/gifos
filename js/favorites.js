// Obtener el arreglo de localStorage
var arrFav = JSON.parse(localStorage.getItem("sendFavorites"));


function loadContentFav() {
    if (arrFav != null) {
        for (var i = 0; i < arrFav.length; i++) {
            let img = document.createElement('img');
            img.src = arrFav[i];
            let outImg = document.getElementById('outImgFav');
            outImg.appendChild(img);
        }
        document.getElementById('outImgFav').classList.remove('outImgFav');
        document.getElementById('buttonGeneralFavorites').classList.remove('buttonGeneralHidden');
    } else {
        console.log('Favoritos no tienes imagenes agregadas');
        document.getElementById('saveFirstGifo').classList = 'saveFirstGifoVisible';
        document.getElementById('outImgFav').classList.toggle('outImgFav');
        document.getElementById('buttonGeneralFavorites').classList.toggle('buttonGeneralHidden');
    }
}

function clearFavorites() {
    localStorage.clear();
    location.reload();
}