//Variables
let streamVar;
let data64;
var video = document.querySelector('video');

//Boton COMENZAR, GRABAR, FINALIZAR, SUBIR GIFO
function btnActive() {
    document.getElementById('btnAllowCam').classList.remove('active');
    document.getElementById('btnRecordCam').classList.remove('active');
    document.getElementById('btnUploadCam').classList.remove('active');
}

//Inicializar cámara
function initializeCam() {
    navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                height: { max: 480 }
            }
        })
        .then(function(stream) {
            video.srcObject = stream;
            video.play()
            streamVar = stream;
        }).catch(function(error) {
            console.error("Cannot access media devices: ", error);
        });
}

//Funciones start y stop grabación
function startRecordingFn(stream) {

    // Initialize the recorder
    recorder = new RecordRTC(stream, {
        type: 'gif',
        quality: 10,
        width: 360,
        height: 360,
        hidden: 240,

        onGifRecordingStarted: function() {
            console.log('started');
        }
    });

    // Start recording the video
    recorder.startRecording();

    // release stream on stopRecording
    recorder.stream = stream;

}


arrayCreateGifos = [];
var arrCreate = JSON.parse(localStorage.getItem("sendCreateGifos"));
console.log(arrCreate);

if (arrCreate != null) {
    arrayCreateGifos = arrCreate;
}

function stopRecordingFn() {
    recorder.stopRecording(function() {
        console.log(URL.createObjectURL(this.blob));

        var reader = new FileReader();
        reader.readAsDataURL(recorder.getBlob());
        reader.onloadend = function() {
            var base64data = reader.result;
            console.log(base64data);
            data64 = base64data;
            arrayCreateGifos.push(base64data);
            localStorage.setItem('sendCreateGifos', JSON.stringify(arrayCreateGifos));
        }
    });


    document.getElementById('btnStart').innerText = 'SUBIR GIFO';
}


var localCreateGifos = JSON.parse(localStorage.getItem("sendCreateGifos"));


function sendGif(data) {
    const endpoint = "https://upload.giphy.com/v1/gifs";
    /*     const APIKEY = "uBk483t8qSoUU2toBjTHygcFZhK6OpRr";*/
    const username = 'dannyelgomez';

    var formData = new FormData();
    formData.append("api_key", APIKEY);
    formData.append("username", username);
    formData.append("file", data);
    let request = new XMLHttpRequest();
    request.open("POST", endpoint);
    request.send(formData);
}

document.getElementById('btnStart').addEventListener("click", function() {
    if (document.getElementById('btnStart').innerText == 'COMENZAR') {
        //Permiso inicar camara
        document.getElementById("camLoad").classList.remove('camLoadHidden');
        document.querySelector("h2").innerText = `¿Nos das acceso \n a tu cámara?`;
        document.querySelector("p").innerText = 'El acceso a tu camara será válido sólo \n por el tiempo en el que estés creando el GIFO.';
        btnActive();
        document.getElementById('btnAllowCam').classList.add('active');
        document.getElementById('btnStart').innerText = "GRABAR";
        initializeCam();

    } else if (document.getElementById('btnStart').innerText == 'GRABAR') {
        //Inicia grabación
        document.getElementById("camLoad").classList.add('camLoadHidden');
        btnActive();
        document.getElementById('btnRecordCam').classList.add('active');
        startRecordingFn(streamVar);
        document.getElementById('btnStart').innerText = 'FINALIZAR';

    } else if (document.getElementById('btnStart').innerText == 'FINALIZAR') {
        //Finaliza grabación
        stopRecordingFn();

    } else if (document.getElementById('btnStart').innerText == 'SUBIR GIFO') {
        //Subir Gifo a Giphy
        document.getElementById("camLoad").classList.add('camLoadHidden');
        btnActive();
        document.getElementById('btnUploadCam').classList.add('active');
        sendGif(data64);
    }
})