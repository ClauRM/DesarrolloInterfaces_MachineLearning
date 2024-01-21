//variables globales
var supercontador = 0;
var datosimagenes = [];
var temporizador = "";
var datos;
var patrones = [];
var cuentapatrones = [];
//Variables globales de contexto
var contexto1;
var contexto2;
var contexto3;
var contextovertical;
var contextohorizontal;
var contextodiagonal1;
var contextodiagonal2;
//crear objeto imagen
var imagen = new Image();

window.onload = function () {
    //cargar contextos
    contexto1 = document.getElementById("lienzo1").getContext("2d");
    contexto2 = document.getElementById("lienzo2").getContext("2d");
    contexto3 = document.getElementById("lienzo3").getContext("2d");
    contextovertical = document.getElementById("lienzovertical").getContext("2d");
    contextohorizontal = document.getElementById("lienzohorizontal").getContext("2d");
    contextodiagonal1 = document.getElementById("lienzodiagonal1").getContext("2d");
    contextodiagonal2 = document.getElementById("lienzodiagonal2").getContext("2d");
    //Traer los patrones de imagenes
    patrones[0] = new Image();
    patrones[0].src = "../img/vertical.png";
    patrones[1] = new Image();
    patrones[1].src = "../img/horizontal.png";
    patrones[2] = new Image();
    patrones[2].src = "../img/diagonal1.png";
    patrones[3] = new Image();
    patrones[3].src = "../img/diagonal2.png";
    //variables para estadistica del numero de lineas patrones
    cuentapatrones[0] = 0;
    cuentapatrones[1] = 0;
    cuentapatrones[2] = 0;
    cuentapatrones[3] = 0;
    
    //bucle asincronico para procesar las imagenes
    fetch("../images/json/imagenes.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (misdatos) {
            datos = misdatos;
            temporizador = setTimeout("bucle()", 5000);
        });
}

//bucle temporizador
function bucle() {
    procesaImagen("../images/002-procesadas/" + datos[supercontador]);
    clearTimeout(temporizador);
    temporizador = setTimeout("bucle()", 5000);
    supercontador++;
}

