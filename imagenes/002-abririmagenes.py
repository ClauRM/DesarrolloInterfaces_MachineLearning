from PIL import Image #cargar la libreria de imagenes
import os #leer dentro de una carpeta

carpeta = "001-crudo"

archivos = os.listdir(carpeta) #listar ficheros dentro de la carpeta

for archivo in archivos:
    imagen = os.path.join(carpeta,archivo)#unir la carpeta con el archivo para calcular la ruta
    print(imagen)
    


