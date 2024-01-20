<?php

$archivo = "../data/prueba.json";

$datos = [ //lo recibe del fichero javascript por el metodo get
    'elemento' => $_GET ['patron'],
    'datos'=> $_GET['datos']
];

$datosexistentes =file_get_contents($archivo);
$datosexistentesjson = json_decode($datosexistentes);

array_push($datosexistentesjson,$datos);

$json = json_encode($datosexistentesjson, JSON_PRETTY_PRINT);

file_put_contents($archivo,$json);

?>