//funcion para procesar las imagenes
function procesaImagen(miimagen) {
    imagen.src = miimagen; //carga una imagen
    //cuando la imagen cargue ejecutar funcion
    imagen.onload = function () {
        //dibujar los patrones de linea
        contextovertical.drawImage(patrones[0],0,0)
        contextohorizontal.drawImage(patrones[1],0,0)
        contextodiagonal1.drawImage(patrones[2],0,0)
        contextodiagonal2.drawImage(patrones[3],0,0)
        //dibujar la imagen original en coordenadas 0,0 sobre el lienzo1
        contexto1.drawImage(imagen, 0, 0);
        //cargar las imagenes para detectar sus bordes
        let imagenlienzo1 = contexto1.getImageData(0, 0, 512, 512); //cargar la imagen1 en memoria
        let imagenlienzo2 = contexto2.getImageData(0, 0, 512, 512); //cargar la imagen2 en memoria
        //recorrer la imagen pixel al pixel para encontrar donde esta el borde
        for (let i = 0; i < imagenlienzo1.data.length; i += 4) { //cada pixel tiene 4 componentes
            let diferenciaHorizontal = Math.abs(imagenlienzo1.data[i] - imagenlienzo1.data[i + 4]); //diferencia del rojo en horizontal
            let diferenciaVertical = Math.abs(imagenlienzo1.data[i] - imagenlienzo1.data[i + 512 * 4]); //diferencia del rojo en vertical
            if (diferenciaVertical > 10 || diferenciaHorizontal > 10) { //si la diferencia es mayor
                // pintar un pixel negro
                imagenlienzo2.data[i] = 0;
                imagenlienzo2.data[i + 1] = 0;
                imagenlienzo2.data[i + 2] = 0;
                imagenlienzo2.data[i + 3] = 255;
            } else {
                //sino pintar un pixel blanco
                imagenlienzo2.data[i] = 255;
                imagenlienzo2.data[i + 1] = 255;
                imagenlienzo2.data[i + 2] = 255;
                imagenlienzo2.data[i + 3] = 255;
            }
        }
        //pintar los contornos en el lienzo2
        contexto2.putImageData(imagenlienzo2, 0, 0);
        //recorrer la ultima imagen con contornos en vertical /////////
        let muestravertical = contextovertical.getImageData(0, 0, 8, 8); //tomar los datos desde 0,0 hasta 8,8
        for (let x = 0; x < 512; x++) {
            for (let y = 0; y < 512; y++) {
                //por cada pixel comprobar si tiene el patron
                let trozo = contexto2.getImageData(x, y, 8, 8); //8x8 tamanio del patron
                let suma = 0;
                for (let i = 0; i < trozo.data.length; i += 4) { //4 informacion del trozo
                    suma += Math.abs(trozo.data[i] - muestravertical.data[i]);
                }
                //detectar los pixeles verticales
                if (suma < 4000) {
                    cuentapatrones[0]++; //lineas verticales
                    contexto3.fillStyle = "red";
                    contexto3.fillRect(x, y, 2, 2);
                }
            }
        }
        //recorrer la ultima imagen con contornos en horizontal /////////
        let muestrahorizontal = contextohorizontal.getImageData(0, 0, 8, 8); //tomar los datos desde 0,0 hasta 8,8
        for (let x = 0; x < 512; x++) {
            for (let y = 0; y < 512; y++) {
                //por cada pixel comprobar si tiene el patron
                let trozo = contexto2.getImageData(x, y, 8, 8); //8x8 tamanio del patron
                let suma = 0;
                for (let i = 0; i < trozo.data.length; i += 4) { //4 informacion del trozo
                    suma += Math.abs(trozo.data[i] - muestrahorizontal.data[i]);
                }
                //detectar los pixeles verticales
                if (suma < 4000) {
                    cuentapatrones[1]++;//lineas horizontales
                    contexto3.fillStyle = "blue";
                    contexto3.fillRect(x, y, 2, 2);
                }
            }
        }
        //recorrer la ultima imagen con contornos en diagonal1 /////////
        let muestradiagonal1 = contextodiagonal1.getImageData(0, 0, 8, 8); //tomar los datos desde 0,0 hasta 8,8
        for (let x = 0; x < 512; x++) {
            for (let y = 0; y < 512; y++) {
                //por cada pixel comprobar si tiene el patron
                let trozo = contexto2.getImageData(x, y, 8, 8); //8x8 tamanio del patron
                let suma = 0;
                for (let i = 0; i < trozo.data.length; i += 4) { //4 informacion del trozo
                    suma += Math.abs(trozo.data[i] - muestradiagonal1.data[i]);
                }
                //detectar los pixeles verticales
                if (suma < 4000) {
                    cuentapatrones[2]++; //lineas diagonales1
                    contexto3.fillStyle = "green";
                    contexto3.fillRect(x, y, 2, 2);
                }
            }
        }
        //recorrer la ultima imagen con contornos en vertical /////////
        let muestradiagonal2 = contextodiagonal2.getImageData(0, 0, 8, 8); //tomar los datos desde 0,0 hasta 8,8
        for (let x = 0; x < 512; x++) {
            for (let y = 0; y < 512; y++) {
                //por cada pixel comprobar si tiene el patron
                let trozo = contexto2.getImageData(x, y, 8, 8); //8x8 tamanio del patron
                let suma = 0;
                for (let i = 0; i < trozo.data.length; i += 4) { //4 informacion del trozo
                    suma += Math.abs(trozo.data[i] - muestradiagonal2.data[i]);
                }
                //detectar los pixeles verticales
                if (suma < 4000) {
                    cuentapatrones[3]++; //lineas diagonales2
                    contexto3.fillStyle = "orange";
                    contexto3.fillRect(x, y, 2, 2);
                }
            }
        }
        //estadisticas del numero de lineas horizontales y verticales
        //En el array, posicion 0 lineas verticales, posicion 1 lineas horizontales
        console.log(cuentapatrones);
        //convertir totales a porcentajes
        let total = 0;
        for (let i = 0; i < cuentapatrones.length; i++) {
            total += cuentapatrones[i];
        }
        for (let i = 0; i < cuentapatrones.length; i++) {
            cuentapatrones[i] /= total;
        }
        //nuevamente hacer console log para ver los porcentales
        console.log(cuentapatrones);
        //persistir datos en fichero json
        let datos = JSON.stringify(cuentapatrones);
        //obtener nombre del patron
        let arrayruta = miimagen.split("/");
        let nombrefichero = arrayruta[arrayruta.length - 1];
        let arrayarchivo = nombrefichero.split(".");
        let nombrearchivo = arrayarchivo[0];
        let arraypatron = nombrearchivo.split("-");
        let nombrepatron = arraypatron[arraypatron.length - 1];
        fetch("guardarjson2.php?archivo=" + nombrefichero + "&patron=" + nombrepatron + "&datos=" + datos);
    }
}
