from PIL import Image #cargar la libreria de imagenes
import os #leer dentro de una carpeta

carpeta = "001-crudo"
carpetasalida = "002-procesadas"

archivos = os.listdir(carpeta) #listar ficheros dentro de la carpeta

for archivo in archivos:
    imagen = os.path.join(carpeta,archivo)#unir la carpeta con el archivo para calcular la ruta
    miimagen = Image.open(imagen)#abro la imagen
    #accedo a sus propiedades (anchura y altura)
    anchura = miimagen.width 
    altura= miimagen.height
    #recortar la imagen a cuadrado
    if anchura > altura:
        caja =(
            altura/2-anchura/2,
            0,
            altura/2+anchura/2,
            altura,
            )
    else:
        caja =(
            0,
            altura/2-anchura/2,
            anchura,
            altura/2+anchura/2
            )
    imagencortada = miimagen.crop(caja)
    #escalar la imagen
    escalada = imagencortada.resize((512,512))
    escalada.save(carpetasalida+"/"+archivo)#guardar imagen escalada


