<?php
    $filenameLocal = "C:\Users\BROODMOTHER\Dropbox\Private\Programming\weather-unlocked-keys.php";
    $filenameRemote = "~/etc/api-keys/weather-unlocked-keys.php";

    if (file_exists ($filenameLocal)) {
        require $filenameLocal;
    } else {
        require $filenameRemote;
    }

    $latLng = $_GET["latLng"];

    $path = "http://api.weatherunlocked.com/api/current/$latLng?app_id=$wu_app_id&app_key=$wu_app_key";

    if ($responseCSV = file_get_contents($path)) {
        header('Content-Type: application/json');
        echo $responseCSV;
    };
?>