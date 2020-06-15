<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

require_once 'Controller.php';
require_once 'Api.php';

try {
    $controller = new Controller();
    echo $controller->run();
} catch (Exception $e) {
    echo json_encode(Array('error' => $e->getMessage()));
}