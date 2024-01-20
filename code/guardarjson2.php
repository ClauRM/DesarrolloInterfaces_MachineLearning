<?php

$archivo = "../data/prueba.json";

$datos = [ //lo recibe del fichero javascript por el metodo get
    'archivo' => $_GET ['archivo'],
    'elemento' => $_GET ['patron'],
    'datos'=> json_decode($_GET['datos']) //tratar como array
];

$datosexistentes =file_get_contents($archivo);
$datosexistentesjson = json_decode($datosexistentes);

array_push($datosexistentesjson,$datos);

$json = json_encode($datosexistentesjson, JSON_PRETTY_PRINT);

file_put_contents($archivo,$json);

?>