<?php

$archivo = "../datos/prueba.json";

$datos = [ //lo recibe del fichero javascript por el metodo get
    'elemento' => $_GET ['patron'],
    'datos'=> $_GET['datos']
];

$json = json_encode($datos, JSON_PRETTY_PRINT);

file_put_contents($archivo,$json);

?>