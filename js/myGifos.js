let divImagesCreateGifos = document.getElementById('imagesCreateGifos');
let divSaveFirstGifo = document.getElementById('saveFirstGifo');
let btnGeneral = document.getElementById('buttonGeneral');

var arrCreate = JSON.parse(localStorage.getItem('sendCreateGifos'));
console.log(arrCreate);

function loadContentMyGifos() {
    if (arrCreate != null) {

        for (let i = 0; i < arrCreate.length; i++) {
            let img = document.createElement('img');
            img.src = arrCreate[i];
            let imagesCreateGifos = document.getElementById('imagesCreateGifos');
            imagesCreateGifos.appendChild(img);
        }
        divImagesCreateGifos.classList.remove('hidden');
        divImagesCreateGifos.classList.add('imagesGeneral');
        btnGeneral.classList.remove('hidden');
        divSaveFirstGifo.classList.add('hidden');
        divSaveFirstGifo.classList.remove('firstMyGifo');
    } else {
        divImagesCreateGifos.classList.add('hidden');
        btnGeneral.classList.add('hidden');
        divImagesCreateGifos.classList.remove('imagesGeneral');
        divSaveFirstGifo.classList.remove('hidden');
        console.log('Mis Gifos no tiene videos');
    }
}